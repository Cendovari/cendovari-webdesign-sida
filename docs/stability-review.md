# Stabilitetsgranskning — 13 oktober 2026

Avgränsning: endast Cendovari/cendovari-webdesign-sida. Ren aktuell main och origin verifierades före arbetet. Utgångscommit: 69e7659754db3f93066a2ed8487e9ac758823752. Arbetsbranch: codex/stability-review. Tidigare rapporter och befintligt byggflöde granskades; inget äldre paket importerades.

## Bekräftade fel och rättningar

| Fel och reproduktion | Grundorsak och avgränsad rättning | Verifiering |
| --- | --- | --- |
| Namn eller meddelande med enbart mellanslag gav ett utkast med tomma uppgifter. | HTML required accepterar blanktecken, medan sammanfattningen trimmar dem. Namn och meddelande får nu trimmedveten custom validity; originalinmatningen bevaras och felet rensas när texten rättas. | Separata mellanslags-, NBSP/tab- och rättningsprov, Enter och befintliga ARIA-fel. |
| Direktlänk till services-rubriken placerade texten bakom sticky header, även efter omladdning. | Befintlig scrollmarginal omfattade sektioner men inte rubriker med ID. Samma dynamiska headeroffset används nu för dessa rubriker. Navigations-/historikmodellen ändras inte. | Färsk Home-fragmentlänk och reload på fem vyer; heading fri från header. |
| Projektens Services/Contact-genvägar klippte 32–45 px av rubriken på mobil; tangentbordsfokus låg kvar ovanför vyn. | Scrollmålet räknade bara huvudheadern. Ankaret mäter nu även aktuell sticky projektrad och fokuserar mål-rubriken utan extra scroll. Desktopens statiska rad räknas inte som sticky. | Båda koncept, services/contact, kort landskap, mål-fokus samt exakt opener/scroll vid Back. |
| Pilar och andra symboler försvann vid långsam eller blockerad ikonleverantör. | Exporten hämtade Lucide från CDN. Exakt godkänd geometri finns nu lokalt i källan/exporten med ISC-licens. Inga nya nätberoenden eller listeners. | Blockerad ikon/fontresurs: 56 SVG, fungerande meny/Escape, inga tomma symboler. Alla 14 befintliga geometrier och storlekar jämförda med basen. |
| Toppfilmens ram gick från cirka 155–157 px till full 16:9 efter första paint. | Filmens korrekta CSS kom sent i den strömmade HTML-filen. Exakt samma två godkända frame-/videoregler ligger nu före innehållet och reserverar utrymmet tidigt. Ingen beskärning eller slutlayout ändras. | Progressiv HTML-laddning 180 kB/s: bas 0/2, slut 2/2. Första filmramen har rätt 16:9 redan medan dokumentet laddas; noll felproportionerade observerade frames. |
| Touchdrag över den nyinfogade SVG-ikonen avbröts efter första steget. | Implicit pekarfångst på SVG-barnet flyttades till handtaget. Barnets lostpointercapture bubblade och nollställde dragningen. Endast förlust på själva handtaget avbryter nu dragningen. | Verkliga emulerade CDP-touchhändelser över målad SVG och handtagsyta, horisontellt drag, vertikalscroll och cancel. |

## Lokal verifiering

Faktiska installerade webbläsare: Google Chrome 154.0.8037.98 och Microsoft Edge 155.0.4283.45 på Windows. Automationen använder isolerade QA-kontexter. Mobil/touch är emulering, inte fysisk telefon.

Navigationsmatrisen passerade 186/186 kontroller. Slutlig faktisk browserzoom passerade 8/8 navigationskontroller. Layout-/ikonparitet mot basen passerade 12/12 prov inom 0,6 px. Slutkontaktmatrisen passerade 120/120 kontroller och faktisk kontaktzoom 7/7. En separat slutlig hashsmoke passerade 24/24.

I de åtta sandboxade Chrome-kontaktkontexterna nekades Google Fonts CSS av nätmiljön (net::ERR_NETWORK_ACCESS_DENIED). Systemtypsnittet fungerade; testerna visar inte noll misslyckade nätbegäranden. Inga JS-fel eller icke-GET-anrop observerades där. Avsiktliga resursfelsprov redovisas också separat från normal laddning.

