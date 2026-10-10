# Cendovari Webdesign Sida — naturligt scrollflöde

2026-10-10. Den bifogade designen och publiceringen är godkända av användaren. Arbetet sker på `codex/natural-scroll-preview` från verifierad main `2a9df0f071609e0485289e07ec63c673adbded1b`. Main/Pages-publiceringen och den riktiga HTTPS-sidan är verifierade; kvitto finns sist i rapporten.

## Underlag och avgränsning

`cendovari-scrollpaket.zip` (SHA256 `7f3e385b3060587f575620d2c9f1e9ea150b862af7ad6c3939b378c351192d3e`) har samma bas som aktuell main. Paketets källa och export granskades först i en separat QA-mapp. Källans rot är `cv-silk`. Runtime och exportskript var semantiskt identiska; projektets befintliga bytes behölls. Historisk dokumentation och Git-historik bevaras.

Alla projekt- och GitHub-skrivningar gäller endast `Cendovari/cendovari-webdesign-sida`. Arbetsklonen ligger separat från produktionsprojekten. Ingen force-push, ändring av Pages-inställningar, egen domän eller DNS görs. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com och hosting är orörda.

## Genomförd förändring

Startsidan rör sig uppåt direkt vid scroll. Den långa fasta scenen med flera objektförvandlingar är avaktiverad. Direkt därefter kommer de två stora vertikala filmkorten. De växer begränsat och mjukt; filmparallaxen är begränsad till 26 px åt vardera håll. Text och öppningsknappar är hela tiden synliga och åtkomliga. Dator och mobil visas tillsammans under ”Samma känsla. Alla skärmar.” utan kontroller som hoppar mellan animationsfaser. Tjänster, arbetsprocess, FAQ och kontakt följer i normalt sidflöde.

Webbläsargranskningen prioriterade scroll, navigation, fokus och touch före kompositionsdetaljer. Följande riktade rättelser behövdes inom den godkända designen:

- Mobilillustrationens grid kunde bli bredare än ramen, och rubrikens nowrap klippte text. En begränsad gridkolumn, min-width: 0 och normal radbrytning gör hela rubriken, brödtexten och tjänstetiketten synliga även vid 320 px. Layouten har samma placering och proportioner.
- Den nya scrollkontrollern har en ägare och städar frame, listeners och observers. Den arbetar bara när startsidan är synlig och tillgänglig, och återupptar från aktuell scrollposition efter lifecycle-händelser. Kortens layoutgeometri räknas utan föregående skalningsåterkoppling.
- Kristallens tidsanimation pausar utanför den synliga startsidan och under meny/bakgrund. Ljusförflyttningen begränsas till startsidans höjd. Menyn pausar också kontaktdekorationen.
- Ett äldre Enter-fel hittades i kontaktens utkastflöde: ett redigerat fälts change kunde dölja det nyskapade utkastet vid fokusflytt. Fältet avslutar nu sin ändringshändelse före FormData, utkastvisning och headingfokus. Den tidigare publicerade iframe-fixen, validering och textarea-radbrytning är bevarade.

Detta är tekniska och små kompositionsrättelser, inte en ny redesign. Pärlemorgrunden, kristallen, silver/lila ljuset, typografin, logotypen och Cendovari AB är bevarade. Mobilmeny, fokus, sidbyteshändelser, projektöppning, Tillbaka/Escape, scrollåterställning, Designexempel, båda koncepten, Om oss och Kontakt finns kvar. Stilval, jämförelse och inspiration följer med till det lokala kontaktutkastet.

PB-system och Hagströms Motor är fortsatt tydligt märkta tillfälliga designkoncept. Filmer och bilder är illustrationsmaterial. Alla tio medieposter är oförändrade; inga kundresultat, omdömen eller företagsuppgifter tillkommer. Filmerna är utan ljud och behåller posters, playsinline och den befintliga kontrollern med avsiktligt initialt tomma src. Formuläret skickar ingen e-post och har ingen backend.

