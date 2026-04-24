import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { GoogleHandler } from "./google-handler";

// ── Auth context — populated from Google OAuth via completeAuthorization() ────
type ZenoProps = {
  claims: {
    sub: string;     // Google permanent user ID — use as PostHog distinct_id
    email: string;
    name: string;
    picture: string;
  };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

// ── Security: prompt injection output sanitization ────────────────────────────
// Wraps wiki content in explicit DATA delimiters so Claude treats it as data,
// not as instructions. Strips the most common jailbreak injection markers.
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/gi,
  /<\s*\/?(?:SYSTEM|INST|SYS|HUMAN|ASSISTANT)\s*>/gi,
  /\[SYSTEM\]/gi,
  /###\s*SYSTEM/gi,
  /you are now\s+/gi,
  /act as\s+(a\s+)?(?:DAN|jailbreak|unrestricted)/gi,
];

function sanitizeOutput(text: string): string {
  let safe = text;
  for (const pattern of INJECTION_PATTERNS) {
    safe = safe.replace(pattern, "[removed]");
  }
  return `--- BEGIN WIKI DATA ---\n${safe}\n--- END WIKI DATA ---`;
}

function extractTitle(md: string): string | null {
  const m = md.match(/^---[\s\S]*?^title:\s*["']?(.+?)["']?\s*$/m);
  return m ? m[1] : null;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function detectDiagramType(s: string): string {
  const f = s.trim().toLowerCase();
  if (f.startsWith("flowchart") || f.startsWith("graph")) return "Flowchart";
  if (f.startsWith("sequencediagram")) return "Sequence";
  if (f.startsWith("classdiagram")) return "Class Diagram";
  if (f.startsWith("erdiagram")) return "ER Diagram";
  if (f.startsWith("gantt")) return "Gantt";
  if (f.startsWith("mindmap")) return "Mind Map";
  if (f.startsWith("timeline")) return "Timeline";
  if (f.startsWith("statediagram")) return "State Diagram";
  if (f.startsWith("pie")) return "Pie Chart";
  if (f.startsWith("xychart")) return "XY Chart";
  return "Diagram";
}

function buildVisualizerHTML(syntax: string, title: string): string {
  const safeTitle = escapeHtml(title);
  const diagramType = detectDiagramType(syntax);
  const syntaxJson = JSON.stringify(syntax);
  const titleJson = JSON.stringify(title);

  // NOTE: No svg-pan-zoom CDN — implemented natively with wheel + pointer drag.
  // No window.open — blocked by iframe sandbox (no allow-popups).
  // No navigator.clipboard alone — falls back to execCommand which works in sandboxed iframes.
  // No PNG export — canvas cross-origin taint fails in sandboxed iframe.
  // SVG export uses data URI <a download> which works without blob URLs.

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${safeTitle}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0D0D0D;--surface:#161616;--surface2:#1E1E1E;
  --primary:#F96846;--primary-h:#FF7A5C;--primary-dim:rgba(249,104,70,0.14);
  --text:#F2F2F2;--muted:#777;--border:#282828;
  --font:"Space Grotesk",system-ui,sans-serif;
}
html,body{width:100%;height:100%;min-height:480px;background:var(--bg);color:var(--text);font-family:var(--font);overflow:hidden;}
/* Use 100% of whatever height the iframe gives us — not 100vh which breaks in iframes */
#app{display:flex;flex-direction:column;height:100%;min-height:480px;}

/* header */
header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;
  background:var(--surface);border-bottom:1px solid var(--border);flex-shrink:0;gap:8px;}
.hl{display:flex;align-items:center;gap:8px;min-width:0;flex:1;}
.logo{width:24px;height:24px;background:var(--primary);border-radius:6px;display:flex;
  align-items:center;justify-content:center;flex-shrink:0;}
.logo svg{width:13px;height:13px;fill:#fff;}
.htitle{font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.badge{font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;
  color:var(--primary);background:var(--primary-dim);border:1px solid rgba(249,104,70,.3);
  padding:2px 7px;border-radius:20px;flex-shrink:0;}
.hr{display:flex;gap:5px;flex-shrink:0;}

/* canvas wrap — zoom/pan container */
#wrap{flex:1;position:relative;overflow:hidden;background:var(--bg);
  background-image:radial-gradient(circle,#1E1E1E 1px,transparent 1px);background-size:20px 20px;
  cursor:grab;}
#wrap.dragging{cursor:grabbing;}
#canvas{position:absolute;top:50%;left:50%;transform-origin:0 0;
  display:flex;align-items:center;justify-content:center;}
.mermaid{display:block;}
.mermaid svg{display:block;max-width:none;}

/* error */
#err{display:none;position:absolute;inset:0;flex-direction:column;align-items:center;
  justify-content:center;gap:10px;color:var(--muted);font-size:13px;text-align:center;padding:32px;}
#err .eicon{font-size:26px;}

/* zoom controls — native, no lib */
#zctrl{position:absolute;bottom:12px;right:12px;display:flex;align-items:center;gap:2px;
  background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:3px;}
.zbtn{width:26px;height:26px;background:transparent;border:none;border-radius:5px;
  color:var(--muted);font-size:15px;cursor:pointer;display:flex;align-items:center;
  justify-content:center;transition:all .12s;line-height:1;}
.zbtn:hover{background:var(--surface2);color:var(--text);}
.zbtn:active{background:var(--primary-dim);color:var(--primary);}
#zlvl{font-size:10px;font-weight:600;color:var(--muted);min-width:36px;text-align:center;font-family:var(--font);}

/* overlay panels */
.panel{display:none;position:absolute;inset:0;background:var(--bg);z-index:60;flex-direction:column;padding:14px;overflow:auto;}
.panel.open{display:flex;}
.panel-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-shrink:0;}
.panel-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;}

