# Cendovari — fullängdsfilmer

2026-10-10. Begränsad videokorrigering från main `32b521cbef481482966e546ce33ebe2703aafb09` på `codex/restore-10-second-videos`. Användaren har godkänt implementering och Pages-publicering efter verifiering.

## Ändring

Paketet `cendovari-videofix-10sek.zip`, SHA256 `3f17b751a38dc9b03fb1336557a491b8fa3b76eeff4489a32851792e5fced050`, innehåller två fullängdsfilmer. Filmerna kopieras byteexakt till assets/video och ersätter de korta inbäddade utdragen i startsidans och projektvyerna. Ingen omkodning, klippning eller tidsändring görs.

Endast filmkontrollern ändras i källan. Alla övriga 19 controllers, CSS, markup, posters och den godkända kompositionen är oförändrade. Källor är en strikt lista med två egna relativa filer, upplösta mot exportens baseURI så repo-prefixet fungerar i sandboxat srcdoc. Varje video får källan en gång; vanlig scroll, pausa/återuppta och sidbyte återanvänder den laddade resursen och uppspelningspositionen. Ingen currentTime-tilldelning görs. Normal playbackRate och defaultPlaybackRate är 1, med muted, playsinline och loop bevarade.

Synlighetslogiken behåller 30 procent för start, 12 procent för fortsatt spelning och 25 procent större synlig yta för byte till nästa film. Mobilen spelar högst en dekorativ film samtidigt. Rörelsepaus, reducerad rörelse, dold/inert vy, bakgrund, pagehide och öppen meny stoppar uppspelningen. Sena play-promises skyddas med befintlig ägare/token. Nekad uppspelning visar poster och försöker inte igen vid varje scroll; resursen kan tömmas enbart vid fel eller controllerstädning för att återställa poster. Ett avsiktligt nytt användartryck kan försöka igen.

Exportens enda CSP-ändring är tillägg av self i media-src, så båda exportpolicys tillåter egna medier. Övrig policy är oförändrad.

Sandbox allow-scripts, noindex,nofollow, lokalt kontaktutkast och illustrations-/designkonceptmärkningen bevaras. Inga kundpåståenden eller nya företagsuppgifter tillkommer.

## Verifiering

- Fryst källa SHA256 `4c25c55265ff93b7cb7f1ea513fc6aad2ea7580b8b29c122d67e22e2b126d0f4`; export SHA256 `295c5847055b03c944794c57b6f789978dd58a2c096858658e2f1fed3e9cca93`. Exporten är deterministiskt återskapad. Alla 20 scriptblock syntaxgodkända; endast filmkontrollern, nummer 15, ändras. CSS/markup och fyra videoposters är byteidentiska med main-baslinjen. Runtime och `.nojekyll` är oförändrade (med hänsyn till Git-checkoutens radslut).
- Båda MP4: H.264, 1280×720, 24 fps, 240 bildrutor, 10,000 s, inga ljudspår och faststart. Oberoende fullavkodning av varje fil passerade med 240 bildrutor och noll avkodningsfel. Filerna matchar paketet byteexakt. PB SHA256 `9c17dd8f2752a753afbe73febfd3a41dfb5b672326bc45d4aeae9f7df685ff14`; Motor SHA256 `bd9c5edcac28bfa2f17e6b72473700e7d4659f3f17d0facdcbf909519a09623e`.
- 9/9 lokala Chrome-körningar passerade: export och regenererad källa vid 320×844, 390×844, 1440×900 och 844×390, samt export med reducerad rörelse vid 390×844. 90 layoutprover och 60 kontinuitetsprov, utan JavaScript-undantag, misslyckade resurser, HTTP-fel, backendanrop eller oavsiktligt horisontellt spill.
- Navigation, båda koncepten, Dator/Mobil, Tillbaka/Escape, fokus/scroll, mobilmeny och lokalt kontaktutkast kontrollerades. En film som hamnar utanför synfältet efter byte av konceptläge pausar och återupptas först när den åter är synlig.
- Två extra touch-körningar vid 320/390 passerade med åtta riktiga CDP-svep och fyra ut/in-par. Gränsprover växlade mellan 14 och 10 procents synlighet: ett stopp, ingen fladdrande omstart under 30-procentsgränsen. Rörelsepaus och meny stoppade filmer, CSS och canvas.
- Två fallback-körningar passerade: file:// behåller alla fyra posters och fungerande utkast utan MP4-request; avsiktligt nekad autoplay visar poster och försöker inte om vid varje scroll.
- Riktig Chrome/CSP-provning på projektprefixet med opaque srcdoc-origin bekräftade att enbart `media-src 'self'` tillåter egna MP4 (206 Partial Content, metadata 10 s och faktisk uppspelning); övriga restriktioner bevaras.

Tvåvarvsproven använder verklig klocktid, video.currentTime och requestVideoFrameCallback; ingen testkod sätter filmpositionen. Alla åtta nedan hade noll omladdningar, currentTime-sättningar, srcändringar eller emptied-händelser under mätningen, oförändrat currentSrc, playbackRate 1 och noll registrerade stopp eller tappade rutor under själva långprovet. Vanliga kameraklipp i materialet och den naturliga loopgränsen räknas inte som en teknisk omstart.

