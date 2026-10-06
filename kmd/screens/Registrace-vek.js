(function () {
const { Screen, esc } = KMD;

const title = "Registrace 2/3 – rok narození";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { year: '', gender: null, psc: '' };
  }
  renderVals() {
    const year = this.state.year;
    const complete = /^\d{4}$/.test(year);
    const age = complete ? 2026 - parseInt(year, 10) : null;
    const ok = complete && age >= 19 && age <= 26;
    return {
      accent: this.props.accent ?? '#2B3BFF',
      year,
      ok,
      notOk: !ok,
      young: complete && age < 19,
      old: complete && age > 26,
      onYear: (e) => this.setState({ year: e.target.value.replace(/\D/g, '').slice(0, 4) }),
      genders: ['Žena', 'Muž', 'Jinak', 'Nechci uvést'].map((label) => {
        const on = this.state.gender === label;
        return { label, pressed: on ? 'true' : 'false', bg: on ? '#0E0E10' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0E0E10', pick: () => this.setState({ gender: on ? null : label }) };
      }),
      psc: this.state.psc,
      onPsc: (e) => this.setState({ psc: e.target.value.replace(/[^\d ]/g, '').slice(0, 6) }),
      pscNote: (() => {
        const d = this.state.psc.replace(/\D/g, '');
        if (d.length < 5) return 'Uložíme jen městskou část nebo obec, samotné PSČ ne.';
        const map = { '110': 'Praha 1', '120': 'Praha 2', '130': 'Praha 3', '140': 'Praha 4', '150': 'Praha 5', '160': 'Praha 6', '170': 'Praha 7', '180': 'Praha 8', '190': 'Praha 9', '100': 'Praha 10' };
        const area = map[d.slice(0, 3)] || (d[0] === '1' ? 'Praha' : 'obec mimo Prahu');
        return 'Uložíme jen: ' + area + '. PSČ zahodíme.';
      })()
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; min-height: 1080px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 0 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Registrace-email" aria-label="Zpět na e-mail" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Krok 2 ze 3</span>
  </header>
  <div aria-hidden="true" style="display: flex; gap: 6px; padding: 8px 20px 0">
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: ${esc(v.accent)}"></div>
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: ${esc(v.accent)}"></div>
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: #E2E2E6"></div>
  </div>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 28px; padding: 40px 20px 0">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 36px; line-height: 1.05; letter-spacing: -0.02em">Tvůj rok narození</h1>
      <p style="margin: 0; font-size: 17px; line-height: 1.45; color: #3A3A42">Klub je pro všechny od 19 do 26 let. Studovat nemusíš.</p>
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px">
      <label for="rok" style="font-size: 15px; font-weight: 600">Rok narození</label>
      <input id="rok" type="text" inputmode="numeric" maxlength="4" autocomplete="bday-year" placeholder="např. 2003" value="${esc(v.year)}" ${h('change', v.onYear)} style="height: 64px; box-sizing: border-box; padding: 0 16px; font-size: 28px; font-family: 'Space Grotesk', sans-serif; font-weight: 500; letter-spacing: 0.04em; color: #0E0E10; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF">
      <div aria-live="polite" style="min-height: 48px">
        ${v.ok ? `
          <div style="display: flex; gap: 8px; align-items: center; font-size: 16px; font-weight: 600; color: #0B6E4F">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
            <span>Máš nárok na členství v sezóně 2026/27.</span>
          </div>
        ` : ''}
        ${v.young ? `
          <span style="font-size: 16px; line-height: 1.4; color: #3A3A42">Členem můžeš být od 19 let. Výběr měsíce si ale prohlédneš i teď.</span>
        ` : ''}
        ${v.old ? `
          <span style="font-size: 16px; line-height: 1.4; color: #3A3A42">Členství je do 26 let. Výběr měsíce je ale otevřený všem.</span>
        ` : ''}
      </div>
    </div>
    <div style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: #F3F3F5; border-radius: 6px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="9" cy="11" r="2"></circle><path d="M6 16c.6-1.4 1.7-2 3-2s2.4.6 3 2"></path><path d="M15 10h3M15 13h3"></path></svg>
      <span style="font-size: 15px; line-height: 1.45">Věk ověříme dokladem při vstupu, kopii nikde neukládáme.</span>
    </div>

    <section aria-labelledby="statistika" style="display: flex; flex-direction: column; gap: 16px; padding: 20px 0 28px; border-top: 1px solid #E2E2E6">
      <div style="display: flex; flex-direction: column; gap: 6px">
        <h2 id="statistika" style="margin: 0; font-size: 17px; font-weight: 600">Pro statistiku města <span style="font-weight: 400; color: #5A5A62">(nepovinné)</span></h2>
        <p style="margin: 0; font-size: 15px; line-height: 1.45; color: #3A3A42">Pomůže zjistit, kdo a odkud do divadla chodí. Město to uvidí jen v souhrnech, bez jména a e-mailu. Klidně přeskoč.</p>
      </div>
      <div role="group" aria-labelledby="pohlavi" style="display: flex; flex-direction: column; gap: 8px">
        <span id="pohlavi" style="font-size: 15px; font-weight: 600">Pohlaví</span>
        <div style="display: flex; gap: 8px; flex-wrap: wrap">
          ${v.genders.map((g) => `
            <button type="button" aria-pressed="${esc(g.pressed)}" ${h('click', g.pick)} style="min-height: 44px; padding: 0 16px; border-radius: 22px; border: 1.5px solid #0E0E10; background: ${esc(g.bg)}; color: ${esc(g.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer">${esc(g.label)}</button>
          `).join('')}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px">
        <label for="psc" style="font-size: 15px; font-weight: 600">PSČ, kde bydlíš</label>
        <input id="psc" type="text" inputmode="numeric" maxlength="6" autocomplete="postal-code" placeholder="např. 170 00" value="${esc(v.psc)}" ${h('change', v.onPsc)} style="height: 52px; box-sizing: border-box; padding: 0 16px; font-size: 18px; font-family: inherit; color: #0E0E10; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF">
        <span aria-live="polite" style="font-size: 14px; line-height: 1.4; color: #3A3A42">${esc(v.pscNote)}</span>
      </div>
    </section>
  </main>

  <div style="padding: 0 20px 28px">
    ${v.ok ? `
      <a href="#/Registrace-souhlasy" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Pokračovat</a>
    ` : ''}
    ${v.notOk ? `
      <span aria-disabled="true" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #E6E6EA; border-radius: 6px; font-size: 17px; font-weight: 600; color: #5A5A62">Pokračovat</span>
    ` : ''}
  </div>
</div>`;
}

KMD.screens["Registrace-vek"] = { title, defaults, css, Component, view };
})();
