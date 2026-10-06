(function () {
const { Screen, esc } = KMD;

const title = "Host – po představení a nabídka členství";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { pick: null, before: null, done: false };
  }
  renderVals() {
    const st = this.state;
    const chip = (key, label) => {
      const on = st[key] === label;
      return { label, pressed: on ? 'true' : 'false', bg: on ? '#0E0E10' : '#FFFFFF', fg: on ? '#FFFFFF' : '#0E0E10', pick: () => this.setState({ [key]: on && key === 'before' ? null : label }) };
    };
    return {
      accent: this.props.accent ?? '#2B3BFF',
      opts: ['Ano', 'Spíš ano', 'Spíš ne', 'Ne'].map((l) => chip('pick', l)),
      before: ['Ano', 'Ne', 'Nechci říct'].map((l) => chip('before', l)),
      ok: !!st.pick,
      notOk: !st.pick,
      asking: !st.done,
      done: st.done,
      send: () => this.setState({ done: true })
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; min-height: 1100px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; min-height: 64px; box-sizing: border-box">
    <span style="display: flex; flex-direction: column; gap: 2px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </span>
  </header>

  ${v.asking ? `
    <main style="display: flex; flex-direction: column; gap: 24px; padding: 8px 20px 32px">
      <div style="display: flex; flex-direction: column; gap: 6px">
        <span style="font-size: 15px; color: #3A3A42">Včera: Všichni moji bývalí</span>
        <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 32px; line-height: 1.08; letter-spacing: -0.02em">Doporučil/a bys to kamarádovi?</h1>
      </div>
      <div role="group" aria-label="Doporučení" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
        ${v.opts.map((o) => `
          <button type="button" aria-pressed="${esc(o.pressed)}" ${h('click', o.pick)} style="min-height: 64px; border-radius: 6px; border: 2px solid #0E0E10; background: ${esc(o.bg)}; color: ${esc(o.fg)}; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">${esc(o.label)}</button>
        `).join('')}
      </div>
      <div role="group" aria-labelledby="letos" style="display: flex; flex-direction: column; gap: 10px; padding: 16px; border-radius: 8px; background: #F3F3F5">
        <span id="letos" style="font-size: 16px; font-weight: 600">Byl/a jsi letos v divadle už předtím? <span style="font-weight: 400; color: #5A5A62">(nepovinné)</span></span>
        <div style="display: flex; gap: 8px; flex-wrap: wrap">
          ${v.before.map((b) => `
            <button type="button" aria-pressed="${esc(b.pressed)}" ${h('click', b.pick)} style="min-height: 44px; padding: 0 16px; border-radius: 22px; border: 1.5px solid #0E0E10; background: ${esc(b.bg)}; color: ${esc(b.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer">${esc(b.label)}</button>
          `).join('')}
        </div>
        <span style="font-size: 14px; line-height: 1.4; color: #5A5A62">Anonymně. Zjišťujeme tím, jestli klub přivádí do divadla nové lidi.</span>
      </div>
      ${v.ok ? `
        <button type="button" ${h('click', v.send)} style="min-height: 56px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">Odeslat</button>
      ` : ''}
      ${v.notOk ? `
        <span aria-disabled="true" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #E6E6EA; border-radius: 6px; font-size: 17px; font-weight: 600; color: #5A5A62">Odeslat</span>
      ` : ''}
    </main>
  ` : ''}

  ${v.done ? `
    <main style="display: flex; flex-direction: column; gap: 24px; padding: 8px 20px 32px">
      <div style="display: flex; flex-direction: column; gap: 10px">
        <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 40px; line-height: 1; letter-spacing: -0.03em">Díky, že jsi šel/šla.</h1>
        <p style="margin: 0; font-size: 17px; line-height: 1.45; color: #3A3A42">Kuba se dozví jen to, že jsi odpověděl/a. Co jsi napsal/a, zůstává mezi tebou a klubem.</p>
      </div>
      <section style="padding: 22px; border-radius: 8px; background: ${esc(v.accent)}; color: #FFFFFF; display: flex; flex-direction: column; gap: 14px">
        <h2 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; line-height: 1.1">Chceš chodit dál?</h2>
        <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 16px; line-height: 1.4">
          <li>Lístky za 100–200 Kč na výběr od kurátorů</li>
          <li>Společné večery, kam můžeš přijít i sám/sama</li>
          <li>Last-minute místa jen pro členy</li>
        </ul>
        <span style="font-size: 15px; line-height: 1.4">Pro všechny od 19 do 26. Stačí e-mail a rok narození.</span>
        <a href="#/Registrace-email" style="display: flex; align-items: center; justify-content: center; min-height: 56px; border-radius: 6px; background: #FFFFFF; color: #0E0E10; font-size: 17px; font-weight: 600; text-decoration: none">Stát se členem</a>
      </section>
      <a href="#/Vyber" style="display: flex; align-items: center; justify-content: center; min-height: 52px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 16px; font-weight: 600; text-decoration: none">Nejdřív se podívat na výběr</a>
    </main>
  ` : ''}
</div>`;
}

KMD.screens["Host-po"] = { title, defaults, css, Component, view };
})();
