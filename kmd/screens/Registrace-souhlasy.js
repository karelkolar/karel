import { Screen, esc } from "../core.js";

export const title = "Registrace 3/3 – souhlasy";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { rules: false, data: false, news: false };
  }
  renderVals() {
    const { rules, data, news } = this.state;
    const ok = rules && data;
    return {
      accent: this.props.accent ?? '#2B3BFF',
      rules, data, news, ok,
      notOk: !ok,
      toggleRules: () => this.setState({ rules: !rules }),
      toggleData: () => this.setState({ data: !data }),
      toggleNews: () => this.setState({ news: !news })
    };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; min-height: 1000px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 0 8px; min-height: 64px; box-sizing: border-box">
    <a href="#/Registrace-vek" aria-label="Zpět na rok narození" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>
    </a>
    <span style="font-size: 15px; font-weight: 600; color: #5A5A62">Krok 3 ze 3</span>
  </header>
  <div aria-hidden="true" style="display: flex; gap: 6px; padding: 8px 20px 0">
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: ${esc(v.accent)}"></div>
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: ${esc(v.accent)}"></div>
    <div style="flex-grow: 1; height: 4px; border-radius: 2px; background: ${esc(v.accent)}"></div>
  </div>

  <main style="flex-grow: 1; display: flex; flex-direction: column; gap: 24px; padding: 32px 20px 0">
    <div style="display: flex; flex-direction: column; gap: 12px">
      <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 36px; line-height: 1.05; letter-spacing: -0.02em">Souhlasy</h1>
      <p style="margin: 0; font-size: 17px; line-height: 1.45; color: #3A3A42">Jen to, bez čeho klub nefunguje. Zbytek je na tobě.</p>
    </div>

    <fieldset style="margin: 0; padding: 0; border: 0; display: flex; flex-direction: column; gap: 4px">
      <legend style="padding: 0 0 8px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Nutné pro členství</legend>
      <label for="pravidla" style="display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; min-height: 56px; box-sizing: border-box; border-bottom: 1px solid #E2E2E6; cursor: pointer">
        <input id="pravidla" type="checkbox" ${v.rules ? 'checked' : ''} ${h('change', v.toggleRules)} style="width: 24px; height: 24px; margin: 0; flex-shrink: 0; accent-color: ${esc(v.accent)}">
        <span style="font-size: 16px; line-height: 1.45">Přijímám <a href="#pravidla-clenstvi" style="font-weight: 600; text-underline-offset: 3px">pravidla členství</a>.</span>
      </label>
      <label for="data" style="display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; min-height: 56px; box-sizing: border-box; border-bottom: 1px solid #E2E2E6; cursor: pointer">
        <input id="data" type="checkbox" ${v.data ? 'checked' : ''} ${h('change', v.toggleData)} style="width: 24px; height: 24px; margin: 0; flex-shrink: 0; accent-color: ${esc(v.accent)}">
        <span style="font-size: 16px; line-height: 1.45">E-mail a rok narození použijete jen pro moje členství. Když ho zruším, smažou se. <a href="#zasady" style="font-weight: 600; text-underline-offset: 3px">Jak s daty zacházíme</a></span>
      </label>
    </fieldset>

    <fieldset style="margin: 0; padding: 16px; border: 0; background: #F3F3F5; border-radius: 6px; display: flex; flex-direction: column; gap: 4px">
      <legend style="float: left; width: 100%; padding: 0 0 4px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Nepovinné</legend>
      <label for="newsletter" style="display: flex; gap: 14px; align-items: flex-start; padding: 8px 0; min-height: 48px; box-sizing: border-box; cursor: pointer">
        <input id="newsletter" type="checkbox" ${v.news ? 'checked' : ''} ${h('change', v.toggleNews)} style="width: 24px; height: 24px; margin: 0; flex-shrink: 0; accent-color: ${esc(v.accent)}">
        <span style="display: flex; flex-direction: column; gap: 4px">
          <span style="font-size: 16px; line-height: 1.45">Posílejte mi e-mailem výběr měsíce a pozvánky na společné večery.</span>
          <span style="font-size: 14px; line-height: 1.4; color: #5A5A62">Členství na tom nezávisí. Zrušíš to jedním klikem.</span>
        </span>
      </label>
    </fieldset>

    <section aria-labelledby="pro-mesto" style="display: flex; gap: 12px; align-items: flex-start; padding: 0 0 24px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 2px"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"></path></svg>
      <span style="display: flex; flex-direction: column; gap: 4px">
        <span id="pro-mesto" style="font-size: 15px; font-weight: 600">Co jde do statistik města</span>
        <span style="font-size: 14px; line-height: 1.45; color: #3A3A42">Rok narození, pohlaví a městská část (když je vyplníš) a návštěvy přes klubový kód – pod číselným označením, bez jména a e-mailu. Odbor kultury je vidí jen v souhrnech.</span>
        <a href="#/Datovy-model" style="display: flex; align-items: center; min-height: 44px; font-size: 15px; font-weight: 600; text-underline-offset: 3px">Co přesně předáváme</a>
      </span>
    </section>
  </main>

  <div style="padding: 0 20px 28px; display: flex; flex-direction: column; gap: 10px">
    ${v.ok ? `
      <a href="#/Karta" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Vytvořit členství</a>
    ` : ''}
    ${v.notOk ? `
      <span aria-disabled="true" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #E6E6EA; border-radius: 6px; font-size: 17px; font-weight: 600; color: #5A5A62">Vytvořit členství</span>
      <span style="text-align: center; font-size: 14px; color: #5A5A62">Pro pokračování potvrď obě nutné položky.</span>
    ` : ''}
  </div>
</div>`;
}
