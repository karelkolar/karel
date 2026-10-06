(function () {
const { Screen, esc } = KMD;

const title = "Parta – hlasování o termínu";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { mine: { a: false, b: true, c: false } };
  }
  renderVals() {
    const mine = this.state.mine;
    const defs = [
      { id: 'a', label: 'čt 8. 10.', note: '19:30 · společný večer klubu', others: ['Jana'] },
      { id: 'b', label: 'so 17. 10.', note: '19:30', others: ['Jana', 'Ondra'] },
      { id: 'c', label: 'pá 30. 10.', note: '19:30', others: ['Ondra'] }
    ];
    let best = null;
    const options = defs.map((d) => {
      const on = !!mine[d.id];
      const names = on ? ['Ty'].concat(d.others) : d.others.slice();
      const count = names.length;
      if (!best || count > best.count) best = { label: d.label, count };
      return {
        label: d.label,
        note: d.note,
        count,
        pct: Math.round((count / 4) * 100) + '%',
        who: count ? 'Může: ' + names.join(', ') : 'Zatím nikdo',
        pressed: on ? 'true' : 'false',
        border: on ? '2px solid #0E0E10' : '1px solid #D9D9DE',
        boxBg: on ? '#0E0E10' : '#FFFFFF',
        tick: on ? '✓' : '',
        mineLabel: on ? 'Můžu' : 'Můžu?',
        mineColor: on ? '#0E0E10' : '#5A5A62',
        toggle: () => this.setState({ mine: Object.assign({}, mine, { [d.id]: !on }) })
      };
    });
    const voted = Object.keys(mine).some((k) => mine[k]) ? 3 : 2;
    return {
      accent: this.props.accent ?? '#2B3BFF',
      options,
      leader: best ? best.label : '',
      votedLabel: 'Hlasovali ' + voted + ' ze 4'
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; min-height: 1100px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Parta-nova" aria-label="Zpět" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Parta</span>
    <span style="width: 48px"></span>
  </header>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 24px; padding: 12px 20px 24px">
    <div style="display: flex; flex-direction: column; gap: 8px">
      <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: ${esc(v.accent)}">Sobotní sestava</span>
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 34px; line-height: 1.05; letter-spacing: -0.02em">Kdy můžete?</h1>
      <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Všichni moji bývalí · Divadlo v Dlouhé. Klepni na každý termín, kdy můžeš.</p>
    </div>

    <div style="display: flex; gap: 10px; align-items: center">
      <div aria-hidden="true" style="display: flex">
        <span style="width: 36px; height: 36px; border-radius: 18px; border: 2px solid #FFFFFF; background: #0E0E10; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">K</span>
        <span style="width: 36px; height: 36px; margin-left: -8px; border-radius: 18px; border: 2px solid #FFFFFF; background: #D7F0E4; color: #0B4D37; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">J</span>
        <span style="width: 36px; height: 36px; margin-left: -8px; border-radius: 18px; border: 2px solid #FFFFFF; background: #FFF0B8; color: #5C4600; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">O</span>
        <span style="width: 36px; height: 36px; margin-left: -8px; border-radius: 18px; border: 2px dashed #9A9AA2; background: #FFD6E3; color: #7A1236; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">B</span>
      </div>
      <span aria-live="polite" style="font-size: 15px">${esc(v.votedLabel)}</span>
    </div>

    <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px">
      ${v.options.map((o) => `
        <li>
          <button type="button" aria-pressed="${esc(o.pressed)}" ${h('click', o.toggle)} style="width: 100%; text-align: left; display: flex; flex-direction: column; gap: 12px; padding: 16px; border-radius: 8px; border: ${esc(o.border)}; background: #FFFFFF; font-family: inherit; color: #0E0E10; cursor: pointer">
            <span style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%">
              <span style="display: flex; flex-direction: column; gap: 2px">
                <span style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700">${esc(o.label)}</span>
                <span style="font-size: 14px; color: #5A5A62">${esc(o.note)}</span>
              </span>
              <span style="flex-shrink: 0; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: ${esc(o.mineColor)}">
                ${esc(o.mineLabel)}
                <span aria-hidden="true" style="width: 26px; height: 26px; border-radius: 6px; border: 2px solid #0E0E10; background: ${esc(o.boxBg)}; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700">${esc(o.tick)}</span>
              </span>
            </span>
            <span style="display: flex; align-items: center; gap: 10px; width: 100%">
              <span aria-hidden="true" style="flex-grow: 1; height: 8px; border-radius: 4px; background: #E2E2E6; overflow: hidden; display: block">
                <span style="display: block; height: 8px; width: ${esc(o.pct)}; background: ${esc(v.accent)}"></span>
              </span>
              <span style="font-size: 14px; font-weight: 600; white-space: nowrap">${esc(o.count)} ze 4</span>
            </span>
            <span style="font-size: 14px; color: #3A3A42">${esc(o.who)}</span>
          </button>
        </li>
      `).join('')}
    </ul>

    <span style="font-size: 14px; line-height: 1.4; color: #5A5A62">Bára ještě nehlasovala. Hlasování můžeš uzavřít, i když nehlasují všichni.</span>
  </main>

  <div style="padding: 0 20px 28px; display: flex; flex-direction: column; gap: 8px">
    <a href="#/Parta-nakup" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-height: 60px; background: #0E0E10; border-radius: 6px; text-decoration: none; color: #FFFFFF">
      <span style="font-size: 17px; font-weight: 600">Uzavřít a jít ${esc(v.leader)}</span>
      <span style="font-size: 14px; color: #D4D4DA">Nejvíc hlasů</span>
    </a>
  </div>
</div>`;
}

KMD.screens["Parta"] = { title, defaults, css, Component, view };
})();