| Vy | Placering | Film | Uppmätt mediaprogress | Hela loopar | Presenterande callbacks |
|---|---|---|---:|---:|---:|
| 390×844 | Startsida | PB-system | 21.997 s | 2 | 527 |
| 390×844 | Startsida | Hagströms Motor | 22.238 s | 2 | 534 |
| 390×844 | Projekt | PB-system | 22.119 s | 2 | 531 |
| 390×844 | Projekt | Hagströms Motor | 22.229 s | 2 | 533 |
| 1440×900 | Startsida | PB-system | 22.233 s | 2 | 534 |
| 1440×900 | Startsida | Hagströms Motor | 22.105 s | 2 | 530 |
| 1440×900 | Projekt | PB-system | 22.172 s | 2 | 532 |
| 1440×900 | Projekt | Hagströms Motor | 22.258 s | 2 | 534 |

## Publicering och riktig HTTPS

Innehållscommit [`34710a6f…`](https://github.com/Cendovari/cendovari-webdesign-sida/commit/34710a6f85d1d4a04b49a972afa6ab52fda9c58b) har exakt en förälder, den verifierade main-baslinjen `32b521cb…`, och exakt åtta planerade filer. Arbetsbranchen är publicerad och main uppdaterad med kontrollerad expected SHA och force=false. Oberoende GitHub-läsning bekräftar att övriga scripts, markup, CSS, bildpayloads och runtime är bevarade; inga workflow- eller domänfiler ändras.

[Pages-bygge 38067162392](https://github.com/Cendovari/cendovari-webdesign-sida/actions/runs/38067162392) passerade med success. [Den riktiga förhandsvisningen](https://cendovari.github.io/cendovari-webdesign-sida/) kontrollerades därefter 2026-10-10 kl. 16:19:43 UTC. Index, källa och båda fulla MP4 levererades med HTTP 200 och byteexakta SHA256 enligt ovan. Båda filmerna har Content-Type video/mp4 och fungerande Range 206, bytes 0–1023. Befintligt main/root-Pages-flöde är oförändrat.

5/5 publika Chrome-körningar passerade vid 320×844, 390×844, 1440×900, 844×390 och reducerad rörelse 390×844: 46 layoutprover, 78 duration-/attributprov och 30 kontinuitetsprov. Noll JavaScript-undantag, misslyckade requests, HTTP-fel eller backendanrop. 57 SVG-ikoner, inga ikonplaceholders och typsnitt färdigladdade. Meny, navigation, båda projektens Dator/Mobil, Tillbaka/Escape och fokus/scroll fungerade. Kontaktutkast skapades med klick och Enter och bevarade textarea-radbrytningar; alla filmer var pausade på kontaktsidan. Reducerat läge hade fyra posters, inga laddade filmsrc och inga aktiva animationer.

Åtta riktiga HTTPS-tvåvarvsprov passerade. Media spelades i normal hastighet, video.duration var 10,000 s på alla fyra filmplatser; inga normala omladdningar, srcbyten, currentTime-sättningar eller emptied-händelser registrerades. Under dessa långprov registrerades noll stopp och tappade rutor. Mobiltesterna är Chrome på Windows med desktopemulering, inga fysiska telefoner.

| Vy | Placering | Film | Uppmätt mediaprogress | Hela loopar | Presenterande callbacks |
|---|---|---|---:|---:|---:|
| 390×844 | Startsida | PB-system | 22.131 s | 2 | 530 |
| 390×844 | Startsida | Hagströms Motor | 22.056 s | 2 | 530 |
| 390×844 | Projekt | PB-system | 22.094 s | 2 | 531 |
| 390×844 | Projekt | Hagströms Motor | 22.110 s | 2 | 531 |
| 1440×900 | Startsida | PB-system | 22.092 s | 2 | 531 |
| 1440×900 | Startsida | Hagströms Motor | 22.031 s | 2 | 528 |
| 1440×900 | Projekt | PB-system | 22.174 s | 2 | 532 |
| 1440×900 | Projekt | Hagströms Motor | 22.108 s | 2 | 531 |

En kompletterande riktig HTTPS-kontroll vid 390 px passerade native-touch för båda filmernas ut/in-återupptagning samt menyfokus, Tab/Shift+Tab, inert bakgrund, scrollås, Escape och fokusåterställning. Meny och rörelsepaus stoppade alla fyra filmer. Noll JavaScript-/request-/HTTP-fel.

Efterföljande verifieringscommit uppdaterar endast README och granskningsrapporter; källa, export och filmer är oförändrade.

## Begränsningar och avgränsning

Nedladdad export behöver en lokal HTTP-server för filmerna. `file://` visar befintliga posters och övriga funktioner; inga MP4-laddningar görs där. Använd `python -m http.server 8766 --bind 127.0.0.1` från projektmappen. `render.py --serve` serverar enbart HTML och rekommenderas inte för externa videofiler. Ingen sandboxutökning eller file:-tillåtelse tillkommer.

Originalfilerna 6279.mp4 och 6280.mp4 är inte bifogade; paketets påstående om identisk kodad originalbildström kan därför inte kontrolleras mot originalen. De bifogade MP4-filerna ändras inte. Originalmontagens kameraklipp och slut–början-klipp är bevarade; looparna beskrivs inte som sömlösa.

Fysisk iPhone/Safari och Android/Chrome är inte testade. Mobilkontroller redovisas som Chrome på Windows med desktopemulering.

Alla projekt-/GitHub-skrivningar gäller bara Cendovari/cendovari-webdesign-sida. Produktion, Cendovari-Website, Modbus Buddy, cendovari.com, WordPress, hosting, domän/DNS och Pages-inställningar är orörda. Ingen force-push.
