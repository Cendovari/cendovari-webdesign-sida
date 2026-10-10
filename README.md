# Cendovari Webdesign Sida — naturligt scrollflöde

Separat webbdesignförhandsvisning för Cendovari AB. Den godkända pärlemorgrunden, kristallen, silver/lila ljuset och typografin följer med i ett tydligare flöde på dator och telefon. Startsidan lämnar skärmen direkt vid scroll, följd av stora vertikala filmkort och en gemensam presentation av dator och mobil. Tjänster, arbetsprocess, FAQ och kontakt följer i normalt sidflöde.

**Status: godkänt scrollflöde är publicerat; fullängdsfilmerna har passerat lokala kontroller och väntar på Pages-/HTTPS-verifiering.** Videorättelsen dokumenteras i rapporten nedan.

- [Förhandsvisning på GitHub Pages](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Videorättelsens arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/restore-10-second-videos)
- [Fullängdsfilmer — ändring och verifiering](docs/video-review.md)
- [Hämta projektet som ZIP](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)
- [Ändringar, verifiering och skärmbilder](docs/natural-scroll-review.md)
- [Tidigare mobilförfining — historisk rapport](docs/mobile-review.md)

## Källa och bevarade funktioner

Arbetet började från verifierad main, `2a9df0f071609e0485289e07ec63c673adbded1b`. Det godkända paketet `cendovari-scrollpaket.zip` har samma bas. Inga senare main-rättelser behövde förenas. Paketets redigerbara källa och färdiga export användes som konkret designreferens; de övriga projektfilerna behölls eftersom paketets runtime och exporterare är semantiskt identiska.

- Aktuell rot: `cv-silk`, med 20 lokala scriptblock. Mobilmenyn, sidbyteshändelserna, fokus, projektöppningarna, Tillbaka/Escape och återställning av scroll är bevarade.
- Den publicerade iframe-rättelsen för kontaktutkastet är bevarad, liksom Enter i enkla fält och radbrytningar i textarea. Enter efter redigering rättades också: fältets ändringshändelse slutförs före utkastets visning och fokusflytt. Formuläret skickar ingen e-post och har ingen backend.
- Designstudio, stilval, jämförelse, inspiration, process/FAQ, Om oss och konceptens Dator/Mobil-lägen finns kvar. De gamla kontrollerna för startsidans animationsfaser är dolda och inaktiva.
- `index.html` är den kompletta exporten. `preview-source.html` är ett redigerbart fragment, inte en hel webbsida.
- Svenska, `noindex,nofollow` i export och iframe, `.nojekyll` och sandbox är bevarade. Ingen `CNAME` finns.

## Material och begränsningar

PB-system och Hagströms Motor är tillfälliga företagsnamn i designkoncept. Filmer och bilder är illustrationsmaterial. Befintliga posters och illustrationer är oförändrade; inga nya kundresultat, omdömen eller företagsuppgifter har lagts till. De två fullängdsfilmerna ligger som MP4 under `assets/video`: 10,000 sekunder, 1280×720, 24 fps, 240 bildrutor och utan ljud. De bifogade filerna har kopierats utan omkodning eller klippning. Uppspelningen sker i normal hastighet; vanlig scroll och paus återanvänder laddad resurs och befintlig position. Posters, `playsinline`, `muted`, `loop` och konceptmärkningen är bevarade. Originalmontagens kameraklipp och slut–början-klipp är kvar; filmerna är inte sömlösa. Originalbildströmsidentitet kan inte jämföras utan ursprungsfilerna.

Kontaktuppgifter och inspiration behålls lokalt mellan vyerna. Clipboard API kan blockeras av iframe-policyn; en manuell fallback visar och markerar utkastet. Ikoner och typsnitt behöver internetanslutning. Exporten kräver JavaScript och saknar en synlig fallback utan det.

## Prova och ändra

Öppna Pages-länken ovan eller hämta projektets ZIP och kör en lokal HTTP-server från projektmappen. Hela `assets/video` måste följa med. Om `index.html` dubbelklickas med file:// visas posters; Chrome blockerar lokala MP4 i exportens sandbox. Använd därför följande för filmuppspelning:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Öppna `http://127.0.0.1:8766/`. På Windows kan `python` användas i stället för `python3`. Den lokala länken fungerar bara på datorn som kör servern.

Ändra `preview-source.html` och regenerera exporten från projektmappen:

```sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
```

Behåll controllerhändelser, mobilmenyn, kontaktflödet och mediehanteringen. Videornas initialt tomma `src` är avsiktliga; byt inte till relativa filmadresser utan att också anpassa och verifiera kontrollern. Runtime och exportskript följer med. Använd den vanliga HTTP-servern ovan för externa filmer; `render.py --serve` serverar bara HTML.

## Verifiering och publiceringsflöde

Videorättelsen har passerat 9 lokala Chrome-körningar av källa/export samt touch- och posterfallback-kontroller. Båda filmerna mättes till 10,000 s i alla fyra filmplatser; två fulla varv verifierades på emulerad mobil och dator utan omstart vid scroll eller paus. Detaljer och kommande HTTPS-kvitto finns i [filmrapporten](docs/video-review.md).

Basen med det godkända scrollflödet passerade 14 körningar av export/regenererad källa och 236 layoutprover. Sex extra kontakt-/interaktionskörningar med 106 kontrollpunkter avsåg samma controllers före en rent blankteckenmässig formatstädning. Efter publicering passerade fyra riktiga HTTPS-körningar med 67 layoutprover och tre publika kontaktkörningar med 26 kontrollpunkter. Kontroller och begränsningar dokumenteras i [granskningsrapporten](docs/natural-scroll-review.md). Telefonstorlekar, touch och rotation testas med Chrome på Windows och desktopemulering. Safari på fysisk iPhone och Chrome på fysisk Android har inte testats.

Arbeta endast i detta separata repository: kontrollera remote, branch och status, bevara orelaterat arbete och Git-historiken, använd arbetsbranch och vanlig commit utan force-push. Visa väsentliga visuella avvikelser för användaren före publicering. Scrollflödets design och publicering godkändes i förväg och dess arbetsbranch fördes till main efter kontroller. Videokorrigeringens publicering är också godkänd och genomförs efter godkända kontroller.

GitHub Pages behåller befintligt flöde: **Deploy from a branch**, `main`, projektets rot (`/`) och GitHubs HTTPS-standardadress. Ingen ändring av Pages-inställningar, egen domän, hosting eller DNS görs. Cendovari-Website, Modbus Buddy, WordPress och cendovari.com lämnas orörda. Lägg aldrig till lösenord, tokens, `.env`, gamla Git-mappar eller filer från andra projekt.

Scrollflödets innehållscommit: [`691e733c…`](https://github.com/Cendovari/cendovari-webdesign-sida/commit/691e733c8c751c773bc109f32007e342dc41f408). [Scrollflödets godkända Pages-bygge](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38065155829). Aktuella SHA256 och historiska kontroller finns separat i `preview-review.json`.

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
