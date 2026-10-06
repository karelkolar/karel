/*
 * Klub mladých diváků — runtime aplikace.
 *
 * Obrazovky jsou v screens/*.dc.html přesně tak, jak vznikly v designu:
 * jedna šablona (<x-dc>) a malá třída Component se stavem. Tenhle soubor
 * je vykreslí do DOM, drží mezi nimi hashové routování (#/Vyber) a sdílí
 * stav členství. Žádné závislosti, žádný build.
 */

const mount = document.getElementById("app");
const SESSION_KEY = "kmd.member";

// --- sdílený stav členství (Karta = přihlášený člen) ----------------------

const session = {
  get member() {
    try { return localStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; }
  },
  set member(v) {
    try { localStorage.setItem(SESSION_KEY, v ? "1" : "0"); } catch (e) { /* bez úložiště jedeme dál */ }
  },
};

// --- základ pro Component z .dc.html --------------------------------------

class DCLogic {
  constructor(props) {
    this.props = props;
    this.state = {};
    this._render = null;
  }
  setState(patch) {
    this.state = Object.assign({}, this.state, patch);
    if (this._render) this._render();
  }
}

// --- vyhodnocení {{ děr }} -------------------------------------------------

const HOLE = /\{\{\s*([\w.]+)\s*\}\}/g;
const WHOLE_HOLE = /^\s*\{\{\s*([\w.]+)\s*\}\}\s*$/;

function lookup(path, ctx) {
  let v = ctx;
  for (const key of path.split(".")) {
    if (v == null) return undefined;
    v = v[key];
  }
  return v;
}

function evalAttr(raw, ctx) {
  const whole = WHOLE_HOLE.exec(raw);
  if (whole) return lookup(whole[1], ctx);
  return raw.replace(HOLE, (_, p) => {
    const v = lookup(p, ctx);
    return v == null ? "" : String(v);
  });
}

function evalText(raw, ctx) {
  return raw.replace(HOLE, (_, p) => {
    const v = lookup(p, ctx);
    return v == null ? "" : String(v);
  });
}

// --- vykreslení šablony do DOM --------------------------------------------

const ROUTE_LINK = /^([A-Za-z0-9-]+)\.dc\.html$/;

function setAttr(el, name, raw, ctx) {
  const val = evalAttr(raw, ctx);

  // HTML parser lowercases attribute names: onClick -> onclick.
  if (/^on[a-z]+$/.test(name)) {
    if (typeof val !== "function") return;
    let type = name.slice(2);
    if (type === "change") {
      const choice = el.localName === "select" || (el.localName === "input" && /^(checkbox|radio)$/.test(el.type));
      type = choice ? "change" : "input";
    }
    el.addEventListener(type, val);
    return;
  }

  if (name === "value" && /^(input|textarea|select)$/.test(el.localName)) {
    el.value = val == null ? "" : String(val);
    return;
  }
  if (name === "checked") {
    el.checked = !!val && val !== "false";
    return;
  }
  if (val === false || val == null) return;

  if (name === "href" && typeof val === "string") {
    const m = ROUTE_LINK.exec(val);
    el.setAttribute(name, m ? "#/" + m[1] : val);
    return;
  }
  el.setAttribute(name, val === true ? "" : String(val));
}

function renderNodes(nodes, ctx, parent) {
  for (const n of nodes) {
    if (n.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(evalText(n.data, ctx)));
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      renderElement(n, ctx, parent);
    }
  }
}

