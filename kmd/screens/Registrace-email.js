(function () {
const { Screen, esc } = KMD;

const title = "Registrace 1/3 – e-mail";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }
  renderVals() {
    const email = this.state.email;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    return {
      accent: this.props.accent ?? '#2B3BFF',
      email,
      valid,
      invalid: !valid,
      onEmail: (e) => this.setState({ email: e.target.value })
    };
  }
}

function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; overflow: hidden">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 0 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Main" aria-label="Zpět na úvod" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Krok 1 ze 3</span>
  </header>
  <div aria-hidden="true" style="display: flex; gap: 6px; padding: 8px 20px 0">
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: ${esc(v.accent)}"></div>
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: #E2E2E6"></div>
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: #E2E2E6"></div>
  </div>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 28px; padding: 40px 20px 0">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 36px; line-height: 1.05; letter-spacing: -0.02em">Jaký máš e-mail?</h1>
      <p style="margin: 0; font-size: 17px; line-height: 1.45; color: #3A3A42">Pošleme ti na něj odkaz pro přihlášení. Heslo si pamatovat nemusíš.</p>
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px">
      <label for="email" style="font-size: 15px; font-weight: 600">E-mail</label>
      <input id="email" type="email" autocomplete="email" placeholder="jmeno@email.cz" value="${esc(v.email)}" ${h('change', v.onEmail)} style="height: 56px; box-sizing: border-box; padding: 0 16px; font-size: 18px; font-family: inherit; color: #0E0E10; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF">
    </div>
    <div style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: #F3F3F5; border-radius: 6px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px"><rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>
      <span style="font-size: 15px; line-height: 1.45">Od tebe potřebujeme jen e-mail a rok narození. Nic dalšího nesbíráme.</span>
    </div>
  </main>

  <div style="padding: 0 20px 28px">
    ${v.valid ? `
      <a href="#/Registrace-vek" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Pokračovat</a>
    ` : ''}
    ${v.invalid ? `
      <span aria-disabled="true" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #E6E6EA; border-radius: 6px; font-size: 17px; font-weight: 600; color: #5A5A62">Pokračovat</span>
    ` : ''}
  </div>
</div>`;
}

KMD.screens["Registrace-email"] = { title, defaults, css, Component, view };
})();
