import { Screen, esc } from "../core.js";

export const title = "Scénář A – plakát s QR";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#FFFFFF}
a:focus-visible{outline:3px solid #FFFFFF;outline-offset:3px}`;

export class Component extends Screen {
  renderVals() {
    const N = 21;
    let s = 1010;
    const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    const finder = (r, c, R, C) => {
      const y = r - R, x = c - C;
      if (y < -1 || y > 7 || x < -1 || x > 7) return null;
      if (y < 0 || y > 6 || x < 0 || x > 6) return false;
      if (y === 0 || y === 6 || x === 0 || x === 6) return true;
      return y >= 2 && y <= 4 && x >= 2 && x <= 4;
    };
    const cells = [];
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        let v = finder(r, c, 0, 0);
        if (v === null) v = finder(r, c, 0, N - 7);
        if (v === null) v = finder(r, c, N - 7, 0);
        if (v === null) v = rnd() > 0.5;
        cells.push({ bg: v ? '#0E0E10' : '#FFFFFF' });
      }
    }
    return { accent: this.props.accent ?? '#2B3BFF', cells };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: ${esc(v.accent)}; color: #FFFFFF; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 32px 28px 36px">
  <div style="display: flex; flex-direction: column; gap: 2px">
    <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px">Klub mladých diváků</span>
    <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 18px">
    <span style="font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em">Výběr na říjen je venku</span>
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 76px; line-height: 0.92; letter-spacing: -0.035em">Divadlo<br>s někým.</h1>
    <p style="margin: 0; font-size: 18px; line-height: 1.45">8 představení, která za to stojí. Lístky 100–200 Kč. Pro všechny 19–26.</p>
  </div>
  <a href="#/Main" style="display: flex; gap: 18px; align-items: center; text-decoration: none; padding: 14px; border-radius: 10px; background: #FFFFFF; color: #0E0E10">
    <div aria-hidden="true" style="flex-shrink: 0; display: grid; grid-template-columns: repeat(21, minmax(0, 1fr)); width: 105px; height: 105px">
      ${v.cells.map((c) => `
        <div style="background: ${esc(c.bg)}"></div>
      `).join('')}
    </div>
    <span style="display: flex; flex-direction: column; gap: 6px">
      <span style="font-size: 16px; font-weight: 600; line-height: 1.3">Naskenuj, nebo klepni</span>
      <span style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700">kmd.klub</span>
    </span>
  </a>
</div>`;
}
