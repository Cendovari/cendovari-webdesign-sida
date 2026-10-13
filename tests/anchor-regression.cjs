'use strict';
// Browser regression tests for the two observed scroll/focus bugs.
// Usage: node anchor-regression.cjs --url http://localhost:8000/ --chrome /path/to/chrome --playwright /path/to/playwright
// Optional: --output /path/to/result.json. No persistent browser profile is used.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const args={};for(let i=2;i<process.argv.length;i+=2){if(!process.argv[i].startsWith('--')||!process.argv[i+1])throw Error('Arguments must be --name value pairs');args[process.argv[i].slice(2)]=process.argv[i+1];}
if(!args.url)throw Error('--url is required');
const {chromium}=require(args.playwright||'playwright');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const result={url:args.url,scope:'Fresh isolated browser contexts; existing native Home fragment and project section offsets/focus/Back. Mobile touch and reduced motion emulated. No routing model changes or backend submission.',runs:[]};
const assert=(ok,msg)=>{if(!ok)throw Error(msg);};
(async()=>{
 const browser=await chromium.launch({headless:true,...(args.chrome?{executablePath:args.chrome}:{})});
 try{for(const viewport of [{width:320,height:844,touch:true},{width:390,height:844,touch:true},{width:768,height:1024,touch:true},{width:844,height:390,touch:true},{width:1440,height:900}]){
  const run={viewport,checks:[],javascriptErrors:[],loadedIndexHashes:[]};result.runs.push(run);
  const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},hasTouch:!!viewport.touch,isMobile:!!viewport.touch,reducedMotion:'reduce'});
  const page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>run.javascriptErrors.push(String(e)));
  async function load(url){const response=await page.goto(url,{waitUntil:'networkidle'});run.loadedIndexHashes.push(crypto.createHash('sha256').update(await response.body()).digest('hex'));await page.evaluate(()=>document.fonts.ready);await sleep(250);}
  async function test(name,fn){try{run.checks.push({name,pass:true,detail:await fn()});}catch(e){run.checks.push({name,pass:false,error:String(e)});}}
  async function activate(locator){await(viewport.touch?locator.tap():locator.click());}
  try{
   const fragment=new URL(args.url);fragment.hash='master-services-heading';await load(fragment.href);
   await test('native Home Services fragment heading clears sticky header on direct load',async()=>{const m=await page.locator('#master-services-heading').evaluate(n=>{const h=n.getBoundingClientRect(),header=document.querySelector('.ni-header').getBoundingClientRect();return {top:h.top,bottom:h.bottom,headerBottom:header.bottom,height:innerHeight,hidden:!!n.closest('[hidden],[inert]'),scrollMargin:getComputedStyle(n).scrollMarginTop};});assert(!m.hidden&&m.top>=m.headerBottom-1&&m.top<m.height-10,'Native heading obscured: '+JSON.stringify(m));return m;});
   await page.reload({waitUntil:'networkidle'});await sleep(250);
   await test('native fragment reload heading clears sticky header',async()=>{const m=await page.locator('#master-services-heading').evaluate(n=>({top:n.getBoundingClientRect().top,headerBottom:document.querySelector('.ni-header').getBoundingClientRect().bottom,hidden:!!n.closest('[hidden],[inert]')}));assert(!m.hidden&&m.top>=m.headerBottom-1,'Reload heading obscured: '+JSON.stringify(m));return m;});
   // Physical main-view navigation uses existing buttons; URL/history model stays unchanged.
   const menu=page.locator('[data-lu-menu-toggle]');if(await menu.isVisible()){await activate(menu);await activate(page.locator('#lu-mobile-menu [data-nav="examples"]'));}else await activate(page.locator('.ni-header > nav[aria-label="Huvudmeny"] [data-nav="examples"]'));
   await page.waitForFunction(()=>!document.querySelector('[data-page="examples"]').hidden&&!document.getElementById('cv-smooth-art').__niNavigationPending());
   for(const kind of ['pb','motor']){
    const opener=page.locator('[data-pj-overview] [data-pj-open="'+kind+'"]');await opener.scrollIntoViewIfNeeded();const beforeY=await page.evaluate(()=>scrollY);await activate(opener);const panel=page.locator('[data-pj-panel="'+kind+'"]');await panel.waitFor({state:'visible'});
    for(const key of ['services','contact']){
     await activate(panel.locator('[data-pj-anchor="'+key+'"]').first());await sleep(100);
     await test(kind+' '+key+' heading clears main header and actual sticky project toolbar',async()=>{const m=await panel.locator('[data-pj-section="'+key+'"]').evaluate(n=>{const bar=n.closest('[data-pj-panel]').querySelector('.pj-panel-bar'),b=bar.getBoundingClientRect(),header=document.querySelector('.ni-header').getBoundingClientRect(),heading=n.querySelector('h1,h2,h3,h4,h5,h6'),h=heading.getBoundingClientRect(),sticky=getComputedStyle(bar).position==='sticky';return {headingTop:h.top,headingBottom:h.bottom,headerBottom:header.bottom,barTop:b.top,barBottom:b.bottom,barHeight:b.height,sticky,occlusion:sticky?Math.max(header.bottom,b.bottom):header.bottom,viewportHeight:innerHeight,hidden:!!n.closest('[hidden],[inert]')};});assert(!m.hidden&&m.headingTop>=m.occlusion-1&&m.headingTop<m.viewportHeight-10,'Project heading obscured: '+JSON.stringify(m));return m;});
     await test(kind+' '+key+' moves keyboard focus to visible target heading',async()=>{const m=await panel.locator('[data-pj-section="'+key+'"]').evaluate(n=>{const a=document.activeElement,h=n.querySelector('h1,h2,h3,h4,h5,h6'),r=a.getBoundingClientRect();return {targetFocused:a===h,tag:a.tagName,text:a.innerText,top:r.top,bottom:r.bottom,tabIndex:a.tabIndex,hidden:!!a.closest('[hidden],[inert]')};});assert(m.targetFocused&&!m.hidden&&m.tabIndex===-1,'Target focus missing: '+JSON.stringify(m));return m;});
    }
    await activate(panel.locator('[data-pj-back]'));
    await test(kind+' Back restores exact opener and original document position',async()=>{const m=await opener.evaluate(n=>({focused:document.activeElement===n,expanded:n.getAttribute('aria-expanded'),hidden:!!n.closest('[hidden],[inert]'),y:scrollY}));assert(m.focused&&!m.hidden&&m.expanded==='false'&&Math.abs(m.y-beforeY)<5,'Project return changed: '+JSON.stringify({...m,beforeY}));return {...m,beforeY};});
   }
   await test('no JavaScript errors',async()=>{assert(!run.javascriptErrors.length,JSON.stringify(run.javascriptErrors));return run.javascriptErrors;});
  }catch(e){run.fatal=String(e);}finally{await context.close();}
 }}finally{await browser.close();}
 result.summary={runs:result.runs.length,checks:result.runs.reduce((n,r)=>n+r.checks.length,0),passes:result.runs.reduce((n,r)=>n+r.checks.filter(c=>c.pass).length,0),failures:result.runs.flatMap(r=>r.checks.filter(c=>!c.pass).map(c=>({viewport:r.viewport,...c}))),fatals:result.runs.filter(r=>r.fatal).map(r=>({viewport:r.viewport,error:r.fatal})),loadedIndexHashes:[...new Set(result.runs.flatMap(r=>r.loadedIndexHashes))]};
 if(args.output){fs.mkdirSync(path.dirname(path.resolve(args.output)),{recursive:true});fs.writeFileSync(args.output,JSON.stringify(result,null,2)+'\n');}
 console.log(JSON.stringify(result.summary));if(result.summary.failures.length||result.summary.fatals.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