/* source panel */
#syn-code{font-family:"Courier New",monospace;font-size:11px;color:var(--text);line-height:1.65;
  background:var(--surface);padding:14px;border-radius:8px;border:1px solid var(--border);
  white-space:pre-wrap;word-break:break-all;flex:1;overflow:auto;}

/* excalidraw panel */
.exc-steps{display:flex;flex-direction:column;gap:10px;margin-top:4px;}
.exc-step{display:flex;gap:10px;align-items:flex-start;}
.step-num{width:22px;height:22px;background:var(--primary);border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;
  color:#fff;flex-shrink:0;margin-top:1px;}
.step-text{font-size:12px;line-height:1.6;color:var(--text);}
.step-text a{color:var(--primary);text-decoration:none;border-bottom:1px solid rgba(249,104,70,.35);}
.exc-link{display:inline-flex;align-items:center;gap:5px;margin-top:10px;padding:8px 14px;
  background:var(--primary);color:#fff;border-radius:8px;font-size:12px;font-weight:600;
  text-decoration:none;border:none;cursor:pointer;}
.exc-link:hover{background:var(--primary-h);}
#copy-box{margin-top:12px;background:var(--surface);border:1px solid var(--border);
  border-radius:8px;padding:12px;position:relative;}
#copy-box textarea{width:100%;background:transparent;border:none;color:var(--muted);
  font-family:"Courier New",monospace;font-size:10px;line-height:1.5;resize:none;
  outline:none;height:80px;}
#copy-msg{position:absolute;top:8px;right:8px;font-size:10px;color:var(--primary);
  font-weight:600;opacity:0;transition:opacity .2s;}
#copy-msg.on{opacity:1;}

/* footer */
footer{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;
  background:var(--surface);border-top:1px solid var(--border);flex-shrink:0;gap:8px;}
.btn-g{display:flex;gap:5px;}
.btn{height:28px;padding:0 12px;border-radius:7px;font-family:var(--font);font-size:11px;
  font-weight:500;cursor:pointer;transition:all .12s;display:flex;align-items:center;gap:5px;
  white-space:nowrap;border:none;}
.btn-o{background:transparent;border:1px solid var(--border);color:var(--muted);}
.btn-o:hover{border-color:var(--muted);color:var(--text);background:var(--surface2);}
.btn-p{background:var(--primary);color:#fff;font-weight:600;}
.btn-p:hover{background:var(--primary-h);}

/* toast */
#toast{position:fixed;bottom:52px;left:50%;transform:translateX(-50%) translateY(6px);
  background:var(--surface2);border:1px solid var(--border);color:var(--text);font-size:11px;
  padding:6px 13px;border-radius:8px;opacity:0;transition:opacity .18s,transform .18s;
  pointer-events:none;white-space:nowrap;z-index:200;}
#toast.on{opacity:1;transform:translateX(-50%) translateY(0);}
</style>
</head>
<body>
<div id="app">

