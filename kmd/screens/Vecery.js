import { Screen, esc } from "../core.js";

export const title = "Společné večery";
export const defaults = {"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { rsvp: {} };
  }
  renderVals() {
    const base = [
      { id: 'a', dow: 'čt', day: '8', month: 'října', title: 'Všichni moji bývalí', venue: 'Divadlo v Dlouhé', time: '19:30', meet: '19:00 u vchodu', after: 'Posezení poblíž, kdo chce', amb: 'Tadeáš K.', ini: 'TK', av: '#FFD9C7', avFg: '#6B2A10', going: 12, cap: 16 },
      { id: 'b', dow: 'so', day: '10', month: 'října', title: 'Tma pod hladinou', venue: 'Studio Ypsilon', time: '20:00', meet: '19:40 ve foyer', after: 'Posezení poblíž, místo řekne Nela', amb: 'Nela P.', ini: 'NP', av: '#D7F0E4', avFg: '#0B4D37', going: 7, cap: 12 },
      { id: 'c', dow: 'st', day: '21', month: 'října', title: 'Noční linka', venue: 'Divadlo Na zábradlí', time: '20:00', meet: '19:30 u pokladny', after: 'Posezení v okolí, stůl zamluví Kryštof', amb: 'Kryštof H.', ini: 'KH', av: '#FFD6E3', avFg: '#7A1236', going: 15, cap: 16 },
      { id: 'd', dow: 'ne', day: '25', month: 'října', title: 'Ptáci nad Vyšehradem', venue: 'Divadlo na Vinohradech', time: '18:00', meet: '17:40 u vchodu', after: 'Procházka a čaj poblíž náměstí Míru', amb: 'Nela P.', ini: 'NP', av: '#D7F0E4', avFg: '#0B4D37', going: 4, cap: 14 }
    ];
    const rsvp = this.state.rsvp;
    const set = (id, v) => this.setState({ rsvp: Object.assign({}, rsvp, { [id]: v }) });
    const events = base.map((e) => {
      const mine = rsvp[e.id] || 'none';
      const extra = mine === 'solo' ? 1 : mine === 'plus' ? 2 : 0;
      const going = e.going + extra;
      const left = e.cap - going;
      return Object.assign({}, e, {
        going,
        pct: Math.round((going / e.cap) * 100) + '%',
        leftLabel: left <= 0 ? 'Plno' : left === 1 ? 'Poslední místo' : 'Zbývá ' + left + ' míst',
        leftColor: left <= 2 ? '#B0351C' : '#3A3A42',
        isNone: mine === 'none',
        isGoing: mine !== 'none',
        isPlus: mine === 'plus',
        canPlus: e.cap - e.going >= 2,
        noPlus: e.cap - e.going < 2,
        goingLabel: mine === 'plus' ? 'Jdeš s kamarádem. Místa držíme pro oba.' : 'Jdeš. ' + e.amb.split(' ')[0] + ' tě u vchodu vyhlíží.',
        solo: () => set(e.id, 'solo'),
        plus: () => set(e.id, 'plus'),
        cancel: () => set(e.id, 'none')
      });
    });
    return { accent: this.props.accent ?? '#2B3BFF', events };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; min-height: 2200px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 12px 16px 20px; min-height: 64px; box-sizing: border-box">
    <a href="#/Main" style="display: flex; flex-direction: column; gap: 2px; text-decoration: none">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: #0E0E10">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </a>
  </header>

  <div style="display: flex; flex-direction: column; gap: 8px; padding: 20px 20px 8px">
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 40px; line-height: 1; letter-spacing: -0.03em">Společné večery</h1>
    <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Představení a potom posezení. Vždycky s někým z ambasadorů, takže nepřijdeš mezi cizí.</p>
  </div>

  <ul style="list-style: none; margin: 0; padding: 16px 16px 32px; display: flex; flex-direction: column; gap: 16px">
    ${v.events.map((e) => `
      <li style="border: 1px solid #D9D9DE; border-radius: 8px; overflow: hidden">
        <div style="display: flex; gap: 14px; padding: 18px 18px 0">
          <div style="flex-shrink: 0; width: 56px; padding: 8px 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; display: flex; flex-direction: column; align-items: center; gap: 2px">
            <span style="font-size: 14px; font-weight: 600; text-transform: uppercase">${esc(e.dow)}</span>
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; line-height: 1">${esc(e.day)}</span>
            <span style="font-size: 14px">${esc(e.month)}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px; min-width: 0">
            <a href="#/Detail" style="display: flex; align-items: center; min-height: 44px; font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; line-height: 1.1; text-decoration: none">${esc(e.title)}</a>
            <span style="font-size: 15px; color: #3A3A42">${esc(e.venue)} · ${esc(e.time)}</span>
          </div>
        </div>

        <dl style="margin: 0; padding: 14px 18px 0; display: flex; flex-direction: column; gap: 8px">
          <div style="display: flex; gap: 10px; align-items: flex-start">
            <dt style="flex-shrink: 0; width: 64px; font-size: 14px; color: #5A5A62">Sraz</dt>
            <dd style="margin: 0; font-size: 15px; line-height: 1.4">${esc(e.meet)}</dd>
          </div>
          <div style="display: flex; gap: 10px; align-items: flex-start">
            <dt style="flex-shrink: 0; width: 64px; font-size: 14px; color: #5A5A62">Potom</dt>
            <dd style="margin: 0; font-size: 15px; line-height: 1.4">${esc(e.after)}</dd>
          </div>
        </dl>

        <div style="display: flex; gap: 12px; align-items: center; margin: 14px 18px 0; padding-top: 14px; border-top: 1px solid #E8E8EC">
          <span aria-hidden="true" style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 20px; background: ${esc(e.av)}; color: ${esc(e.avFg)}; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">${esc(e.ini)}</span>
          <span style="display: flex; flex-direction: column; gap: 2px">
            <span style="font-size: 15px; font-weight: 600">Vede ${esc(e.amb)}</span>
            <span style="font-size: 14px; color: #5A5A62">ambasador/ka klubu</span>
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; padding: 14px 18px 0">
          <span style="display: flex; justify-content: space-between; font-size: 15px">
            <span><strong>${esc(e.going)}</strong> přihlášených</span>
            <span style="color: ${esc(e.leftColor)}; font-weight: 600">${esc(e.leftLabel)}</span>
          </span>
          <div aria-hidden="true" style="height: 6px; border-radius: 3px; background: #E2E2E6; overflow: hidden">
            <div style="height: 6px; width: ${esc(e.pct)}; background: ${esc(v.accent)}"></div>
          </div>
        </div>

        <div style="padding: 16px 18px 18px">
          ${e.isNone ? `
            <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
              <button type="button" ${h('click', e.solo)} style="min-height: 52px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 16px; font-weight: 600; cursor: pointer">Přijdu</button>
              ${e.canPlus ? `
                <button type="button" ${h('click', e.plus)} style="min-height: 52px; border: 2px solid #0E0E10; border-radius: 6px; background: #FFFFFF; color: #0E0E10; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer">Přijdu s kamarádem</button>
              ` : ''}
              ${e.noPlus ? `
                <span aria-disabled="true" style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 52px; border-radius: 6px; background: #E6E6EA; color: #5A5A62; font-size: 14px; font-weight: 600; padding: 0 8px">Na dva už není místo</span>
              ` : ''}
            </div>
          ` : ''}
          ${e.isGoing ? `
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="display: flex; gap: 10px; align-items: center; padding: 12px 14px; border-radius: 6px; background: #E7F5EE; color: #0B4D37; font-size: 15px; font-weight: 600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                <span>${esc(e.goingLabel)}</span>
              </div>
              ${e.isPlus ? `
                <a href="#/Pozvat" style="display: flex; align-items: center; justify-content: center; min-height: 48px; border: 2px solid #0E0E10; border-radius: 6px; font-size: 15px; font-weight: 600; text-decoration: none">Poslat kamarádovi pozvánku</a>
              ` : ''}
              <button type="button" ${h('click', e.cancel)} style="align-self: flex-start; min-height: 44px; padding: 0; border: 0; background: transparent; font-family: inherit; font-size: 15px; font-weight: 600; color: #0E0E10; text-decoration: underline; text-underline-offset: 4px; cursor: pointer">Nakonec nemůžu</button>
            </div>
          ` : ''}
        </div>
      </li>
    `).join('')}
  </ul>

  <nav aria-label="Hlavní navigace" style="position: sticky; bottom: 0; margin-top: auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: #FFFFFF; border-top: 1px solid #E2E2E6; padding: 6px 4px 18px">
    <a href="#/Vyber" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 56px; text-decoration: none; color: #5A5A62; font-size: 14px; font-weight: 600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1"></rect><rect x="13" y="4" width="7" height="7" rx="1"></rect><rect x="4" y="13" width="7" height="7" rx="1"></rect><rect x="13" y="13" width="7" height="7" rx="1"></rect></svg>
      Výběr
    </a>
    <a href="#/Vecery" aria-current="page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 56px; text-decoration: none; color: ${esc(v.accent)}; font-size: 14px; font-weight: 600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"></path></svg>
      Večery
    </a>
    <a href="#/Parta" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 56px; text-decoration: none; color: #5A5A62; font-size: 14px; font-weight: 600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"></circle><circle cx="17" cy="9" r="2.5"></circle><path d="M3 19c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5"></path><path d="M15.5 14.6c2.3.1 4 1.5 4.5 4.4"></path></svg>
      Parta
    </a>
    <a href="#/Karta" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 56px; text-decoration: none; color: #5A5A62; font-size: 14px; font-weight: 600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 15h4"></path><rect x="14" y="9" width="4" height="4"></rect></svg>
      Karta
    </a>
  </nav>
</div>`;
}
