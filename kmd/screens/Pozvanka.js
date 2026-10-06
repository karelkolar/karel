import { Screen, esc } from "../core.js";

export const title = "Pozvánka – pohled kamaráda";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { status: 'open', name: '' };
  }
  renderVals() {
    const s = this.state.status;
    return {
      accent: this.props.accent ?? '#2B3BFF',
      name: this.state.name,
      onName: (e) => this.setState({ name: e.target.value }),
      isOpen: s === 'open',
      isAccepted: s === 'yes',
      isDeclined: s === 'no',
      accept: () => this.setState({ status: 'yes' }),
      decline: () => this.setState({ status: 'no' }),
      reopen: () => this.setState({ status: 'open' })
    };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; min-height: 1240px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; min-height: 64px; box-sizing: border-box">
    <span style="display: flex; flex-direction: column; gap: 2px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </span>
    <span style="font-size: 14px; font-weight: 600; color: #5A5A62">Pozvánka</span>
  </header>

  <section style="margin: 0 16px; padding: 24px; border-radius: 8px; background: ${esc(v.accent)}; color: #FFFFFF; display: flex; flex-direction: column; gap: 18px">
    <span style="display: flex; gap: 12px; align-items: center">
      <span aria-hidden="true" style="width: 44px; height: 44px; border-radius: 22px; background: #FFFFFF; color: #0E0E10; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700">K</span>
      <span style="font-size: 16px; font-weight: 600">Kuba tě zve do divadla</span>
    </span>
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 38px; line-height: 1; letter-spacing: -0.02em">Všichni moji bývalí</h1>
    <span style="font-size: 16px; line-height: 1.4">Divadlo v Dlouhé<br>čtvrtek 8. 10. · 19:30 · 1 h 50 min</span>
    <span style="font-size: 15px; line-height: 1.4; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.35)">Společný večer klubu: sraz 19:00 u vchodu s ambasadorem Tadeášem, potom kdo chce do kavárny.</span>
  </section>

  <section aria-label="Cena pro tebe" style="margin: 16px 16px 0; padding: 18px; border: 1px solid #D9D9DE; border-radius: 8px; display: flex; flex-direction: column; gap: 8px">
    <span style="display: flex; align-items: baseline; gap: 10px">
      <span style="font-family: 'Space Grotesk', sans-serif; font-size: 40px; font-weight: 700; line-height: 1">50 Kč</span>
      <span style="font-size: 15px; color: #5A5A62; text-decoration: line-through">běžně 420 Kč</span>
    </span>
    <span style="font-size: 16px; line-height: 1.45">Tvoje první návštěva s klubem. Příště jako Kubův doprovod za 150 Kč.</span>
  </section>

  <section aria-labelledby="proc" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 20px 0">
    <h2 id="proc" style="margin: 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Proč jít, podle ambasadora</h2>
    <p style="margin: 0; font-size: 17px; line-height: 1.5">„Komedie o bývalých, u které se smějete nahlas a cestou domů trochu přemýšlíte.“</p>
    <span style="font-size: 14px; color: #5A5A62">Tadeáš K. · doporučuje 87 % mladých, kteří tam byli</span>
  </section>

  <div style="padding: 28px 20px 0; display: flex; flex-direction: column; gap: 12px">
    ${v.isOpen ? `
      <div style="display: flex; flex-direction: column; gap: 8px">
        <label for="prezdivka" style="font-size: 15px; font-weight: 600">Jak ti říkat <span style="font-weight: 400; color: #5A5A62">(nepovinné)</span></label>
        <input id="prezdivka" type="text" value="${esc(v.name)}" ${h('change', v.onName)} placeholder="Jméno nebo přezdívka" style="height: 52px; box-sizing: border-box; padding: 0 16px; font-size: 17px; font-family: inherit; color: #0E0E10; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF">
        <span style="font-size: 14px; color: #5A5A62">Uvidí to jen Kuba. Účet ani aplikaci nepotřebuješ.</span>
      </div>
      <button type="button" ${h('click', v.accept)} style="min-height: 56px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 17px; font-weight: 600; cursor: pointer">Jdu</button>
      <button type="button" ${h('click', v.decline)} style="min-height: 52px; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10; font-family: inherit; font-size: 16px; font-weight: 600; cursor: pointer">Tenhle termín nemůžu</button>
    ` : ''}
    ${v.isAccepted ? `
      <div style="display: flex; flex-direction: column; gap: 10px; padding: 18px; border-radius: 8px; background: #E7F5EE; color: #0B4D37">
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700">Platí, jdeš!</span>
        <span style="font-size: 16px; line-height: 1.45; color: #0E0E10">Kuba koupí lístky pro oba na klubový kód. Těch 50 Kč si vyrovnáte mezi sebou.</span>
      </div>
      <a href="#/Host-vecer" style="display: flex; align-items: center; justify-content: center; min-height: 56px; background: #0E0E10; border-radius: 6px; font-size: 17px; font-weight: 600; text-decoration: none; color: #FFFFFF">Co tě ve čtvrtek čeká</a>
      <button type="button" ${h('click', v.reopen)} style="align-self: flex-start; min-height: 44px; padding: 0; border: 0; background: transparent; font-family: inherit; font-size: 15px; font-weight: 600; color: #0E0E10; text-decoration: underline; text-underline-offset: 4px; cursor: pointer">Změnit odpověď</button>
    ` : ''}
    ${v.isDeclined ? `
      <div style="display: flex; flex-direction: column; gap: 10px; padding: 18px; border-radius: 8px; background: #F3F3F5">
        <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700">Dáme Kubovi vědět</span>
        <span style="font-size: 16px; line-height: 1.45">Třeba příště. Pozvánka platí i na další termíny téhle inscenace.</span>
      </div>
      <button type="button" ${h('click', v.reopen)} style="align-self: flex-start; min-height: 44px; padding: 0; border: 0; background: transparent; font-family: inherit; font-size: 15px; font-weight: 600; color: #0E0E10; text-decoration: underline; text-underline-offset: 4px; cursor: pointer">Změnit odpověď</button>
    ` : ''}
  </div>

  <section aria-labelledby="co-je" style="margin: 32px 16px 32px; padding: 18px; border-radius: 8px; background: #F3F3F5; display: flex; flex-direction: column; gap: 10px">
    <h2 id="co-je" style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700">Co je Klub mladých diváků</h2>
    <p style="margin: 0; font-size: 15px; line-height: 1.45">Kurátoři každý měsíc vyberou pár představení, která stojí za večer, a chodí na ně s ostatními. Pro všechny od 19 do 26.</p>
    <a href="#/Vyber" style="display: flex; align-items: center; min-height: 44px; font-size: 16px; font-weight: 600; text-underline-offset: 4px">Prohlédnout výběr na říjen</a>
  </section>
</div>`;
}
