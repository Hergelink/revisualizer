(()=>{var t={878:(t,e,s)=>{const i=s(466),n=s(873),r=s(188),a=s(473),o=s(973);t.exports=class{constructor(t){this.auth=t.auth,this.userAgent=t.userAgent||`replicate-javascript/${o.version}`,this.baseUrl=t.baseUrl||"https://api.replicate.com/v1",this.fetch=t.fetch||globalThis.fetch,this.collections={get:i.get.bind(this)},this.models={get:n.get.bind(this),versions:{list:n.versions.list.bind(this),get:n.versions.get.bind(this)}},this.predictions={create:r.create.bind(this),get:r.get.bind(this),cancel:r.cancel.bind(this),list:r.list.bind(this)},this.trainings={create:a.create.bind(this),get:a.get.bind(this),cancel:a.cancel.bind(this),list:a.list.bind(this)}}async run(t,e){const s=/[a-zA-Z0-9]+(?:(?:[._]|__|[-]*)[a-zA-Z0-9]+)*/,i=new RegExp(`^(?<owner>${s.source})/(?<name>${s.source}):(?<version>[0-9a-fA-F]+)$`),n=t.match(i);if(!n||!n.groups)throw new Error('Invalid version. It must be in the format "owner/name:version"');const{version:r}=n.groups,a=await this.predictions.create({wait:!0,...e,version:r});if("failed"===a.status)throw new Error(`Prediction failed: ${a.error}`);return a.output}async request(t,e){const{auth:s,baseUrl:i,userAgent:n}=this,r=new URL(t.startsWith("/")?t.slice(1):t,i.endsWith("/")?i:`${i}/`),{method:a="GET",params:o={},data:c}=e;Object.entries(o).forEach((([t,e])=>{r.searchParams.append(t,e)}));const u={Authorization:`Token ${s}`,"Content-Type":"application/json","User-Agent":n},d=await this.fetch(r,{method:a,headers:u,body:c?JSON.stringify(c):void 0});if(!d.ok)throw new Error(`API request failed: ${d.statusText}`);return d.json()}async*paginate(t){const e=await t();if(yield e.results,e.next){const t=()=>this.request(e.next,{method:"GET"});yield*this.paginate(t)}}async wait(t,e){const{id:s}=t;if(!s)throw new Error("Invalid prediction");if("succeeded"===t.status||"failed"===t.status||"canceled"===t.status)return t;let i=await this.predictions.get(s);const n=t=>new Promise((e=>setTimeout(e,t)));let r=0;const a=e.interval||250,o=e.maxAttempts||null;for(;"succeeded"!==i.status&&"failed"!==i.status&&"canceled"!==i.status;){if(r+=1,o&&r>o)throw new Error(`Prediction ${s} did not finish after ${o} attempts`);await n(a),i=await this.predictions.get(t.id)}if("failed"===i.status)throw new Error(`Prediction failed: ${i.error}`);return i}}},466:t=>{t.exports={get:async function(t){return this.request(`/collections/${t}`,{method:"GET"})}}},873:t=>{t.exports={get:async function(t,e){return this.request(`/models/${t}/${e}`,{method:"GET"})},versions:{list:async function(t,e){return this.request(`/models/${t}/${e}/versions`,{method:"GET"})},get:async function(t,e,s){return this.request(`/models/${t}/${e}/versions/${s}`,{method:"GET"})}}}},188:t=>{t.exports={create:async function(t){const{wait:e,...s}=t,i=this.request("/predictions",{method:"POST",data:s});if(e){const{maxAttempts:t,interval:s}=e;return this.wait(await i,{maxAttempts:t,interval:s})}return i},get:async function(t){return this.request(`/predictions/${t}`,{method:"GET"})},cancel:async function(t){return this.request(`/predictions/${t}/cancel`,{method:"POST"})},list:async function(){return this.request("/predictions",{method:"GET"})}}},473:t=>{t.exports={create:async function(t,e,s,i){const{...n}=i;return this.request(`/models/${t}/${e}/versions/${s}/trainings`,{method:"POST",data:n})},get:async function(t){return this.request(`/trainings/${t}`,{method:"GET"})},cancel:async function(t){return this.request(`/trainings/${t}/cancel`,{method:"POST"})},list:async function(){return this.request("/trainings",{method:"GET"})}}},973:t=>{"use strict";t.exports=JSON.parse('{"name":"replicate","version":"0.11.1","description":"JavaScript client for Replicate","repository":"github:replicate/replicate-javascript","homepage":"https://github.com/replicate/replicate-javascript#readme","bugs":"https://github.com/replicate/replicate-javascript/issues","license":"Apache-2.0","main":"index.js","scripts":{"lint":"eslint .","test":"jest"},"devDependencies":{"@types/jest":"^29.5.0","@typescript-eslint/eslint-plugin":"^5.56.0","cross-fetch":"^3.1.5","eslint":"^8.36.0","eslint-config-airbnb-base":"^15.0.0","eslint-plugin-import":"^2.27.5","eslint-plugin-jest":"^27.2.1","eslint-plugin-jsdoc":"^40.1.0","eslint-plugin-n":"^15.6.1","eslint-plugin-promise":"^6.1.1","jest":"^29.5.0","nock":"^13.3.0","ts-jest":"^29.1.0","typescript":"^5.0.2"}}')}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,s),r.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=s(878),e=s.n(t);chrome.storage.sync.get("REPLICATE_API_TOKEN",(t=>{const s=new(e())({auth:"your_api_token_here"});chrome.runtime.onMessage.addListener(((t,e,i)=>("requestImageVariations"===t.action&&async function(t){return await s.run("lambdal/stable-diffusion-image-variation:7c399ba0e1b33ed8ec39ed30eb6b0a2d9e054462543c428c251293034af82a8e",{input:{input_image:t},num_outputs:2})}(t.imageUrl).then((t=>{i(t)})),!0)))})),chrome.contextMenus.create({id:"createImageVariations",title:"Create Image Variations",contexts:["image"]}),chrome.contextMenus.onClicked.addListener(((t,e)=>{"createImageVariations"===t.menuItemId&&chrome.tabs.sendMessage(e.id,{action:"getImageVariations",imageUrl:t.srcUrl})}))})()})();