# Godkänd kristallintroduktion — ändring och verifiering

Arbetet gäller endast Cendovari/cendovari-webdesign-sida. Utgångspunkt är main 779da7f7f53c2931bb0b2bc8372d85430b8ba906 och arbetsbranch codex/crystal-introduction. Paketets bas matchade main; historik och övriga filer bevarades. Användaren godkände design och publicering efter kontroller.

## Utförd ändring

Paketets preview-source.html och index.html användes som konkret designreferens. CSS och markup utanför scriptblock är byteidentiska med den godkända källan. Den kortare introduktionen har en skarp, separat och stilla CV-symbol till höger på dator och ovanför rubriken på telefon. Ett fåtal glaskristaller rör sig långsamt med tid, oberoende av scroll.

Den faktiska ordningen är introduktion → ”Samma känsla. Alla skärmar.” → filmer → tjänster → arbetsprocess och resten av sidan. Design-genvägen leder till dator-/mobilvisningen. Filmkort och dator-/mobilvisningen har fasta poser; deras tidigare scrollstyrda transform-loop är borttagen. Även oanvänd kod för den gamla långa scenen har tagits bort. Den befintliga engångsplaceringen av rubriken ovanför skärmvisningen bevaras.

Kristallerna behåller en egen fas per vy. Meny, paus, reducerad rörelse, dold sida och offscreen stoppar uppdateringen. Återkomst börjar från samma fas, även efter ett besök på Om oss. CV-symbolen ritas separat vid storleksändring, med upplösning upp till DPR 3 och utan blur eller efterföljande förstoring; den animerade canvasen behåller befintligt upplösningstak.

## Bevarat

Mobilmeny, fokus, sidbyteshändelser, projektöppning, Tillbaka/Escape, scrollåterställning, designstudio, jämförelse, inspiration, Om oss och lokalt kontaktutkast behålls. Kontaktens publicerade iframe-fix och blur/Enter/textarea-hantering är oförändrade. Formuläret skickar ingen e-post och kontaktar ingen backend.

Paketets komprimerade inbäddade filmer publiceras inte. Den verifierade filmcontrollern från main används med de befintliga originalfilerna i assets/video, utan ändrad källa eller omstart vid normal scroll eller paus. Båda MP4-filerna är byteidentiska med paketets original: 1280 × 720, 24 fps, 240 bildrutor, 10,000 sekunder, H.264 och utan ljud. Posters, muted, playsinline, loop, normal hastighet och fallback vid nekad uppspelning behålls.

Alla fem runtime-/exporterfiler är bevarade. index.html regenererades med projektets scripts/render.py; källfragmentet används inte direkt som en komplett sida. Svenska, noindex,nofollow, sandbox och märkning av illustrationer och tillfälliga designkoncept finns kvar. Inga nya kundpåståenden eller företagsuppgifter infördes.

## Underlag och statisk verifiering

- Paket: cendovari-kristaller-paket.zip; SHA256 990a99aadc03a152a6d56c6abf846b2dfdb6f04836d7aee63c51c6f3cf1da2d6.
- Källa: 7da7e776b36913febab04f9917e16a133d27c39615cd179b559a37ea9a5ddaf1.
- Export: 33e7895500ca24d0edf11efae659a1b42c3d31774ddf320e53f9b3556867959b.
- 20 av 20 scriptblock passerar syntaxkontroll; CSS/markup matchar paketet byteexakt.
- Filmcontroller och kontakt-/navigation-/höjdregioner jämfördes med main och paketet. Endast nödvändig rot-ID-anpassning och oanvänd scenkod skiljer dem.
- Exekverad syntetisk canvas-fixture verifierar stilla CV, individuell scenfas, paus/resume/offscreen/meny/reduced/hidden/pagehide samt cleanup med noll kvarvarande frame/listener och tre frånkopplade observers. Detta är en separat kodkontroll, inte ett telefon- eller webbläsartest.

## Webbläsarkontroll och publicering

Den frysta v2-kandidaten passerade fem riktiga Chrome-körningar: index och från källan nygenererad export vid 390 × 844 och 1440 × 900, samt index med reducerad rörelse vid 390 × 844. 48 layoutprover, 76 film-/attributmätningar, 28 kontinuitetsprov och 94 kontakt-/UI-kontrollpunkter passerade. Båda filmerna mättes till 10 sekunder, 1280 × 720 och hastighet 1 i alla fyra filmplatser.

Åtta tvåvarvsprov gjordes i index på emulerad mobil och desktop: båda filmerna på startsidan och i projekten. Varje prov presenterade 530–531 bildrutor under 22,108–22,135 sekunders media, med två naturliga varv och noll tappade bildrutor eller uppmätta stopp. Källharnessen kontrollerades med kortare uppspelnings- och UI-prov; tvåvarvsproven avser index. Inga src-mutationer, load/currentTime-tilldelningar eller emptied-händelser tillkom under normal scroll eller paus.

Validering, Chrome-automatiserade tangenttryckningar med Enter efter redigering, textarea-radbrytningar, redigering av utkast, inspiration, borttagning, meny/Escape/fokus/scroll och manuell kopiering passerade. Samtliga fem körningar hade noll JavaScript-undantag, resursfel eller backendanrop. Alla 57 ikoner ersattes och typsnitt laddades. Den breda layoutmatrisen passerade 22 av 22 faktiska Chrome-körningar av index och nygenererad källharness i 11 storlekar/lägen: 320, 390, 540, 640, 641, 820, 821, 1024 och 1440 px, kort liggande 844 × 390 samt reducerad rörelse vid 390 × 844. 294 layoutprover och 610 kontrollpunkter omfattar fyra huvudvyer och båda projekts Dator/Mobil, Back/Escape och öppnarfokus.

