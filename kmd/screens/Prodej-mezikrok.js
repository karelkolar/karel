(function () {
const { Screen, esc } = KMD;

const title = "Testovací krok – web divadla";
const defaults = {};
const css = `body{margin:0}
a{color:#0E0E10}
a:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  renderVals() { return {}; }
}

function view(v, h) {
  return `<div style="width: 390px; height: 844px; box-sizing: border-box; background: #E9E9EE; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column; justify-content: center; padding: 24px">
  <div style="padding: 24px; border: 2px dashed #6B6B73; border-radius: 10px; background: #FFFFFF; display: flex; flex-direction: column; gap: 16px">
    <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Testovací krok · mimo aplikaci</span>
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; line-height: 1.15">Tady by byl web Divadla v Dlouhé</h1>
    <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #3A3A42">Klub vstupenky neprodává, takže prototyp nákup nesimuluje. Pro účely testu předpokládáme, že lístky jsou koupené.</p>
    <a href="#/Hodnoceni-notifikace" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Den po představení →</a>
  </div>
</div>`;
}

KMD.screens["Prodej-mezikrok"] = { title, defaults, css, Component, view };
})();
