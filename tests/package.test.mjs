import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Button,ButtonLink,Field,Notice} from '../dist/index.js';
import worker from '../worker.generated.mjs';
test('buttons retain native disabled behaviour and links navigate',()=>{
 assert.match(renderToStaticMarkup(createElement(Button,{disabled:true},'Save')),/type="button"/);
 assert.match(renderToStaticMarkup(createElement(Button,{disabled:true},'Save')),/disabled=""/);
 assert.match(renderToStaticMarkup(createElement(ButtonLink,{href:'/guide'},'Guide')),/href="\/guide"/);
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
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/toString'))).status,404);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/missing'))).status,404);
 assert.equal((await worker.fetch(new Request('https://design.bathos.org/',{method:'POST'}))).status,405);
 assert.equal(await (await worker.fetch(new Request('https://design.bathos.org/',{method:'HEAD'}))).text(),'');
});
