(function () {
const { Screen, esc } = KMD;

const title = "Kurátorská administrace – nová nabídka";
const defaults = {};
const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { count: '16' };
  }
  renderVals() {
    const n = parseInt(this.state.count, 10) || 0;
    return {
      count: this.state.count,
      onCount: (e) => this.setState({ count: e.target.value }),
      share: n > 0 ? 'z kapacity 180, tj. ' + Math.round((n / 180) * 100) + ' % sálu' : 'Zadej počet vstupenek'
    };
  }
}

function view(v, h) {
  return `<div style="background: #F6F6F8; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; min-height: 100vh; display: flex; flex-wrap: wrap">
  <nav aria-label="Administrace" style="flex: 1 1 220px; max-width: 100%; box-sizing: border-box; padding: 28px 20px; background: #0E0E10; color: #FFFFFF; display: flex; flex-direction: column; gap: 6px">
    <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px">Klub mladých diváků</span>
    <span style="font-size: 14px; color: #B9C0FF; margin-bottom: 18px">Administrace kurátorů</span>
    <a href="#/Admin-nabidka" aria-current="page" style="display: flex; align-items: center; min-height: 44px; padding: 0 12px; border-radius: 6px; background: #2B3BFF; color: #FFFFFF; font-size: 15px; font-weight: 600; text-decoration: none">Nabídky a představení</a>
    <a href="#mista" style="display: flex; align-items: center; min-height: 44px; padding: 0 12px; border-radius: 6px; color: #FFFFFF; font-size: 15px; text-decoration: none">Místa konání</a>
    <a href="#organizace" style="display: flex; align-items: center; min-height: 44px; padding: 0 12px; border-radius: 6px; color: #FFFFFF; font-size: 15px; text-decoration: none">Organizace</a>
    <a href="#/Dashboard" style="display: flex; align-items: center; min-height: 44px; padding: 0 12px; border-radius: 6px; color: #FFFFFF; font-size: 15px; text-decoration: none">Přehled návštěvnosti</a>
    <a href="#/Datovy-model" style="display: flex; align-items: center; min-height: 44px; padding: 0 12px; border-radius: 6px; color: #FFFFFF; font-size: 15px; text-decoration: none">Export pro odbor kultury</a>
  </nav>

  <main style="flex: 999 1 560px; min-width: 0; box-sizing: border-box; padding: 32px; display: flex; flex-direction: column; gap: 24px">
    <header style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px">
      <div style="display: flex; flex-direction: column; gap: 4px">
        <span style="font-size: 14px; color: #5A5A62">Nabídky › Nová</span>
        <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700">Nová nabídka do výběru</h1>
      </div>
      <span style="font-size: 14px; color: #5A5A62">ID nabídky přidělí systém po uložení (např. NAB-2026-0317)</span>
    </header>

    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start">
      <form style="flex: 2 1 520px; min-width: 0; display: flex; flex-direction: column; gap: 20px">
        <fieldset style="margin: 0; padding: 24px; border: 1px solid #E2E2E6; border-radius: 10px; background: #FFFFFF; display: flex; flex-direction: column; gap: 16px">
          <legend style="padding: 0 6px; font-size: 17px; font-weight: 600">Co a kde</legend>
          <div style="display: flex; flex-direction: column; gap: 6px">
            <label for="ins" style="font-size: 15px; font-weight: 600">Inscenace</label>
            <select id="ins" style="height: 48px; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10">
              <option>Všichni moji bývalí · INS-0142</option>
              <option>Večeře o pěti chodech · INS-0155</option>
            </select>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 16px">
            <div style="flex: 1 1 220px; display: flex; flex-direction: column; gap: 6px">
              <label for="org" style="font-size: 15px; font-weight: 600">Organizace</label>
              <select id="org" style="height: 48px; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10">
                <option>Divadlo v Dlouhé · ORG-003</option>
                <option>Divadlo na Vinohradech · ORG-001</option>
                <option>Hudební divadlo Karlín · ORG-002</option>
                <option>Divadlo Minor · ORG-004</option>
                <option>Divadlo Spejbla a Hurvínka · ORG-005</option>
                <option>Divadlo pod Palmovkou · ORG-006</option>
                <option>Švandovo divadlo · ORG-007</option>
                <option>Divadlo Na zábradlí · ORG-008</option>
                <option>Studio Ypsilon · ORG-009</option>
                <option>Divadlo Rokoko · ORG-010</option>
                <option>Divadlo ABC · ORG-011</option>
                <option>Divadlo Komedie · ORG-012</option>
              </select>
              <span style="font-size: 14px; color: #5A5A62">Předvyplní se z inscenace. IČO a kontakty jsou v adresáři organizací.</span>
            </div>
            <div style="flex: 1 1 220px; display: flex; flex-direction: column; gap: 6px">
              <label for="misto" style="font-size: 15px; font-weight: 600">Místo konání</label>
              <select id="misto" style="height: 48px; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10">
                <option>Hlavní scéna · MK-012 · kapacita 180 (ilustr.)</option>
                <option>Malá scéna · MK-013 · kapacita 60 (ilustr.)</option>
              </select>
              <span style="font-size: 14px; color: #5A5A62">Adresa podle RÚIAN je v adresáři míst.</span>
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 16px">
            <div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 6px">
              <label for="datum" style="font-size: 15px; font-weight: 600">Datum představení</label>
              <input id="datum" type="date" value="2026-10-08" style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
            </div>
            <div style="flex: 1 1 120px; display: flex; flex-direction: column; gap: 6px">
              <label for="cas" style="font-size: 15px; font-weight: 600">Začátek</label>
              <input id="cas" type="time" value="19:30" style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
            </div>
            <div style="flex: 1 1 120px; display: flex; flex-direction: column; gap: 6px">
              <label for="delka" style="font-size: 15px; font-weight: 600">Délka (min)</label>
              <input id="delka" type="number" value="110" style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
            </div>
            <div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 6px">
              <label for="zanr" style="font-size: 15px; font-weight: 600">Typ akce / žánr</label>
              <select id="zanr" style="height: 48px; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10">
                <option>Činohra</option><option>Autorské</option><option>Tanec</option><option>Nový cirkus</option>
              </select>
            </div>
          </div>
          <span style="font-size: 14px; color: #5A5A62">ID představení: PR-2026-1008-012 (z data, času a místa)</span>
        </fieldset>

        <fieldset style="margin: 0; padding: 24px; border: 1px solid #E2E2E6; border-radius: 10px; background: #FFFFFF; display: flex; flex-direction: column; gap: 16px">
          <legend style="padding: 0 6px; font-size: 17px; font-weight: 600">Vstupenky do KMD</legend>
          <div style="display: flex; flex-wrap: wrap; gap: 16px">
            <div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 6px">
              <label for="pocet" style="font-size: 15px; font-weight: 600">Uvolněno do KMD</label>
              <input id="pocet" type="number" min="1" value="${esc(v.count)}" ${h('change', v.onCount)} style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
              <span style="font-size: 14px; color: #5A5A62">${esc(v.share)}</span>
            </div>
            <div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 6px">
              <label for="plna" style="font-size: 15px; font-weight: 600">Plná cena (Kč)</label>
              <input id="plna" type="number" value="420" style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
            </div>
            <div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 6px">
              <label for="kmd" style="font-size: 15px; font-weight: 600">Cena v KMD (Kč)</label>
              <input id="kmd" type="number" value="150" style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
            </div>
            <div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 6px">
              <label for="zverejneni" style="font-size: 15px; font-weight: 600">Zveřejnit</label>
              <input id="zverejneni" type="date" value="2026-10-01" style="height: 48px; box-sizing: border-box; padding: 0 12px; font-size: 16px; font-family: inherit; border: 1.5px solid #0E0E10; border-radius: 6px; color: #0E0E10">
            </div>
          </div>
        </fieldset>

        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <button type="button" style="min-height: 48px; padding: 0 20px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 16px; font-weight: 600; cursor: pointer">Uložit a naplánovat zveřejnění</button>
          <button type="button" style="min-height: 48px; padding: 0 20px; border: 1.5px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10; font-family: inherit; font-size: 16px; font-weight: 600; cursor: pointer">Uložit koncept</button>
        </div>
      </form>

      <aside aria-label="Náhled a kontrola" style="flex: 1 1 300px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
        <div style="padding: 20px; border-radius: 10px; background: #FFFFFF; border: 1px solid #E2E2E6; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Náhled ve výběru</span>
          <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700">Všichni moji bývalí</span>
          <span style="font-size: 15px; color: #3A3A42">Divadlo v Dlouhé · čt 8. 10. · 19:30</span>
          <span style="font-size: 15px"><strong>150 Kč</strong> <span style="color: #5A5A62; text-decoration: line-through">420 Kč</span> · ${esc(v.count)} míst</span>
        </div>
        <div style="padding: 20px; border-radius: 10px; background: #FFFFFF; border: 1px solid #E2E2E6; display: flex; flex-direction: column; gap: 10px">
          <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Ještě chybí</span>
          <span style="font-size: 15px; line-height: 1.45">„Proč jít“ od ambasadora – Tadeáš K. má text ke schválení.</span>
          <a href="#/Ambasador" style="display: flex; align-items: center; min-height: 44px; font-size: 15px; font-weight: 600; text-underline-offset: 3px">Otevřít text ke schválení</a>
        </div>
      </aside>
    </div>
  </main>
</div>`;
}

KMD.screens["Admin-nabidka"] = { title, defaults, css, Component, view };
})();