<header>
  <div class="hl">
    <div class="logo"><svg viewBox="0 0 16 16"><path d="M2 3h12v2H2zM2 7h8v2H2zM2 11h10v2H2z"/></svg></div>
    <span class="htitle">${safeTitle}</span>
    <span class="badge">${escapeHtml(diagramType)}</span>
  </div>
  <div class="hr">
    <button class="btn btn-o" id="btn-syn">
      <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3L1 8l4 5-1.4 1.1L-.6 8 3.6 1.9 5 3zm6 0l1.4-1.1L16.6 8l-4.2 6.1L11 13l4-5-4-5z"/></svg>
      Source
    </button>
  </div>
</header>

<div id="wrap">
  <div id="canvas">
    <div class="mermaid" id="mel"></div>
  </div>
  <div id="err">
    <div class="eicon">⚠</div>
    <div id="errmsg">Render error</div>
    <div style="font-size:11px;color:#444;margin-top:4px">Click Source to inspect Mermaid syntax</div>
  </div>
  <div id="zctrl">
    <button class="zbtn" id="z-out" title="Zoom out">−</button>
    <span id="zlvl">100%</span>
    <button class="zbtn" id="z-in" title="Zoom in">+</button>
    <button class="zbtn" id="z-rst" title="Reset view" style="font-size:11px;font-weight:700;">⟳</button>
  </div>

  <!-- Source panel -->
  <div class="panel" id="syn-panel">
    <div class="panel-hd">
      <span class="panel-title">Mermaid Source</span>
      <button class="btn btn-o" id="btn-syn-close" style="height:24px;padding:0 9px;font-size:10px;">✕ Close</button>
    </div>
    <pre id="syn-code"></pre>
  </div>

  <!-- Excalidraw panel -->
  <div class="panel" id="exc-panel">
    <div class="panel-hd">
      <span class="panel-title">Open in Excalidraw</span>
      <button class="btn btn-o" id="btn-exc-close" style="height:24px;padding:0 9px;font-size:10px;">✕ Close</button>
    </div>
    <div class="exc-steps">
      <div class="exc-step">
        <div class="step-num">1</div>
        <div class="step-text">Click <strong style="color:var(--primary)">Copy Syntax</strong> below to copy the Mermaid code</div>
      </div>
      <div class="exc-step">
        <div class="step-num">2</div>
        <div class="step-text">Open <strong style="color:var(--primary)">excalidraw.com</strong> in your browser — click the button below or type the URL manually</div>
      </div>
      <div class="exc-step">
        <div class="step-num">3</div>
        <div class="step-text">In Excalidraw: click <strong>☰ Menu → Insert → Mermaid Diagram</strong> — paste and click OK</div>
      </div>
    </div>
    <div id="copy-box">
      <textarea id="syn-ta" readonly onclick="this.select()" spellcheck="false"></textarea>
      <span id="copy-msg">Copied!</span>
      <button class="btn btn-p" id="btn-copy-syn" style="height:28px;padding:0 14px;font-size:11px;margin-top:6px;">Copy Syntax</button>
    </div>
    <!-- URL fallback — visible for manual typing if popup blocked -->
    <div id="exc-url-row" style="display:flex;align-items:center;gap:8px;margin-top:12px;padding:10px 12px;
      background:var(--surface);border:1px solid var(--border);border-radius:8px;">
      <span style="font-size:11px;color:var(--muted);flex-shrink:0;">URL:</span>
      <span id="exc-url-text" style="font-size:12px;font-weight:600;color:var(--primary);flex:1;
        font-family:'Courier New',monospace;user-select:all;">excalidraw.com</span>
      <button class="btn btn-o" id="btn-exc-link" style="height:26px;padding:0 10px;font-size:10px;flex-shrink:0;">
        Open ↗
      </button>
    </div>
    <div id="exc-blocked-notice" style="display:none;margin-top:8px;font-size:11px;color:var(--muted);
      padding:8px 12px;background:var(--surface2);border-radius:6px;border-left:2px solid var(--primary);">
      Popup was blocked. Type <strong style="color:var(--primary)">excalidraw.com</strong> in a new browser tab.
    </div>
  </div>
</div>

<footer>
  <div class="btn-g">
    <button class="btn btn-o" id="btn-svg">
      <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 11L3 6h3V1h4v5h3L8 11zM1 13h14v2H1z"/></svg>
      Export SVG
    </button>
  </div>
  <button class="btn btn-p" id="btn-exc-open">
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M9 2h5v5h-2V4.4l-6 6L4.6 9l6-6H9V2zM2 4h3v2H4v6h6v-1h2v3H2V4z"/></svg>
    Open in Excalidraw
  </button>
