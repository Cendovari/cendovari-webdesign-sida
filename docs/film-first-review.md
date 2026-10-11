# Filmversion — granskning 2026-10-11

## Omfattning och resultat

Godkänd överlämning: `cendovari-film-first-handoff.zip`, SHA256 `48be01c96ba5e603b9d422369f74e399052de9971b7d927e8d44b906d06528b3`. Utgångspunkt: main `1b476ae2aa3c29ce3dbe1068e737ee2572b8578e`. Arbetsbranch: `codex/film-first-introduction`. Origin verifierades som enbart Cendovari/cendovari-webdesign-sida; arbetskatalogen var ren. Ingen force-push eller ändring av publiceringsinställningar.

Den godkända filmversionen är implementerad och lokalt verifierad. Publicerad HTTPS-verifiering återstår i denna innehållscommit; kvittot kompletteras efter befintliga Pages-flödets körning.

Huvudfilmen visas direkt efter navigationen i hel 16:9. Rubrik, text och kontaktknapp ligger under filmen. Paketets innehåll, layout och CSS är bevarade, med teknisk anpassning av mobilmenyns höjdmätning. Ingen redesign, filmtoning, blur eller ny dekorativ effekt är tillagd. Plattsättning och Bilverkstad är fortsatt designexempel med illustrationsmaterial.

## Tekniska ändringar

- Native HTML-export med vanlig dokumentscroll. Ingen iframe, canvas, scenrenderer, intro-tidslinje, låst scrollscen, ChatGPT-host eller localhost krävs. Historiska runtimefiler är kvar som versionsunderlag men laddas inte.
- Samma exporter-CLI, med deterministisk export från redigerbar källa. Verklig visualViewport-/webbläsarhöjd ersätter förhandsvisningens höjdbegränsning. Menyn stängs före navigationsmätning; dokumentets bakgrund låses medan panelen är öppen. Fokus, inert, Escape och scrollåterställning bevaras.
- Fullängdsfilmer på relativa adresser under projektets Pages-katalog. Filmcontroller bevarar position och manuellt pausval, visar faktisk uppspelning, stoppar offscreen-/dolda filmer och skyddar mot sena play-anrop efter sidbyte. Ingen src-omskrivning, load eller seek vid vanlig scroll/paus.
- Systemets reducerade rörelse och rörelseknappen bevaras. Nekad autoplay ger poster och explicit Spela, utan upprepade scrollförsök. En menyöppning stoppar filmerna.
- Navigationsloggans befintliga SVG återanvänds även som favicon; en upptäckt favicon-404 är rättad. Befintliga ikoner och typsnitt fungerar.
- Svenska, noindex,nofollow och lokalt kontaktutkast bevaras. CSP blockerar backendanslutningar, frames och formulärutskick. Ingen ny backend.

## Webbläsargranskning

Installerad Google Chrome på Windows, isolerade automatiserade sessioner. Mobilbredd, touch, rotation och reducerad rörelse är **desktopemulering**, inte fysisk iPhone/Android.

| Vy | Layout och interaktion |
| --- | --- |
| 320 × 844 | Godkänd; kompakt navigation, hel film, ingen horisontell scroll |
| 390 × 844 | Godkänd; huvudvyer, projekt, formulär, touch och meny |
| 768 × 1024 | Godkänd; surfplattekomposition och meny |
| 1440 × 900 | Godkänd; desktop, båda koncepten, stilval och jämförelse |
| 844 × 390 | Godkänd; kort liggande vy, åtkomlig scrollande menypanel |
| 390 × 844 reducerad rörelse | Godkänd; komplett innehåll och stilla posterläge |

130 funktionella layoutkontroller passerade på slutlig källbody. Därefter kördes sex resurs-/layoutkontroller på sista exporten; enda skillnaden var favicon i dokumenthuvudet. Vid slutkontrollerna: inga JavaScriptfel, konsolvarningar, misslyckade HTTP-resurser eller backendrequest. 53 ikon-SVG:er och Manrope laddades. Ingen iframe eller oavsiktlig horisontell scroll.

Granskningen omfattade startsida, Designexempel, Om oss, Kontakt, båda projekt från start och exempel, Dator/Mobil, Tillbaka/Escape och fokusåterställning. Navigation, process/FAQ, stilval/inspiration och jämförelsereglage fungerade. Kontaktvalidering, Enter i enkla fält, radbrytningar i textarea, lokalt utkast, redigering, borttagen inspiration och manuell kopieringsfallback kontrollerades. Clipboard-nekande injicerades endast i testmiljön; inget OS-urklipp skrevs.

