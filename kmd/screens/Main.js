import { Screen, esc } from "../core.js";

export const title = "Úvod – Klub mladých diváků";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  renderVals() {
    const seats = [];
    for (let i = 0; i < 40; i++) {
      const together = i === 24 || i === 25;
      seats.push({ bg: together ? '#FFFFFF' : 'rgba(255,255,255,0.28)' });
    }
    return { accent: this.props.accent ?? '#2B3BFF', seats };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; overflow: hidden">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; min-height: 64px; box-sizing: border-box">
    <div style="display: flex; flex-direction: column; gap: 2px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </div>
    <a href="#/Karta" style="display: flex; align-items: center; min-height: 44px; padding: 0 4px; font-size: 16px; font-weight: 600; text-decoration: underline; text-underline-offset: 4px">Přihlásit se</a>
  </header>

  <section style="flex-grow: 1; margin: 0 16px; background: ${esc(v.accent)}; color: #FFFFFF; border-radius: 6px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 0">
    <div style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em">Výběr na říjen 2026</div>
    <div style="display: flex; flex-direction: column; gap: 24px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 64px; line-height: 0.95; letter-spacing: -0.03em">Divadlo<br>s někým.</h1>
      <div aria-hidden="true" style="display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 8px; width: 236px">
        ${v.seats.map((seat) => `
          <div style="width: 16px; height: 16px; border-radius: 8px 8px 3px 3px; background: ${esc(seat.bg)}"></div>
        `).join('')}
      </div>
    </div>
    <div style="font-size: 15px; font-weight: 500">8 inscenací · 4 společné večery</div>
  </section>

  <p style="margin: 0; padding: 24px 20px 20px; font-size: 18px; line-height: 1.45">Kurátoři klubu každý měsíc vyberou představení, která stojí za večer, a pomůžou ti na ně vyrazit s kamarády. Pro všechny od 19 do 26 let, lístky za klubovou cenu 100–200 Kč.</p>

  <nav aria-label="Hlavní akce" style="display: flex; flex-direction: column; gap: 12px; padding: 0 20px 28px">
    <a href="#/Vyber" style="display: flex; align-items: center; justify-content: center; min-height: 56px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #0E0E10">Prohlédnout výběr</a>
    <a href="#/Registrace-email" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Stát se členem</a>
    <span style="text-align: center; font-size: 14px; color: #5A5A62">Výběr si prohlédneš i bez registrace.</span>
  </nav>
</div>`;
}
