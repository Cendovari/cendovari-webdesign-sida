# Cendovari Webdesign Sida — kristallintroduktion

Separat webbdesignförhandsvisning för Cendovari AB med godkänd pärlemorgrund, silver/lila ljus och typografi. Den kortare introduktionen har en skarp, stilla CV-symbol och små glaskristaller som rör sig långsamt. Ordningen är introduktion → **Samma känsla. Alla skärmar.** → filmer → tjänster → arbetsprocess och resten av sidan. Filmkort och skärmvisning behåller sina poser vid scroll.

**Status: lokala Chrome-kontroller har passerat.** Publicering via befintligt main/Pages-flöde och kontroll av den riktiga HTTPS-länken återstår.

- [Förhandsvisning på GitHub Pages](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Kristallintroduktionens arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/crystal-introduction)
- [Ändring, verifiering och begränsningar](docs/crystal-review.md)
- [Hämta projektet som ZIP](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)
- Historiska rapporter: [fullängdsfilmer](docs/video-review.md), [naturligt scrollflöde](docs/natural-scroll-review.md) och [mobilförfining](docs/mobile-review.md).

## Källa och bevarade funktioner

Utgångspunkt är verifierad main `779da7f7f53c2931bb0b2bc8372d85430b8ba906`. Paketet `cendovari-kristaller-paket.zip` har samma bas. Paketets källa och export är den konkreta designreferensen; CSS och markup utanför scriptblock är byteidentiska med den godkända källan. Runtime och exportskript bevaras.

- Aktuell rot är `cv-crest`. CV ritas separat med hög upplösning och står stilla. Kristallerna är tidsstyrda och fryser sin egen fas vid paus, meny, reducerad rörelse, offscreen och dold sida.
- Mobilmeny, fokus, navigation, projektöppning, Tillbaka/Escape och scrollåterställning är bevarade. Design-genvägen leder till skärmvisningen.
- Kontaktens publicerade iframe-fix och blur/Enter/textarea-hantering är bevarade. Formuläret visar endast ett lokalt utkast och skickar ingen e-post eller backendrequest.
- Designstudio, stilval, jämförelse, inspiration, process/FAQ, Om oss och konceptens Dator/Mobil-lägen finns kvar. Gamla animationsfaskontroller är dolda och inaktiva; onödig scrollanimeringskod är borttagen.
- `index.html` är den kompletta regenererade exporten. `preview-source.html` är ett redigerbart fragment, inte en hel webbsida.
- Svenska, `noindex,nofollow` i export och iframe, `.nojekyll` och sandbox är bevarade. Ingen `CNAME` finns.

## Filmer och material

PB-system och Hagströms Motor är tillfälliga företagsnamn i designkoncept. Filmer och bilder är illustrationsmaterial. Inga nya kundresultat, omdömen eller företagsuppgifter har lagts till.

Paketets komprimerade chattfilmer används inte i publiceringen. Originalfilerna i `assets/video` är oförändrade: **10,000 sekunder, 1280 × 720, 24 fps, 240 bildrutor, H.264 och utan ljud**. De spelas i normal hastighet; vanlig scroll och paus behåller laddad resurs och befintlig position. Posters, `playsinline`, `muted`, `loop` och fallback vid nekad uppspelning finns kvar. Originalmontagens kameraklipp och slut–början-övergång bevaras utan omkodning eller förlängning.

Kontaktuppgifter och inspiration behålls lokalt mellan vyerna. Clipboard API kan blockeras av iframe-policyn; en manuell fallback visar och markerar utkastet. Ikoner och typsnitt behöver internet. Exporten kräver JavaScript.

## Prova och ändra

Öppna Pages-länken ovan eller hämta projektets ZIP och kör en lokal HTTP-server från projektmappen. Hela `assets/video` måste följa med. `file://` visar posters eftersom lokala MP4 blockeras i exportens sandbox; använd HTTP för filmer:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Öppna `http://127.0.0.1:8766/`. På Windows kan `python` användas i stället för `python3`. Den lokala länken fungerar bara på datorn som kör servern.

Ändra `preview-source.html` och regenerera exporten från projektmappen:

```sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
```

Behåll controllerhändelser, meny, kontaktflöde och mediehantering. Videornas initialt tomma `src` är avsiktliga; controllern löser de två tillåtna adresserna relativt exportens baseURI. `render.py --serve` serverar enbart HTML; använd HTTP-servern ovan för externa videofiler.

## Verifiering och publicering

Statisk kontroll: 20 av 20 scriptblock passerar syntaxkontroll. CSS/markup matchar det godkända paketet. Filmcontroller, kontakt, navigation och höjdanpassning har jämförts med publicerad main. Canvasens lifecycle har även verifierats med en separat exekverad kod-fixture; den ersätter inte webbläsargranskningen.

Lokalt passerade 22 bredd-/vykörningar, fem film-/kontaktkörningar och riktade rörelse-/ankarkontroller. Båda fullängdsfilmerna gick två varv i alla fyra filmplatser på emulerad mobil och desktop, med noll omstarter vid vanlig scroll eller paus. Inga JS-/resurs-/backendfel hittades. Resultat och offentlig HTTPS-verifiering dokumenteras i [kristallrapporten](docs/crystal-review.md) och `preview-review.json`. Verklig bakgrundsväxling och iframe-DPR3 gick inte att verifiera i körmiljön; lifecycle-gates testades med tydligt märkt simulation. Telefonstorlekar, touch och rotation testas genom Chrome på Windows med desktopemulering. Safari på fysisk iPhone och Chrome på fysisk Android har inte testats.