Chrome: 320, 360, 390, 768, 1024 och 1440 px, 844×390 landskap och reducerad rörelse. Edge används som separat browserkontroll. Faktisk 200 procent browserzoom har också provats via en isolerad Chrome-profil; separat DPR/layoutemulering redovisas inte som samma test.

Kontroller omfattar alla huvudvyer, meny och fokus, upprepade/snabba sidbyten och dubbelklick, båda projekt, Tillbaka/Escape, interna sektionshopp, GPPE-externlänkar, återställning av scroll, textinfadning, långa svenska inmatningar, lokalt utkast, validering, inspiration och blockerad Clipboard med manuell fallback. Horisontell overflow, dolda fokusmål och konsolfel kontrolleras. Ingen riktig post/epost skickas.

Repotesterna reproducerar verkliga fel, inte bara syntax: ankartest 19/65 på basen och 65/65 på slutexporten; ikontest 4/6 på basen och 6/6 på slutexporten. Kontaktregression 4/4 och touchregression 9/9 passerar i slutversionen i både Chrome och Edge. De portabla repotesterna använder tillfälliga browserkontexter utan beständig QA-profil. QA-profiler och inmatade testuppgifter stannar utanför Git.

Blockerade bilder ger alt-text och stabila grundfunktioner. Blockerad film behåller poster; Spela fungerar när resursen återställs. Blockerade typsnitt ger systemreserv. Under Slow 3G (400 ms, 50 KB/s) tog DOMContentLoaded cirka 12,3 sekunder i mätprovet, men alla 56 lokala ikoner fanns redan då, jämfört med noll tidigare.

Efter 50 sid-/meny-/projektcykler växte inte registrerade listeners, observers eller bakgrundslager: 124 listeners, 23 observers, en bas och en lins. Ingen återkommande canvasmålning, kvarvarande timeout/interval eller extra bakgrundsrAF konstaterades. Paus, reducerad rörelse, dold flik och borttagen rot stannar kontrollerna. Dessa mått bevisar inte frånvaro av alla minnesläckor eller fysisk skärm-FPS.

Alla tre originalfilmer, posterbilder, GPPE-material och skulptur-PNG är byteidentiska med basen. Filmcontrollers och bakgrundskod är byteidentiska. Åtta prov spelar två kompletta loopar: huvudfilm och övriga filmer på mobil/desktop och i projektvyer. Vanlig scroll, paus/återuppta och sidbyte nollställer inte src/load/currentTime; manuell paus består. Reducerad rörelse, simulerad dold flik och injicerad autoplay-nekning kontrolleras.

Den sista minimala touchguarden infördes efter att delar av den breda matrisen laddat kandidat 981c2ff1…/18ab2603…. Dessa råresultat behålls med verklig hash; berörda oförändrade controllers jämförs byte för byte och den slutliga exporten får riktade omprov. Gamla resultat märks aldrig om som nya. Sista uppföljningen lägger endast två identiska kritiska film-CSS-regler före innehållet. Alla skript är byteidentiska med dfd354811…; berörda laddnings-/layoutprov körs igen och offentlig kontroll låses till sista aa75d054…-exporten.

Slutlig källa SHA-256: 3503898d9455f80420b52553843a9b84c3ef1c8bea9e3f1a46b57fd7a619ae45.
Slutlig index SHA-256: aa75d054105cf45aa2ff0e19c2c4426535e73c369e80d25b49118b0c5622fb9a.
Befintlig build-export och render-CLI ger exakt samma index. 18 JavaScript-block och JSON-metadata passerar syntax/parsing. noindex,nofollow, vanlig dokumentscroll utan iframe och lokalt demoläge bevaras.

## Skärmbilder

[Desktop 1440](screenshots/stability-1440-home.png) · [Mobil 390](screenshots/stability-390-home.png) · [Rättat projekthopp på mobil](screenshots/stability-390-project-section.png) · [Kontakt utan testuppgifter](screenshots/stability-390-contact-empty.png) · [Liggande meny](screenshots/stability-844-menu.png).

## Publicering