## Verifiering

Färdig källa SHA256: `51bf6d1dd9f16ef71d6f382642a823dd9e2eb789de3fb1a176542e241f9b8d91`. Export SHA256: `02296f5ac7c41fd69c9cb0d26be7866aca952cd79b9df689dbf805149c3e7c84`. Slutexporten regenereras med projektets ordinarie render.py.

Den breda matrisen före den isolerade Enter-rättelsen granskade export och regenererad källa vid 320×844, 390×844, 540×960, 820×1180, 1440×900, 844×390 samt 390×844 med reducerad rörelse. Alla 14 körningar passerade de granskade värdena i 350 kontrollsteg; exportens SHA var df3c9ee5…. Denna version används som omfattande flödes-/funktionsbaslinje, inte som slutexportens hash.

Efter Enter-rättelsen verifierades exporten 2295c481… och dess nygenererade source-export igen i alla 14 lägen. 236 layoutprover granskades uttryckligen. Alla huvudvyer, båda koncepten i Dator och Mobil, Tillbaka/Escape/fokus/scrollåterställning, öppet menyläge/fokusfälla/stängning/scrollåsning, naturligt scrollflöde, telefontexter och tryckytor på minst 44 px passerade. Musens scrollhjul, PageDown och emulerade riktiga touchsvep via Chrome-input verifierades nedåt, uppåt och snabbt. Filmuppspelning följdes med currentTime. Paus och reducerad rörelse ger komplett innehåll, stilla canvas, pausade filmer och inga pågående CSS-animationer. Höjdändring, stående–liggande–stående och kort liggande vy granskades utan fastnade element eller oavsiktlig yttre scroll.

Kontakt och interaktionsracer kontrollerades dessutom i sex separata slutkörningar: export och regenererad källa vid 390×844, 1440×900 och reducerad rörelse 390×844. 106 kontrollpunkter passerade för validering, utkast/ändring, upprepade Enter efter redigering, textarea-radbrytning, fokus, manuell kopiering, stil-/projektinspiration och borttagning, bevarade fält, meny, upprepade PB-/Motor-öppningar i båda lägena och snabba sidbyten.

Inga JavaScript-undantag, misslyckade nätanrop, HTTP-fel, backendanrop, dolda fokusmål eller oavsiktlig horisontell overflow hittades i slutkontrollerna. Förväntade Clipboard-policy-meddelanden finns i konsolen; manuell fallback fungerar. Ikoner och typsnitt laddade korrekt. Exportens höjdbrygga, sandbox och den inre scrollbehållaren fungerar tillsammans i de testade vyerna.

Den sista formatstädningen tog bara bort åtta blanktecken på en tom HTML-rad. Alla 20 scripts och båda styles är byteidentiska med 2295-versionen. Slutexporten 02296f5a… och dess nygenererade käll-export kontrollerades i samma 14 webbläsarlägen före publicering: alla passerade med 236 layoutprover och utan avvikelser, JavaScriptfel eller misslyckade resursanrop.

Kontrollerna körs i riktig Chrome på Windows med isolerade profiler. Mobilbredder, touch, höjdändringar och rotation är **desktopemulering**. Safari på fysisk iPhone och Chrome på fysisk Android har inte testats. Paketets syntetiska kontroller användes bara som kompletterande teknikgranskning.

Statiskt och deterministiskt: 20 källscript och totalt 52 syntaxkontroller passerar. Tio medieposter och fem runtime/exporterfiler är byteidentiska med den tidigare basen. Exporten kan återskapas byteexakt. Inga hemligheter, .env, CNAME eller browser-profildata ingår i projektfilerna. Svenska och noindex,nofollow i export och iframe samt sandbox är bevarade.

## Skärmbilder

Bilderna visar slutversionen i emulerade viewports, inte fysiska telefoner.

