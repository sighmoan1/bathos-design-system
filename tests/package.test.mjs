import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Button,ButtonLink,Field,Notice} from '../dist/index.js';
import worker from '../worker.generated.mjs';
test('buttons retain native disabled behaviour and links navigate',()=>{
 assert.match(renderToStaticMarkup(createElement(Button,{disabled:true},'Save')),/type="button"/);
 assert.match(renderToStaticMarkup(createElement(Button,{disabled:true},'Save')),/disabled=""/);
 assert.match(renderToStaticMarkup(createElement(ButtonLink,{href:'/guide'},'Guide')),/href="\\/guide"/);
});
test('field preserves caller descriptions alongside errors and help',()=>{
 const html=renderToStaticMarkup(createElement(Field,{id:'outcome',label:'Outcome',help:'Help',error:'Required','aria-describedby':'existing'}));
 assert.match(html,/aria-describedby="existing outcome-help outcome-error"/);
 assert.match(html,/aria-invalid="true"/);assert.match(html,/for="outcome"/);
});
test('static notices are not unsolicited live alerts',()=>{
 assert.doesNotMatch(renderToStaticMarkup(createElement(Notice,{title:'Info'},'Message')),/role="alert"|aria-live/);
});
test('catalogue serves expected paths, rejects writes and unknown paths',async()=>{
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/'))).status,200);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/palette-preview.js'))).status,200);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/toString'))).status,404);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/missing'))).status,404);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/deployments.json'))).status,404);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/',{method:'POST'}))).status,405);
 assert.equal(await (await worker.fetch(new Request('https://design.bathos.org/',{method:'HEAD'}))).text(),'');
});

test('catalogue previews palettes across the whole page and owns a site-local default',async()=>{
 const css=await readFile(new URL('../styles/palettes.css',import.meta.url),'utf8');
 const settings=JSON.parse(await readFile(new URL('../site/design-system.json',import.meta.url),'utf8'));
 for(const id of ['deep-water-red','stone-vermilion','ink-teal']) assert.ok(css.includes(`data-bathos-palette="${id}"`));
 assert.equal(settings.version,'1.1.0');
 assert.equal(settings.palette,'deep-water-red');
 const response=await worker.fetch(new Request('https://design.bathos.org/'));
 const page=await response.text();
 assert.match(page,/id="palette-preview"/);
 assert.match(page,/Preview this site with/);
 assert.match(page,/Reset to published palette/);
 assert.match(page,/Preview deep water red across catalogue/);
 assert.match(page,/Preview stone vermilion across catalogue/);
 assert.match(page,/Preview ink teal across catalogue/);
 assert.match(page,/data-bathos-palette="deep-water-red"/);
 assert.doesNotMatch(page,/deployments\\.json/);
 const preview=await worker.fetch(new Request('https://design.bathos.org/palette-preview.js'));
 assert.match(await preview.text(),/root\\.dataset\\.bathosPalette = id/);
});
