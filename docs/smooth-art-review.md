# Granskning av den godkända skulpturala bakgrunden

2026-10-13. Arbetet gäller endast `Cendovari/cendovari-webdesign-sida`.

Lokalt kontrollerad slutversion. Publiceringskvittot fylls i efter verifiering på den riktiga Pages-adressen.

## Underlag och avgränsning

Integrationen utgår från det godkända paketet och den separata demosidans rena `main`, commit `9ba066f6c26e5fe4e28e0d3bfdcad2ff2d3cf2b3`. Paketets referenskälla var byteidentisk med denna version. Alla 22 kontrollsummor i paketets manifest verifierades. Det innebär att integrationen bygger på det aktuella underlaget och behåller tidigare rättelser av navigation, kontaktutkast och medier.

De godkända designändringarna är skulpturala former i silver, pärlemor och lila, mjuk belysning som följer muspekaren, ett ljust verkstadskoncept samt mörkare och mer läsbar text i process- och kontaktavsnitten. GPPE-exemplet har behållits. Paketets befintliga sidinnehåll och filmkort används vidare.

Tre små tekniska korrigeringar kompletterar paketet. CSS-villkoret för muspekare använder korrekt syntax och samma `any-hover` och `any-pointer` som JavaScript. Det gör villkoren samstämmiga även när en enhet erbjuder både touch och mus. Den sista etiketten på verkstadens vita filmplatta ärver plattans mörka textfärg. Slutligen köar ett `pointerleave` inte nya animeringsbilder när belysningen redan är helt osynlig. Korrigeringarna ändrar varken layouten eller de godkända materialen.

## Samma bild utan tung generering vid sidstart

Paketets ursprungliga `createArt` genererade bilden när sidan startade. I Chrome tog rasterisering och PNG-kodning tillsammans cirka 426 ms vid 1440 pixlars bredd och 468 ms vid emulerad mobilbredd 390. PNG-kodningen stod för cirka 338 respektive 312 ms. Den sammanhängande uppgiften under inläsningen var cirka 510 respektive 525 ms. En separat simulering med fyra gånger långsammare CPU gav 733 ms för bildgenereringen och en sammanhängande uppgift på 1 077 ms. Dessa siffror gäller den uppmätta dator- och Chrome-miljön; simuleringen är ingen mätning på en fysisk telefon.

Paketet tillåter uttryckligen att exakt samma konst förberäknas. Den möjligheten har använts. En oberoende återgenerering i faktisk Chrome gav samma PNG-byte som den bild som fångades från paketets faktiska körning. Även alla avkodade RGBA-pixlar var identiska:

- Bildmått: 896 × 1254 pixlar.
- PNG: 466 103 byte, SHA-256 `da3d70edf3f27d95306a89defe97b92e54a8a689e4fd93dcfecf3c5063d7bbcc`.
- RGBA: 4 494 336 byte, SHA-256 `7ff844d7ac567c22d70ef51a0e40747fab25373ae3ce2d247115db627d3a8242`.

Den redigerbara källan innehåller samma PNG inbäddad. Exportören flyttar den till `assets/images/cendovari-sculpture.png` utan omkodning. Originalalgoritmen finns i `scripts/sculpture-art.js`. Det valfria verktyget `scripts/render-sculpture.cjs` kan återgenerera bilden offline med Chrome och Playwright och kräver en uttrycklig utmatningsfil. Det vanliga byggflödet kräver fortfarande bara Python.

Bildens följning, geometri, pausvillkor och städning är bevarade, med den nämnda vakten för en redan osynlig belysning. Ingen löpande canvasmålning behövs för bakgrunden. PNG-kodning kan skilja mellan webbläsarversioner; avkodade pixlar är därför ett viktigt jämförelseunderlag.

Slutexporten mättes i faktisk Chrome: 50/50 bakgrundskontroller passerar, ingen canvas skapades eller målades, inga layoutläsningar skedde inne i animationsticks och högst en bakgrundsframe var köad. Vid stillhet, touch, rörelsepaus/reducerad rörelse och simulerad dold flik var inga bakgrundsframes kvar. Native mus och mus+scroll gav median 13,3 ms och P95 13,5 ms mellan aktiva rAF-ticks i denna cirka 75 Hz-miljö. Detta är callback-takt, inte uppmätt compositor-FPS eller ett löfte för fysiska telefoner. Efter en avsiktligt injicerad blockering på 650 ms begränsades tidssteget korrekt till 0,05 s. Två andra startup-longtasks på 69/57 ms observerades i touchprovet; de tillskrivs inte någon canvasgenerering, som var helt borttagen.

## Verifiering av integration och export

Den slutliga statiska granskningen och exportkontrollen passerade 69 av 69 kontroller. De gäller källan `21fdf200…` och exporten `c585a749…`. Standardkommandot, äldre CLI, Python-API och en upprepad byggning gav byteidentisk export. Nio negativa testfall avvisades innan någon utmatningsfil eller exporterad bild skrevs. Bland dessa fanns okända och felkodade medier, ändrade originalfiler, iframe, komplett HTML-dokument och beroende av ett förhandsvisnings-API.

