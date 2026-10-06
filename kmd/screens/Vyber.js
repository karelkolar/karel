import { Screen, esc } from "../core.js";

export const title = "Výběr měsíce";
export const defaults = {"clen":false,"accent":"#2B3BFF"};
export const css = `body{margin:0}
a{color:#0E0E10}a:hover{color:#2B3BFF}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #2B3BFF;outline-offset:2px}`;

export class Component extends Screen {
  constructor(props) {
    super(props);
    this.state = { genre: 'Vše', mood: 'Vše', day: 'Vše', price: 'Jakákoli', open: true };
  }
  renderVals() {
    const all = [
      { title: 'Všichni moji bývalí', venue: 'Divadlo v Dlouhé', date: 'čt 8. 10.', time: '19:30', day: 'Čt', price: 150, regular: 420, genre: 'Činohra', mood: 'k smíchu', amb: 'Tadeáš K.', ini: 'TK', av: '#FFD9C7', avFg: '#6B2A10', why: 'Komedie o bývalých, u které se smějete nahlas a cestou domů trochu přemýšlíte.' },
      { title: 'Tma pod hladinou', venue: 'Studio Ypsilon', date: 'so 10. 10.', time: '20:00', day: 'So', price: 120, regular: 350, genre: 'Autorské', mood: 'k přemýšlení', amb: 'Nela P.', ini: 'NP', av: '#D7F0E4', avFg: '#0B4D37', why: 'Skoro beze slov, a stejně jsem odcházela s hlavou úplně plnou.' },
      { title: 'Hamlet v kanceláři', venue: 'Švandovo divadlo', date: 'út 13. 10.', time: '19:30', day: 'Út', price: 140, regular: 390, genre: 'Činohra', mood: 'k přemýšlení', amb: 'Ema V.', ini: 'EV', av: '#E4E2FF', avFg: '#2A2380', why: 'Shakespeare v open spacu. Kdo někdy brigádničil v korporátu, pochopí.' },
      { title: 'Lehkost', venue: 'Divadlo pod Palmovkou', date: 'pá 16. 10.', time: '19:00', day: 'Pá', price: 180, regular: 480, genre: 'Nový cirkus', mood: 'na podívanou', amb: 'Matyáš D.', ini: 'MD', av: '#FFF0B8', avFg: '#5C4600', why: 'Hodina a půl, kdy zapomeneš na telefon. Akrobacie, u které se tají dech.' },
      { title: 'Noční linka', venue: 'Divadlo Na zábradlí', date: 'st 21. 10.', time: '20:00', day: 'St', price: 100, regular: 300, genre: 'Autorské', mood: 'k smíchu', amb: 'Kryštof H.', ini: 'KH', av: '#FFD6E3', avFg: '#7A1236', why: 'Absurdní jízda noční Prahou. Hrají to lidi v našem věku a je to znát.' },
      { title: 'Ptáci nad Vyšehradem', venue: 'Divadlo na Vinohradech', date: 'ne 25. 10.', time: '18:00', day: 'Ne', price: 160, regular: 450, genre: 'Tanec', mood: 'na podívanou', amb: 'Nela P.', ini: 'NP', av: '#D7F0E4', avFg: '#0B4D37', why: 'Tanec pro lidi, co si myslí, že tanci nerozumí. Byla jsem jedna z nich.' },
      { title: 'Co zbylo po tátovi', venue: 'Divadlo Rokoko', date: 'čt 29. 10.', time: '19:30', day: 'Čt', price: 130, regular: 360, genre: 'Autorské', mood: 'k dojetí', amb: 'Ema V.', ini: 'EV', av: '#E4E2FF', avFg: '#2A2380', why: 'Tichá věc o rodině. Vezmi někoho, s kým pak můžeš jít ven a mluvit.' },
      { title: 'Večeře o pěti chodech', venue: 'Divadlo ABC', date: 'so 31. 10.', time: '19:00', day: 'So', price: 200, regular: 520, genre: 'Činohra', mood: 'k smíchu', amb: 'Tadeáš K.', ini: 'TK', av: '#FFD9C7', avFg: '#6B2A10', why: 'Pět chodů, šest postav a jedna katastrofa. Ideální první divadlo s partou.' }
    ];
    const st = this.state;
    const limit = st.price === 'do 120 Kč' ? 120 : st.price === 'do 150 Kč' ? 150 : 9999;
    const shows = all.filter((s) =>
      (st.genre === 'Vše' || s.genre === st.genre) &&
      (st.mood === 'Vše' || s.mood === st.mood) &&
      (st.day === 'Vše' || s.day === st.day) &&
      s.price <= limit
    );
    const chips = (key, labels) => labels.map((label) => {
      const on = st[key] === label;
      return {
        label,
        pressed: on ? 'true' : 'false',
        bg: on ? '#0E0E10' : '#FFFFFF',
        fg: on ? '#FFFFFF' : '#0E0E10',
        pick: () => this.setState({ [key]: label })
      };
    });
    const activeCount = ['genre', 'mood', 'day'].filter((k) => st[k] !== 'Vše').length + (st.price !== 'Jakákoli' ? 1 : 0);
    return {
      accent: this.props.accent ?? '#2B3BFF',
      clen: !!this.props.clen,
      host: !this.props.clen,
      shows,
      count: shows.length,
      empty: shows.length === 0,
      genreChips: chips('genre', ['Vše', 'Činohra', 'Autorské', 'Tanec', 'Nový cirkus']),
      moodChips: chips('mood', ['Vše', 'k smíchu', 'k přemýšlení', 'k dojetí', 'na podívanou']),
      dayChips: chips('day', ['Vše', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']),
      priceChips: chips('price', ['Jakákoli', 'do 120 Kč', 'do 150 Kč']),
      anyActive: activeCount > 0,
      filtersOpen: st.open,
      filtersOpenStr: st.open ? 'true' : 'false',
      filterLabel: st.open ? 'Skrýt filtry' : (activeCount ? 'Filtry (' + activeCount + ')' : 'Filtry'),
      toggleFilters: () => this.setState({ open: !st.open }),
      reset: () => this.setState({ genre: 'Vše', mood: 'Vše', day: 'Vše', price: 'Jakákoli' })
    };
  }
}

export function view(v, h) {
  return `<div style="width: 390px; min-height: 3300px; box-sizing: border-box; background: #FFFFFF; color: #0E0E10; font-family: 'Instrument Sans', system-ui, sans-serif; display: flex; flex-direction: column">
  <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 12px 16px 20px; min-height: 64px; box-sizing: border-box">
    <a href="#/Main" style="display: flex; flex-direction: column; gap: 2px; text-decoration: none">
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: #0E0E10">Klub mladých diváků</span>
      <span style="font-size: 14px; font-weight: 600; color: ${esc(v.accent)}; text-transform: uppercase; letter-spacing: 0.08em">Young adult</span>
    </a>
    <a href="#/Karta" aria-label="Moje členská karta" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: #0E0E10">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 15h4"></path><rect x="14" y="9" width="4" height="4"></rect></svg>
    </a>
  </header>

  <a href="#/Vecery" style="margin: 0 16px; padding: 16px; border-radius: 8px; background: ${esc(v.accent)}; color: #FFFFFF; text-decoration: none; display: flex; flex-direction: column; gap: 10px">
    <span style="display: flex; justify-content: space-between; align-items: center">
      <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em">Společný večer tento týden</span>
      <span style="font-size: 14px; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,0.2)">4 volná místa</span>
    </span>
    <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; line-height: 1.15">Všichni moji bývalí</span>
    <span style="display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 15px; line-height: 1.4">
      <span>čt 8. 10. · sraz 19:00 u vchodu s Tadeášem</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </span>
  </a>

  ${v.clen ? `
    <a href="#/LM" style="margin: 10px 16px 0; padding: 14px 16px; border-radius: 8px; background: #0E0E10; color: #FFFFFF; text-decoration: none; display: flex; align-items: center; justify-content: space-between; gap: 12px">
      <span style="display: flex; flex-direction: column; gap: 4px">
        <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #B9C0FF">Last-minute · jen pro členy</span>
        <span style="font-size: 16px; font-weight: 600; line-height: 1.35">Dnes 19:30 · 4 místa za 90 Kč</span>
        <span style="font-size: 14px; color: #D4D4DA">Rezervace do 17:00</span>
      </span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </a>
  ` : ''}
  ${v.host ? `
    <a href="#/LM-host" style="margin: 10px 16px 0; padding: 14px 16px; border-radius: 8px; background: #0E0E10; color: #FFFFFF; text-decoration: none; display: flex; align-items: center; justify-content: space-between; gap: 12px">
      <span style="display: flex; gap: 12px; align-items: flex-start">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-top: 2px"><rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>
        <span style="display: flex; flex-direction: column; gap: 4px">
          <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #B9C0FF">Last-minute · jen pro členy</span>
          <span style="font-size: 15px; line-height: 1.4">Volná místa na dnešek za pár korun. Uvidíš je po přihlášení.</span>
        </span>
      </span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </a>
  ` : ''}

  <div style="display: flex; flex-direction: column; gap: 8px; padding: 32px 20px 8px">
    <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 40px; line-height: 1; letter-spacing: -0.03em">Výběr na říjen</h1>
    <p style="margin: 0; font-size: 16px; line-height: 1.45; color: #3A3A42">Osm inscenací z osmi pražských scén. Vybrali je kurátoři a ambasadoři klubu, ne algoritmus.</p>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px 0 20px">
    <span aria-live="polite" style="font-size: 15px; font-weight: 600">${esc(v.count)} z 8 představení</span>
    <button type="button" ${h('click', v.toggleFilters)} aria-expanded="${esc(v.filtersOpenStr)}" style="display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 12px; border: 0; background: transparent; font-family: inherit; font-size: 15px; font-weight: 600; color: #0E0E10; cursor: pointer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4"></path></svg>
      <span>${esc(v.filterLabel)}</span>
    </button>
  </div>

  ${v.filtersOpen ? `
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 8px 0 8px">
      <div role="group" aria-labelledby="f-zanr" style="display: flex; flex-direction: column; gap: 8px">
        <span id="f-zanr" style="padding: 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Žánr</span>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 0 20px 4px">
          ${v.genreChips.map((ch) => `
            <button type="button" aria-pressed="${esc(ch.pressed)}" ${h('click', ch.pick)} style="flex-shrink: 0; min-height: 44px; padding: 0 16px; border-radius: 22px; border: 1.5px solid #0E0E10; background: ${esc(ch.bg)}; color: ${esc(ch.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap">${esc(ch.label)}</button>
          `).join('')}
        </div>
      </div>
      <div role="group" aria-labelledby="f-nalada" style="display: flex; flex-direction: column; gap: 8px">
        <span id="f-nalada" style="padding: 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Nálada</span>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 0 20px 4px">
          ${v.moodChips.map((ch) => `
            <button type="button" aria-pressed="${esc(ch.pressed)}" ${h('click', ch.pick)} style="flex-shrink: 0; min-height: 44px; padding: 0 16px; border-radius: 22px; border: 1.5px solid #0E0E10; background: ${esc(ch.bg)}; color: ${esc(ch.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap">${esc(ch.label)}</button>
          `).join('')}
        </div>
      </div>
      <div role="group" aria-labelledby="f-den" style="display: flex; flex-direction: column; gap: 8px">
        <span id="f-den" style="padding: 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Den v týdnu</span>
        <div style="display: flex; gap: 6px; overflow-x: auto; padding: 0 20px 4px">
          ${v.dayChips.map((ch) => `
            <button type="button" aria-pressed="${esc(ch.pressed)}" ${h('click', ch.pick)} style="flex-shrink: 0; min-width: 44px; min-height: 44px; padding: 0 12px; border-radius: 22px; border: 1.5px solid #0E0E10; background: ${esc(ch.bg)}; color: ${esc(ch.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap">${esc(ch.label)}</button>
          `).join('')}
        </div>
      </div>
      <div role="group" aria-labelledby="f-cena" style="display: flex; flex-direction: column; gap: 8px">
        <span id="f-cena" style="padding: 0 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5A5A62">Členská cena</span>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 0 20px 4px">
          ${v.priceChips.map((ch) => `
            <button type="button" aria-pressed="${esc(ch.pressed)}" ${h('click', ch.pick)} style="flex-shrink: 0; min-height: 44px; padding: 0 16px; border-radius: 22px; border: 1.5px solid #0E0E10; background: ${esc(ch.bg)}; color: ${esc(ch.fg)}; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap">${esc(ch.label)}</button>
          `).join('')}
        </div>
      </div>
      ${v.anyActive ? `
        <div style="padding: 0 20px">
          <button type="button" ${h('click', v.reset)} style="min-height: 44px; padding: 0; border: 0; background: transparent; font-family: inherit; font-size: 15px; font-weight: 600; color: #0E0E10; text-decoration: underline; text-underline-offset: 4px; cursor: pointer">Zrušit všechny filtry</button>
        </div>
      ` : ''}
    </div>
  ` : ''}

  <ul style="list-style: none; margin: 0; padding: 16px 16px 40px; display: flex; flex-direction: column; gap: 12px">
    ${v.shows.map((s) => `
      <li>
        <a href="#/Detail" style="display: flex; flex-direction: column; gap: 12px; padding: 18px; border: 1px solid #D9D9DE; border-radius: 8px; text-decoration: none; color: #0E0E10; background: #FFFFFF">
          <span style="display: flex; gap: 6px; flex-wrap: wrap">
            <span style="padding: 4px 10px; border-radius: 999px; border: 1px solid #0E0E10; font-size: 14px; font-weight: 600">${esc(s.genre)}</span>
            <span style="padding: 4px 10px; border-radius: 999px; background: #ECEEFF; color: #1F2BB8; font-size: 14px; font-weight: 600">${esc(s.mood)}</span>
          </span>
          <span style="display: flex; flex-direction: column; gap: 4px">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; line-height: 1.1; letter-spacing: -0.01em">${esc(s.title)}</span>
            <span style="font-size: 15px; color: #3A3A42">${esc(s.venue)}</span>
          </span>
          <span style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px">
            <span style="font-size: 16px; font-weight: 600">${esc(s.date)} · ${esc(s.time)}</span>
            <span style="display: flex; align-items: baseline; gap: 6px">
              <span style="font-size: 14px; color: #5A5A62; text-decoration: line-through">${esc(s.regular)} Kč</span>
              <span style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700">${esc(s.price)} Kč</span>
            </span>
          </span>
          <span style="display: flex; gap: 12px; align-items: flex-start; padding-top: 12px; border-top: 1px solid #E8E8EC">
            <span aria-hidden="true" style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 20px; background: ${esc(s.av)}; color: ${esc(s.avFg)}; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600">${esc(s.ini)}</span>
            <span style="display: flex; flex-direction: column; gap: 2px">
              <span style="font-size: 15px; line-height: 1.4">„${esc(s.why)}“</span>
              <span style="font-size: 14px; color: #5A5A62">${esc(s.amb)}, ambasador/ka</span>
            </span>
          </span>
        </a>
      </li>
    `).join('')}
  </ul>

  ${v.empty ? `
    <div style="margin: 0 16px 40px; padding: 24px; border-radius: 8px; background: #F3F3F5; display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <span style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700">Tenhle měsíc nic takového</span>
      <span style="font-size: 15px; line-height: 1.45; color: #3A3A42">Výběr je schválně malý. Zkus uvolnit některý filtr.</span>
      <button type="button" ${h('click', v.reset)} style="min-height: 48px; padding: 0 20px; border: 0; border-radius: 6px; background: #0E0E10; color: #FFFFFF; font-family: inherit; font-size: 16px; font-weight: 600; cursor: pointer">Zrušit filtry</button>
    </div>
  ` : ''}

  <nav aria-label="Hlavní navigace" style="position: sticky; bottom: 0; margin-top: auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: #FFFFFF; border-top: 1px solid #E2E2E6; padding: 6px 4px 18px">
    <a href="#/Vyber" aria-current="page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 56px; text-decoration: none; color: ${esc(v.accent)}; font-size: 14px; font-weight: 600">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1"></rect><rect x="13" y="4" width="7" height="7" rx="1"></rect><rect x="4" y="13" width="7" height="7" rx="1"></rect><rect x="13" y="13" width="7" height="7" rx="1"></rect></svg>
      Výběr
    </a>
    <a href="#/Vecery" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 56px; text-decoration: none; color: #5A5A62; font-size: 14px; font-weight: 600">
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
