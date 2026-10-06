(function () {
const { Screen, esc } = KMD;

const title = "Last-minute – skončila nebo dnes nic";
const defaults = {"stav":"Skončila","accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { notif: false };
  }
  renderVals() {
    const stav = this.props.stav ?? 'Skončila';
    return {
      accent: this.props.accent ?? '#2B3BFF',
      ended: stav === 'Skončila',
      none: stav !== 'Skončila',
      notif: this.state.notif,
      toggle: () => this.setState({ notif: !this.state.notif })
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; overflow: hidden">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Vyber" aria-label="Zpět na výběr" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Last-minute</span>
    <span style="width: 48px"></span>
  </header>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 24px; padding: 8px 16px 0">
    ${v.ended ? `
      <section style="padding: 22px; border-radius: 8px; border: 1px solid #D9D9DE; display: flex; flex-direction: column; gap: 12px">
        <span style="align-self: flex-start; padding: 4px 10px; border-radius: 999px; background: #F3F3F5; font-size: 14px; font-weight: 600; color: #3A3A42">Skončilo v 15:26</span>
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #5A5A62; text-decoration: line-through">Hamlet v kanceláři · 90 Kč</span>
        <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 30px; line-height: 1.1">Tentokrát byli rychlejší jiní</h1>
        <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Všechna 4 místa jsou pryč. Last-minute se objevuje zhruba párkrát za měsíc, většinou odpoledne v den představení.</p>
      </section>
    ` : ''}
    ${v.none ? `
      <section style="padding: 22px; border-radius: 8px; background: #F3F3F5; display: flex; flex-direction: column; gap: 12px">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"></path></svg>
        <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 30px; line-height: 1.1">Dnes se nic neuvolnilo</h1>
        <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Last-minute se objevuje zhruba párkrát za měsíc, většinou odpoledne v den představení. Až něco bude, dáme ti vědět.</p>
      </section>
    ` : ''}

    <label for="notif" style="display: flex; gap: 14px; align-items: center; justify-content: space-between; padding: 16px 4px; border-top: 1px solid #E2E2E6; border-bottom: 1px solid #E2E2E6; cursor: pointer">
      <span style="display: flex; flex-direction: column; gap: 4px">
        <span style="font-size: 16px; font-weight: 600">Upozornit mě v telefonu</span>
        <span style="font-size: 14px; line-height: 1.4; color: #5A5A62">Jen když se něco uvolní. Nic jiného ti tudy posílat nebudeme.</span>
      </span>
      <input id="notif" type="checkbox" role="switch" ${v.notif ? 'checked' : ''} ${h('change', v.toggle)} style="width: 28px; height: 28px; margin: 0; flex-shrink: 0; accent-color: ${esc(v.accent)}">
    </label>

    <a href="#/Vecery" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; border-radius: 8px; border: 1.5px solid ${esc(v.accent)}; text-decoration: none">
      <span style="display: flex; flex-direction: column; gap: 2px">
        <span style="font-size: 16px; font-weight: 600">Mezitím: společný večer ve čtvrtek</span>
        <span style="font-size: 14px; color: #3A3A42">Všichni moji bývalí · 150 Kč · 4 volná místa</span>
      </span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </a>
  </main>

  <div style="padding: 0 20px 28px">
    <a href="#/Vyber" style="display: flex; align-items: center; justify-content: center; min-height: 56px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #0E0E10">Projít výběr na říjen</a>
  </div>
</div>`;
}

KMD.screens["LM-konec"] = { title, defaults, css, Component, view };
})();
