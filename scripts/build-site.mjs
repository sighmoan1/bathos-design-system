import {readFile,writeFile,mkdir} from 'node:fs/promises';

const {version}=JSON.parse(await readFile('package.json','utf8'));
const siteSettings=JSON.parse(await readFile('site/design-system.json','utf8'));
const paletteIds=['deep-water-red','stone-vermilion','ink-teal'];
if (siteSettings.version !== version || !paletteIds.includes(siteSettings.palette)) {
  throw new Error('Catalogue settings must pin this package version and a supported palette');
}
const tokens=await readFile('styles/tokens.css','utf8');
const paletteCss=await readFile('styles/palettes.css','utf8');
const paletteLabels=Object.fromEntries(paletteIds.map(id=>[id,id.replaceAll('-',' ')]));
const swatches=[...tokens.matchAll(/--(color-[\w-]+): (#[\da-f]+);/g)].map(([,name,value])=>`<article class="swatch"><div style="--swatch:${value}" aria-hidden="true"></div><p>${name.replace('color-','').replaceAll('-',' ')}<code>${value} · --${name}</code></p></article>`).join('');
const palettes=paletteIds.map(id=>{
  const selector=`[data-bathos-palette="${id}"]`;
  const block=paletteCss.split(selector)[1]?.split('}')[0] ?? '';
  const values=Object.fromEntries([...block.matchAll(/--(color-[\w-]+):\s*(#[\da-f]+)/g)].map(([,name,value])=>[name,value]));
  const chips=['color-primary','color-accent','color-ocean','color-background'].map(name=>`<span><i style="--swatch:${values[name]}" aria-hidden="true"></i>${name.replace('color-','')}</span>`).join('');
  return `<article class="palette-option" data-bathos-palette="${id}"><h3>${paletteLabels[id]}</h3><div class="palette-swatches">${chips}</div><div class="palette-actions"><button class="button button--quiet palette-preview-button" type="button" data-preview-palette="${id}">Preview ${paletteLabels[id]} across catalogue</button><button class="button button--primary" type="button">Primary action</button><button class="button button--secondary" type="button">Secondary</button></div><div class="panel panel--accent"><h4>Selected state</h4><p>Clear contrast for text, controls and boundaries.</p></div></article>`;
}).join('');
const paletteOptions=paletteIds.map(id=>`<option value="${id}"${id===siteSettings.palette?' selected':''}>${paletteLabels[id]}</option>`).join('');
const notices=['info','success','warning','danger'].map(t=>`<aside class="notice notice--${t}"><p class="notice__title">${t[0].toUpperCase()+t.slice(1)} notice</p><p>Visible text explains the state alongside its colour.</p></aside>`).join('');
const html=(await readFile('site/index.html','utf8'))
  .replaceAll('{{version}}',version)
  .replace('{{palette}}',siteSettings.palette)
  .replace('{{palette-name}}',paletteLabels[siteSettings.palette])
  .replace('{{palette-options}}',paletteOptions)
  .replace('{{swatches}}',swatches)
  .replace('{{palettes}}',palettes)
  .replace('{{notices}}',notices);
const css=(await Promise.all(['styles/tokens.css','styles/base.css','styles/components.css','styles/palettes.css','site/catalogue.css'].map(f=>readFile(f,'utf8')))).join(String.fromCharCode(10));
const palettePreviewJs=await readFile('site/palette-preview.js','utf8');
const assets={'/':['text/html; charset=utf-8',html],'/catalogue.css':['text/css; charset=utf-8',css],'/palette-preview.js':['application/javascript; charset=utf-8',palettePreviewJs],'/version.json':['application/json',JSON.stringify({name:'@bathos/design-system',version})]};
await mkdir('site-out',{recursive:true});
await writeFile('site-out/index.html',html); await writeFile('site-out/catalogue.css',css); await writeFile('site-out/palette-preview.js',palettePreviewJs); await writeFile('site-out/version.json',assets['/version.json'][1]);
const worker='const assets = '+JSON.stringify(assets)+';'+String.fromCharCode(10)+await readFile('scripts/worker-handler.mjs','utf8');
await writeFile('worker.generated.mjs',worker);
console.log('Built catalogue and Worker for v'+version);