Vanlig dokumentscroll kontrollerades nedåt/uppåt med hjul, tangentbord och emulerad touch. Öppen meny höll dokumentpositionen vid hjul, PageDown och fyra native CDP-touchprov. Vid scrollY 600 låg sidhuvudet kvar vid y=0 och menyn direkt under; en tidigare body-overflow-låsning som flyttade sticky header rättades. Rotation stängde menyn och återställde scroll/fokus utan kvarvarande lås. Godkänd referens och implementation gav identisk hero-geometri vid 390/1440 px.

## Filmkontroller

Samtliga publicerade filer är byteidentiska med paketets original: H.264, 1280 × 720, 24 fps, 240 bildrutor, 10,000 s, utan ljud. Alla tre fullavkodades utan fel. Showreelens kodade videospår, avkodningskonfiguration och sampletiming matchar bifogat 6291.mp4 exakt; det extra originalet och dess ljud publiceras inte.

Tio uppspelningsprov — tre startsidesfilmer och två projektfilmer vid både 390 och 1440 px — nådde vardera två hela loopar. Cirka 22,1 s film för 22,1 s väggtid, 529–533 video-frame-räknade rutor, noll rapporterade tappade rutor/stall och noll src-/load-/seek-/emptied-förändringar. Filmerna var muted, playsinline, loop och playbackRate=1.

Spela/Pausa, manuell paus efter scroll ut/åter, menylås, global rörelseväxling, reducerad rörelse, poster, nekad autoplay och explicit återförsök kontrollerades. Fördröjda play-promise och controlleravmontering provades genom testinjektion; gamla uppspelningsanrop tog inte över nya ägare. Autoplay-nekande simulerades med NotAllowedError utan testmiljöns user activation; det är inget test av en fysisk telefons autoplay-policy.

Två råa desktopprov flaggades av en alltför förenklad gräns för antal requestVideoFrameCallback-anrop, även i separat retest. Loopar, tid, avkodning och droppedVideoFrames passerade. Ett kompletterande cirka 3 s prov i både headless och headed Chrome visade 71–73 presentedFrames och 72 avkodade rutor, noll tappade, men 42–51 callback-anrop: callbackmetadata ökade ibland med två presenterade rutor per anrop. Detta stöder sammanslagna callback-leveranser; callbackantal är inte ensamt en bildfrekvensmätning. Råflaggorna bevaras i lokalt QA-underlag. Ingen pixelperfekt fysisk uppspelning påstås.

Dold flik: ägda headless- och headed-sessioner prövades med annan aktiv flik, minimering och avstängd CDP-fokusöverstyrning. document.hidden förblev false/visible och inget verkligt visibilitychange inträffade. Paus/återkomst passerade med simulerat document.hidden + visibilitychange. Verklig bakgrundsflik kunde därför inte verifieras i denna miljö; ingen PASS för den fysiska förutsättningen påstås.

## Återskapning och kvarvarande begränsningar

Källa SHA256: `190d88011613425f7fef0edb4daea32457873d42fece2a07609b3b87764d5a9e`.
Export SHA256: `783ec4351e923e7769cf304cb6fdc2aa02f29ede236890473d2fae811e07443f`.
Exportskriptets syntax och 16 exekverbara inline-JS-block passerade syntaxkontroll. Regenererad index.html matchar exakt. Se README för kommando och lokal server.

Safari på fysisk iPhone, Chrome på fysisk Android, verkligt mobiladressfält och skärmtangentbord kunde inte testas. Emulerad bredd/touch ersätter inte dessa. Ikoner och typsnitt kräver befintliga externa leverantörers nätåtkomst.

[Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/) · [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/film-first-introduction). Maskinläsbar sammanställning finns i preview-review.json. Historiska rapporter gäller tidigare versioner.

Återställning sker med vanliga git revert-commits i omvänd ordning: först ett eventuellt senare dokumentationskvitto, sedan innehållscommiten för filmversionen. Bevara efterföljande orelaterade ändringar och verifiera återställningen innan push; aldrig reset/force-push.

Endast det separata webbdesignprojektet ändras. Produktion, Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, övrig hosting och domän/DNS är orörda. Inga lösenord, tokens, .env eller andra projekts filer publiceras.
