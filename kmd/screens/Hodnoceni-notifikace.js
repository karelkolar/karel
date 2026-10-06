import { Screen, esc } from "../core.js";

export const title = "Upozornění den po představení";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}
a:focus-visible{outline:3px solid #FFFFFF;outline-offset:3px}`;

export class Component extends Screen {
  renderVals() { return { accent: this.props.accent ?? '#2B3BFF' }; }
}

export function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #1A1A22; color: #FFFFFF; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; padding: 96px 12px 0">
  <span style="font-size: 17px; font-weight: 500; color: #D4D4DA">pátek 9. října</span>
  <span style="font-family: 'Space Grotesk', sans-serif; font-size: 88px; font-weight: 500; line-height: 1; letter-spacing: -0.02em; margin-top: 4px">10:05</span>
  <a href="#/Hodnoceni" style="margin-top: 64px; width: 100%; box-sizing: border-box; padding: 14px 16px 16px; border-radius: 20px; background: #F4F4F6; color: #0E0E10; text-decoration: none; display: flex; flex-direction: column; gap: 6px">
    <span style="display: flex; align-items: center; gap: 10px">
      <span aria-hidden="true" style="width: 28px; height: 28px; border-radius: 7px; background: ${esc(v.accent)}; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700">YA</span>
      <span style="flex-grow: 1; font-size: 14px; font-weight: 600; color: #3A3A42">Klub mladých diváků</span>
      <span style="font-size: 14px; color: #5A5A62">teď</span>
    </span>
    <span style="font-size: 16px; font-weight: 700; line-height: 1.3">Jak bylo na Všichni moji bývalí?</span>
    <span style="font-size: 16px; line-height: 1.4">Jedna otázka, deset vteřin. Pomůže dalším při výběru.</span>
  </a>
</div>`;
}
