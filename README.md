# Cendovari Webdesign Sida — skulptural pärlemorbakgrund

Separat Luminous-förhandsvisning för Cendovari AB. Den godkända versionen från `cendovari-smooth-art-handoff.zip` har stora silver-/pärlemorformer med diskret lila, mjuk musbelysning, vitt Bilverkstad-koncept och tydligare process-/kontakttexter. GPPE, navigation, mobilmeny och kontaktutkast är bevarade.

**Status: lokalt kontrollerad; publicerings- och HTTPS-kvitto följer efter Pages-bygget.**

- [Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- Innehållscommit länkas i publiceringskvittot efter integration.
- [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/smooth-art)
- [Granskning och skärmbilder](docs/smooth-art-review.md)
- [Ladda ned main](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)

## Underlag och integration

Origin verifierades som https://github.com/Cendovari/cendovari-webdesign-sida.git. Ren aktuell main var `9ba066f6c26e5fe4e28e0d3bfdcad2ff2d3cf2b3`. Paketets baskälla matchade den exakt (SHA256 `3091138d1ec7f5773722fec1e5248951674e1b47ee2197d7ef181742d86c6566`), så inga senare källfixar behövde väljas bort. Alla 22 poster i SHA256SUMS.txt matchade; ZIP-SHA256 `8887d53b8cbc2a3af10473f3683b4e759bf919eb2e6a76015f06c90a51c2061e`.

Den gamla bakgrundsrenderaren är borttagen. Den godkända skulpturen är förberäknad till en PNG med samma pixlar som paketets canvasbild. Detta undviker den uppmätta blockerande bildskapandetiden vid start. Under musrörelse ändras endast transform/opacity, med paketets tidsbaserade eftersläpning, långsamma toning och begränsade tidssteg. Loopen stannar efter stabilisering. Bakgrunden fångar inga klick. Rena touchlägen, paus/reducerad rörelse, dold flik och öppen meny ger en stilla bakgrund. CSS och JavaScript använder nu samma any-hover/any-pointer-villkor även för hybrid-enheter.

Det vita Bilverkstad-exemplet omfattar kort, miniatyrer, projektvy och inspirationstext. Det är ett designförslag med illustrationsfilm, utan nya kundpåståenden. GPPE:s riktiga bilder, logga, länkar och ”Byggd av Cendovari.” är bevarade.

De tidigare sidbytesfixarna är kvar: ingen Cendovari-mellanbild/wipe, stabil header, kort innehållstoning på 140 ms, senaste giltiga navigationsklick, fokus och Tillbaka/Escape. Vanlig dokumentscroll utan iframe, mobilmeny och det lokala kontaktutkastet används även fortsättningsvis.

## Källa, export och resurser

`preview-source.html` är den redigerbara källan med rot `cv-smooth-art`. Kompakta inbäddade filmer/poster används i källförhandsvisningen. Den publicerade exporten använder alltid fulla originalfilmer och full toppposter via uttryckliga SHA256-mappningar. Kompakt poster får aldrig skriva över originalpostern. Dokumentramen, CSP och exportens befintliga input/resurskontroller är bevarade.

Bygg från projektmappen med Python 3:

~~~sh
python3 scripts/build-export.py
~~~

Befintlig CLI ger samma export:

~~~sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
~~~

`scripts/build-export.py` innehåller godkända bild-/preview-/originalhashar. Bilder externaliseras till `assets/images/`; filmer till `assets/video/`. Framtida mediebyten kräver uppdatering av källvärden, original och hashmappningar tillsammans. De tre originalfilmerna och sex befintliga bilderna är byteidentiska med föregående main och paketet.

- Toppfilm: `assets/video/cendovari-showreel-10s.mp4`, SHA256 `9bf277fb246fa44e8685773f04129dfb393d491e47da696d506377a885f2d27b`.
- Toppfilmens poster: `assets/images/cendovari-showreel-poster.jpg`, SHA256 `0dbd5567d79bfc4beb36ef5c2bc72f26f9f4d40660007970efa7d04e32e9cedb`.

Alla originalklipp behåller 1280 × 720, 24 fps och hela 10 sekunder utan ljud. Ingen omkodning eller AI-redigering görs här. Full 16:9, muted, playsinline, loop, normal hastighet, bestående manuell paus, nekad-autoplay-fallback och hantering av dold flik/reducerad rörelse är bevarade. Scroll/paus ändrar inte src/load/currentTime.

Starta lokalt:

~~~sh
python3 -m http.server 8766 --bind 127.0.0.1
~~~

Öppna http://127.0.0.1:8766/. På Windows kan `python` ersätta `python3`. Hela projektet behövs; befintliga externa typsnitt/ikoner behöver internet.

Skulpturens exakt godkända algoritm finns i `scripts/sculpture-art.js`. `scripts/render-sculpture.cjs` är ett valfritt offlineverktyg för Chrome + Playwright:

~~~sh
node scripts/render-sculpture.cjs --output sculpture-check.png --chrome "PATH_TO_CHROME" --playwright "PATH_TO_PLAYWRIGHT"
~~~

Kontrollera den skapade bilden mot granskningsrapportens pixelhash innan källans inbäddade PNG och hashmappning uppdateras. PNG-kodning kan variera mellan webbläsarversioner. Verktyget skriver endast den uttryckliga outputfilen; det används inte på webbplatsen. Den vanliga Python-exporten behöver ingen webbläsare eller nya paket.

## Verifiering och publicering

Slutexportens bild-/bakgrunds- och headerkontroller, källförhandsvisningen och reproducerbar export passerar. Granskningsrapporten skiljer lokala testomgångar före/sedan de sista riktade rättelserna; full HTTPS/browseromgång görs efter publicering. Alla mobil-/touchkontroller är emulering i Chrome på Windows, utan fysiska telefoner/Safari. Hybridinput och dold flik/nekad autoplay har särskilt angivna simuleringar.

Kontaktformuläret skapar enbart ett lokalt utkast. Svenska, `noindex,nofollow`, GPPE-externlänkar och designförslagens märkning är bevarade. Inga mejltester, formulärutskick eller backend används.

Publicering följer befintligt main/rot-flöde och samma Pages-adress. Vanliga commits bevarar historik och orelaterade filer; inga hard resets eller force-pushar. Återställ vid behov med vanliga revert-commits, senare dokumentationskvitto före innehållscommiten.

Alla skrivningar gäller endast Cendovari/cendovari-webdesign-sida. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, produktionshosting och domän/DNS är orörda. Inga tokens, lösenord, .env, privata QA-profiler eller inmatade testkontaktuppgifter publiceras.

Historiska rapporter: [film/navigation](docs/film-navigation-review.md), [GPPE](docs/gppe-review.md), [filmversion](docs/film-first-review.md), [kristaller](docs/crystal-review.md), [filmer](docs/video-review.md), [scrollflöde](docs/natural-scroll-review.md), [mobil](docs/mobile-review.md). De beskriver tidigare versioner.
