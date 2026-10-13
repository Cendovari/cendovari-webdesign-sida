# Cendovari Webdesign Sida — skulptural pärlemorbakgrund

Separat Luminous-förhandsvisning för Cendovari AB. Den godkända versionen från `cendovari-smooth-art-handoff.zip` har stora silver- och pärlemorformer med diskret lila, mjuk musbelysning, ett vitt Bilverkstad-koncept och tydligare process- och kontakttexter. GPPE, navigation, mobilmeny och kontaktutkast är bevarade.

**Status: publicerad och verifierad på HTTPS den 13 oktober 2026.**

- [Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Innehållscommit e0726e5](https://github.com/Cendovari/cendovari-webdesign-sida/commit/e0726e5b73f1431372d9d12d73a083ee8a90423d)
- [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/smooth-art)
- [Granskning och skärmbilder](docs/smooth-art-review.md)
- [Ladda ned main](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)

## Underlag och integration

Repots origin verifierades som `https://github.com/Cendovari/cendovari-webdesign-sida.git`. Ren aktuell `main` var `9ba066f6c26e5fe4e28e0d3bfdcad2ff2d3cf2b3`. Paketets baskälla matchade den exakt, SHA-256 `3091138d1ec7f5773722fec1e5248951674e1b47ee2197d7ef181742d86c6566`. Inga senare källfixar behövde väljas bort. Alla 22 poster i `SHA256SUMS.txt` matchade. ZIP-filens SHA-256 är `8887d53b8cbc2a3af10473f3683b4e759bf919eb2e6a76015f06c90a51c2061e`.

Den nya bakgrunden ersätter de tidigare bakgrundslagren. Den godkända skulpturen är förberäknad till en PNG med samma pixlar som paketets canvasbild. Därmed behöver bilden inte skapas under sidstarten. Vid musrörelse ändras endast transform och opacitet, med paketets tidsbaserade eftersläpning, långsamma toning och begränsade tidssteg. Loopen stannar efter stabilisering. Bakgrunden fångar inga klick. Touch, rörelsepaus, reducerad rörelse och öppen meny ger en stilla bakgrund. Samma pausvillkor verifierades med simulerad dold flik. CSS och JavaScript använder samstämmiga `any-hover`- och `any-pointer`-villkor även för hybridenheter.

Det vita Bilverkstad-exemplet omfattar kort, miniatyrer, projektvy och inspirationstext. Det är ett designförslag med illustrationsfilm, utan nya kundpåståenden. GPPE:s riktiga bilder, logga, länkar och ”Byggd av Cendovari.” är bevarade.

De tidigare sidbytesfixarna är kvar: ingen varumärkesmellanbild eller wipe, stabil header, kort innehållstoning på 140 ms, senaste giltiga navigationsklick, fokus samt Tillbaka och Escape. Vanlig dokumentscroll utan iframe, mobilmeny och lokalt kontaktutkast används vidare.

## Källa, export och resurser

`preview-source.html` är den redigerbara källan med rot `cv-smooth-art`. Källförhandsvisningen använder kompakta inbäddade filmer och en kompakt toppposter. Den publicerade exporten använder fulla originalfilmer och full toppposter genom uttryckliga SHA-256-mappningar. Den kompakta postern får aldrig skriva över originalpostern. Dokumentram, CSP och befintliga kontroller av indata och resurser är bevarade.

Bygg från projektmappen med Python 3:

~~~sh
python3 scripts/build-export.py
~~~

Befintlig CLI ger samma export:

~~~sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
~~~

`scripts/build-export.py` innehåller godkända hashvärden för bilder, förhandsvisningar och original. Bilder och filmer får relativa sökvägar under `assets/images/` respektive `assets/video/`. Framtida mediebyten kräver att källvärden, original och hashmappningar uppdateras tillsammans. De tre originalfilmerna och sex befintliga bilderna är byteidentiska med föregående `main` och paketet.

- Toppfilm: `assets/video/cendovari-showreel-10s.mp4`, SHA-256 `9bf277fb246fa44e8685773f04129dfb393d491e47da696d506377a885f2d27b`.
- Toppfilmens poster: `assets/images/cendovari-showreel-poster.jpg`, SHA-256 `0dbd5567d79bfc4beb36ef5c2bc72f26f9f4d40660007970efa7d04e32e9cedb`.

Originalklippen behåller 1280 × 720, 24 fps och hela 10 sekunder utan ljud. Ingen film omkodas eller AI-redigeras här. Fullt 16:9-format, muted, playsinline, loop, normal hastighet, bestående manuell paus, reservläge vid nekad autoplay och paus vid dold flik eller reducerad rörelse är bevarade. Scrollning och paus nollställer inte src, load eller currentTime.

Starta lokalt:

~~~sh
python3 -m http.server 8766 --bind 127.0.0.1
~~~

Öppna `http://127.0.0.1:8766/`. På Windows kan `python` ersätta `python3`. Hela projektet behövs. Befintliga externa typsnitt och ikoner behöver internet.

Skulpturens godkända algoritm finns i `scripts/sculpture-art.js`. Det valfria offlineverktyget `scripts/render-sculpture.cjs` använder Chrome och Playwright:

~~~sh
node scripts/render-sculpture.cjs --output sculpture-check.png --chrome "PATH_TO_CHROME" --playwright "PATH_TO_PLAYWRIGHT"
~~~

Kontrollera bilden mot rapportens pixelhash innan källans inbäddade PNG och hashmappning uppdateras. PNG-kodning kan variera mellan webbläsarversioner. Verktyget skriver bara uttryckligt angivna bild- och eventuella metadatafiler. Det används inte på webbplatsen. Den vanliga Python-exporten behöver ingen webbläsare eller nya paket.

## Verifiering och publicering

Pages-bygget lyckades. Den riktiga HTTPS-adressen gav 200 och alla 28 kontrollerade filhashar matchade. Offentlig Chrome-granskning omfattar 320, 390, 768 och 1440 pixlars bredd samt kort landskap: navigation, meny, projekt, GPPE, kontaktutkast, fokus, bakgrund och åtta prov med två hela filmvarv.

Bakgrunden passerade 50/50 kontroller. Den breda matrisens råresultat var 187/191, med sex avbrutna mediebegäranden som CDP markerade `canceled:true`. Filmtesternas råresultat var 149/151; de funktionella kontrollerna passerade 147/147. Två showreel-begäranden avbröts i den avsiktliga stressfasen. Totalt observerades 4 246 avkodade frames och 4 245 videoframe-callbacks, utan dropped frames. Inga JS-, HTTP- eller backendfel observerades. Avbrotten och mätgränserna redovisas i [granskningsrapporten](docs/smooth-art-review.md).

Under samtidiga QA-körningar nådde ett aktivt scroll-callbackgap 199,9 ms och musprovet som mest 41,1 ms. Medianen var 13,3 ms och P95 13,5 ms. Detta mäter callback-takt; det är ingen garanti för perfekt FPS eller compositor-prestanda. Mobil och touch är Chrome-emulering på Windows. Inga fysiska telefoner eller Safari testades. Dold flik och nekad autoplay provas genom uttryckliga simuleringar och injektioner.

Kontaktformuläret skapar enbart ett lokalt utkast. Svenska, `noindex,nofollow`, GPPE:s externlänkar och designförslagens märkning är bevarade. Inga mejltester, formulärutskick eller backend används.

Publiceringen följer befintligt flöde från `main`, projektets rot och samma Pages-adress. Vanliga commits bevarar historik och orelaterade filer; inga hard resets eller force-pushar används. Återställ vid behov med vanliga revert-commits, en senare dokumentationscommit före innehållscommiten.

Alla skrivningar gäller endast `Cendovari/cendovari-webdesign-sida`. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, produktionshosting och domän/DNS är orörda. Inga tokens, lösenord, `.env`, privata QA-profiler eller inmatade testkontaktuppgifter publiceras.

Historiska rapporter: [film/navigation](docs/film-navigation-review.md), [GPPE](docs/gppe-review.md), [filmversion](docs/film-first-review.md), [kristaller](docs/crystal-review.md), [filmer](docs/video-review.md), [scrollflöde](docs/natural-scroll-review.md), [mobil](docs/mobile-review.md). De beskriver tidigare versioner.