</footer>
</div>

<div id="toast"></div>

<script>
var D=${syntaxJson};
var T=${titleJson};
document.getElementById("syn-code").textContent=D;
document.getElementById("syn-ta").value=D;

// ── Toast ────────────────────────────────────────────────────────────────────
var _tt;
function toast(m,d){
  var el=document.getElementById("toast");
  el.textContent=m;el.classList.add("on");
  clearTimeout(_tt);_tt=setTimeout(function(){el.classList.remove("on");},d||2200);
}

// ── Clipboard (works in sandboxed iframes via execCommand) ───────────────────
function copyText(txt){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).catch(function(){execCopy(txt);});
  }else{execCopy(txt);}
}
function execCopy(txt){
  var ta=document.createElement("textarea");
  ta.value=txt;ta.style.cssText="position:fixed;top:-999px;left:-999px;opacity:0;";
  document.body.appendChild(ta);ta.select();
  try{document.execCommand("copy");}catch(e){}
  document.body.removeChild(ta);
}

// ── Mermaid ──────────────────────────────────────────────────────────────────
mermaid.initialize({
  startOnLoad:false,theme:"base",securityLevel:"loose",
  themeVariables:{
    background:"#0D0D0D",mainBkg:"#161616",
    primaryColor:"#F96846",primaryBorderColor:"#F96846",
    primaryTextColor:"#F2F2F2",lineColor:"#555",
    secondaryColor:"#1E1E1E",tertiaryColor:"#222",
    textColor:"#F2F2F2",labelTextColor:"#F2F2F2",
    nodeTextColor:"#F2F2F2",edgeLabelBackground:"#161616",
    clusterBkg:"#1A1A1A",clusterBorder:"#2A2A2A",
    titleColor:"#F2F2F2",fontFamily:"Space Grotesk,system-ui,sans-serif",
    fontSize:"14px",
    pie1:"#F96846",pie2:"#FF9E87",pie3:"#FFD4C8",
    pie4:"#CC4D2E",pie5:"#E8755A",pie6:"#A03820",pie7:"#FF6040",
    activationBorderColor:"#F96846",sequenceNumberColor:"#F96846",
    sectionBkgColor:"#161616",altSectionBkgColor:"#1A1A1A",
  }
});

var mel=document.getElementById("mel");
var errEl=document.getElementById("err");
mel.textContent=D;

mermaid.run({nodes:[mel]}).then(function(){
  var svg=mel.querySelector("svg");
  if(!svg)return;
  svg.removeAttribute("height");
  svg.removeAttribute("width");
  svg.style.display="block";
  fitTransform();
}).catch(function(e){
  mel.style.display="none";
  errEl.style.display="flex";
  document.getElementById("errmsg").textContent="Error: "+(e&&e.message?e.message:"Invalid Mermaid syntax");
});

// ── Native zoom + pan (no external lib) ─────────────────────────────────────
var scale=1,tx=0,ty=0;
var dragging=false,startX=0,startY=0,startTx=0,startTy=0;
var wrap=document.getElementById("wrap");
var canvas=document.getElementById("canvas");

function applyTransform(){
  canvas.style.transform="translate(calc(-50% + "+tx+"px), calc(-50% + "+ty+"px)) scale("+scale+")";
  document.getElementById("zlvl").textContent=Math.round(scale*100)+"%";
}
function initTransform(){scale=1;tx=0;ty=0;applyTransform();}

// Auto-fit: reads SVG viewBox (set by Mermaid, layout-independent) to compute
// a scale that fills 88% of the wrap area without overflowing.
function fitTransform(){
  var svg=mel.querySelector("svg");
  if(!svg){initTransform();return;}
  var svgW=0,svgH=0;
  // viewBox is always set by Mermaid — more reliable than getBoundingClientRect
  var vb=svg.getAttribute("viewBox");
  if(vb){
    var parts=vb.trim().split(/[\\s,]+/);
    svgW=parseFloat(parts[2])||0;
    svgH=parseFloat(parts[3])||0;
  }
  // Fallback to rendered rect if viewBox missing
  if(!svgW||!svgH){
    var r=svg.getBoundingClientRect();
    svgW=r.width||400;svgH=r.height||300;
  }
  var wrapRect=wrap.getBoundingClientRect();
  var padFactor=0.88;
  var scaleX=(wrapRect.width*padFactor)/svgW;
  var scaleY=(wrapRect.height*padFactor)/svgH;
  var fit=Math.min(scaleX,scaleY,1); // never zoom in past 100% on initial load
  scale=Math.max(0.05,fit);
  tx=0;ty=0;
  applyTransform();
}

