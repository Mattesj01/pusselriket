# Pusselriket — statusrapport och plan

*Skriven 2026-07-06, uppdaterad 2026-07-07 (PWA + publiceringspaket).
Projektmapp: `C:\Claude hemsidor\App spel hemsida`.*

---

## 1. Bakgrund och uppdrag

Uppdraget började med: *"Vill göra ett spel antingen i webbläsaren eller som en app
eller applikation men jag vet inte vad jag ska göra, hjälp mig komma på något med
intervju och tänk själv."*

Arbetsgången hittills: intervju i två steg → konceptval → originalitetskontroll mot
befintliga spel → färdig spelbar första version i en HTML-fil → verifiering (pågår).

Ett uttryckligt krav från dig styr konceptvalet: **spelet får inte redan finnas.**

## 2. Intervjusvaren (kravbilden)

| Fråga | Ditt svar | Konsekvens |
|---|---|---|
| Plattform | **Mobilapp** | Byggs webbaserat först (snabbast att iterera), paketeras som app senare via Capacitor |
| Genre | **Pussel/hjärngympa + Strategi/bygga + Idle/clicker** | Alla tre vävs in i en och samma loop |
| Målgrupp | **Publicera för andra** | Polish, mobilanpassning och en egen twist krävs — inte bara "funkar hemma" |
| Känsla | **Återkomma varje dag** | Daglig rytm à la Wordle: en utmaning per dag + något som växer över tid |

I andra intervjusteget valde du konceptet **Pusselriket** (rekommenderat alternativ)
före "Dagens Torn" (dagligt tower defense) och "Ön" (lugn idle-ö).

## 3. Konceptet: Pusselriket

### Kärnloopen

> Varje dag får **alla spelare i hela världen samma pussel**. Din lösning ger
> resurser. Resurserna bygger ditt **bestående rike**. Riket producerar guld
> **medan du är borta**. Imorgon väntar ny mark. 🧩 → 🏗️ → 💰 → 🌅 → 🧩 …

Pusslet ger anledningen att komma tillbaka varje dag; riket ger känslan av att
långsiktigt växa. Delningsfunktionen (emojikarta av din lösning, som Wordles rutor)
ger spridningsmekaniken som behövs för "publicera för andra".

### Dagens pussel (packningspussel)

- En 7×7-tomt ("dagens mark") med 6 slumpade stenrösen 🪨 i vägen.
- En kö med **11 byggbitar** i fast ordning — polyomino-former (1–4 rutor) med typ:
  **Skog 🌲** (ger trä), **Åker 🌾** (mat), **Gruva 🪨** (sten), **By 🏠** (ger guld direkt).
- Styrning: **tryck på biten = rotera, dra ut den på marken = placera.**
  På mus funkar även hovra-förhandsvisning + klick.
- Bit som inte får plats någonstans hoppas över automatiskt (gratis).
  Därtill **2 frivilliga "släng"** per dag för bitar du inte vill ha.
- Poäng = täckta rutor + 2 × antal helt fyllda rader/kolumner.
- Skörd vid dagens slut: 1 resurs per täckt ruta av respektive typ,
  3 💰 per by-ruta, 2 💰 per full linje.

### Riket (idle-delen)

- Fyra byggnader som kostar pusselresurser + guld och ger **guld/minut**:
  Torp 🏡, Bageri 🍞, Stenbrott ⛏️, Slott 🏰 (dyrt långsiktigt mål).
- Kostnaderna växer per nivå (×1,6 resurser, ×1,9 guld) — klassisk idle-kurva.
- **Offlineskörd:** guld tickar in medan appen är stängd, tak 12 timmar
  ("🌙 Medan du var borta: +X 💰"). Taket uppmuntrar ~2 besök/dag.
- Byn ritas som en växande emoji-scen — fler byggnadsnivåer = större by.
- Streak 🔥 (dagar i rad) och dagnummer ("Dag 1 = 2026-07-06").

### Originaliteten — kontrollerad

Webbsökning genomförd 2026-07-06. Det trånga: merge-pussel + rikesbygge finns redan
(Mergest Kingdom; Kingdoms: Merge & Build). Det lediga: **dagligt delat pussel
(samma för alla, à la Wordle) vars resultat bygger ett bestående idle-rike** —
den kombinationen hittades inte i någon sökning. Det är spelets identitet.

