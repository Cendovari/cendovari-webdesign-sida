# Cendovari Webdesign Sida — GPPE-förhandsvisning

Separat förhandsvisning för Cendovari AB. Den godkända Luminous-designen, pärlemorgrunden och den stora 16:9-filmen är bevarade. Starttexten är ”Vi bygger hemsidor för företag.” Tjänsteillustrationen visar en datorskärm och telefon. GPPE visas med riktig logga och skärmbild; Bilverkstad är ett tydligt märkt designförslag.

**Status: lokalt verifierad; publiceringskontrollen pågår.**

- [Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/gppe-portfolio)
- [Granskning och skärmbilder](docs/gppe-review.md)
- [Ladda ned main](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)

## Underlag och innehåll

Integreringen utgår från verifierad main `3c3ebb16f8ee0ddbd4aaea754dddc554acb1d88a` och `cendovari-gppe-handoff.zip` (SHA256 `58cdd816671e73c33e59cb00ee1974551059da33d0cb72f2a7647ec841c1f27c`). Alla 16 poster i paketets SHA256SUMS.txt är verifierade.

`preview-source.html` är den redigerbara källan, rot `cv-gppe-featured`. Godkänt innehåll, CSS och komposition är bevarade. En avgränsad teknisk rättelse återställer mobilmenyns interna scroll före första fokus när menyn återöppnas på en kort skärm. Befintliga viewport-, meny-, fokus-, projekt-, formulär- och filmfixar från main behålls.

Gotland Puts & Platt Entreprenad visas i ”Så kan en hemsida se ut”, efter processen och på Portfolio-sidan, med ”Byggd av Cendovari.” Alla tre GPPE-länkar är vanliga externa länkar till https://gppe.se/ och öppnar inget fiktivt projekt. Paketets separata äldre Plattsättning-exempel är fortfarande uttryckligen märkt designförslag på Portfolio och representerar inte GPPE. Bilverkstad är också ett designförslag med illustrationsmaterial. Inga nya kundresultat, omdömen eller partnerskap har lagts till.

Kontakt visar bara ett lokalt utkast. Ingen e-post, backend eller formulärutskick används. Svenska, `noindex,nofollow` och tidigare CSP är bevarade.

## Källa och återskapningsbar export

Källfragmentet innehåller kompakta inlinefilmer för förhandsvisningen. Publicerad `index.html` är ett vanligt komplett dokument med naturlig dokumentscroll, relativa bild- och originalfilmvägar och inga iframe-/ChatGPT-/localhost-beroenden. De historiska runtimefilerna ligger kvar i Git-historiken/projektet men används inte av exporten.

Bygg från projektmappen med Python 3:

~~~sh
python3 scripts/build-export.py
~~~

Befintlig CLI ger samma export:

~~~sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
~~~

`scripts/export-shell.html` innehåller dokumentramen från main. Exportören extraherar sex kända bilder till `assets/images/` och ersätter källans kompakta filmdata med tre fulla originalklipp i `assets/video/`. Originalfilmerna verifieras och omkodas inte. Nya bild-/filmbytes kräver en uttrycklig uppdatering av exportörens kontrollsummor och nya tester; byt inte till okända resurser automatiskt.

Alla tre klipp är 1280 × 720, 24 fps, 240 bildrutor, 10,000 sekunder och utan ljud. De spelar muted/playsinline/loop i hastighet 1. Befintlig synlighetsägare, manuell paus, reducerad rörelse och autoplay-fallback är bevarade. Vanlig scroll och paus ändrar inte src, load eller currentTime.

För lokal granskning:

~~~sh
python3 -m http.server 8766 --bind 127.0.0.1
~~~

Öppna http://127.0.0.1:8766/. På Windows kan `python` ersätta `python3`. `python3 scripts/render.py preview-source.html --serve --port 8766` serverar också dokumentet och dess bilder/filmer. Ikoner och typsnitt behöver internet och använder befintliga leverantörer.

## Verifiering och publicering

[Granskningsrapporten](docs/gppe-review.md) och `preview-review.json` redovisar aktuell QA, kontrollerade resurser och begränsningar. Chrome på Windows har provats vid 320, 390, 768, 1440 px och kort liggande vy, med mus, tangentbord och emulerad touch. Detta är inte test på fysisk iPhone/Android eller Safari. Dold flik och nekad autoplay har kontrollerats med uttrycklig simulering/injektion.

Arbeta på separat branch, verifiera origin/main/status och bevara orelaterade ändringar. Använd vanliga commits och inga force-pushar. Befintligt GitHub Pages-flöde publicerar main/rot på samma standardadress; ingen CNAME eller domänändring används. Återställ vid behov med vanliga revert-commits i omvänd ordning, dokumentationskvitto först och därefter innehållscommit.

Alla skrivningar gäller endast Cendovari/cendovari-webdesign-sida. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, produktion, hosting och domän/DNS är orörda. Inga tokens, lösenord, .env, testuppgifter eller filer från andra projekt har lagts till.

Historik: [filmversion](docs/film-first-review.md), [kristaller](docs/crystal-review.md), [filmer](docs/video-review.md), [scrollflöde](docs/natural-scroll-review.md), [mobil](docs/mobile-review.md). Äldre rapporter beskriver respektive tidigare version, inte tester av detta paket.
