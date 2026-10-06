import { Screen, esc } from "../core.js";

export const title = "Hodnocení po představení";
export const defaults = {};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,textarea:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { pick: null, text: '', pub: false };
  }
  renderVals() {
    const st = this.state;
    const opts = ['Ano', 'Spíš ano', 'Spíš ne', 'Ne'].map((label) => {
      const on = st.pick === label;
      return { label, pressed: on ? 'true' : 'false', bg: on ? '#0E0E10' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0E0E10', pick: () => this.setState({ pick: label }) };
    });
    return {
      opts,
      text: st.text,
      onText: (e) => this.setState({ text: e.target.value }),
      left: (140 - st.text.length) + ' znaků',
      pub: st.pub,
      togglePub: () => this.setState({ pub: !st.pub }),
      ok: !!st.pick,
      notOk: !st.pick
    };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; overflow: hidden">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px 8px 8px 20px; min-height: 64px; box-sizing: border-box">
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Včera v divadle</span>
    <a href="#/Vyber" aria-label="Zavřít" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
    </a>
  </header>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 24px; padding: 8px 20px 0">
    <div style="display: flex; flex-direction: column; gap: 6px">
      <span style="font-size: 15px; color: #3A3A42">Všichni moji bývalí · Divadlo v Dlouhé</span>
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 32px; line-height: 1.08; letter-spacing: -0.02em">Doporučil/a bys to kamarádovi?</h1>
    </div>

    <fieldset style="margin: 0; padding: 0; border: 0">
      <legend style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)">Doporučení</legend>
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
        ${v.opts.map((o) => `
          <button type="button" aria-pressed="${esc(o.pressed)}" ${h('click', o.pick)} style="min-height: 64px; border-radius: 6px; border: 2px solid #0E0E10; background: ${esc(o.bg)}; color: ${esc(o.fg)}; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">${esc(o.label)}</button>
        `).join('')}
      </div>
    </fieldset>

    <div style="display: flex; flex-direction: column; gap: 8px">
      <label for="veta" style="font-size: 15px; font-weight: 600">Jedna věta <span style="font-weight: 400; color: #5A5A62">(nepovinné)</span></label>
      <textarea id="veta" rows="3" maxlength="140" ${h('change', v.onText)} placeholder="Co bys kamarádovi řekl/a?" style="box-sizing: border-box; padding: 12px 16px; font-size: 17px; line-height: 1.4; font-family: inherit; color: #0E0E10; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF; resize: none">${esc(v.text)}</textarea>
      <span style="text-align: right; font-size: 14px; color: #5A5A62">${esc(v.left)}</span>
      <label for="zverejnit" style="display: flex; gap: 12px; align-items: center; min-height: 48px; cursor: pointer">
        <input id="zverejnit" type="checkbox" ${v.pub ? 'checked' : ''} ${h('change', v.togglePub)} style="width: 24px; height: 24px; margin: 0; flex-shrink: 0; accent-color: #2B3BFF">
        <span style="font-size: 15px; line-height: 1.4">Větu můžete ukázat u představení, bez mého jména</span>
      </label>
    </div>
  </main>

  <div style="padding: 0 20px 28px; display: flex; flex-direction: column; gap: 6px">
    ${v.ok ? `
      <a href="#/Hodnoceni-diky" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Odeslat</a>
    ` : ''}
    ${v.notOk ? `
      <span aria-disabled="true" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #E6E6EA; border-radius: 6px; font-size: 17px; font-weight: 600; color: #5A5A62">Odeslat</span>
    ` : ''}
    <a href="#/Vyber" style="display: flex; align-items: center; justify-content: center; min-height: 48px; font-size: 16px; font-weight: 600; text-underline-offset: 4px">Teď ne</a>
  </div>
</div>`;
}