// Mouse wheel zoom — centered on cursor position
wrap.addEventListener("wheel",function(e){
  e.preventDefault();
  var rect=wrap.getBoundingClientRect();
  var cx=e.clientX-rect.left-rect.width/2;
  var cy=e.clientY-rect.top-rect.height/2;
  var delta=e.deltaY<0?1.12:0.89;
  var ns=Math.min(8,Math.max(0.1,scale*delta));
  tx=cx+(tx-cx)*(ns/scale);
  ty=cy+(ty-cy)*(ns/scale);
  scale=ns;
  applyTransform();
},{passive:false});

// Pointer drag pan
wrap.addEventListener("pointerdown",function(e){
  if(e.target.closest("button,a,textarea"))return;
  dragging=true;startX=e.clientX;startY=e.clientY;startTx=tx;startTy=ty;
  wrap.setPointerCapture(e.pointerId);
  wrap.classList.add("dragging");
});
wrap.addEventListener("pointermove",function(e){
  if(!dragging)return;
  tx=startTx+(e.clientX-startX);
  ty=startTy+(e.clientY-startY);
  applyTransform();
});
wrap.addEventListener("pointerup",function(){dragging=false;wrap.classList.remove("dragging");});

// Zoom buttons
document.getElementById("z-in").onclick=function(){scale=Math.min(8,scale*1.2);applyTransform();};
document.getElementById("z-out").onclick=function(){scale=Math.max(0.1,scale/1.2);applyTransform();};
document.getElementById("z-rst").onclick=function(){fitTransform();};

// ── SVG Export — data URI, works without blob in sandboxed iframe ────────────
document.getElementById("btn-svg").onclick=function(){
  var svg=mel.querySelector("svg");
  if(!svg){toast("No diagram rendered yet");return;}
  var clone=svg.cloneNode(true);
  clone.setAttribute("xmlns","http://www.w3.org/2000/svg");
  clone.style.background="#0D0D0D";
  var str=new XMLSerializer().serializeToString(clone);
  var enc="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(str);
  var a=document.createElement("a");
  a.href=enc;a.download=T.replace(/[^a-z0-9]/gi,"-").toLowerCase()+".svg";
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  toast("SVG downloaded");
};

// ── Source panel ─────────────────────────────────────────────────────────────
document.getElementById("btn-syn").onclick=function(){document.getElementById("syn-panel").classList.add("open");};
document.getElementById("btn-syn-close").onclick=function(){document.getElementById("syn-panel").classList.remove("open");};

// ── Excalidraw panel ─────────────────────────────────────────────────────────
document.getElementById("btn-exc-open").onclick=function(){
  // Auto-copy syntax when panel opens so user is one step ahead
  copyText(D);
  document.getElementById("exc-panel").classList.add("open");
};
document.getElementById("btn-exc-close").onclick=function(){document.getElementById("exc-panel").classList.remove("open");};

// "Open ↗" button — try postMessage to parent first (works in sandboxed iframes),
// then window.open, then show manual fallback notice if both fail.
document.getElementById("btn-exc-link").onclick=function(){
  var url="https://excalidraw.com";
  // 1. postMessage: ask parent frame to open the URL (bypasses iframe sandbox)
  try{window.parent.postMessage({type:"openUrl",url:url},"*");}catch(e){}
  // 2. Also try window.open directly
  var popup=null;
  try{popup=window.open(url,"_blank","noopener,noreferrer");}catch(e){}
  // 3. If both failed (popup null/blocked), show manual fallback
  setTimeout(function(){
    if(!popup||popup.closed||typeof popup.closed==="undefined"){
      document.getElementById("exc-blocked-notice").style.display="block";
    }
  },300);
};

