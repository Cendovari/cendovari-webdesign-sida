# Cendovari Webdesign Sida

Separat Luminous-förhandsvisning för Cendovari AB. Den godkända pärlemorbakgrunden, filmerna, GPPE-portfoliot, det vita Bilverkstad-förslaget och det lokala kontaktutkastet bevaras.

## Stabilitetsgranskning 13 oktober 2026

Arbetet utgår från ren main `69e7659754db3f93066a2ed8487e9ac758823752` på rätt origin. Fyra bekräftade fel rättas: tomma kontaktuppgifter som bara innehåller blanktecken, rubrikfragment bakom headern, interna projekthopp bakom en extra fast projektrad och saknade ikoner när den externa leverantören inte svarar. Touchdrag över jämförelseikonen har också säkrats efter integrationen. Ingen redesign, ny backend eller medieändring ingår.

**Status: lokalt verifierad; publicering och HTTPS-kontroll återstår.**

- [Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/stability-review)
- [Fel, tester och skärmbilder](docs/stability-review.md)
- [Maskinläsbart granskningskvitto](preview-review.json)
- [Tidigare godkänd bakgrundsgranskning](docs/smooth-art-review.md)

`preview-source.html` är verklig redigerbar källa. Exporten återskapas med befintlig Python-export nedan. Vanlig dokumentscroll, intern navigation, menyfokus, Tillbaka/Escape, noindex,nofollow och kontaktens demoläge bevaras.

## Godkänt designunderlag (historik)

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

Öppna `http://127.0.0.1:8766/`. På Windows kan `python` ersätta `python3`. Hela projektet behövs. De befintliga typsnitten laddas externt och har systemreserv. Ikonerna ingår lokalt i källan och exporten; ISC-licens finns i `licenses/lucide.txt`.

Skulpturens godkända algoritm finns i `scripts/sculpture-art.js`. Det valfria offlineverktyget `scripts/render-sculpture.cjs` använder Chrome och Playwright:

~~~sh
node scripts/render-sculpture.cjs --output sculpture-check.png --chrome "PATH_TO_CHROME" --playwright "PATH_TO_PLAYWRIGHT"
~~~

Kontrollera bilden mot rapportens pixelhash innan källans inbäddade PNG och hashmappning uppdateras. PNG-kodning kan variera mellan webbläsarversioner. Verktyget skriver bara uttryckligt angivna bild- och eventuella metadatafiler. Det används inte på webbplatsen. Den vanliga Python-exporten behöver ingen webbläsare eller nya paket.

## Regressionstester

De avgränsade webbläsartesterna ligger i `tests/`. De använder en redan installerad Playwright och Chrome eller Edge; inga nya runtimeberoenden läggs till. Starta den lokala HTTP-servern och kör varje test:

~~~sh
node tests/anchor-regression.cjs --url http://127.0.0.1:8766/ --chrome "PATH_TO_BROWSER" --playwright "PATH_TO_PLAYWRIGHT"
node tests/icons-regression.cjs --url http://127.0.0.1:8766/ --chrome "PATH_TO_BROWSER" --playwright "PATH_TO_PLAYWRIGHT"
node tests/contact-regression.cjs --url http://127.0.0.1:8766/ --chrome "PATH_TO_BROWSER" --playwright "PATH_TO_PLAYWRIGHT"
node tests/comparison-regression.cjs --url http://127.0.0.1:8766/ --chrome "PATH_TO_BROWSER" --playwright "PATH_TO_PLAYWRIGHT"
~~~

Valfri `--output PATH` sparar testresultat. Ingen beständig användarprofil används. Testuppgifter är fiktiva och utkast skapas bara lokalt; inga riktiga mejl eller backendanrop görs. Mobila mått, touch, rotation och ändrad skärmhöjd emuleras på Windows. Fysisk telefon och Safari har inte testats.

## Publicering och avgränsning

Befintligt Pages-flöde från main, projektets rot och samma HTTPS-adress används. Historiken bevaras med vanliga commits; ingen hard reset eller force-push. Återställ med en vanlig revert-commit om det behövs.

Alla skrivningar gäller enbart `Cendovari/cendovari-webdesign-sida`. Produktion, Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, hosting och domän/DNS lämnas orörda. Inga hemligheter, privata QA-profiler eller verkliga kontaktuppgifter publiceras.

Historiska rapporter: [film/navigation](docs/film-navigation-review.md), [GPPE](docs/gppe-review.md), [filmversion](docs/film-first-review.md), [kristaller](docs/crystal-review.md), [filmer](docs/video-review.md), [scrollflöde](docs/natural-scroll-review.md), [mobil](docs/mobile-review.md).