- [Dator 1440 px](natural-scroll/desktop-1440.png)
- [Mobil 390 px](natural-scroll/mobile-390.png)
- [Filmkort 390 px](natural-scroll/film-card-390.png)
- [Dator och mobil tillsammans 390 px](natural-scroll/devices-390.png)
- [Meny 320 px](natural-scroll/menu-320.png)

## Kvarvarande begränsningar

- Verkliga telefoners tangentbord, adressfält, notch/safe areas, batteri och GPU är inte verifierade. Korta vyer och rotation/höjdändring är emulerade. Bakgrund/pagehide testas med simulerade lifecycle-händelser.
- Clipboard API kan blockeras av iframe-policyn. Manuell kopiering visar och markerar utkastet och är ett avsiktligt fallbackflöde.
- Illustrationslooparna är korta och inte verifierat sömlösa; längre originalfilmer saknas. Inget nytt material eller konstgjord förlängning har gjorts.
- Ikoner och typsnitt behöver internetanslutning. Exporten kräver JavaScript och saknar synlig fallback utan JavaScript.
- Den äldre kontaktdekorationens CSS-loop fortsätter offscreen när rörelse är på. Paus/reducerad rörelse, öppen meny och dold sida stoppar eller pausar den. Det hävdas inte att alla CSS-animationer stannar enbart vid offscreen.

## Publicering

Samtliga lokala och publika slutkontroller har passerat. Den godkända arbetsbranchen är förd till main utan force-push och det befintliga Pages-flödet har publicerat versionen. Den riktiga HTTPS-länken och exportens hash är verifierade enligt kvittot nedan.

[Publicerad förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/). GitHub Pages behåller Deploy from a branch: main, projektets rot (/), HTTPS-standardadressen.

## Verifierad publicering 2026-10-10

Den godkända versionen publicerades från arbetsbranchen till main med vanlig commit [`691e733c…`](https://github.com/Cendovari/cendovari-webdesign-sida/commit/691e733c8c751c773bc109f32007e342dc41f408). Ingen force-push gjordes. [Pages-bygge och publicering](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38065155829) avslutades med success. Den riktiga [HTTPS-förhandsvisningen](https://cendovari.github.io/cendovari-webdesign-sida/) gav HTTP 200. Publicerad index och redigerbar källa matchar slutversionens SHA256 ovan byteexakt.

På den verkliga HTTPS-sidan passerade fyra Chrome-körningar (320×844, 390×844, 1440×900 och reducerad rörelse 390×844), med 67 layoutprover. Navigation, öppet menyläge/fokusfälla/scrollåsning, PB-system och Hagströms Motor i Dator/Mobil, Tillbaka/Escape/fokus/scrollåterställning, Designstudio, Om oss och Kontakt, native scroll samt filmuppspelning och paus/reducerad rörelse fungerade. Alla ikoner ersattes och faktiska Manrope-fontfaces laddades. Inga JavaScript-undantag, misslyckade requests, HTTP-resursfel, backendanrop, dolda fokusmål eller oavsiktlig horisontell overflow hittades.

Tre ytterligare publika kontaktkörningar (390×844, 1440×900 och reducerad rörelse 390×844) passerade 26 kontrollpunkter. Validering, upprepade Enter efter redigering, textarea-radbrytning, utkast/ändring, headingfokus, bevarade fält, stilinspiration och borttagning, manuell kopiering samt meny/Escape/scrollåsning verifierades. Inga backendanrop gjordes. Clipboard API ger förväntade policybegränsningar; den manuella fallbacken fungerar.

Mobilkontrollerna är desktopemulering på Windows, inte fysiska telefoner. De tidigare redovisade enhets- och mediebegränsningarna kvarstår. Det efterföljande publiceringskvittot ändrar endast README och granskningsdokumentation; källa, export, runtime och medier förblir oförändrade. Pages behåller befintliga inställningar, standardadress och main/root. Produktion, Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, hosting och domän/DNS är orörda.
