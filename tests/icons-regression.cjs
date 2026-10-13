'use strict';
// Verify usable symbols when the external icon/font providers are unavailable.
// node tests/icons-regression.cjs --url http://localhost:8000/ --chrome /path/to/chrome --playwright /path/to/playwright
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  if (!process.argv[i].startsWith('--') || !process.argv[i + 1]) throw Error('Use --name value pairs');
  args[process.argv[i].slice(2)] = process.argv[i + 1];
}
if (!args.url) throw Error('--url is required');
const {chromium} = require(args.playwright || 'playwright');
(async () => {
  const browser = await chromium.launch({headless:true, ...(args.chrome ? {executablePath:args.chrome} : {})});
  const result = {url:args.url, checks:[], javascriptErrors:[], browser:await browser.version()};
  try {
    const context = await browser.newContext({viewport:{width:390,height:844}, hasTouch:true, isMobile:true, reducedMotion:'reduce'});
    await context.route(/https:\/\/(?:unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => result.javascriptErrors.push(error.message));
    const response = await page.goto(args.url, {waitUntil:'networkidle'});
    result.indexSHA256 = crypto.createHash('sha256').update(await response.body()).digest('hex');
    const check = (name, pass, detail) => result.checks.push({name,pass,detail});
    const symbols = await page.evaluate(() => {
      const root = document.getElementById('cv-smooth-art');
      return {
        missing:Array.from(root.querySelectorAll('[data-lucide]')).filter(n => n.tagName.toLowerCase() !== 'svg' || !n.querySelector('path,line,polyline,rect,circle')).map(n => n.getAttribute('data-lucide')),
        count:root.querySelectorAll('svg[data-lucide]').length,
        arrow:!!root.querySelector('svg[data-lucide="arrow-up-right"] path'),
        comparison:!!root.querySelector('[data-ec-handle] svg path'),
        overflow:document.documentElement.scrollWidth - innerWidth
      };
    });
    check('all existing symbols survive unavailable icon/font providers', symbols.count >= 50 && !symbols.missing.length, symbols);
    check('CTA and comparison have visible vector geometry', symbols.arrow && symbols.comparison, symbols);
    check('offline providers do not introduce horizontal overflow', symbols.overflow <= 1, symbols.overflow);
    const toggle = page.locator('[data-lu-menu-toggle]');
    await toggle.tap();
    check('menu opens and reports state', await toggle.getAttribute('aria-expanded') === 'true', null);
    await page.keyboard.press('Escape');
    check('Escape closes menu and unlocks scrolling', await page.evaluate(() => !document.getElementById('cv-smooth-art').classList.contains('lu-menu-open') && getComputedStyle(document.body).overflow !== 'hidden'), null);
    check('no JavaScript errors', !result.javascriptErrors.length, result.javascriptErrors);
    await context.close();
  } finally { await browser.close(); }
  result.summary = {passes:result.checks.filter(c=>c.pass).length, checks:result.checks.length, failures:result.checks.filter(c=>!c.pass)};
  if (args.output) {fs.mkdirSync(path.dirname(path.resolve(args.output)),{recursive:true}); fs.writeFileSync(args.output,JSON.stringify(result,null,2)+'\n');}
  console.log(JSON.stringify(result));
  if (result.summary.failures.length) process.exitCode = 1;
})().catch(error => {console.error(error); process.exitCode = 1;});
