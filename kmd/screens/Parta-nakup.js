(function () {
const { Screen, esc } = KMD;

const title = "Parta – nákup na jeden kód";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { buyer: 'Ty', reminded: false };
  }
  renderVals() {
    const st = this.state;
    const rows = [
      { name: 'Ty', kind: 'člen', price: 150 },
      { name: 'Jana', kind: 'členka', price: 150 },
      { name: 'Ondra', kind: 'člen', price: 150 },
      { name: 'Bára', kind: 'poprvé s klubem', price: 50 }
    ];
    const buyers = ['Ty', 'Jana', 'Ondra'].map((name) => ({
      name: name === 'Ty' ? 'Já' : name,
      on: st.buyer === name,
      pick: () => this.setState({ buyer: name, reminded: false })
    }));
    const dative = { Jana: 'Janě', Ondra: 'Ondrovi' };
    return {
      accent: this.props.accent ?? '#2B3BFF',
      rows,
      buyers,
      meBuys: st.buyer === 'Ty',
      otherBuys: st.buyer !== 'Ty',
      remindLabel: st.reminded ? 'Odesláno ' + (dative[st.buyer] || '') : 'Poslat ' + (dative[st.buyer] || '') + ' odkaz k nákupu',
      remind: () => this.setState({ reminded: true })
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; min-height: 1160px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Parta" aria-label="Zpět na hlasování" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Parta</span>
    <span style="width: 48px"></span>
  </header>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 24px; padding: 12px 16px 24px">
    <section style="padding: 22px; border-radius: 8px; background: ${esc(v.accent)}; color: #FFFFFF; display: flex; flex-direction: column; gap: 10px">
      <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em">Domluveno</span>
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 32px; line-height: 1.05">so 17. 10. · 19:30</h1>
      <span style="font-size: 16px; line-height: 1.4">Všichni moji bývalí · Divadlo v Dlouhé<br>Sobotní sestava, 4 lidi</span>
    </section>

    <section aria-labelledby="listky" style="display: flex; flex-direction: column; padding: 0 4px">
      <h2 id="listky" style="margin: 0 0 4px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">4 lístky na jeden kód</h2>
      ${v.rows.map((r) => `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 52px; border-bottom: 1px solid #E8E8EC">
          <span style="display: flex; flex-direction: column; gap: 2px">
            <span style="font-size: 16px; font-weight: 600">${esc(r.name)}</span>
            <span style="font-size: 14px; color: #5A5A62">${esc(r.kind)}</span>
          </span>
          <span style="font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700">${esc(r.price)} Kč</span>
        </div>
      `).join('')}
      <div style="display: flex; justify-content: space-between; align-items: baseline; padding-top: 14px">
        <span style="font-size: 16px; font-weight: 600">Celkem</span>
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700">500 Kč</span>
      </div>
      <span style="padding-top: 4px; font-size: 14px; color: #5A5A62">Místa vedle sebe, jeden nákup. Běžně by to stálo 1 680 Kč.</span>
    </section>

    <fieldset style="margin: 0; padding: 0 4px; border: 0; display: flex; flex-direction: column">
      <legend style="padding: 0 0 4px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Kdo nakoupí</legend>
      ${v.buyers.map((b) => `
        <label style="display: flex; gap: 14px; align-items: center; min-height: 52px; border-bottom: 1px solid #E8E8EC; cursor: pointer">
          <input type="radio" name="kupec" ${b.on ? 'checked' : ''} ${h('change', b.pick)} style="width: 22px; height: 22px; margin: 0; flex-shrink: 0; accent-color: ${esc(v.accent)}">
          <span style="font-size: 16px; font-weight: 600">${esc(b.name)}</span>
        </label>
      `).join('')}
      <span style="padding-top: 8px; font-size: 14px; line-height: 1.4; color: #5A5A62">Nakupovat může jen člen. Peníze si vyrovnáte mezi sebou, klub do toho nevstupuje.</span>
    </fieldset>
  </main>

  <div style="padding: 0 20px 28px; display: flex; flex-direction: column; gap: 10px">
    ${v.meBuys ? `
      <a href="#/Prechod" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">
        <span>Koupit 4 lístky s kódem</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
      </a>
    ` : ''}
    ${v.otherBuys ? `
      <button type="button" ${h('click', v.remind)} style="min-height: 56px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">${esc(v.remindLabel)}</button>
    ` : ''}
    <span style="text-align: center; font-size: 14px; color: #5A5A62">Bára jde poprvé, u vstupu ukáže doklad.</span>
  </div>
</div>`;
}

KMD.screens["Parta-nakup"] = { title, defaults, css, Component, view };
})();
