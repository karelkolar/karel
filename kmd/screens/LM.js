(function () {
const { Screen, esc } = KMD;

const title = "Last-minute pro členy";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { n: 1, sheet: false };
  }
  renderVals() {
    const st = this.state;
    const qty = [
      { n: 1, label: 'Jen já', price: '90 Kč' },
      { n: 2, label: 'Já + 1', price: '180 Kč' }
    ].map((q) => {
      const on = st.n === q.n;
      return Object.assign({}, q, { pressed: on ? 'true' : 'false', bg: on ? '#0E0E10' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0E0E10', pick: () => this.setState({ n: q.n }) });
    });
    return {
      accent: this.props.accent ?? '#2B3BFF',
      qty,
      total: st.n === 2 ? '180 Kč' : '90 Kč',
      ctaLabel: st.n === 2 ? 'Koupit 2 lístky s kódem' : 'Koupit lístek s kódem',
      sheet: st.sheet,
      go: () => {
        try { if (navigator.clipboard) navigator.clipboard.writeText('YA-K7M4-26').catch(() => {}); } catch (e) {}
        this.setState({ sheet: true });
      },
      close: () => this.setState({ sheet: false })
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; min-height: 1240px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; position: relative">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Vyber" aria-label="Zpět na výběr" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Last-minute</span>
    <span style="width: 48px"></span>
  </header>

  <section style="margin: 0 16px; padding: 22px; border-radius: 8px; background: #0E0E10; color: #FFFFFF; display: flex; flex-direction: column; gap: 16px">
    <span style="display: flex; justify-content: space-between; align-items: center">
      <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #B9C0FF">Jen pro členy · dnes</span>
      <span style="display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; background: ${esc(v.accent)}; font-size: 14px; font-weight: 600">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2.5 2"></path><path d="M9 3h6"></path></svg>
        zbývá 2 h 48 min
      </span>
    </span>
    <span style="display: flex; flex-direction: column; gap: 6px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 34px; line-height: 1.05; letter-spacing: -0.02em">Hamlet v kanceláři</h1>
      <span style="font-size: 16px; color: #D4D4DA">Švandovo divadlo · dnes 19:30</span>
    </span>
    <span style="display: flex; align-items: baseline; gap: 10px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-size: 44px; font-weight: 700; line-height: 1">90 Kč</span>
      <span style="font-size: 15px; color: #B4B4BC; text-decoration: line-through">běžně 390 Kč</span>
    </span>
  </section>

  <dl style="margin: 0; padding: 8px 20px 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 16px">
    <div style="display: flex; flex-direction: column; gap: 4px; padding: 16px 0; border-bottom: 1px solid #E2E2E6">
      <dt style="font-size: 14px; color: #5A5A62">Rezervace do</dt>
      <dd style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700">17:00</dd>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px; padding: 16px 0; border-bottom: 1px solid #E2E2E6">
      <dt style="font-size: 14px; color: #5A5A62">Volná místa</dt>
      <dd style="margin: 0; display: flex; align-items: center; gap: 10px">
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700">4</span>
        <span aria-hidden="true" style="display: flex; gap: 4px">
          <span style="width: 12px; height: 12px; border-radius: 6px 6px 2px 2px; background: ${esc(v.accent)}"></span>
          <span style="width: 12px; height: 12px; border-radius: 6px 6px 2px 2px; background: ${esc(v.accent)}"></span>
          <span style="width: 12px; height: 12px; border-radius: 6px 6px 2px 2px; background: ${esc(v.accent)}"></span>
          <span style="width: 12px; height: 12px; border-radius: 6px 6px 2px 2px; background: ${esc(v.accent)}"></span>
        </span>
      </dd>
    </div>
  </dl>

  <fieldset style="margin: 0; padding: 24px 20px 0; border: 0; display: flex; flex-direction: column; gap: 10px">
    <legend style="padding: 24px 0 10px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Kolik lístků</legend>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
      ${v.qty.map((q) => `
        <button type="button" aria-pressed="${esc(q.pressed)}" ${h('click', q.pick)} style="min-height: 64px; border-radius: 6px; border: 2px solid #0E0E10; background: ${esc(q.bg)}; color: ${esc(q.fg)}; font-family: inherit; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px">
          <span style="font-size: 16px; font-weight: 600">${esc(q.label)}</span>
          <span style="font-size: 14px">${esc(q.price)}</span>
        </button>
      `).join('')}
    </div>
    <span style="font-size: 14px; color: #5A5A62">Maximálně 1 + 1, aby se dostalo na víc lidí.</span>
  </fieldset>

  <section aria-labelledby="pravidla" style="display: flex; flex-direction: column; gap: 12px; padding: 28px 20px 0">
    <h2 id="pravidla" style="margin: 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Jak to funguje</h2>
    <div style="display: flex; gap: 12px; align-items: flex-start">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 15h4"></path><rect x="14" y="9" width="4" height="4"></rect></svg>
      <span style="font-size: 15px; line-height: 1.45"><strong>Nepřenositelné.</strong> U vstupu ukážeš členskou kartu, tvůj doprovod jde s tebou.</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: flex-start">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px"><path d="M4 12a8 8 0 1 0 2.3-5.7"></path><path d="M4 4v4h4"></path></svg>
      <span style="font-size: 15px; line-height: 1.45"><strong>Nakonec nemůžeš?</strong> Zruš to v prodeji divadla. Místo dostane někdo další z klubu.</span>
    </div>
  </section>

  <section aria-labelledby="proc-clenove" style="margin: 28px 16px 0; padding: 16px 18px; border-radius: 8px; background: #F3F3F5; display: flex; flex-direction: column; gap: 6px">
    <h2 id="proc-clenove" style="margin: 0; font-size: 15px; font-weight: 600">Proč to nevidí každý</h2>
    <p style="margin: 0; font-size: 15px; line-height: 1.45; color: #3A3A42">Divadlo nám pouští prázdná místa za pár korun jen proto, že zůstanou mezi námi. Kdyby visela veřejně, nikdo by už nekupoval za plnou cenu – a příště by nám nic nedalo.</p>
  </section>

  <div style="position: sticky; bottom: 0; margin-top: auto; padding: 16px 20px 28px; background: #FFFFFF; border-top: 1px solid #E2E2E6; display: flex; flex-direction: column; gap: 8px">
    <button type="button" ${h('click', v.go)} style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">
      <span>${esc(v.ctaLabel)}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
    </button>
    <span style="text-align: center; font-size: 14px; color: #5A5A62">Lístky prodává divadlo, kód ti zkopírujeme.</span>
  </div>

  ${v.sheet ? `
    <div aria-hidden="true" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: rgba(14,14,16,0.6)"></div>
    <section role="dialog" aria-modal="true" aria-labelledby="lm-prechod" style="position: absolute; left: 0; right: 0; bottom: 0; background: #FFFFFF; border-radius: 16px 16px 0 0; padding: 12px 20px 28px; display: flex; flex-direction: column; gap: 16px">
      <div aria-hidden="true" style="align-self: center; width: 40px; height: 4px; border-radius: 2px; background: #D0D0D6"></div>
      <h2 id="lm-prechod" style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; line-height: 1.1">Přecházíš do prodeje divadla</h2>
      <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Kód jsme zkopírovali. Na webu Švandova divadla ho vlož do pole pro slevový kód – last-minute cena ${esc(v.total)} se ukáže sama. Platí do 17:00.</p>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border: 2px dashed #0E0E10; border-radius: 6px">
        <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px; letter-spacing: 0.06em">YA-K7M4-26</span>
        <span style="display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #0B6E4F">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
          Zkopírováno
        </span>
      </div>
      <a href="#web-divadla" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">
        <span>Pokračovat na web divadla</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
      </a>
      <button type="button" ${h('click', v.close)} style="min-height: 48px; border: 0; background: transparent; font-family: inherit; font-size: 16px; font-weight: 600; color: #0E0E10; text-decoration: underline; text-underline-offset: 4px; cursor: pointer">Zpět</button>
    </section>
  ` : ''}
</div>`;
}

KMD.screens["LM"] = { title, defaults, css, Component, view };
})();
