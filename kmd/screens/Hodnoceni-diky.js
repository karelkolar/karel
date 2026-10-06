import { Screen, esc } from "../core.js";

export const title = "Díky za hodnocení";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  renderVals() {
    return { accent: this.props.accent ?? '#2B3BFF' };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; overflow: hidden">
  <header style="display: flex; align-items: center; justify-content: flex-end; padding: 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Vyber" aria-label="Zavřít" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
    </a>
  </header>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 28px; padding: 8px 20px 0">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 44px; line-height: 1; letter-spacing: -0.03em">Díky.</h1>
      <p style="margin: 0; font-size: 18px; line-height: 1.45">Tvoje odpověď se přidá k ostatním. Podle nich kurátoři skládají další výběr a ostatní vidí, jestli se tam vyplatí jít.</p>
    </div>

    <section aria-labelledby="dalsi" style="padding: 20px; border-radius: 8px; background: ${esc(v.accent)}; color: #FFFFFF; display: flex; flex-direction: column; gap: 14px">
      <span id="dalsi" style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em">Další společný večer</span>
      <span style="display: flex; flex-direction: column; gap: 4px">
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; line-height: 1.1">Tma pod hladinou</span>
        <span style="font-size: 15px; line-height: 1.4">so 10. 10. · 20:00 · Studio Ypsilon<br>Vede Nela P. · potom posezení poblíž</span>
      </span>
      <span style="font-size: 15px">7 přihlášených · zbývá 5 míst</span>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
        <a href="#/Vecery" style="display: flex; align-items: center; justify-content: center; min-height: 52px; border-radius: 6px; background: #FFFFFF; color: #0E0E10; font-size: 16px; font-weight: 600; text-decoration: none">Přijdu</a>
        <a href="#/Vecery" style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 52px; border-radius: 6px; border: 2px solid #FFFFFF; color: #FFFFFF; font-size: 15px; font-weight: 600; text-decoration: none">Přijdu s kamarádem</a>
      </div>
    </section>

    <a href="#/Vecery" style="display: flex; align-items: center; min-height: 44px; font-size: 16px; font-weight: 600; text-underline-offset: 4px">Všechny společné večery</a>
  </main>
</div>`;
}
