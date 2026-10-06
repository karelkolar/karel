(function () {
const { Screen, esc } = KMD;

const title = "Last-minute – nepřihlášený";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  renderVals() {
    return { accent: this.props.accent ?? '#2B3BFF' };
  }
}

function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; overflow: hidden">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; min-height: 64px; box-sizing: border-box">
    <a href="#/Main" style="display: flex; flex-direction: column; gap: 2px; text-decoration: none">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: #0E0E10">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </a>
    <a href="#/LM" style="display: flex; align-items: center; min-height: 44px; font-size: 16px; font-weight: 600; text-underline-offset: 4px">Přihlásit se</a>
  </header>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 20px; padding: 8px 16px 0">
    <section style="padding: 28px 22px; border-radius: 8px; background: #0E0E10; color: #FFFFFF; display: flex; flex-direction: column; gap: 16px">
      <span style="width: 52px; height: 52px; border-radius: 26px; background: ${esc(v.accent)}; display: flex; align-items: center; justify-content: center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>
      </span>
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 32px; line-height: 1.05; letter-spacing: -0.02em">Last-minute je jen pro členy</h1>
      <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #D4D4DA">Divadla nám v den představení pouštějí volná místa za pár korun. Dělají to jen proto, že to zůstane v klubu – kdyby to viselo veřejně, přestala by.</p>
    </section>

    <ul style="list-style: none; margin: 0; padding: 0 4px; display: flex; flex-direction: column; gap: 12px">
      <li style="display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.45">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
        Vstupenky obvykle pod 100 Kč, pro tebe a jednoho doprovod
      </li>
      <li style="display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.45">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
        Upozornění do telefonu, jen když se něco uvolní
      </li>
      <li style="display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.45">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
        Členství pro všechny od 19 do 26, stačí e-mail a rok narození
      </li>
    </ul>
  </main>

  <div style="padding: 0 20px 28px; display: flex; flex-direction: column; gap: 10px">
    <a href="#/Registrace-email" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Stát se členem</a>
    <a href="#/Vyber" style="display: flex; align-items: center; justify-content: center; min-height: 52px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 16px; font-weight: 600; text-decoration: none; color: #0E0E10">Prohlédnout výběr bez registrace</a>
  </div>
</div>`;
}

KMD.screens["LM-host"] = { title, defaults, css, Component, view };
})();