Lokal förhandsvisning öppnades före publicering. [Fixcommit 3b65dc5](https://github.com/Cendovari/cendovari-webdesign-sida/commit/3b65dc59a21a8c0a19ee492283d4a139d194ea2c) följdes av [film-CSS-commit 0ac89b2](https://github.com/Cendovari/cendovari-webdesign-sida/commit/0ac89b22dba96f2383e3261c4a91e7ecc6a3cbb0), med vanlig fast-forward till main. [Pages-bygge 38374087081](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38374087081) lyckades. [Canonical HTTPS](https://cendovari.github.io/cendovari-webdesign-sida/) gav 200 och exakt slutindex aa75d054… . Alla 27 kontrollerade filbytes matchade lokalt; alla tre MP4 gav korrekta Range 206. Samtliga film-/bildresurser ingår. Pages-/domän-/DNS-inställningarna är oförändrade.

Den offentliga Chrome-/Edge-matrisen passerade 186/186 över 13 färska vyer, med alla indexSHA exakt AA75. Chrome 320/360/390/768/1024/1440/844×390/reduced390 plus separat layoutemulering; Edge 320/768/1440/844×390. Menyer, snabb navigation, fokus, native fragment/reload/history, projekt/Escape/Back, återställning och textinfadning passerade. Inga JS-, HTTP-, requestfailed-, CDP- eller mediaerror-händelser noterades i just denna matris. Offentliga ankartest 65/65 och faktisk Chrome 200 % zoom 8/8 passerade.

Offentliga kontakt-/touch-/zoomprov passerade 153/153: Chrome-matris 120, faktisk browserzoom 7 och kontakt/touch 13 per browser i både Chrome och Edge. Inga JS- eller icke-GET-anrop. Tre showreel ERR_ABORTED i 320/768/1440 finns kvar i rådata; den kontakt-harness som användes registrerade inte tidpunkt, CDP eller mediaerror-events. Orsaken tillskrivs därför inte säkert och dessa prov beskrivs inte som noll resursavbrott. Det lilla separata font-/medieprovet verifierade Google CSS 200, gstatic Manrope WOFF2 200, faktiska Manrope 400/500 loaded och video readyState 4/error null, utan misslyckade begäranden i det provet.

Publicerade filmer: åtta prov med två kompletta loopar, 16 omslag och 4 249 avkodade frames/frame-callbacks. Inga rapporterade droppedframes eller återställningar av src/load/currentTime/emptied i normal scroll/paus. Samtliga 153 funktionella icke-resurskontroller passerade. Råresultat 155/157: två showreel Range-strömmar avbröts av testets uttryckliga gamla-kontroller-injektion, båda 206 och CDP canceled:true. Inga native media-, JS-, HTTP- eller backendfel i filmprovet. Dessa två råfel bevaras; ingen noll-requestfailed-garanti lämnas.

Slutdokumentationen publiceras i en vanlig efterföljande commit. Den ändrar enbart README, denna rapport och preview-review.json; kod och resurser är exakt samma som i de låsta offentliga testerna.

## Begränsningar och kvarstående risker

Inga fysiska telefoner, Safari eller Firefox finns tillgängliga här. Tangentbord/adressfält/rotation simuleras med viewportändringar och är inte ett test av en riktig mobil-OS-webbläsare. Primärt grovpekande enhet med sekundär fin mus kunde inte verifieras genom CDP-mediaoverride; mus och touch provades var för sig. Dold flik/autoplay-nekning och resursfel är uttryckliga testinjektioner.

Bakgrundens tidsbaserade tillstånd jämfördes vid simulerade 30/60/75 Hz; det är inte faktisk compositor-FPS. Tidigare scrollprov har varierande kalla browser-rAF-gap. Ingen ny återkommande flaskhals i bakgrundens JS/canvas/layout konstaterades; underliggande browser/GPU-variation är inte förklarad eller en garanti om felfri FPS.

Tidiga layout-shift-poster sågs under parsning/font-/style-init i både bas och kandidat. Den konkreta filmramens höjdändring rättas med tidig identisk CSS. I det interaktionsfria desktopprovet sjönk rå layout-shift-summa från 0,564 till 0,0409; det är ett kontrollerat initprov och inte en fältmätt CWV-siffra. Sex bredders slutlayout-/ikonparitet passerade 12/12 och slutlig hashsmoke 24/24. mindre font-/knapptextskiften kan fortfarande förekomma. Den uppmätta stabila layoutpariteten är inte ett CLS0-påstående eller en isolerad Core Web Vitals-mätning.

Ingen design-, innehålls-, medie- eller produktionsförändring ingår. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, hosting och DNS är orörda. Historik och orelaterade filer bevaras; ingen force-push eller hard reset.
