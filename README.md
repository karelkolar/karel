# PROPAD

Webová instalace / hra: nekonečně padající kovová kulička skrz snímky
propadlin. Pád je čtený jako tělesný ekvivalent algoritmické „rychlosti
obrazů" — vertigo jako afekt datové kultury. Kulička je fixní bod v centru
scény, kolem kterého lze kroužit tažením myši nebo prstu; kolem ní padá
nekonečný tunel rámů (propadlin) a datového prachu, prostředí se nepatrně
proměňuje (barva, intenzita, glitch pulsy), ale struktura zůstává stejná —
nekonečno jako rychlost, ne jako vzdálenost.

## Ovládání

- **Tažení myší / prstem** — kroužení kamery kolem padající kuličky, pohled
  ze všech stran.
- **Kolečko myši** — přiblížení / oddálení.
- Tlačítko **i** vpravo dole znovu zobrazí úvodní poznámku.

## Spuštění

Aplikace je čistě statická (HTML/CSS/JS modul, Three.js vendorováno lokálně
v `vendor/`), ale moderní prohlížeče blokují ES moduly načtené přímo z
`file://`, takže je potřeba jednoduchý lokální server. Repozitář obsahuje
vlastní bezzávislostní server (`server.js`), který potřebuje jen holý Node.js
— nic se nestahuje z npm:

```bash
npm start
# nebo přímo, pokud nemáš npm v PATH (např. stažený jen "standalone binary"):
node server.js
# nebo, pokud máš Python:
python3 -m http.server 8080
```

a otevřít `http://localhost:8080`.

Nasazení na jakýkoli statický hosting (GitHub Pages, Netlify, Vercel) funguje
beze změny — stačí publikovat obsah repozitáře.

## Technická poznámka

`main.js` obsahuje celou logiku scény (Three.js): kulička zůstává ve středu
souřadnic, tunel rámů a prachové pole padají směrem k ní a po opuštění
zorného pole se recyklují zpět nad kuličku — proto je pád nekonečný bez
ztráty přesnosti souřadnic. Kamera je sférická, ovládaná pointer/wheel
eventy s doztlumením (damping) a pomalým samovolným driftem, když uživatel
nezasahuje.

---

# Klub mladých diváků – Young adult (`kmd/`)

Mobilní webová aplikace klubu pro diváky 19–26 let, postavená podle designu
(30 obrazovek, dva testovací scénáře, desktopové pohledy pro kurátory a město).
Spuštění: otevři `kmd/index.html` dvojklikem v prohlížeči. Node.js ani server
není potřeba (fonty se stahují z internetu).

- `kmd/screens/*.js` – jedna obrazovka = jeden skript: třída `Component`
  (stav a data) a funkce `view` (HTML jako šablonový řetězec).
- `kmd/core.js`, `kmd/app.js`, `kmd/manifest.js` – základ obrazovek, router a sdílený stav
  členství (po otevření členské karty se Výběr a Detail přepnou na pohled
  člena; odhlášení je v přehledu). Klasické skripty (ne ES moduly), aby to šlo
  i z `file://`. Žádný build ani závislosti.
- `kmd/manifest.js` – seznam obrazovek a scénářů pro `#/prehled`.
- Vstupy do scénářů: `#/A0-Plakat` (zájemkyně s plakátem) a `#/B0-Zprava`
  (nováček přes ambasadora). Desktopové pohledy: `#/Dashboard`,
  `#/Admin-nabidka`, `#/Datovy-model`.

Data jsou zatím ilustrativní (stejná jako v designu), bez serveru; prodej
lístků a export dat pro město jsou v designu popsané, ale backend zde není.