Paketets 17 tidigare script är byteidentiska. Efter normalisering av rotens ID är 15 controllers också exakt lika den tidigare huvudversionen. De övriga tidigare ändringarna gäller enbart den godkända workshoptexten och paketets kompakta medievärden. Navigationens diskreta inkommande övergång på 140 ms, menyn, fokus, Tillbaka, Escape, kontaktlogik och filmcontrollers har därmed bevarats i koden.

Alla tre fullängdsfilmer och sex befintliga bildfiler är byteidentiska med paketet och tidigare `main`. Det omfattar toppfilmen `9bf277fb…` och fullpostern `0dbd5567…`. Den kompakta postern `b413…` mappas till den hashverifierade fullpostern och får inte skriva över den. Befintligt exportskal, CSP, svenska dokumentinställningar, ikoner, `noindex,nofollow` och bygggränssnitt är bevarade. De två valfria bildverktygen saknar privata profilsökvägar och API-uppgifter.

Automatiserad Chrome 154.0.8037.98 på Windows. Bred lokal matris före de sista riktade korrigeringarna: 191/191 kontroller vid 320×844, 390×844, 768×1024, 1440×900, 844×390 och reducerad rörelse vid 390. Resultatet tillhör export8d43, inte slutexportens hash; kontrollen av osynligt musljus i den första matrisen var otillräcklig och ersattes av faktisk display-/bild-/renderergranskning. Slutexportc585 har därefter passerat 36/36 header/nav/display/overflow-kontroller på samma sex vyer, synliga idle/moving/paus-bildpar, menyns landskapsfokus samt 16/16 kontroller av den verkliga inlinekällan på 1440/390. Godkänd paketgeometri matchar inom1px på1440/390. Navigation, meny/fokus, verkstadsöppning, Escape/Tillbaka, GPPE-länkar, kontaktutkast och vanlig scroll är bevarade. Verkstadens båda filmtexter är nu mörka, cirka13:1 motvit platta (ingen full WCAG-audit). Inga JS-/konsol-/resurs-/backendfel noterades i dessa kontroller.

Filmer:151/151 lokala kontroller och åtta tvåvarvsprov pådesktop1440/mobil390, i toppfilmen, startsidans verkstadskort och båda bevarade projektcontrollers. Alla tre fulla filer är byteverifierade. Totalt4248 avkodade/presenterade frames, inga observerade dropped frames/stalls eller ändringar av src/load/currentTime vid vanlig scroll/paus. Detta prov tillhör8d43; en separat bytejämförelse visar identiska filmcontrollers och medier i slutversionen. Dold flik är en uttrycklig document.hidden/visibilitychange-simulering. Nekad autoplay injiceras för att prova poster/Spela-fallback, följt av normal uppspelning. En full omgång körs även mot den publicerade slutexporten.

Publicering förberedd på arbetsbranchen `codex/smooth-art`. Befintligt main/rot-Pages-flöde används utan ändring av domän, DNS eller egna CNAME-inställningar. HTTPS-/resurs- och livebrowserkontroller återstår efter deployment.

## Begränsningar och skyddad omfattning

Statisk byteidentitet och reproducerbar export ersätter inte webbläsartester av rörelse, scrollning, layout eller filmuppspelning. Dessa resultat redovisas separat ovan. Chrome 154.0.8037.98 på Windows används i auditens bildbevis. Emulerade skärmstorlekar, touch, hybridläge, dold flik och nekad automatisk uppspelning måste beskrivas som emulering eller simulering där sådana metoder används. Ingen fysisk iPhone, Android, Safari eller hybridenhet har verifierats i denna audit. Resultaten innebär ingen FPS-garanti för andra telefoner eller grafikprocessorer.

Kontaktformuläret är en lokal demo utan backend eller mejlutskick. Inga nya kund- eller resultatpåståenden har lagts till. Alla projekt- och GitHub-skrivningar är begränsade till det separata demorepot. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, hosting och DNS ingår inte i ändringarna. Publicering får anges som verifierad först när den riktiga adressen har kontrollerats.

## Skärmbilder

![Desktop, stilla mus](screenshots/smooth-art-final-1440-background-idle.png)

![Desktop, mjukt musljus](screenshots/smooth-art-final-1440-background-moving.png)

![Vitt verkstadskoncept](screenshots/smooth-art-1440-white-workshop.png)

![Mobilkontakt, tomma fält](screenshots/smooth-art-390-contact-clean.png)

![Mobilprocess och mörk text](screenshots/smooth-art-390-process-clean.png)

![GPPE med riktig bild och kreditering](screenshots/smooth-art-390-gppe-project.png)

![Kort liggande vy, menyfokus](screenshots/smooth-art-final-844-landscape-menu-focus.png)
