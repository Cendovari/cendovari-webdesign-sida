# Cendovari Webdesign Sida — senaste förhandsvisningen

Separat Luminous-demo för granskning av Cendovaris webbdesign. Projektet använder det bifogade senaste paketet och påverkar inte produktionswebbplatsen. Publiceringsstatus och utförda kontroller finns längre ned.

## Rätt version

Datum: 2026-10-10. Källa: den senast godkända Luminous-förhandsvisningen.

- Redigerbar källa: `preview-source.html`, från paketets Luminous-förhandsvisning med en minimal teknisk rättelse för det lokala kontaktutkastet.
- Ursprungspaketets käll-SHA256: `7be347f0b06956b3ce130e1416cc5f85b8850f3568e8852fcda1bc8aba6d9956`.
- Rot-ID: `cv-lumen`. 18 lokala scriptblock. Aktuella käll- och exporthashar finns i arbetsloggen.
- `index.html` är den genererade, fristående exporten med den lokala runtime som medföljer i `assets/`.
- `.nojekyll` finns med för statisk servering. Ingen `CNAME` eller koppling till cendovari.com finns i paketet.
- `preview-review.json` beskriver ändringarna och tidigare käll-/syntetiska kontroller. Lokala sökvägar i rapporten är referenser, inte krav på mottagarens dator.

## Senaste funktioner

Kristall och dator-/mobilsekvens som följer scrollen, projektöppning från kort till konceptbild, diskreta musreflektioner på kristall och projektytor, CV-former i hemsideillustrationen, tjänster, arbetsprocess, FAQ, designstudion, PB-system-/bilverkstadskoncept, Om oss samt lokalt kontaktutkast med inspiration och kopiering.

Två illustrativa filmloopar och sex matchande posterplaceringar är inbäddade i källan. Filmerna är 960×540, 24 fps, utan ljud. Looparna är korta och har små återställningar i kroppsrörelser; de är inte verifierade som perfekt sömlösa.

PB-system och Hagströms Motor är tillfälliga namn i designkoncepten. Filmerna är illustrationer, inte verifierade fotografier från dessa verksamheter. Bevara märkningen. Modbus Buddy ingår inte i denna förhandsvisning.

Kontaktformuläret visar endast ett lokalt utkast; det skickar inte e-post och har ingen backend. Kopiering kan begränsas av exportens iframe-sandbox. Behåll fungerande manuell kopiering om Clipboard API inte är tillgängligt.

## Generera exporten igen

Kör från projektmappen med Python 3:

```sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
```

Ändra källan och generera exporten igen i stället för att redigera olika versioner av designen. Rot-ID och alla CSS-/JS-referenser måste fortsätta stämma.

## Beroenden och kontroller

Runtime och exportskript följer med. Ikoner och Floating UI laddas från versionsangivna unpkg-adresser i runtime. Typsnitt laddas från godkända font-CDN:er. Ikoner ska initieras efter att deras bibliotek laddats.

Exporten har `lang="sv"` och `noindex,nofollow` i både yttre dokument och iframe. Det är sökmotormetadata, inte lösenordsskydd.

Källa, scriptsyntax, exportinnehåll och paketstruktur har kontrollerats. Den fristående exporten har även kontrollerats lokalt i Chromium på desktop, mobil och med reducerad rörelse. Slutlig HTTPS-verifiering återstår enligt publiceringsstatusen.

Uppdatera endast detta separata webbdesignrepo. Den riktiga Cendovari-sidan, WordPress, produktionsrepot och Modbus Buddy ska lämnas orörda. Behåll Git-historiken och pusha en vanlig commit utan force-push.

## Publicering och framtida ändringar

Målrepo: `Cendovari/cendovari-webdesign-sida`. Standardadress efter publicering: https://cendovari.github.io/cendovari-webdesign-sida/

**Status: Luminous-paketet är importerat lokalt. Nytt GitHub-repo och Pages ska skapas efter verifierad inloggning. Ingen publicerad HTTPS-länk är ännu verifierad.**

Den separata lokala projektmappen har `origin` satt till `https://github.com/Cendovari/cendovari-webdesign-sida.git`. Kontrollera alltid repository, remote, branch och arbetskatalogens status före en ändring. Bevara orelaterat arbete och Git-historiken. Gör vanliga commits och push utan force.