Arbeta endast i detta separata repository: kontrollera remote, branch och status, bevara orelaterat arbete och historik, använd arbetsbranch och vanlig commit utan force-push. Visa nödvändiga väsentliga visuella avvikelser före publicering. Den här designen och publicering efter godkända kontroller är redan godkända av användaren.

GitHub Pages behåller befintligt flöde: **Deploy from a branch**, `main`, projektets rot och GitHubs HTTPS-standardadress. Inga Pages-inställningar, egen domän, hosting eller DNS ändras. Cendovari-Website, Modbus Buddy, WordPress och cendovari.com lämnas orörda. Lägg aldrig till lösenord, tokens, `.env`, gamla Git-mappar eller andra projektfiler.

## Tidigare publicering — historisk arbetslogg

Följande gäller den tidigare publicerade baslinjen. Den publicerade mobilförfiningen och dess verifiering beskrivs ovan och i granskningsrapporten.


- Användaren klargjorde att det tidigare repot endast var planerat och godkände skapandet av ett nytt separat repo med samma namn.
- Underlag: `cendovari-webdesign-latest (1).zip`, SHA256 `78687ae06f171093d851f5effdd9c8d134f5f32bb607a49e08e50968d2fe7484`. Arkivet granskades först i en separat mapp. Inga äldre förhandsvisningsfiler användes som designkälla.
- Paketets källa har `cv-lumen`. Den historiska källans och exportens SHA256 efter publiceringsrättelsen finns nedan. Exporten regenererades i granskningen och blev först byteidentisk med paketets index. Runtime, exportskript och `.nojekyll` matchade det separata projektets stödfiler.
- Browserkontroll bekräftade att Chrome blockerade den ursprungliga formulärsubmit-knappen i `sandbox="allow-scripts"`. En minimal rättelse ändrade knappen till lokal click-hantering, validerar formuläret och återanvänder samtliga befintliga submit-handlers. Enter i namn/e-post återanvänder samma lokala utkast; textarea-radbrytning bevaras. Sandbox, CSP och designen ändrades inte.
- De övriga 17 controllers och samtliga inbäddade bild-/videopayloads är byteidentiska med paketet. Två video-only MP4-loopar är 960×540/24 fps; inga ljudspår eller externa filmadresser finns. Inga backendanrop eller vanliga hemlighetsmönster hittades.
- Källan efter den tekniska rättelsen har SHA256 `6e0eff2527b9e4b34adfdb7fc103c866db87b25e2727f2d4a186e36e8523ce82`; exporten har SHA256 `a3b824e00f65f62e2112d0f9002827a3bfe7a5197cef3b63da5edc1ea20dff6e`.
- Lokal Chromium-kontroll efter rättelsen: 1440×900, 390×844, 320×844 samt 390×844 med reducerad rörelse. Alla fyra körningar hade noll stegfel, JavaScript-undantag och misslyckade nätverksrequests. Navigation, ikoner (52 SVG, inga kvarvarande placeholders), Manrope, scrollsekvenser/kristall/dator–mobil, designstudio, tjänster/process/FAQ, Om oss, båda konceptöppningarna, Tillbaka/Escape och fokus/scroll kontrollerades. Filmernas uppspelning och paus verifierades; paus/reducerad rörelse stoppade canvas och filmer. Kontaktutkast, fältvalidering, Enter, textarea-radbrytning, inspiration och manuell kopieringsfallback fungerade utan backendanrop. Automatisk Clipboard-kopiering begränsas av iframe-policy och ger en konsolvarning; manuell fallback är verifierad. Smala skärmar hade ingen blockerande horisontell overflow. Den följande offentliga verifieringen genomfördes efter publicering.
- Nytt offentligt repository skapades först efter kontroll att det exakta namnet var ledigt. Endast elva granskade projektfiler publicerades; inga lösenord, tokens, `.env`, gamla Git-mappar eller filer från andra projekt följde med. Main uppdaterades utan force-push.
- Pages-bygget för innehållscommit `ac3e7d475b431b8d52e63cdb2f9890959018ff3c` avslutades med success. HTTP 200 från den riktiga HTTPS-adressen verifierades; både publicerad källa och index hade exakt samma SHA256 som det kontrollerade underlaget ovan.
- Publicerad Chrome-kontroll: 1440×900, 390×844, 320×844 och reducerad rörelse 390×844. Samtliga fyra passerade utan JavaScriptfel, misslyckade requests eller backendanrop. Alla sex nätverksresurser gav HTTP 200. 97 breddkontroller visade ingen horisontell overflow. Navigation/undersidor, 52 SVG-ikoner, Manrope, kristall/scrollscener/dator–mobil, musreflektioner, designstudio/stilar/jämförelse, tjänster/process/FAQ, Om oss, båda koncepten, Tillbaka/Escape/fokus/scroll, verklig filmuppspelning, paus/reducerad rörelse och kontaktutkast/validering/Enter/inspiration/manuell kopiering kontrollerades. Svenska, `noindex,nofollow`, sandbox och konceptmärkning är bevarade.
- Kvarvarande begränsningar: Clipboard API ger policyrelaterade konsolmeddelanden; verifierad manuell kopiering fungerar. Vid 320 px bryter Kontakt i sidhuvudet till en andra rad men är nåbar. Filmerna är korta illustrationsloopar, inte verifierat sömlösa. Fysiska telefoner testades inte. Inga blockerande fel hittades i genomförda kontroller.
- Alla projektändringar ligger endast i det nya separata webbdesignprojektet. Cendovari-Website, Modbus Buddy, cendovari.com, WordPress, hosting, domän/DNS och befintliga produktionsinställningar är orörda.