Åtta Chrome-CDP-touchsvep nedåt/uppåt vid 320 och 390 px i export och källharness passerade. Filmproven använde även åtta Chrome-wheel-prov och tangenttryckningar; andra positioneringsprov använde programmatisk scrollTop eller scrollIntoView och räknas inte som touch. Alla inmatningar är automatiserade i Chrome, inte utförda på fysisk telefon.

CV-symbolens faktiskt målade material, alpha ≥ 64, jämfördes med webbläsarens text-Range-ytor och knappar: noll överlappande materialpixlar i alla 22 hero-vyer. Den stora transparenta canvasytan används inte som CV-gräns. 22 hero-bilder sparades lokalt; 320/640/844 × 390/1024/1440 granskades visuellt. Noll JS-/HTTP-/requestfel uppmättes. Tre riktade faktiska Chrome-körningar vid 390/1440 och reducerad390 verifierade paketets geometri/CV-raster, stilla CV över tid och Chrome-wheel, tidsstyrda kristaller, fasta device-/filmtransformer, paus/meny/offscreen och Home → Om oss → Home med identisk första återkomstbild samt cleanup när canvas tas bort. 63 relevanta produktkontroller och ett supplement med 12 ankare-/visibility-kontroller passerade. Fyra Chrome-PageDown/PageUp steg gav scroll0 → 630 → 1260 → 630 → 0 utan yttre scroll.

Design-genvägen jämfördes med samma klick i det godkända paketet: sektions-/rubrik-/stage-/filmgeometri var exakt lika, delta0. Ett initialt test antog felaktigt högst80px captionavstånd från header; den antagelsen ersattes med det faktiska paketankaret. Ingen källändring gjordes för detta testantagande.

Ett försök med en annan flik gav document.hidden=false i körmiljön. Det räknas inte som verifierad verklig bakgrundsväxling. Hidden/visibilitychange och pagehide/pageshow kontrollerades uttryckligen genom simulerade lifecycle-händelser; de fryser och återupptar kristallerna från samma första pose. DPR3-emulering gav3 i exportens ytterdokument men1 i sandboxad iframe, och CDP tillåter inte metrics-override på det underordnade targetet. Därför är faktisk iframe-DPR3 inte browserverifierad; separat canvas/maxDPR3/ingen blur eller uppskalning är verifierade i koden och faktiskt raster vid DPR1. Ursprungliga miljö-/testavvikelser finns kvar i lokala QA-rapporter och räknas inte som produktfel eller passerade kontroller.

Innehållscommit [e7ade187aa84a7fe29d82adee7fe627cd9b666c6](https://github.com/Cendovari/cendovari-webdesign-sida/commit/e7ade187aa84a7fe29d82adee7fe627cd9b666c6) publicerades med vanlig fast-forward från baslinjen; arbetsbranch och main pekade på samma innehållscommit. Exakt fem planerade filer ändrades och 34 befintliga lövfiler behöll SHA och mode. Runtime, båda MP4, exportskript och .nojekyll är oförändrade. Ingen CNAME eller workflowfil tillkom. En separat avslutande dokumentationscommit lägger enbart till verifieringskvittot.

[Pages-bygge 38072174742](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38072174742) avslutades med success. [Den riktiga HTTPS-sidan](https://cendovari.github.io/cendovari-webdesign-sida/) samt källa och båda MP4 gav HTTP 200 och byteexakta SHA256 den 10 oktober 2026 kl.17:33:43 UTC. Båda filmernas Range-prov gav HTTP 206 med rätt byteintervall.

Den publicerade exporten testades i verklig Chrome kl.17:34:04–17:36:34 UTC: 390 × 844, 1440 × 900 och reducerad rörelse vid 390 × 844. Samtliga tre körningar fick HTTP 200 och exakt samma export-SHA ovan. Åtta tvåvarvsprov av PB-system och Hagströms Motor på startsida och i projektvyer passerade. Under varje prov gick 22,059–22,202 sekunders media på 22,093–22,228 sekunders väggtid; 529–533 avkodade bildrutor, noll tappade bildrutor, uppmätta stopp eller extra src/load/currentTime/emptied-återställningar. Filmerna var 10 sekunder, 1280 × 720 och hastighet 1.

14 publika kontinuitetsprov och 57 av 57 kontakt-/menykontroller passerade, tillsammans med 26 layoutprover och 42 film-/attributobservationer. Reducerad rörelse visade statiska posters utan laddade eller autospelande filmer. Noll JavaScript-/HTTP-/requestfel och inga backendanrop observerades. Faktiska publika hero-bilder vid 390 och 1440 px granskades visuellt. Offentliga kontroller använde automatiserade Chrome-klick/tap, wheel, tangenttryckningar och uttrycklig programmatisk scrollTop; den sistnämnda räknas inte som touchsvep.

## Begränsningar och avgränsning

Mobilbredder, touch och rotation emuleras i Chrome på Windows. Safari på fysisk iPhone och Chrome på fysisk Android har inte testats. Verkligt mobilt skärmtangentbord, adressfält, notch, batteriförbrukning och GPU kan inte verifieras genom desktopemulering.

MP4-uppspelning kräver HTTP(S); file:// visar befintliga posters i exportens sandbox. Ikoner och typsnitt behöver internet. Clipboard API kan begränsas av iframe-policy; manuell kopiering finns kvar. Filmernas befintliga klipp och slut–början-övergång bevaras utan omkodning eller konstgjord förlängning.

Alla projekt- och GitHub-skrivningar gäller endast denna isolerade klon och Cendovari/cendovari-webdesign-sida. Produktion, Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, hosting, domän/DNS och Pages-inställningar är orörda. Ingen force-push.
