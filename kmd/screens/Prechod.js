(function () {
const { Screen, esc } = KMD;

const title = "Přechod do prodeje divadla";
const defaults = {};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  renderVals() {
    return {};
  }
}

function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; position: relative; overflow: hidden">
  <div aria-hidden="true" style="padding: 72px 16px 0; display: flex; flex-direction: column; gap: 16px">
    <div style="height: 220px; border-radius: 8px; background: #E9E9EE"></div>
    <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 36px; line-height: 1.05; padding: 0 4px">Všichni moji bývalí</div>
    <div style="font-size: 16px; color: #3A3A42; padding: 0 4px">Divadlo v Dlouhé · čt 8. 10. · 19:30</div>
  </div>
  <div aria-hidden="true" style="position: absolute; left: 0; top: 0; width: 390px; height: 844px; background: rgba(14,14,16,0.6)"></div>

  <section role="dialog" aria-modal="true" aria-labelledby="prechod-nadpis" style="position: absolute; left: 0; bottom: 0; width: 390px; box-sizing: border-box; background: #FFFFFF; border-radius: 16px 16px 0 0; padding: 12px 20px 28px; display: flex; flex-direction: column; gap: 18px">
    <div aria-hidden="true" style="align-self: center; width: 40px; height: 4px; border-radius: 2px; background: #D0D0D6"></div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <span style="width: 48px; height: 48px; border-radius: 24px; background: #ECEEFF; color: #1F2BB8; display: flex; align-items: center; justify-content: center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"></path><path d="M20 4l-9 9"></path><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path></svg>
      </span>
      <h2 id="prechod-nadpis" style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; line-height: 1.1">Přecházíš do prodeje divadla</h2>
      <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Lístky koupíš přímo u Divadla v Dlouhé. Klubový kód jsme ti zkopírovali, stačí ho vložit do pole pro slevový kód.</p>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border: 2px dashed #0E0E10; border-radius: 6px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px; letter-spacing: 0.06em">YA-K7M4-26</span>
      <span style="display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #0B6E4F">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
        Zkopírováno
      </span>
    </div>

    <ol style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px">
      <li style="display: flex; gap: 12px; align-items: center; font-size: 15px"><span aria-hidden="true" style="width: 28px; height: 28px; flex-shrink: 0; border-radius: 14px; background: #0E0E10; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">1</span>Vyber termín a místa</li>
      <li style="display: flex; gap: 12px; align-items: center; font-size: 15px"><span aria-hidden="true" style="width: 28px; height: 28px; flex-shrink: 0; border-radius: 14px; background: #0E0E10; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">2</span>Vlož kód – cena klesne na 150 Kč</li>
      <li style="display: flex; gap: 12px; align-items: center; font-size: 15px"><span aria-hidden="true" style="width: 28px; height: 28px; flex-shrink: 0; border-radius: 14px; background: #0E0E10; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">3</span>Zaplať divadlu, lístky ti pošle e-mailem</li>
    </ol>

    <div style="display: flex; flex-direction: column; gap: 10px">
      <a href="#/Prodej-mezikrok" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">
        <span>Pokračovat na web divadla</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
      </a>
      <a href="#/Detail" style="display: flex; align-items: center; justify-content: center; min-height: 48px; font-size: 16px; font-weight: 600; text-decoration: underline; text-underline-offset: 4px">Zůstat v klubu</a>
    </div>
  </section>
</div>`;
}

KMD.screens["Prechod"] = { title, defaults, css, Component, view };
})();