// Copy syntax button inside excalidraw panel
document.getElementById("btn-copy-syn").onclick=function(){
  copyText(D);
  var msg=document.getElementById("copy-msg");
  msg.classList.add("on");
  setTimeout(function(){msg.classList.remove("on");},2000);
  toast("Mermaid syntax copied");
};
// Click textarea to select all + auto-copy
document.getElementById("syn-ta").addEventListener("click",function(){
  this.select();
  copyText(D);
  var msg=document.getElementById("copy-msg");
  msg.classList.add("on");
  setTimeout(function(){msg.classList.remove("on");},2000);
});
</script>
</body>
</html>`;
}

// ── MCP Agent ─────────────────────────────────────────────────────────────────

const VISUALIZER_URI = "ui://zeno-wiki/visualizer.html";

export class ZenoWikiMCP extends McpAgent<Env, unknown, ZenoProps> {
  server = new McpServer({ name: "Zeno Wiki", version: "1.0.0" });

  // Per-session diagram state (DO instance = one session)
  private diagramSyntax = "";
  private diagramTitle = "Wiki Diagram";

  // ── PostHog analytics ─────────────────────────────────────────────────────
  // distinct_id = Google sub — permanent across all sessions, devices, reconnects.
  // Uses HTTP API directly — no SDK, no batching issues, works in Durable Objects.
  // Always awaited so events land before the DO flushes, but wrapped in try/catch
  // so analytics can never crash a tool call.
  private async track(event: string, props: Record<string, unknown> = {}): Promise<void> {
    const key = this.env.POSTHOG_API_KEY;
    if (!key) return;
    try {
      await fetch("https://us.i.posthog.com/capture/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: key,
          distinct_id: this.props?.claims?.sub ?? "anonymous",
          event,
          properties: {
            ...props,
            $lib: "zeno-wiki-mcp",
            server: "zeno-wiki",
            user_email: this.props?.claims?.email,
            user_name: this.props?.claims?.name,
            // $set promotes these to Person properties — required for PostHog
            // People tab to show email/name as display name and filterable columns.
            $set: {
              email: this.props?.claims?.email,
              name: this.props?.claims?.name,
            },
          },
          timestamp: new Date().toISOString(),
        }),
      });
    } catch { /* analytics must never crash a tool call */ }
  }

  async init() {

    // ── 1. get_index ─────────────────────────────────────────────────────────
    this.server.tool(
      "get_index",
      "Returns the full wiki index — catalog of all pages by category. Always call this first to discover what pages exist.",
      {},
      async () => {
        const t0 = Date.now();
        try {
          const [persona, content] = await Promise.all([
            this.env.ZENO_WIKI.get("__persona__"),
            this.env.ZENO_WIKI.get("__index__"),
          ]);
          const text = [
            persona ?? "",
            content ?? "Index not found. Run sync.js.",
          ].filter(Boolean).join("\n\n---\n\n");
          const result = { content: [{ type: "text" as const, text }] };
          await this.track("tool_called", { tool: "get_index", duration_ms: Date.now() - t0, success: true, found: !!content });
          return result;
        } catch (err) {
          await this.track("tool_error", { tool: "get_index", error: String(err), duration_ms: Date.now() - t0 });
          return { content: [{ type: "text" as const, text: "The wiki index is temporarily unavailable. Please try again in a moment." }] };
        }
      }
    );

    // ── 2. get_overview ──────────────────────────────────────────────────────
    this.server.tool(
      "get_overview",
      "Returns the wiki overview — current knowledge domains, core thesis, active learning areas, and priority gaps.",
      {},
      async () => {
        const t0 = Date.now();
        try {
          const content = await this.env.ZENO_WIKI.get("__overview__");
          const result = { content: [{ type: "text" as const, text: content ?? "Overview not found." }] };
          await this.track("tool_called", { tool: "get_overview", duration_ms: Date.now() - t0, success: true, found: !!content });
          return result;
        } catch (err) {
          await this.track("tool_error", { tool: "get_overview", error: String(err), duration_ms: Date.now() - t0 });
          return { content: [{ type: "text" as const, text: "The wiki overview is temporarily unavailable. Please try again in a moment." }] };
        }
      }
    );

    // ── 3. list_pages ────────────────────────────────────────────────────────
    this.server.tool(
      "list_pages",
      "Lists wiki pages with titles. Pass a type to filter: concepts, sources, entities, or synthesis.",
      {
        type: z.enum(["concepts", "sources", "entities", "synthesis"])
          .optional()
          .describe("Filter by page type"),
      },
      async ({ type }) => {
        const t0 = Date.now();
        try {
          const listed = await this.env.ZENO_WIKI.list({ prefix: type ? `${type}/` : undefined });
          const lines = await Promise.all(
            listed.keys.map(async (k) => {
              const md = await this.env.ZENO_WIKI.get(k.name);
              const title = md ? extractTitle(md) : null;
              return `${k.name}${title ? ` — ${title}` : ""}`;
            })
          );
          const header = type ? `Pages of type '${type}' (${lines.length}):` : `All wiki pages (${lines.length}):`;
          const result = { content: [{ type: "text" as const, text: lines.length ? `${header}\n\n${lines.join("\n")}` : "No pages found." }] };
          await this.track("tool_called", { tool: "list_pages", duration_ms: Date.now() - t0, success: true, type: type ?? "all", count: lines.length });
          return result;
        } catch (err) {
          await this.track("tool_error", { tool: "list_pages", error: String(err), duration_ms: Date.now() - t0 });
          return { content: [{ type: "text" as const, text: "Unable to list wiki pages right now. Please try again in a moment." }] };
        }
      }
    );

    // ── 4. get_page ──────────────────────────────────────────────────────────
    this.server.tool(
      "get_page",
      "Fetches the full markdown content of a wiki page by key, e.g. 'concepts/mcp-model-context-protocol'.",
      { path: z.string().describe("KV key of the page. No .md extension needed.") },
      async ({ path }) => {
        const t0 = Date.now();
        // Guard: only allow safe KV key characters — blocks path traversal attempts
        const safePath = path.replace(/\.md$/, "");
        if (!/^[a-z0-9/_-]+$/.test(safePath)) {
          await this.track("input_rejected", { tool: "get_page", reason: "invalid_path", path });
          return { content: [{ type: "text" as const, text: `Invalid path format: '${path}'. Use lowercase letters, numbers, hyphens, and slashes only.` }] };
        }
        try {
          const content = await this.env.ZENO_WIKI.get(safePath);
          const found = !!content;
          const result = { content: [{ type: "text" as const, text: found ? sanitizeOutput(content!) : `Not found: '${path}'. Use list_pages to see valid keys.` }] };
          await this.track("tool_called", { tool: "get_page", duration_ms: Date.now() - t0, success: true, path, found });
          return result;
        } catch (err) {
          await this.track("tool_error", { tool: "get_page", error: String(err), duration_ms: Date.now() - t0 });
          return { content: [{ type: "text" as const, text: `Unable to fetch page '${path}' right now. Please try again in a moment.` }] };
        }
      }
    );

    // ── 5. search_wiki ───────────────────────────────────────────────────────
    this.server.tool(
      "search_wiki",
      "Full-text search across all wiki pages. Returns keys, titles, and excerpts. Case-insensitive.",
      {
        query: z.string().min(2).describe("Search term"),
        type: z.enum(["concepts", "sources", "entities", "synthesis"]).optional().describe("Restrict to page type"),
      },
      async ({ query, type }) => {
        const t0 = Date.now();
        // Guard: reject oversized queries before touching KV
        if (query.length > 1000) {
          await this.track("input_rejected", { tool: "search_wiki", reason: "query_too_long", length: query.length });
          return { content: [{ type: "text" as const, text: "Query too long. Keep it under 1000 characters." }] };
        }
        try {
          const listed = await this.env.ZENO_WIKI.list({ prefix: type ? `${type}/` : undefined });
          const q = query.toLowerCase();
          const matches: string[] = [];
          for (const k of listed.keys) {
            const md = await this.env.ZENO_WIKI.get(k.name);
            if (!md) continue;
            const idx = md.toLowerCase().indexOf(q);
            if (idx === -1) continue;
            const title = extractTitle(md) ?? k.name;
            const start = Math.max(0, idx - 40);
            const excerpt = md.slice(start, idx + query.length + 60).replace(/\n/g, " ").trim();
            matches.push(`[${k.name}] ${title}\n  "...${excerpt}..."`);
          }
          const resultText = matches.length
            ? `${matches.length} result(s) for '${query}':\n\n${matches.map(sanitizeOutput).join("\n\n")}`
            : `No results for '${query}'.`;
          const result = { content: [{ type: "text" as const, text: resultText }] };
          await this.track("tool_called", { tool: "search_wiki", duration_ms: Date.now() - t0, success: true, query, type: type ?? "all", results_count: matches.length });
          return result;
        } catch (err) {
          await this.track("tool_error", { tool: "search_wiki", error: String(err), duration_ms: Date.now() - t0 });
          return { content: [{ type: "text" as const, text: "Search is temporarily unavailable. Please try again in a moment." }] };
        }
      }
    );

    // ── 6. visualize (MCP App) ───────────────────────────────────────────────
    registerAppTool(
      this.server,
      "visualize",
      {
        title: "Wiki Visualizer",
        description: "Renders an interactive diagram in the chat. You must generate valid Mermaid syntax first (flowchart, sequenceDiagram, mindmap, timeline, etc.) based on wiki content, then call this tool. Supports zoom, pan, SVG/PNG export, and opening in Excalidraw.",
        inputSchema: {
          diagram: z.string().describe("Complete Mermaid diagram syntax to render"),
          title: z.string().optional().describe("Short title for the diagram (shown in header)"),
        },
        _meta: { ui: { resourceUri: VISUALIZER_URI } },
      },
      async (args: { diagram: string; title?: string }) => {
        const t0 = Date.now();
        try {
          const { diagram, title } = args;
          this.diagramSyntax = diagram;
          this.diagramTitle = title ?? "Wiki Diagram";
          const result = { content: [{ type: "text" as const, text: `Diagram ready: "${this.diagramTitle}"` }] };
          await this.track("tool_called", { tool: "visualize", duration_ms: Date.now() - t0, success: true, diagram_length: diagram.length, has_title: !!title });
          return result;
        } catch (err) {
          await this.track("tool_error", { tool: "visualize", error: String(err), duration_ms: Date.now() - t0 });
          return { content: [{ type: "text" as const, text: "Unable to render diagram right now. Please try again in a moment." }] };
        }
      }
    );

    // Resource: dynamically built HTML with diagram injected server-side
    registerAppResource(
      this.server,
      VISUALIZER_URI,
      VISUALIZER_URI,
      { mimeType: RESOURCE_MIME_TYPE },
      async () => ({
        contents: [{
          uri: VISUALIZER_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: buildVisualizerHTML(this.diagramSyntax, this.diagramTitle),
        }],
      })
    );
  }
}

// ── Security headers applied to every response ───────────────────────────────
const SECURITY_HEADERS: HeadersInit = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'none'",
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// ── OAuth Provider — wraps the MCP endpoint with Google auth ─────────────────
// Routes:
//   /mcp          → ZenoWikiMCP (requires valid Bearer token from Google OAuth)
//   /authorize    → GoogleHandler (redirects to Google login)
//   /callback     → GoogleHandler (exchanges code, issues MCP token)
//   /token        → handled by OAuthProvider (code → access token exchange)
//   /register     → handled by OAuthProvider (Dynamic Client Registration)
//   /.well-known/ → handled by OAuthProvider (OAuth discovery metadata)
//   /             → GoogleHandler (info page)
const oauthProvider = new OAuthProvider({
  apiRoute: "/mcp",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiHandler: ZenoWikiMCP.serve("/mcp") as any,
  defaultHandler: GoogleHandler,
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
  scopesSupported: ["read"],
  accessTokenTTL: 86400,     // 24 hours
  refreshTokenTTL: 2592000,  // 30 days — stable across long cohort runs
});

// ── Worker fetch handler ──────────────────────────────────────────────────────
// Thin wrapper: body size guard + IP rate limit (secondary, auth is primary gate)
// + security headers on every response.
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // ── Request body size guard ───────────────────────────────────────────────
    const contentLength = parseInt(request.headers.get("Content-Length") ?? "0", 10);
    if (contentLength > 1_048_576) {
      return withSecurityHeaders(new Response(
        JSON.stringify({ error: "Request too large." }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      ));
    }

    // ── Rate limiting — /mcp only, secondary protection behind auth ──────────
    if (url.pathname === "/mcp") {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
      const { success } = await env.MCP_RATE_LIMITER.limit({ key: ip });

      if (!success) {
        ctx.waitUntil(
          fetch("https://us.i.posthog.com/capture/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: env.POSTHOG_API_KEY,
              distinct_id: ip,
              event: "rate_limit_hit",
              properties: { ip, $lib: "zeno-wiki-mcp" },
              timestamp: new Date().toISOString(),
            }),
          }).catch(() => {})
        );

        return withSecurityHeaders(new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
        ));
      }
    }

    const response = await oauthProvider.fetch(request, env, ctx);
    return withSecurityHeaders(response);
  },
};
