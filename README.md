# Cendovari Webdesign Sida — publicerad förhandsvisning

Separat Luminous-demo för Cendovaris webbdesign. Den godkända versionen innehåller en genomarbetad mobilversion och förbättrade interaktioner. Pärlemorgrunden, kristallen, silver/lila ljuset och datorversionens komposition är bevarade.

**Status: godkänd och publicerad på GitHub Pages 2026-10-10.** Efter användarens godkännande fördes den verifierade innehållscommitten `4f597db02a33e287f00c91d3fea55ce4ee5f3b4c` till main utan force-push. Den riktiga HTTPS-länken har verifierats och exporten matchar granskningsversionen byteexakt.

- [Godkänd granskningsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/luminous-mobile-refinement)
- [Hämta publicerad version som ZIP](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)
- [Publicerad förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Ändringar, verifiering och skärmbilder](docs/mobile-review.md)

## Prova förhandsvisningen

Öppna den publicerade länken ovan eller hämta main-versionens ZIP, packa upp det och öppna `index.html` i webbläsaren. Exporten är en komplett fristående webbsida; `preview-source.html` är det redigerbara fragmentet och ska inte öppnas som en hel sida. Ikoner och typsnitt kräver internetanslutning.

För lokal HTTP-server, kör från den uppackade projektmappen:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Öppna sedan `http://127.0.0.1:8766/`. På Windows kan `python` användas i stället för `python3`. Den lokala länken fungerar på datorn där servern körs. Kollegor kan hämta samma ZIP och öppna exporten på sin egen dator.

## Rätt källa

Mobilförfiningen utgår från dåvarande main, `6ecb3e31ad15d4636d1d607af17555788aae5a3a`, verifierad 2026-10-10. Den publicerade `preview-source.html` används som grund. Inget äldre ZIP-paket har återimporterats.

- Rot-ID: `cv-lumen`. Källan har 19 lokala scriptblock, inklusive den nya mobilmenyn.
- Kontaktformulärets publicerade iframe-rättelse är bevarad: lokal knapphantering med validering och lokalt utkast, Enter i enkla fält och vanliga radbrytningar i textarea.
- `index.html` genereras från källan och stödfilerna i `assets/` med `scripts/render.py`.
- `.nojekyll`, svenska och `noindex,nofollow` i både exporten och iframe är bevarade. Ingen `CNAME` eller koppling till cendovari.com finns.

## Upplevelse och material

Kristall, scrollstyrd dator-/mobilsekvens, projektöppningar, designstudio, tjänster, arbetsprocess, FAQ, Om oss och lokalt kontaktutkast finns kvar. Mobilen har egen komposition, kompakt navigation och tydliga Dator/Mobil-val i koncepten. Desktop behåller musreflektioner och flygande projektbilder; touchlägen har fortsatt avsiktliga begränsningar för dem.

Två illustrativa filmloopar är inbäddade i källan och används i fyra filmplaceringar. Ytterligare två placeringar är stilla posters. Filmerna är 960×540, 24 fps och utan ljud. Film- och bildpayloads är oförändrade. De korta looparna är inte verifierat sömlösa, och inga längre originalfilmer fanns i projektet. Inga nya kundbilder eller kundpåståenden har lagts till.

PB-system och Hagströms Motor är tillfälliga namn i designkoncepten. Filmer och bilder är illustrationsmaterial, inte verifierade fotografier från dessa verksamheter. Bevara märkningen. Modbus Buddy ingår inte i förhandsvisningen.

Kontaktformuläret visar bara ett lokalt utkast. Det skickar inte e-post och har ingen backend. Kopiering kan begränsas av iframe-policyn; den manuella fallbacken visar och markerar texten för kopiering. Inmatade uppgifter och inspiration behålls vid navigation men sparas inte i någon backend.

## Verifiering och begränsningar

Navigation, båda koncepten, fokus/scroll, jämförelse, kontaktutkast och medier har granskats i Chrome vid 320, 360, 390, 430, 768, 1024 och 1440 px, inklusive kort liggande vy och reducerad rörelse. Höjdändringar, rotation och touch emuleras på desktop. Safari på fysisk iPhone och Chrome på fysisk Android har inte testats. Exakt omfattning, mätningar och skärmbilder finns i [granskningsrapporten](docs/mobile-review.md).

Efter publiceringen passerade 113 kontrollgrupper på den riktiga HTTPS-länken vid 320×844, 390×844, 1440×900 och reducerad rörelse 390×844. Export och källa var byteidentiska med den godkända versionen. Inga blockerande JavaScript- eller resursfel hittades. Clipboard API kan ge det dokumenterade policyfelet; manuell kopiering fungerar. Ikoner och typsnitt behöver fortsatt internetanslutning. Exporten kräver JavaScript; utan det saknas en synlig fallback.

## Ändra och regenerera

Kör från projektmappen med Python 3:

```sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
```

Ändra källan och generera exporten igen. Behåll rot-ID, controllerhändelser, lokalt kontaktflöde och den inbäddade mediehanteringen. Videornas initialt tomma `src` är avsiktligt och ska inte ersättas med relativa filmadresser utan att kontrollern också anpassas och verifieras.

Runtime och exportskript följer med. Ikoner och Floating UI laddas från versionsangivna unpkg-adresser i runtime. Typsnitt laddas från font-CDN:er. `noindex,nofollow` är sökmotormetadata, inte lösenordsskydd.

## Arbetsflöde och publicering

Uppdatera endast detta separata repository. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, hosting och domän/DNS ska lämnas orörda. Lägg aldrig till lösenord, tokens, `.env`, gamla Git-mappar eller filer från andra projekt.

1. Kontrollera repository, `git remote -v`, branch och `git status`. Bevara orelaterade ändringar och Git-historiken.
2. Hämta aktuell main och börja i en separat arbetsbranch från den verifierade versionen.
3. Ändra källan, regenerera exporten och kontrollera samtliga vyer, interaktioner, rörelselägen och storlekar. Uppdatera dokumentationen.
4. Skapa en vanlig commit och pusha arbetsbranchen utan force-push. Visa den färdiga exporten och skärmbilder för granskning.
5. **Först efter användarens godkännande:** för den granskade versionen till main, låt det befintliga Pages-flödet bygga och verifiera den slutliga HTTPS-länken.

GitHub Pages använder **Deploy from a branch**, `main` och projektets rot (`/`). GitHubs standardadress och HTTPS används. Ingen ändring av Pages-inställningar, egen domän eller DNS gjordes. [Pages-bygget för den godkända versionen](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38060677367) avslutades med success.

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
