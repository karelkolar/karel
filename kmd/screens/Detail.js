import { Screen, esc } from "../core.js";

export const title = "Detail – Všichni moji bývalí";
export const defaults = {"clen":true,"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  renderVals() {
    const clen = this.props.clen ?? true;
    return { accent: this.props.accent ?? '#2B3BFF', clen: !!clen, host: !clen };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; min-height: 844px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 8px 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Vyber" aria-label="Zpět na výběr" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Výběr na říjen</span>
    <span style="width: 48px"></span>
  </header>

  <div style="margin: 0 16px; height: 220px; border-radius: 8px; background: #E9E9EE; display: flex; align-items: center; justify-content: center">
    <span style="font-size: 14px; font-weight: 600; color: #5A5A62">[foto z inscenace]</span>
  </div>

  <section style="display: flex; flex-direction: column; gap: 10px; padding: 20px 20px 0">
    <span style="display: flex; gap: 6px; flex-wrap: wrap">
      <span style="padding: 4px 10px; border-radius: 999px; border: 1px solid #0E0E10; font-size: 14px; font-weight: 600">Činohra</span>
      <span style="padding: 4px 10px; border-radius: 999px; background: #ECEEFF; color: #1F2BB8; font-size: 14px; font-weight: 600">k smíchu</span>
    </span>
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 36px; line-height: 1.05; letter-spacing: -0.02em">Všichni moji bývalí</h1>
    <span style="font-size: 16px; color: #3A3A42">Divadlo v Dlouhé · čt 8. 10. · 19:30</span>
  </section>

  <div style="margin: 16px 16px 0; padding: 14px 16px; border-radius: 8px; border: 1.5px solid ${esc(v.accent)}; display: flex; gap: 12px; align-items: center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${esc(v.accent)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><circle cx="9" cy="8" r="3"></circle><circle cx="17" cy="9" r="2.5"></circle><path d="M3 19c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5"></path><path d="M15.5 14.6c2.3.1 4 1.5 4.5 4.4"></path></svg>
    <span style="font-size: 15px; line-height: 1.4"><strong>Společný večer s Tadeášem.</strong> Sraz 19:00 u vchodu, zbývají 4 místa.</span>
  </div>

  <section aria-labelledby="proc-jit" style="display: flex; flex-direction: column; gap: 14px; padding: 32px 20px 0">
    <h2 id="proc-jit" style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700">Proč jít</h2>
    <div style="display: flex; gap: 12px; align-items: center">
      <span aria-hidden="true" style="flex-shrink: 0; width: 52px; height: 52px; border-radius: 26px; background: #FFD9C7; color: #6B2A10; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600">TK</span>
      <span style="display: flex; flex-direction: column; gap: 2px">
        <span style="font-size: 16px; font-weight: 600">Tadeáš K.</span>
        <span style="font-size: 14px; color: #5A5A62">ambasador klubu</span>
      </span>
    </div>
    <p style="margin: 0; font-size: 18px; line-height: 1.5">Byl jsem na tom dvakrát a podruhé jsem vzal ségru, protože jsem chtěl vidět, jestli se bude smát na stejných místech. Smála se víc. Je to komedie o lidech, se kterými jsme kdysi chodili, a o tom, co z nich v nás zůstalo. Herci hrají fakt nahlas a fakt blízko – v první řadě vás občas někdo osloví, tak počítejte s tím.</p>
  </section>

  <section aria-label="Hodnocení členů" style="margin: 28px 16px 0; padding: 18px; border-radius: 8px; background: #F3F3F5; display: flex; flex-direction: column; gap: 12px">
    <span style="display: flex; align-items: baseline; gap: 10px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-size: 40px; font-weight: 700; line-height: 1">87 %</span>
      <span style="font-size: 16px; font-weight: 600; line-height: 1.3">mladých, kteří tam byli, to doporučuje</span>
    </span>
    <div aria-hidden="true" style="height: 8px; border-radius: 4px; background: #D9D9DE; overflow: hidden">
      <div style="width: 87%; height: 8px; background: ${esc(v.accent)}"></div>
    </div>
    <span style="font-size: 14px; color: #3A3A42">Z 23 hodnocení členů klubu po představení</span>
  </section>

  <div style="padding: 8px 20px 0">
    <a href="#recenze-jinde" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; border-bottom: 1px solid #E2E2E6; font-size: 16px; font-weight: 600; text-decoration: none">
      <span style="display: flex; flex-direction: column; gap: 2px">
        <span>Hodnocení a recenze jinde</span>
        <span style="font-size: 14px; font-weight: 400; color: #5A5A62">Otevře se mimo klub</span>
      </span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"></path><path d="M20 4l-9 9"></path><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path></svg>
    </a>
  </div>

  <section aria-labelledby="prakticke" style="display: flex; flex-direction: column; padding: 32px 20px 32px">
    <h2 id="prakticke" style="margin: 0 0 8px; font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700">Prakticky</h2>
    <dl style="margin: 0; display: flex; flex-direction: column">
      <div style="display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E2E6">
        <dt style="width: 96px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Délka</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">1 h 50 min, jedna přestávka</dd>
      </div>
      <div style="display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E2E6">
        <dt style="width: 96px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Cena</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4"><strong>150 Kč</strong> s klubovým kódem<br><span style="color: #5A5A62">běžně 420 Kč</span></dd>
      </div>
      <div style="display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E2E6">
        <dt style="width: 96px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Kde</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">Divadlo v Dlouhé<br>Dlouhá 39, Praha 1</dd>
      </div>
      <div style="display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E2E6">
        <dt style="width: 96px; flex-shrink: 0; font-size: 15px; color: #5A5A62">MHD</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">Tram – zastávka Dlouhá třída, pak 2 min pěšky</dd>
      </div>
      <div style="display: flex; gap: 16px; padding: 14px 0">
        <dt style="width: 96px; flex-shrink: 0; font-size: 15px; color: #5A5A62">Další termíny</dt>
        <dd style="margin: 0; font-size: 16px; line-height: 1.4">so 17. 10. · pá 30. 10.</dd>
      </div>
    </dl>
  </section>

  <div style="position: sticky; bottom: 0; margin-top: auto; padding: 16px 20px 28px; background: #FFFFFF; border-top: 1px solid #E2E2E6; display: flex; flex-direction: column; gap: 10px">
    ${v.host ? `
      <a href="#/Registrace-email" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Stát se členem – lístek za 150 Kč</a>
      <span style="text-align: center; font-size: 14px; line-height: 1.4; color: #5A5A62">Klubovou cenu mají členové a jejich doprovod. Stačí e-mail a rok narození.</span>
    ` : ''}
    ${v.clen ? `
    <a href="#/Prechod" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">
      <span>Koupit s klubovým kódem</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
    </a>
    <a href="#/Pozvat" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #0E0E10">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="8" r="3.5"></circle><path d="M3.5 20c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5"></path><path d="M19 8v6M16 11h6"></path></svg>
      <span>Pozvat kamaráda</span>
    </a>
    <span style="text-align: center; font-size: 14px; color: #5A5A62">Lístky prodává divadlo. Klub ti dá kód na členskou cenu.</span>
    ` : ''}
  </div>
</div>`;
}
