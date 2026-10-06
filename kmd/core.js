// Společný základ obrazovek: stav, escapování a registr událostí.

export class Screen {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.onChange = null; // nastaví router, volá se po každé změně stavu
  }
  setState(patch) {
    this.state = Object.assign({}, this.state, patch);
    if (this.onChange) this.onChange();
  }
}

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function esc(value) {
  return value == null ? "" : String(value).replace(/[&<>"']/g, (c) => ESC[c]);
}

// Obsluha událostí se do HTML řetězce nedá vložit, proto se ukládá do pole
// a do značky se píše jen její číslo: data-on-click="3". Poslouchá se až
// na kořenovém prvku (viz app.js).
export function createHandlers() {
  const list = [];
  return {
    list,
    attach(type, fn) {
      if (typeof fn !== "function") return "";
      list.push(fn);
      return `data-on-${type}="${list.length - 1}"`;
    },
  };
}