function renderElement(n, ctx, parent) {
  if (n.localName === "template" && n.dataset.sc === "if") {
    if (evalAttr(n.getAttribute("value") || "", ctx)) renderNodes(n.content.childNodes, ctx, parent);
    return;
  }
  if (n.localName === "template" && n.dataset.sc === "for") {
    const list = evalAttr(n.getAttribute("list") || "", ctx) || [];
    const as = n.getAttribute("as");
    for (const item of list) {
      const scope = Object.create(ctx);
      scope[as] = item;
      renderNodes(n.content.childNodes, scope, parent);
    }
    return;
  }

  const el = document.createElementNS(n.namespaceURI, n.localName);
  for (const a of n.attributes) setAttr(el, a.name, a.value, ctx);
  const kids = n.localName === "template" ? n.content.childNodes : n.childNodes;
  renderNodes(kids, ctx, el);
  parent.appendChild(el);
}

// --- načtení obrazovky -----------------------------------------------------

const cache = new Map();

async function loadScreen(name) {
  if (cache.has(name)) return cache.get(name);
  const res = await fetch("screens/" + name + ".dc.html");
  if (!res.ok) throw new Error("screen " + name + ": " + res.status);
  // <sc-if>/<sc-for> by parser uvnitř <table> vyhodil ven, <template> ne.
  const src = (await res.text())
    .replace(/<sc-(if|for)\b/g, '<template data-sc="$1"')
    .replace(/<\/sc-(if|for)>/g, "</template>");
  const doc = new DOMParser().parseFromString(src, "text/html");

  const script = doc.querySelector("script[data-dc-script]");
  const defaults = {};
  const decl = JSON.parse(script.dataset.props || "{}");
  for (const [k, v] of Object.entries(decl)) {
    if (v && typeof v === "object" && "default" in v) defaults[k] = v.default;
  }
  const Component = new Function("DCLogic", script.textContent + "\nreturn Component;")(DCLogic);

  const xdc = doc.querySelector("x-dc");
  const helmet = xdc.querySelector("helmet");
  const head = helmet
    ? { links: [...helmet.querySelectorAll("link")].map((l) => l.getAttribute("href")), css: [...helmet.querySelectorAll("style")].map((s) => s.textContent).join("\n") }
    : { links: [], css: "" };
  if (helmet) helmet.remove();

  const screen = { title: doc.title, defaults, Component, head, template: xdc };
  cache.set(name, screen);
  return screen;
}