GitHub Pages ska använda `main` och projektets rot (`/`). Behåll befintligt Pages-flöde när det har skapats. Ingen egen domän, `CNAME` eller DNS-ändring ingår.

Redigera `preview-source.html` och regenerera `index.html` med kommandot ovan. På Windows kan `python` användas i stället för `python3`. Behåll `cv-lumen`, svenska, sökmotormetadata, lokalt kontaktutkast och videokontrollern. Videornas initialt tomma `src` är avsiktligt; behåll inbäddade filmer och posters samt deras controller i samma export. Lägg aldrig till lösenord, tokens, `.env` eller filer från andra projekt.

Kontrollera sedan desktop, mobil och smala skärmar: navigation och undersidor, ikoner/typsnitt, filmer/posters/play/paus, scrollanimationer och kristall, dator-/mobilövergången, projektöppning samt Tillbaka/Escape, inspiration och lokalt kontaktutkast, pausad/systemets reducerade rörelse och horisontell overflow. Vänta på Pages-bygget och verifiera samma funktioner på den slutliga HTTPS-adressen innan länken delas.

## Arbetslogg för denna uppdatering

- Användaren klargjorde att det tidigare repot endast var planerat och godkände skapandet av ett nytt separat repo med samma namn.
- Underlag: `cendovari-webdesign-latest (1).zip`, SHA256 `78687ae06f171093d851f5effdd9c8d134f5f32bb607a49e08e50968d2fe7484`. Arkivet granskades först i en separat mapp. Inga äldre förhandsvisningsfiler användes som designkälla.
- Paketets källa har `cv-lumen` och SHA256 enligt avsnittet Rätt version. Exporten regenererades i granskningen och blev byteidentisk med paketets index. Runtime, exportskript och `.nojekyll` matchade det separata projektets stödfiler.
- Browserkontroll bekräftade att Chrome blockerade den ursprungliga formulärsubmit-knappen i `sandbox="allow-scripts"`. En minimal rättelse ändrade knappen till lokal click-hantering, validerar formuläret och återanvänder samtliga befintliga submit-handlers. Enter i namn/e-post återanvänder samma lokala utkast; textarea-radbrytning bevaras. Sandbox, CSP och designen ändrades inte.
- De övriga 17 controllers och samtliga inbäddade bild-/videopayloads är byteidentiska med paketet. Två video-only MP4-loopar är 960×540/24 fps; inga ljudspår eller externa filmadresser finns. Inga backendanrop eller vanliga hemlighetsmönster hittades.
- Källan efter den tekniska rättelsen har SHA256 `6e0eff2527b9e4b34adfdb7fc103c866db87b25e2727f2d4a186e36e8523ce82`; exporten har SHA256 `a3b824e00f65f62e2112d0f9002827a3bfe7a5197cef3b63da5edc1ea20dff6e`.
- Lokal Chromium-kontroll efter rättelsen: 1440×900, 390×844, 320×844 samt 390×844 med reducerad rörelse. Alla fyra körningar hade noll stegfel, JavaScript-undantag och misslyckade nätverksrequests. Navigation, ikoner (52 SVG, inga kvarvarande placeholders), Manrope, scrollsekvenser/kristall/dator–mobil, designstudio, tjänster/process/FAQ, Om oss, båda konceptöppningarna, Tillbaka/Escape och fokus/scroll kontrollerades. Filmernas uppspelning och paus verifierades; paus/reducerad rörelse stoppade canvas och filmer. Kontaktutkast, fältvalidering, Enter, textarea-radbrytning, inspiration och manuell kopieringsfallback fungerade utan backendanrop. Automatisk Clipboard-kopiering begränsas av iframe-policy och ger en konsolvarning; manuell fallback är verifierad. Smala skärmar hade ingen blockerande horisontell overflow. Offentlig HTTPS-verifiering återstår.
- Alla projektändringar ligger endast i det nya separata webbdesignprojektet. Cendovari-Website, Modbus Buddy, cendovari.com, WordPress, hosting, domän/DNS och befintliga produktionsinställningar är orörda.