Brasklapp: ingen sökning kan garantera att inget av miljontals indiespel liknar
detta; men inget etablerat eller hittbart spel gör det. En extra namn- och
konceptsökning görs innan publicering (se plan, steg 5).

Källor: [Mergest Kingdom på CrazyGames](https://www.crazygames.com/game/mergest-kingdom),
[Kingdoms: Merge & Build på App Store](https://apps.apple.com/us/app/kingdoms-merge-build/id1636872154),
[Thinky Games om dagliga pussel](https://thinkygames.com/features/tired-of-wordle-and-connections-try-these-6-fun-daily-puzzle-games-that-will-get-you-thinking/).

## 4. Tekniska val och varför

| Val | Motivering |
|---|---|
| **En enda HTML-fil**, ren vanilla JS/CSS, noll beroenden | Snabbast att iterera, inget byggsteg, funkar direkt i mobilens webbläsare. Ramverk läggs till först om filen blir ohanterlig. |
| **Datumfröad slumpgenerator** (xmur3 + mulberry32) | "Samma pussel för alla" utan server: fröet är dagens datum, så alla klienter genererar identisk bana. Noll backendkostnad. |
| **localStorage** för allt tillstånd | Räcker för enspelarläge. Moln-synk är ett v2-beslut. |
| **Offlineinkomst via tidsstämpel** | `guld += takt × min(förfluten tid, 12 h)` vid uppstart — ingen bakgrundsprocess behövs. |
| **Emoji som all grafik** | Noll asset-pipeline, laddar direkt, ser charmigt ut. Riktig grafik är ett senare beslut. |
| **Svensk allmoge-designpalett** | Falurött, granskogsgrönt, veteguld, linne — grundat i ämnet (svenskt rike/by) i stället för AI-standardutseenden. Signaturdetalj: giltig placering lyser som **lyktsken**. |
| **Webbaserat trots "mobilapp"-valet** | Pragmatiska vägen: testbart i mobilens webbläsare direkt → PWA (hemskärmsikon) → Capacitor-inpackning för Google Play/App Store. Samma kodbas hela vägen. |

## 5. Vad som är byggt (klart)

**`index.html`** (~1000 rader) innehåller hela spelet:

- Pusselvyn: spelplan, bitbricka (aktuell bit + 2 kommande), rotera/släng-knappar,
  dra-och-släpp med pekarhändelser (finger och mus), automatisk överhoppning,
  resultatkort "Dagens skörd" med delningsknapp.
- Riksvyn: emoji-by, guldräknare som tickar varje sekund, offlineskörd-notis,
  byggnadskort med kostnader (saknade resurser rödmarkeras), uppgraderingsknappar.
- Delning: `navigator.share` på mobil, urklipp som reserv. Format:
  `Pusselriket dag N 🏰 / ⭐ X poäng · 🔥 Y i rad / [7 rader emojikarta]`.
- Flikar (🧩 Dagens pussel / 🏰 Riket), toast-notiser, streaklogik,
  ny-dag-detektering (sidan laddar om vid midnatt), sparning var 15:e sekund
  och vid sidstängning.
- Tillgänglighetsgolv: riktiga knappar, synligt fokus, `aria-live` på notiser,
  `prefers-reduced-motion` respekteras.
- **Inbyggt självtest:** öppna sidan med `#test` → 9 kontroller loggas i konsolen
  (determinism, rotationsgeometri, placeringsregler, linjeräkning, offlinetak).
- **Hjälpruta "Så spelar du"** visas automatiskt för nya spelare (ingen sparfil =
  ny spelare) och kan öppnas igen med ?-knappen i sidhuvudet — krävs när
  främlingar ska spela utan instruktioner.
- **Stödknapp** ("☕ Gillar du Pusselriket? Stöd bygget!") i riksvyn, styrd av
  konstanten `STOD_URL` överst i filen — tom sträng döljer den. Klistra in en
  Ko-fi/itch-länk så syns den. Grunden för donationsintäkter.

### Publiceringspaketet (nytt 2026-07-07)

| Fil | Roll |
|---|---|
| `manifest.webmanifest` | PWA-manifest: namn, färger, ikoner, standalone-läge → "Lägg till på hemskärmen" ger äkta appkänsla |
| `sw.js` | Service worker: nätet först, cache som reserv → spelet funkar offline efter första besöket |
| `icon-512.png`, `icon-192.png`, `apple-touch-icon.png` | Appikoner (🏰 på falurött, renderade med headless Chrome, nedskalade med GDI+; 512:an ryms i Androids maskable-zon) |
| `pusselriket-webb.zip` | Allt ovan + spelet, redo att laddas upp till itch.io eller valfritt webbhotell |

Namnkollen (plan steg 5) är **gjord 2026-07-07**: ingen app eller spel som heter
"Pusselriket" hittades — närmast är indiestudion "Pusselbit Games", ingen krock.

### Balansrattar (samlade överst i filen, avsedda att skruvas)

| Konstant | Värde | Betydelse |
|---|---|---|
| `START_DATUM` | 2026-07-06 | Dag 1 |
| `PLAN_N` / `ANTAL_BLOCK` | 7 / 6 | Planstorlek / stenrösen |
| `ANTAL_BITAR` / `ANTAL_SLANG` | 11 / 2 | Kölängd / frivilliga släng |
| `GULD_PER_HUS` / `GULD_PER_LINJE` | 3 / 2 | Guldskörd |
| `OFFLINE_TAK_MIN` | 720 | Offlinetak (12 h) |
| Startförråd | 5🌲 5🌾 5🪨 | Nya spelare börjar med lite resurser så dag 1 alltid räcker till första Torpet |
| `KOSTNAD_VAXT` / `GULD_VAXT` | 1,6 / 1,9 | Kostnadskurvor per nivå |
| Bitkö | minst 3 av varje resurs | + 2 slumpade slots (50 % by-chans) — typbalanserad så ingen dag saknar t.ex. skog |
| Byggnader | Torp +1, Bageri +2, Stenbrott +3, Slott +10 💰/min | Grundkostnader: 8🌲6🌾 · 14🌾6🌲+30💰 · 12🪨8🌲+60💰 · 18/18/18+400💰 |

Medvetna v1-förenklingar är markerade med `ponytail:`-kommentarer i koden
(ingen ångra-knapp; ingen spelbarhetskontroll av stenplaceringen — samma för alla ändå).

## 6. Verifieringsläge — KLART (2026-07-07)

Webbläsartillägget (Claude in Chrome) var inte anslutet, så verifieringen kördes
i två andra spår. **Alla kontroller är gröna:**

1. **Nodbaserat logiktest** (`speltest.js` i sessionens scratchpad) — läser spelets
   riktiga kod ur `index.html`, stubbar DOM:en och spelar igenom ett helt parti.
   **Resultat: ALLA SPELTEST OK** — skördebokföring, poängformel, streak,
   delningstextens format, uppgraderingsbokföring, omladdning-samma-dag.
   Testet hittade två äkta balansfel på vägen som är åtgärdade:
   - dagens bitkö kunde sakna en resurstyp → kön typbalanserades (minst 3 av varje);
   - dag 1 räckte ändå inte alltid till en byggnad → startförråd 5🌲5🌾5🪨 + billigare Torp (8🌲6🌾).
2. **Riktig Chrome (headless):** sidan kör utan konsolfel, inbyggda självtestet
   loggar `SJÄLVTEST: 9/9 OK`. Skärmdumpar av **båda vyerna i äkta 390 px bredd**
   ser rätt ut — hela pusselvyn ryms på en telefonskärm utan scroll.
   - Mätfälla dokumenterad: headless Chrome på Windows har ~500 px minsta
     fönsterbredd, så `--window-size=390` ger i själva verket 484 px viewport och
     beskuren bild. Lösning: rendera sidan i en 390 px bred iframe och skärmdumpa den.
3. **Overifierat (kräver riktig enhet):** känslan i dra-och-släpp med finger samt
   `navigator.share` på mobil. Logiken bakom är testad, men handkänslan är inte det.
4. **PWA-verifiering (2026-07-07):** service workern testas i Node med samma
   stubbmönster (`swtest.js` i scratchpad) mot den riktiga lokala servern —
   install cachar alla 6 filer (404 hade gett fel), offline-hämtning faller
   tillbaka på cachen (även med query-sträng), okänd sida offline ger `index.html`.
   **ALLA SW-TEST OK.** Självtestet 9/9 även efter ändringarna, noll konsolfel.
   Skärmdumpar i 390 px: hjälprutan, pusselvyn och riksvyn ser alla rätt ut.
   - Skärmdumpen hittade en äkta bugg: `hidden`-attributet förlorar mot
     författar-CSS `display:block` — stödknappen syntes fast den skulle vara dold.
     Fixad med `.stod[hidden]{display:none}` (samma gardering som `#hjalp` redan hade).
   - Mätfälla 2: headless Chrome kan inte invänta service worker-aktivering
     (SW-tråden kör i realtid, sidan dumpas efter virtuell tid) — därför Node-testet.

## 7. Plan framåt, i ordning

**Klart i detta arbetspass:** logiktest gröna (steg 1), visuell verifiering i
390 px (steg 2), projektminne sparat (steg 3), slutrapport lämnad (steg 4).

**Klart 2026-07-07:** namnkoll (steg 5 — "Pusselriket" är ledigt), PWA-paketering
(steg 6 — manifest, service worker, ikoner, allt verifierat), hjälpruta för nya
spelare, stödknapp som intäktsgrund, zip redo för uppladdning.

**Därefter (kräver ditt OK eller din medverkan):**

6b. **Publicera online — KLART 2026-07-07.** Spelet är LIVE på
   **https://mattesj01.github.io/pusselriket/** (repo: github.com/Mattesj01/pusselriket,
   GitHub Pages på main). Verifierat mot den publika adressen: HTTP 200, självtest
   9/9, alla PWA-filer serveras, skärmdump ser rätt ut. Uppdatera spelet =
   committa + `git push` → live inom ~1 minut. Donationsknappen är AKTIV sedan
   2026-07-07: `STOD_URL = https://ko-fi.com/mattias01`. Kvar: itch.io-uppladdning
   (användarens konto; `pusselriket-webb.zip` innehåller allt inkl. Ko-fi-knappen).
6c. **Intäktsmodell** — donationslänk i `STOD_URL` (Ko-fi/itch) är byggd och klar;
   annonser är realistiska först i mobilappen (AdMob via Capacitor) eller via
   spelportaler (Poki/CrazyGames tar emot spel och delar annonsintäkt).
7. **Riktig mobilapp** — Capacitor-inpackning av samma kod → Google Play
   (engångsavgift ~25 USD) och/eller App Store (99 USD/år, kräver Mac för
   signering eller molntjänst). Play Store är det enklare förstasteget.
8. **Balansjustering efter riktigt speltest** — du spelar några dagar; rattarna
   i tabellen ovan skruvas efter hur det känns (för snålt/för generöst).
9. **Idéer parkerade för v2** (medvetet INTE byggda nu): topplista/jämför med
   vänner (kräver backend), fler byggnader och dekorationer, ljud,
   veckoutmaningar, riktig grafik i stället för emoji.

## 8. Risker och öppna frågor

- **Svårighetsgraden är ogissad** — packningspusslets känsla avgörs av riktigt
  spelande, inte av tester. Därför ligger alla siffror som rattar.
- **Vissa dagar kan bli lätta/svåra** — stenplaceringen kvalitetskontrolleras
  inte. Accepterat: banan är samma för alla, så tävlingen förblir rättvis.
- ~~**Namnet** "Pusselriket" är inte kollisionskollat än~~ — kollat 2026-07-07, ledigt.
- **Delning på iOS-webb** — `navigator.share` funkar i Safari, men PWA/Capacitor-
  beteendet ska verifieras på riktig enhet innan butikspublicering.
- **Midnattsbyte med öppen flik** löses just nu med omladdning av sidan —
  acceptabelt v1-beteende, kan göras mjukare senare.

## 9. Så provar du spelet själv

- **På datorn:** dubbelklicka på `index.html` — allt funkar direkt från filen.
  Hovra över planen för förhandsvisning, klicka för att placera,
  klicka på bitkortet för att rotera.
- **På mobilen (samma wifi):** starta servern med
  `npx --yes http-server "C:\Claude hemsidor\App spel hemsida" -p 8123`,
  kör `ipconfig`, ta datorns IPv4-adress och öppna
  `http://DIN-IP:8123` i mobilens webbläsare. Dra bitarna med fingret; biten
  lyfter sig ovanför fingret så du ser var den hamnar.
- **Självtestet:** öppna `index.html#test` och titta i webbläsarkonsolen (F12) —
  ska visa `SJÄLVTEST: 9/9 OK`.
- **Nollställa allt:** kör `localStorage.removeItem('pusselriket')` i konsolen.