function applyHead(head) {
  for (const href of head.links) {
    if (document.head.querySelector('link[href="' + href + '"]')) continue;
    const l = document.createElement("link");
    l.rel = href.includes("fonts.gstatic") || href === "https://fonts.googleapis.com" ? "preconnect" : "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }
  let style = document.getElementById("screen-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "screen-style";
    document.head.appendChild(style);
  }
  style.textContent = head.css;
}

// Pevné rozměry z plátna (390 × 844) se v telefonu stávají plnou obrazovkou.
function fitRoot(root, fill) {
  if (!root || fill) return;
  const s = root.style;
  if (s.width === "390px") {
    s.width = "100%";
    s.maxWidth = "390px";
    s.marginLeft = s.marginRight = "auto";
  }
  if (s.height.endsWith("px") || s.minHeight.endsWith("px")) {
    s.height = "auto";
    s.minHeight = "100vh";
    s.minHeight = "100dvh";
    s.overflow = "visible";
  }
}

// --- routování -------------------------------------------------------------

let manifest = null;
let seq = 0;

function parseHash() {
  const [name, qs] = location.hash.replace(/^#\/?/, "").split("?");
  const query = {};
  for (const [k, v] of new URLSearchParams(qs || "")) query[k] = v === "true" || v === "1" ? true : v === "false" || v === "0" ? false : v;
  return { name: name || "Main", query };
}

async function route() {
  const mine = ++seq;
  const { name, query } = parseHash();
  if (name === "prehled") return showOverview();

  let screen;
  try {
    screen = await loadScreen(name);
  } catch (e) {
    return showMessage("Tahle obrazovka neexistuje.");
  }
  if (mine !== seq) return;

  if (name === "Karta") session.member = true; // karta je vidět jen členům

  const info = (manifest && manifest.screens[name]) || { fill: false };
  document.title = screen.title;
  document.body.classList.toggle("fill", info.fill);
  applyHead(screen.head);

  const props = Object.assign({}, screen.defaults, query);
  if ("clen" in screen.defaults) props.clen = "clen" in query ? query.clen : session.member;
  const inst = new screen.Component(props);

  const draw = () => {
    const keep = captureFocus();
    const host = document.createElement("div");
    host.style.display = "contents";
    const root = document.createDocumentFragment();
    renderNodes(screen.template.childNodes, inst.renderVals(), root);
    fitRoot(root.firstElementChild, info.fill);
    host.appendChild(root);
    mount.replaceChildren(host);
    restoreFocus(keep);
  };
  inst._render = draw;
  draw();
  window.scrollTo(0, 0);
}

function captureFocus() {
  const a = document.activeElement;
  if (!a || !mount.contains(a)) return null;
  return { index: [...mount.querySelectorAll("*")].indexOf(a), start: a.selectionStart, end: a.selectionEnd };
}

function restoreFocus(keep) {
  if (!keep || keep.index < 0) return;
  const el = mount.querySelectorAll("*")[keep.index];
  if (!el || typeof el.focus !== "function") return;
  el.focus({ preventScroll: true });
  try { if (keep.start != null) el.setSelectionRange(keep.start, keep.end); } catch (e) { /* checkbox apod. */ }
}

// --- přehled obrazovek -----------------------------------------------------

function showMessage(text) {
  document.title = manifest.title;
  document.body.classList.remove("fill");
  const p = document.createElement("p");
  p.className = "note";
  p.textContent = text + " ";
  const a = document.createElement("a");
  a.href = "#/Main";
  a.textContent = "Zpět na úvod";
  p.appendChild(a);
  mount.replaceChildren(p);
}

function el(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, v);
  e.append(...kids);
  return e;
}

function showOverview() {
  document.title = "Přehled obrazovek – " + manifest.title;
  document.body.classList.remove("fill");
  const wrap = el("main", { class: "overview" }, el("h1", {}, manifest.title));
  wrap.append(el("p", {}, "Všechny obrazovky aplikace. Běžný vstup je ", el("a", { href: "#/Main" }, "úvod"), "; níže jsou i vstupy do obou testovacích scénářů."));

  const sc = el("section", {}, el("h2", {}, "Testovací scénáře"));
  for (const s of manifest.scenarios) {
    sc.append(el("h3", {}, s.title), el("ol", {}, ...s.steps.map((t) => el("li", {}, t.replace(/^\d+\.\s*/, "")))), el("p", {}, el("a", { href: "#/" + s.entry }, "Spustit scénář")));
  }
  wrap.append(sc);

  const groups = new Map();
  for (const [name, info] of Object.entries(manifest.screens)) {
    if (!groups.has(info.group)) groups.set(info.group, []);
    groups.get(info.group).push(el("li", {}, el("a", { href: "#/" + name }, info.title)));
  }
  for (const [g, items] of groups) wrap.append(el("section", {}, el("h2", {}, g), el("ul", {}, ...items)));

  const reset = el("button", { type: "button" }, "Odhlásit (zrušit členství v tomto prohlížeči)");
  reset.addEventListener("click", () => { session.member = false; reset.textContent = "Hotovo"; });
  wrap.append(el("section", {}, reset));
  mount.replaceChildren(wrap);
  window.scrollTo(0, 0);
}

// --- start -----------------------------------------------------------------

document.addEventListener("click", (e) => {
  const a = e.target.closest && e.target.closest("a[href^='#']");
  // Kotvy bez routy (#zasady, #recenze-jinde…) v prototypu nikam nevedou.
  if (a && !a.getAttribute("href").startsWith("#/")) e.preventDefault();
});
window.addEventListener("hashchange", route);

fetch("screens.json")
  .then((r) => r.json())
  .then((m) => { manifest = m; route(); });
