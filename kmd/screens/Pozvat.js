import { Screen, esc } from "../core.js";

export const title = "Pozvat kamaráda";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { date: 'čt 8. 10.', nick: 'Kuba', copied: false, sent: false };
  }
  renderVals() {
    const st = this.state;
    const dates = ['čt 8. 10.', 'so 17. 10.', 'pá 30. 10.'].map((label) => {
      const on = st.date === label;
      return { label, pressed: on ? 'true' : 'false', bg: on ? '#0E0E10' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0E0E10', pick: () => this.setState({ date: label }) };
    });
    return {
      accent: this.props.accent ?? '#2B3BFF',
      dates,
      nick: st.nick,
      onNick: (e) => this.setState({ nick: e.target.value }),
      copyLabel: st.copied ? 'Zkopírováno' : 'Kopírovat',
      copy: () => {
        try { if (navigator.clipboard) navigator.clipboard.writeText('kmd.klub/p/7XQ2').catch(() => {}); } catch (e) {}
        this.setState({ copied: true, sent: true });
      },
      sent: st.sent,
      share: () => {
        try { if (navigator.share) navigator.share({ title: 'Jdeš se mnou do divadla?', url: 'https://kmd.klub/p/7XQ2' }).catch(() => {}); } catch (e) {}
        this.setState({ sent: true });
      }
    };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; min-height: 1180px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Detail" aria-label="Zpět na detail představení" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Pozvat kamaráda</span>
    <span style="width: 48px"></span>
  </header>

  <main style="display: flex; flex-direction: column; gap: 28px; padding: 12px 20px 32px">
    <div style="display: flex; flex-direction: column; gap: 8px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 34px; line-height: 1.05; letter-spacing: -0.02em">Vezmi někoho s sebou</h1>
      <p style="margin: 0; font-size: 17px; line-height: 1.45; color: #3A3A42">Odkaz otevře kdokoli, i bez členství a bez aplikace.</p>
    </div>

    <div style="display: flex; gap: 14px; align-items: center; padding: 14px; border: 1px solid #D9D9DE; border-radius: 8px">
      <div aria-hidden="true" style="flex-shrink: 0; width: 64px; height: 64px; border-radius: 6px; background: #E9E9EE"></div>
      <div style="display: flex; flex-direction: column; gap: 2px">
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 19px; font-weight: 700">Všichni moji bývalí</span>
        <span style="font-size: 14px; color: #3A3A42">Divadlo v Dlouhé · k smíchu</span>
      </div>
    </div>

    <div role="group" aria-labelledby="termin" style="display: flex; flex-direction: column; gap: 10px">
      <span id="termin" style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Na který termín</span>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        ${v.dates.map((d) => `
          <button type="button" aria-pressed="${esc(d.pressed)}" ${h('click', d.pick)} style="min-height: 48px; padding: 0 16px; border-radius: 24px; border: 1.5px solid #0E0E10; background: ${esc(d.bg)}; color: ${esc(d.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer">${esc(d.label)}</button>
        `).join('')}
      </div>
    </div>

    <section aria-labelledby="co-dostane" style="display: flex; flex-direction: column; gap: 0; border-radius: 8px; background: #F3F3F5; padding: 6px 16px">
      <h2 id="co-dostane" style="margin: 10px 0 4px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Co kamarád dostane</h2>
      <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 12px 0; border-bottom: 1px solid #DDDDE2">
        <span style="font-size: 15px; line-height: 1.4">Doprovodnou vstupenku za členskou cenu</span>
        <span style="flex-shrink: 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700">150 Kč</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 12px 0">
        <span style="display: flex; flex-direction: column; gap: 2px">
          <span style="font-size: 15px; line-height: 1.4">Jde s klubem poprvé?</span>
          <span style="font-size: 14px; color: #5A5A62">První návštěva za symbolickou cenu</span>
        </span>
        <span style="flex-shrink: 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: ${esc(v.accent)}">50 Kč</span>
      </div>
    </section>

    <div style="display: flex; flex-direction: column; gap: 8px">
      <label for="podpis" style="font-size: 15px; font-weight: 600">Pod jakým jménem tě kamarád pozná</label>
      <input id="podpis" type="text" value="${esc(v.nick)}" ${h('change', v.onNick)} placeholder="Přezdívka" style="height: 52px; box-sizing: border-box; padding: 0 16px; font-size: 17px; font-family: inherit; color: #0E0E10; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF">
      <span style="font-size: 14px; color: #5A5A62">Ukáže se jen v téhle pozvánce. Do profilu ho neukládáme.</span>
    </div>

    <div style="display: flex; flex-direction: column; gap: 10px">
      <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Tvůj odkaz</span>
      <div style="display: flex; gap: 8px">
        <div style="flex-grow: 1; display: flex; align-items: center; min-height: 52px; padding: 0 14px; border: 2px dashed #0E0E10; border-radius: 6px; font-size: 16px; font-weight: 600; overflow: hidden; white-space: nowrap">kmd.klub/p/7XQ2</div>
        <button type="button" ${h('click', v.copy)} style="min-width: 112px; min-height: 52px; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer">${esc(v.copyLabel)}</button>
      </div>
      <button type="button" ${h('click', v.share)} style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"></path><path d="M7 8l5-5 5 5"></path><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"></path></svg>
        <span>Poslat odkaz</span>
      </button>
      <a href="#/Pozvanka" style="display: flex; align-items: center; justify-content: center; min-height: 48px; font-size: 16px; font-weight: 600; text-decoration: underline; text-underline-offset: 4px">Jak pozvánka vypadá</a>
      ${v.sent ? `
        <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; border-radius: 8px; background: #E7F5EE">
          <span style="display: flex; gap: 10px; align-items: center; font-size: 15px; font-weight: 600; color: #0B4D37">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
            Odkaz je venku. Dáme ti vědět, až kamarád odpoví.
          </span>
          <a href="#/Prechod" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">
            <span>Koupit 2 lístky s kódem</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
          </a>
          <span style="font-size: 14px; line-height: 1.4; color: #3A3A42">Lístek pro kamaráda koupíš na svůj kód spolu se svým.</span>
        </div>
      ` : ''}
    </div>

    <a href="#/Parta-nova" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; border-radius: 8px; border: 1.5px solid ${esc(v.accent)}; text-decoration: none">
      <span style="display: flex; flex-direction: column; gap: 2px">
        <span style="font-size: 16px; font-weight: 600">Jde vás víc? Založ partu</span>
        <span style="font-size: 14px; color: #3A3A42">2–6 lidí, hlasování o termínu, jeden nákup</span>
      </span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </a>
  </main>
</div>`;
}
