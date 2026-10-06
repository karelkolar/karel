(function () {
const { Screen, esc } = KMD;

const title = "Host – doprovodná vstupenka a společný večer";
const defaults = {"accent":"#2B3BFF"};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  renderVals() { return { accent: this.props.accent ?? '#2B3BFF' }; }
}

function view(v, h) {
  return `<div style="width: 390px; min-height: 1300px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; min-height: 64px; box-sizing: border-box">
    <span style="display: flex; flex-direction: column; gap: 2px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </span>
    <span style="font-size: 14px; font-weight: 600; color: #5A5A62">Tvoje pozvánka</span>
  </header>

  <div style="padding: 8px 20px 20px; display: flex; flex-direction: column; gap: 8px">
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 34px; line-height: 1.05; letter-spacing: -0.02em">Ve čtvrtek jdeš do divadla</h1>
    <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Všechno je na tomhle odkazu. Účet si dělat nemusíš.</p>
  </div>

  <section aria-label="Doprovodná vstupenka" style="margin: 0 16px; border-radius: 12px; background: #0E0E10; color: #FFFFFF; overflow: hidden">
    <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px">
      <span style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #B9C0FF">Doprovodná vstupenka</span>
        <span style="padding: 4px 10px; border-radius: 999px; background: #E7F5EE; color: #0B4D37; font-size: 14px; font-weight: 600">Koupeno</span>
      </span>
      <span style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; line-height: 1.1">Všichni moji bývalí</span>
      <span style="font-size: 15px; line-height: 1.45; color: #D4D4DA">čt 8. 10. · 19:30 · Divadlo v Dlouhé</span>
    </div>
    <div aria-hidden="true" style="height: 0; border-top: 2px dashed #3A3A42; margin: 0 16px"></div>
    <dl style="margin: 0; padding: 16px 20px 20px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">
      <div style="display: flex; flex-direction: column; gap: 2px">
        <dt style="font-size: 14px; color: #B4B4BC">Cena</dt>
        <dd style="margin: 0; font-size: 16px; font-weight: 600">50 Kč · poprvé</dd>
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px">
        <dt style="font-size: 14px; color: #B4B4BC">Lístek má</dt>
        <dd style="margin: 0; font-size: 16px; font-weight: 600">Kuba, na klubový kód</dd>
      </div>
    </dl>
  </section>
  <p style="margin: 12px 20px 0; font-size: 15px; line-height: 1.45; color: #3A3A42">U vstupu stačí jít s Kubou. Doklad s sebou, kdyby se ptali na věk.</p>

  <section aria-labelledby="vecer" style="display: flex; flex-direction: column; gap: 14px; padding: 32px 20px 0">
    <h2 id="vecer" style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700">Je to společný večer</h2>
    <div style="display: flex; gap: 12px; align-items: center">
      <span aria-hidden="true" style="flex-shrink: 0; width: 52px; height: 52px; border-radius: 26px; background: #FFD9C7; color: #6B2A10; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600">TK</span>
      <span style="font-size: 16px; line-height: 1.45">Tadeáš z klubu tě v 19:00 u vchodu vyhlíží. Přijde 12 lidí, většina se zná jen od vidění.</span>
    </div>
    <dl style="margin: 0; display: flex; flex-direction: column">
      <div style="display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E2E6">
        <dt style="width: 80px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Sraz</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">19:00 u vchodu</dd>
      </div>
      <div style="display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E2E6">
        <dt style="width: 80px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Potom</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">Posezení poblíž, kdo chce. Nikdo nemusí.</dd>
      </div>
      <div style="display: flex; gap: 16px; padding: 14px 0">
        <dt style="width: 80px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Cesta</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">Tram – zastávka Dlouhá třída, pak 2 min pěšky</dd>
      </div>
    </dl>
  </section>

  <div style="margin: 32px 16px 32px; padding: 16px; border: 2px dashed #6B6B73; border-radius: 10px; display: flex; flex-direction: column; gap: 10px">
    <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Testovací krok</span>
    <span style="font-size: 15px; line-height: 1.4">Druhý den otevře stejný odkaz.</span>
    <a href="#/Host-po" style="display: flex; align-items: center; justify-content: center; min-height: 52px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 16px; font-weight: 600; text-decoration: none">Den po představení →</a>
  </div>
</div>`;
}

KMD.screens["Host-vecer"] = { title, defaults, css, Component, view };
})();
