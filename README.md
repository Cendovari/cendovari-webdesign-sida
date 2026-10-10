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

Två illustrativa filmloopar är inbäddade i källan. De används i fyra filmplaceringar, med två ytterligare stilla posterplaceringar. Filmerna är 960×540, 24 fps, utan ljud. Looparna är korta och har små återställningar i kroppsrörelser; de är inte verifierade som perfekt sömlösa.

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

Källa, scriptsyntax, exportinnehåll och paketstruktur har kontrollerats. Exporten har verifierats både lokalt och på den publicerade HTTPS-adressen i Chrome: desktop 1440×900, mobil 390×844, smal mobil 320×844 och reducerad rörelse 390×844. Samtliga fyra publicerade körningar passerade. Mobilkontrollerna simulerar viewport och touch; fysiska telefoner har inte testats.

Uppdatera endast detta separata webbdesignrepo. Den riktiga Cendovari-sidan, WordPress, produktionsrepot och Modbus Buddy ska lämnas orörda. Behåll Git-historiken och pusha en vanlig commit utan force-push.

## Publicering och framtida ändringar

- [Öppna förhandsvisningen](https://cendovari.github.io/cendovari-webdesign-sida/)
- [GitHub-repository](https://github.com/Cendovari/cendovari-webdesign-sida)
- [Publicerad Luminous-källa och export](https://github.com/Cendovari/cendovari-webdesign-sida/commit/ac3e7d475b431b8d52e63cdb2f9890959018ff3c)
- [Första godkända Pages-bygget](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38053471800)

**Status: Publicerad och verifierad 2026-10-10. Den riktiga HTTPS-länken ger HTTP 200 och serverar exakt den kontrollerade Luminous-exporten. Alla publicerade browserkontroller nedan passerade.**

Utgå från en separat klon av detta publicerade repo, med `origin` satt till `https://github.com/Cendovari/cendovari-webdesign-sida.git`. Kontrollera alltid repository, remote, branch och arbetskatalogens status före en ändring. Den äldre lokala förberedelsehistoriken är bevarad separat och ska inte slås ihop med den publicerade historiken. Bevara orelaterat arbete och Git-historiken.

1. Kontrollera `git remote -v`, `git branch --show-current` och `git status`. Arbeta på `main` i rätt separata repo.
2. När arbetskatalogen är ren, hämta senaste historiken med `git pull --ff-only origin main`. Om annan ändring finns: granska och bevara den först.
3. Ändra källan, regenerera exporten och genomför kontrollerna nedan. Granska diffen och lägg endast till avsedda projektfiler.
4. Skapa en vanlig commit och kör `git push origin main`. Använd aldrig force-push.
5. Vänta på Pages-bygget i Actions och verifiera HTTPS-länken innan den delas.

GitHub Pages använder **Deploy from a branch**, `main` och projektets rot (`/`). Behåll detta Pages-flöde. GitHubs standardadress används med obligatorisk HTTPS; egen domän är tom. Ingen `CNAME` eller DNS-ändring ingår.

Redigera `preview-source.html` och regenerera `index.html` med kommandot ovan. På Windows kan `python` användas i stället för `python3`. Behåll `cv-lumen`, svenska, sökmotormetadata, lokalt kontaktutkast och videokontrollern. Videornas initialt tomma `src` är avsiktligt; behåll inbäddade filmer och posters samt deras controller i samma export. Lägg aldrig till lösenord, tokens, `.env` eller filer från andra projekt.

Kontrollera sedan desktop, mobil och smala skärmar: navigation och undersidor, ikoner/typsnitt, filmer/posters/play/paus, scrollanimationer och kristall, dator-/mobilövergången, projektöppning samt Tillbaka/Escape, inspiration och lokalt kontaktutkast, pausad/systemets reducerade rörelse och horisontell overflow. Vänta på Pages-bygget och verifiera samma funktioner på den slutliga HTTPS-adressen innan länken delas.

## Arbetslogg för denna uppdatering

- Användaren klargjorde att det tidigare repot endast var planerat och godkände skapandet av ett nytt separat repo med samma namn.
- Underlag: `cendovari-webdesign-latest (1).zip`, SHA256 `78687ae06f171093d851f5effdd9c8d134f5f32bb607a49e08e50968d2fe7484`. Arkivet granskades först i en separat mapp. Inga äldre förhandsvisningsfiler användes som designkälla.
- Paketets källa har `cv-lumen` och SHA256 enligt avsnittet Rätt version. Exporten regenererades i granskningen och blev byteidentisk med paketets index. Runtime, exportskript och `.nojekyll` matchade det separata projektets stödfiler.
- Browserkontroll bekräftade att Chrome blockerade den ursprungliga formulärsubmit-knappen i `sandbox="allow-scripts"`. En minimal rättelse ändrade knappen till lokal click-hantering, validerar formuläret och återanvänder samtliga befintliga submit-handlers. Enter i namn/e-post återanvänder samma lokala utkast; textarea-radbrytning bevaras. Sandbox, CSP och designen ändrades inte.
- De övriga 17 controllers och samtliga inbäddade bild-/videopayloads är byteidentiska med paketet. Två video-only MP4-loopar är 960×540/24 fps; inga ljudspår eller externa filmadresser finns. Inga backendanrop eller vanliga hemlighetsmönster hittades.
- Källan efter den tekniska rättelsen har SHA256 `6e0eff2527b9e4b34adfdb7fc103c866db87b25e2727f2d4a186e36e8523ce82`; exporten har SHA256 `a3b824e00f65f62e2112d0f9002827a3bfe7a5197cef3b63da5edc1ea20dff6e`.
- Lokal Chromium-kontroll efter rättelsen: 1440×900, 390×844, 320×844 samt 390×844 med reducerad rörelse. Alla fyra körningar hade noll stegfel, JavaScript-undantag och misslyckade nätverksrequests. Navigation, ikoner (52 SVG, inga kvarvarande placeholders), Manrope, scrollsekvenser/kristall/dator–mobil, designstudio, tjänster/process/FAQ, Om oss, båda konceptöppningarna, Tillbaka/Escape och fokus/scroll kontrollerades. Filmernas uppspelning och paus verifierades; paus/reducerad rörelse stoppade canvas och filmer. Kontaktutkast, fältvalidering, Enter, textarea-radbrytning, inspiration och manuell kopieringsfallback fungerade utan backendanrop. Automatisk Clipboard-kopiering begränsas av iframe-policy och ger en konsolvarning; manuell fallback är verifierad. Smala skärmar hade ingen blockerande horisontell overflow. Den följande offentliga verifieringen genomfördes efter publicering.
- Nytt offentligt repository skapades först efter kontroll att det exakta namnet var ledigt. Endast elva granskade projektfiler publicerades; inga lösenord, tokens, `.env`, gamla Git-mappar eller filer från andra projekt följde med. Main uppdaterades utan force-push.
- Pages-bygget för innehållscommit `ac3e7d475b431b8d52e63cdb2f9890959018ff3c` avslutades med success. HTTP 200 från den riktiga HTTPS-adressen verifierades; både publicerad källa och index hade exakt samma SHA256 som det kontrollerade underlaget ovan.
- Publicerad Chrome-kontroll: 1440×900, 390×844, 320×844 och reducerad rörelse 390×844. Samtliga fyra passerade utan JavaScriptfel, misslyckade requests eller backendanrop. Alla sex nätverksresurser gav HTTP 200. 97 breddkontroller visade ingen horisontell overflow. Navigation/undersidor, 52 SVG-ikoner, Manrope, kristall/scrollscener/dator–mobil, musreflektioner, designstudio/stilar/jämförelse, tjänster/process/FAQ, Om oss, båda koncepten, Tillbaka/Escape/fokus/scroll, verklig filmuppspelning, paus/reducerad rörelse och kontaktutkast/validering/Enter/inspiration/manuell kopiering kontrollerades. Svenska, `noindex,nofollow`, sandbox och konceptmärkning är bevarade.
- Kvarvarande begränsningar: Clipboard API ger policyrelaterade konsolmeddelanden; verifierad manuell kopiering fungerar. Vid 320 px bryter Kontakt i sidhuvudet till en andra rad men är nåbar. Filmerna är korta illustrationsloopar, inte verifierat sömlösa. Fysiska telefoner testades inte. Inga blockerande fel hittades i genomförda kontroller.
- Alla projektändringar ligger endast i det nya separata webbdesignprojektet. Cendovari-Website, Modbus Buddy, cendovari.com, WordPress, hosting, domän/DNS och befintliga produktionsinställningar är orörda.
