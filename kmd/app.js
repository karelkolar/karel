// Router, sdílený stav členství a vykreslení obrazovek.
import { createHandlers } from "./core.js";

const mount = document.getElementById("app");
const SESSION_KEY = "kmd.member";

const session = {
  get member() {
    try { return localStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; }
  },
  set member(v) {
    try { localStorage.setItem(SESSION_KEY, v ? "1" : "0"); } catch (e) { /* bez úložiště jedeme dál */ }
  },
};

let manifest = null;
let handlers = [];
let seq = 0;

// --- obsluha událostí (delegovaná na #app) --------------------------------

function call(type, e, target) {
  const el = (target || e.target).closest(`[data-on-${type}]`);
  const fn = el && handlers[Number(el.getAttribute(`data-on-${type}`))];
  if (fn) fn(e);
}

const isChoice = (el) => el.tagName === "SELECT" || (el.tagName === "INPUT" && /^(checkbox|radio)$/.test(el.type));

mount.addEventListener("click", (e) => call("click", e));
mount.addEventListener("input", (e) => { if (!isChoice(e.target)) call("change", e); });
mount.addEventListener("change", (e) => { if (isChoice(e.target)) call("change", e); });
mount.addEventListener("focusin", (e) => call("focus", e));
// mouseenter/leave nebublají, proto se skládají z over/out
mount.addEventListener("mouseover", (e) => {
  const el = e.target.closest("[data-on-mouseenter]");
  if (el && !el.contains(e.relatedTarget)) call("mouseenter", e, el);
});
mount.addEventListener("mouseout", (e) => {
  const el = e.target.closest("[data-on-mouseleave]");
  if (el && !el.contains(e.relatedTarget)) call("mouseleave", e, el);
});

// Kotvy bez routy (#zasady, #recenze-jinde…) v prototypu nikam nevedou.
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (a && !a.getAttribute("href").startsWith("#/")) e.preventDefault();
});

// --- vykreslení ------------------------------------------------------------

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

function setScreenCss(css) {
  let style = document.getElementById("screen-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "screen-style";
    document.head.appendChild(style);
  }
  style.textContent = css;
}

// --- routování -------------------------------------------------------------

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

  let mod;
  try {
    mod = await import("./screens/" + name + ".js");
  } catch (e) {
    return showMessage("Tahle obrazovka neexistuje.");
  }
  if (mine !== seq) return;

  if (name === "Karta") session.member = true; // karta je vidět jen členům

  const fill = !!(manifest.screens[name] && manifest.screens[name].fill);
  document.title = mod.title;
  document.body.classList.toggle("fill", fill);
  setScreenCss(mod.css);

  const props = Object.assign({}, mod.defaults, query);
  if ("clen" in mod.defaults) props.clen = "clen" in query ? query.clen : session.member;
  const screen = new mod.Component(props);

  const draw = () => {
    const keep = captureFocus();
    const h = createHandlers();
    mount.innerHTML = mod.view(screen.renderVals(), h.attach);
    handlers = h.list;
    fitRoot(mount.firstElementChild, fill);
    restoreFocus(keep);
  };
  screen.onChange = draw;
  draw();
  window.scrollTo(0, 0);
}

// --- přehled obrazovek -----------------------------------------------------

function showMessage(text) {
  document.title = manifest.title;
  document.body.classList.remove("fill");
  mount.innerHTML = '<p class="note"></p>';
  const p = mount.firstChild;
  p.textContent = text + " ";
  const a = document.createElement("a");
  a.href = "#/Main";
  a.textContent = "Zpět na úvod";
  p.appendChild(a);
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

window.addEventListener("hashchange", route);
fetch("screens.json")
  .then((r) => r.json())
  .then((m) => { manifest = m; route(); });
