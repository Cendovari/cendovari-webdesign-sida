# Cendovari Webdesign Sida — toppfilm och lugna sidbyten

Separat Luminous-förhandsvisning för Cendovari AB. Den godkända toppfilmen från `cendovari-film-navigation-handoff.zip` ersätter föregående showreel. GPPE, texter, illustrationer, designförslag, övriga filmer och kontaktutkast är bevarade.

**Status: lokalt verifierad; publiceringskontrollen återstår.**

- [Förhandsvisning](https://cendovari.github.io/cendovari-webdesign-sida/)
- [Arbetsbranch](https://github.com/Cendovari/cendovari-webdesign-sida/tree/codex/film-navigation)
- [Granskning och skärmbilder](docs/film-navigation-review.md)
- [Ladda ned main](https://github.com/Cendovari/cendovari-webdesign-sida/archive/refs/heads/main.zip)

## Underlag och ändring

Aktuell ren main och origin verifierades före arbetet: `9fe6de943811da098d235db6d32e0c2b1d32d2ad`, https://github.com/Cendovari/cendovari-webdesign-sida.git. Alla fem poster i paketets SHA256SUMS.txt matchar. ZIP-SHA256 är `5102492bb007c7c0c22b9118f68566693a4b59558853fe0c5428c1c4f58d0a0b`. Paketet innehåller enbart film, poster och instruktioner; ingen äldre helsida importerades.

- Ny toppfilm: `assets/video/cendovari-showreel-10s.mp4`, SHA256 `9bf277fb246fa44e8685773f04129dfb393d491e47da696d506377a885f2d27b`.
- Matchande poster: `assets/images/cendovari-showreel-poster.jpg`, SHA256 `0dbd5567d79bfc4beb36ef5c2bc72f26f9f4d40660007970efa7d04e32e9cedb`.

Film och poster är byteidentiska med paketet. H264, 1280 × 720, 24 fps, 240 bildrutor, 10,000 sekunder, inget ljud och faststart verifierades med MP4-parser och full FFmpeg-avkodning. Originalfilen `gemini_generated_video_4b466908.mp4` finns inte lokalt; originalspårets överensstämmelse är paketets uppgift, ingen ny egen originaljämförelse påstås. Ingen omkodning eller AI-redigering gjordes i detta arbete.

Det stora övergångslagret och dess ”Cendovari.”-mellanbild/wipe-CSS är borttagna. Endast inkommande innehåll får en diskret opacity 0,94→1 över 140 ms efter ett sidbyte nästa task, utan utgående blankbild eller transform. Reducerad/pausad rörelse ger direkt innehållsbyte utan animation. Gamla timers/animationer avbryts, senaste giltiga klick vinner och samma menyval kan väljas upprepade gånger. Navigationshändelser, pendingflagga, menyfokus, sektionhopp och projektåtergång är bevarade.

Headerns befintliga desktopgenvägar till startsidans sektioner finns kvar mellan alla huvudvyer. Därmed hoppar inte headerhöjden när startsidan lämnas. Genvägarna leder tillbaka till rätt startsidessektion. Mobilmenyn och den fasta loggan är bevarade. På smala vyer ligger samma filmknapp i nedre vänstra delen så att telefonbilden blir fri.

## Källa och export

`preview-source.html` är redigerbar källa med rot `cv-gppe-featured`. Toppfilmen refererar nu direkt till den nya fulla relativa filmadressen; ingen gammal kompakt showreel finns kvar. Övriga två exempelklipp har sina tidigare kompakta förhandsvisningskopior. Exporten använder de tre hela originalfilmerna och sex relativa bilder.

Bygg från projektmappen med Python 3:

~~~sh
python3 scripts/build-export.py
~~~

Befintlig CLI ger samma export:

~~~sh
python3 scripts/render.py preview-source.html index.html --title 'Cendovari Webdesign Sida — Förhandsvisning' --force
~~~

`scripts/build-export.py` innehåller uttryckliga bild-, preview- och originalfilmhashar. De tre showreel/postervärdena är uppdaterade; gamla film-/posterversioner avvisas. `render.py` och dokumentramen `export-shell.html` är oförändrade. Vid framtida byte av media behöver källans resursvärden, originalfiler och godkända hashmappningar ändras tillsammans och verifieras på nytt.

Exporten är ett fristående HTML-dokument med vanlig dokumentscroll, ingen iframe/ChatGPT-/localhost-runtime. Filmbilden behåller full 16:9 med contain, utan beskärning eller dekorativ toning. Muted, playsinline, loop, normal hastighet, bestående manuell paus, reducerad rörelse, poster/Spela vid nekad autoplay och synlighetskontroller bevaras. Scroll och vanlig paus ändrar inte src/load/currentTime.

Starta lokalt:

~~~sh
python3 -m http.server 8766 --bind 127.0.0.1
~~~

Öppna http://127.0.0.1:8766/. På Windows kan `python` ersätta `python3`. Alternativt `python3 scripts/render.py preview-source.html --serve --port 8766`. Hämta hela projektet inklusive bilder/filmer; ikoner och typsnitt använder befintliga externa leverantörer och behöver internet.

## Verifiering och publicering

Aktuella resultat och begränsningar finns i [granskningsrapporten](docs/film-navigation-review.md) och `preview-review.json`. Mobil/touch är Chrome-emulering på Windows, inte fysiska iPhone-/Android-/Safari-tester. Dold flik och nekad autoplay testas med tydligt angiven simulering/injektion.

Kontaktformuläret skapar enbart ett lokalt utkast. Svenska, `noindex,nofollow` och tidigare CSP är bevarade. Inga mejltester, formulärutskick eller backend används. GPPE-länkar går till den riktiga externa sidan, och separata Plattsättning/Bilverkstad-projekt är tydligt märkta designförslag.

Publicera genom befintligt main/rot-flöde på samma GitHub Pages-adress efter verifiering. Bevara andra ändringar och historiken med vanliga commits på arbetsbranch; inga hard resets eller force-pushar. Återställ vid behov med vanliga revert-commits, senare dokumentationskvitto före innehållscommiten.

Alla skrivningar gäller endast Cendovari/cendovari-webdesign-sida. Cendovari-Website, Modbus Buddy, WordPress, cendovari.com, gppe.se, produktionshosting och domän/DNS är orörda. Inga tokens, lösenord, .env, privata QA-profiler eller inmatade testkontaktuppgifter publiceras.

Historiska rapporter: [GPPE](docs/gppe-review.md), [filmversion](docs/film-first-review.md), [kristaller](docs/crystal-review.md), [filmer](docs/video-review.md), [scrollflöde](docs/natural-scroll-review.md), [mobil](docs/mobile-review.md). De beskriver tidigare versioner.
