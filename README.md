# Cendovari Webdesign Sida — godkänd filmversion

Separat designförhandsvisning för Cendovari AB. Huvudfilmen ligger direkt under navigationen, i full 16:9 utan toning, blur, logotyp- eller textlager. Rubrik, beskrivning och kontaktknapp följer under filmen. Luminous-uttrycket och den statiska skarpa navigationsloggan är bevarade.

**Status: publicerad och verifierad på HTTPS 2026-10-11.**

- [Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Innehållscommit 7315d0f](https://github.com/Cendovari/cendovari-webdesign-sida/commit/7315d0f08ac8e7e564bd7ad3d8cf16963736282c)
- [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/film-first-introduction)
- [Ändring och granskningsrapport](docs/film-first-review.md)
- [Ladda ned main som ZIP](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)

## Källa och export

Utgångspunkt är main `1b476ae2aa3c29ce3dbe1068e737ee2572b8578e`. Den godkända överlämningen är `cendovari-film-first-handoff.zip` (SHA256 `48be01c96ba5e603b9d422369f74e399052de9971b7d927e8d44b906d06528b3`).

`preview-source.html` är den redigerbara källan, rot `cv-film-first`. Paketets layout och innehåll är bevarade. Komprimerade inlinefilmer har ersatts med relativa adresser till paketets fullängdsfiler. Tekniska rättelser gäller verklig viewporthöjd, mobilmenyns dokumentlås och filmcontroller; ingen redesign.

`scripts/render.py` bygger nu ett vanligt HTML-dokument med dokumentscroll. Det använder inte de historiska iframe-/host-runtimefilerna. Ingen canvas, gammal scenrenderer, tidslinje eller scrollstyrd introparallax används. Publiceringen kräver ingen ChatGPT-host eller localhost.

## Filmer och innehåll

Alla tre publicerade klipp är **1280 × 720, 24 fps, 240 bildrutor, 10,000 sekunder och utan ljud**:

- `assets/video/cendovari-showreel-10s.mp4`
- `assets/video/plattsattning-10s.mp4`
- `assets/video/bilverkstad-10s.mp4`

Showreelens kodade videospår och timing matchar bifogat `6291.mp4` exakt, utan omkodning. Ljudspåret och den extra originalkopian publiceras inte. Exempelklippen är byteidentiska med överlämningens originalfiler.

Filmerna laddas vid behov, spelar muted/playsinline/loop i hastighet 1 och pausar utanför synfältet, bakom menyn och i dold flik. Vanlig scroll och paus återställer inte src, load eller currentTime. Huvudfilmens Spela/Pausa visar faktisk uppspelning. Manuell paus består även när automatisk film växlas. Vid nekad autoplay finns en Spela-knapp och poster; reducerad rörelse stänger av automatisk uppspelning.

Plattsättning och Bilverkstad är **designexempel**, med illustrationsmaterial. Inga levererade kundprojekt, resultat, omdömen eller partnerskap påstås. Kontaktformuläret visar enbart ett lokalt utkast och skickar ingen e-post eller backendrequest. Svenska och `noindex,nofollow` är bevarade. Dokumentets CSP blockerar formulärutskick, frames och backendanslutningar.

## Prova och ändra

Hämta hela projektmappen, inklusive de tre filmerna. Starta från projektmappen:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Öppna `http://127.0.0.1:8766/`. På Windows kan `python` ersätta `python3`. HTTP(S) rekommenderas för filmer och kopiering; ikoner och typsnitt hämtas från befintliga externa leverantörer och kräver internet.

Ändra källan och regenerera exporten med befintlig CLI:

```sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
```

`--serve --port 8766` serverar också den regenererade HTML-sidan och dess videofiler från källans projektmapp. Använd relativa resursvägar som fungerar under Pages projektkatalog. Bevara controllerhändelser, fokus, lokalt utkast och explicit filmpaus.

## Verifiering och publicering

Detaljerade resultat, begränsningar och återställning finns i [granskningsrapporten](docs/film-first-review.md) och `preview-review.json`. Kontrollerna omfattar 320, 390, 768, 1440 px och kort liggande vy samt två hela loopar per film på startsidan och i projekten. Mobiltester sker genom desktopemulering i installerad Chrome på Windows; de ersätter inte Safari på fysisk iPhone eller Chrome på fysisk Android. Autoplay-nekande och doltillstånd testades med injektion; verklig dold flik kunde inte framkallas i testmiljön. Alla tre publika filmerna spelades i två varv vid både 390 och 1440 px. Enstaka rapporterade tappade bildrutor och en Chrome-avbruten medienedladdning är öppet kvalificerade i granskningsrapporten.

Arbeta på separat branch, kontrollera origin/main/status, bevara historik och orelaterat arbete och använd vanlig commit utan force-push. GitHub Pages fortsätter genom befintligt main/root-flöde till samma standardadress. Återställ med vanliga `git revert`-commits i omvänd ordning: eventuellt senare dokumentationskvitto först, därefter innehållscommiten. Ingen historik behöver skrivas om.

Alla skrivningar gäller endast Cendovari/cendovari-webdesign-sida. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, produktion, hosting och domän/DNS är orörda. Pages-inställningarna ändras inte. Inga lösenord, tokens, .env, originalkopior eller filer från andra projekt läggs till.

Historiska rapporter: [kristaller](docs/crystal-review.md), [filmer](docs/video-review.md), [scrollflöde](docs/natural-scroll-review.md), [mobilförfining](docs/mobile-review.md). De beskriver tidigare versioner.
