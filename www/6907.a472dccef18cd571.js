(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6907],{5432:(I,s,l)=>{"use strict";l.d(s,{T:()=>e});var r=l(2726),n=l(5861);class t extends r.Uw{write(i){var u=this;return(0,n.Z)(function*(){if(typeof navigator>"u"||!navigator.clipboard)throw u.unavailable("Clipboard API not available in this browser");if(void 0!==i.string)yield u.writeText(i.string);else if(i.url)yield u.writeText(i.url);else{if(!i.image)throw new Error("Nothing to write");if(!(typeof ClipboardItem<"u"))throw u.unavailable("Writing images to the clipboard is not supported in this browser");try{const a=yield(yield fetch(i.image)).blob(),c=new ClipboardItem({[a.type]:a});yield navigator.clipboard.write([c])}catch{throw new Error("Failed to write image")}}})()}read(){var i=this;return(0,n.Z)(function*(){if(typeof navigator>"u"||!navigator.clipboard)throw i.unavailable("Clipboard API not available in this browser");if(!(typeof ClipboardItem<"u"))return i.readText();try{const u=yield navigator.clipboard.read(),a=u[0].types[0],c=yield u[0].getType(a);return{value:yield i._getBlobData(c,a),type:a}}catch{return i.readText()}})()}readText(){var i=this;return(0,n.Z)(function*(){if(typeof navigator>"u"||!navigator.clipboard||!navigator.clipboard.readText)throw i.unavailable("Reading from clipboard not supported in this browser");return{value:yield navigator.clipboard.readText(),type:"text/plain"}})()}writeText(i){var u=this;return(0,n.Z)(function*(){if(typeof navigator>"u"||!navigator.clipboard||!navigator.clipboard.writeText)throw u.unavailable("Writting to clipboard not supported in this browser");yield navigator.clipboard.writeText(i)})()}_getBlobData(i,u){return new Promise((a,c)=>{const w=new FileReader;u.includes("image")?w.readAsDataURL(i):w.readAsText(i),w.onloadend=()=>{a(w.result)},w.onerror=A=>{c(A)}})}}const e=(0,r.fo)("Clipboard",{web:()=>new t})},7206:I=>{"use strict";var s={single_source_shortest_paths:function(l,r,n){var t={},e={};e[r]=0;var i,u,a,c,w,f,o=s.PriorityQueue.make();for(o.push(r,0);!o.empty();)for(a in c=(i=o.pop()).cost,w=l[u=i.value]||{})w.hasOwnProperty(a)&&(f=c+w[a],(typeof e[a]>"u"||e[a]>f)&&(e[a]=f,o.push(a,f),t[a]=u));if(typeof n<"u"&&typeof e[n]>"u"){var R=["Could not find a path from ",r," to ",n,"."].join("");throw new Error(R)}return t},extract_shortest_path_from_predecessor_list:function(l,r){for(var n=[],t=r;t;)n.push(t),t=l[t];return n.reverse(),n},find_path:function(l,r,n){var t=s.single_source_shortest_paths(l,r,n);return s.extract_shortest_path_from_predecessor_list(t,n)},PriorityQueue:{make:function(l){var t,r=s.PriorityQueue,n={};for(t in l=l||{},r)r.hasOwnProperty(t)&&(n[t]=r[t]);return n.queue=[],n.sorter=l.sorter||r.default_sorter,n},default_sorter:function(l,r){return l.cost-r.cost},push:function(l,r){this.queue.push({value:l,cost:r}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};I.exports=s},6119:I=>{"use strict";I.exports=function(l){for(var r=[],n=l.length,t=0;t<n;t++){var e=l.charCodeAt(t);if(e>=55296&&e<=56319&&n>t+1){var o=l.charCodeAt(t+1);o>=56320&&o<=57343&&(e=1024*(e-55296)+o-56320+65536,t+=1)}e<128?r.push(e):e<2048?(r.push(e>>6|192),r.push(63&e|128)):e<55296||e>=57344&&e<65536?(r.push(e>>12|224),r.push(e>>6&63|128),r.push(63&e|128)):e>=65536&&e<=1114111?(r.push(e>>18|240),r.push(e>>12&63|128),r.push(e>>6&63|128),r.push(63&e|128)):r.push(239,191,189)}return new Uint8Array(r).buffer}},2839:(I,s,l)=>{const r=l(8310),n=l(6208),t=l(6422),e=l(7772);function o(i,u,a,c,w){const A=[].slice.call(arguments,1),f=A.length,m="function"==typeof A[f-1];if(!m&&!r())throw new Error("Callback required as last argument");if(!m){if(f<1)throw new Error("Too few arguments provided");return 1===f?(a=u,u=c=void 0):2===f&&!u.getContext&&(c=a,a=u,u=void 0),new Promise(function(E,R){try{const L=n.create(a,c);E(i(L,u,c))}catch(L){R(L)}})}if(f<2)throw new Error("Too few arguments provided");2===f?(w=a,a=u,u=c=void 0):3===f&&(u.getContext&&typeof w>"u"?(w=c,c=void 0):(w=c,c=a,a=u,u=void 0));try{const E=n.create(a,c);w(null,i(E,u,c))}catch(E){w(E)}}s.create=n.create,s.toCanvas=o.bind(null,t.render),s.toDataURL=o.bind(null,t.renderToDataURL),s.toString=o.bind(null,function(i,u,a){return e.render(i,a)})},8310:I=>{I.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},5281:(I,s,l)=>{const r=l(2562).getSymbolSize;s.getRowColCoords=function(t){if(1===t)return[];const e=Math.floor(t/7)+2,o=r(t),i=145===o?26:2*Math.ceil((o-13)/(2*e-2)),u=[o-7];for(let a=1;a<e-1;a++)u[a]=u[a-1]-i;return u.push(6),u.reverse()},s.getPositions=function(t){const e=[],o=s.getRowColCoords(t),i=o.length;for(let u=0;u<i;u++)for(let a=0;a<i;a++)0===u&&0===a||0===u&&a===i-1||u===i-1&&0===a||e.push([o[u],o[a]]);return e}},120:(I,s,l)=>{const r=l(1239),n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function t(e){this.mode=r.ALPHANUMERIC,this.data=e}t.getBitsLength=function(o){return 11*Math.floor(o/2)+o%2*6},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(o){let i;for(i=0;i+2<=this.data.length;i+=2){let u=45*n.indexOf(this.data[i]);u+=n.indexOf(this.data[i+1]),o.put(u,11)}this.data.length%2&&o.put(n.indexOf(this.data[i]),6)},I.exports=t},6509:I=>{function s(){this.buffer=[],this.length=0}s.prototype={get:function(l){const r=Math.floor(l/8);return 1==(this.buffer[r]>>>7-l%8&1)},put:function(l,r){for(let n=0;n<r;n++)this.putBit(1==(l>>>r-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(l){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),l&&(this.buffer[r]|=128>>>this.length%8),this.length++}},I.exports=s},5147:I=>{function s(l){if(!l||l<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=l,this.data=new Uint8Array(l*l),this.reservedBit=new Uint8Array(l*l)}s.prototype.set=function(l,r,n,t){const e=l*this.size+r;this.data[e]=n,t&&(this.reservedBit[e]=!0)},s.prototype.get=function(l,r){return this.data[l*this.size+r]},s.prototype.xor=function(l,r,n){this.data[l*this.size+r]^=n},s.prototype.isReserved=function(l,r){return this.reservedBit[l*this.size+r]},I.exports=s},277:(I,s,l)=>{const r=l(6119),n=l(1239);function t(e){this.mode=n.BYTE,"string"==typeof e&&(e=r(e)),this.data=new Uint8Array(e)}t.getBitsLength=function(o){return 8*o},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let o=0,i=this.data.length;o<i;o++)e.put(this.data[o],8)},I.exports=t},7191:(I,s,l)=>{const r=l(4505),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],t=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];s.getBlocksCount=function(o,i){switch(i){case r.L:return n[4*(o-1)+0];case r.M:return n[4*(o-1)+1];case r.Q:return n[4*(o-1)+2];case r.H:return n[4*(o-1)+3];default:return}},s.getTotalCodewordsCount=function(o,i){switch(i){case r.L:return t[4*(o-1)+0];case r.M:return t[4*(o-1)+1];case r.Q:return t[4*(o-1)+2];case r.H:return t[4*(o-1)+3];default:return}}},4505:(I,s)=>{s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2},s.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},s.from=function(n,t){if(s.isValid(n))return n;try{return function l(r){if("string"!=typeof r)throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+r)}}(n)}catch{return t}}},5232:(I,s,l)=>{const r=l(2562).getSymbolSize;s.getPositions=function(e){const o=r(e);return[[0,0],[o-7,0],[0,o-7]]}},8508:(I,s,l)=>{const r=l(2562),e=r.getBCHDigit(1335);s.getEncodedBits=function(i,u){const a=i.bit<<3|u;let c=a<<10;for(;r.getBCHDigit(c)-e>=0;)c^=1335<<r.getBCHDigit(c)-e;return 21522^(a<<10|c)}},1674:(I,s)=>{const l=new Uint8Array(512),r=new Uint8Array(256);(function(){let t=1;for(let e=0;e<255;e++)l[e]=t,r[t]=e,t<<=1,256&t&&(t^=285);for(let e=255;e<512;e++)l[e]=l[e-255]})(),s.log=function(t){if(t<1)throw new Error("log("+t+")");return r[t]},s.exp=function(t){return l[t]},s.mul=function(t,e){return 0===t||0===e?0:l[r[t]+r[e]]}},9995:(I,s,l)=>{const r=l(1239),n=l(2562);function t(e){this.mode=r.KANJI,this.data=e}t.getBitsLength=function(o){return 13*o},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){let o;for(o=0;o<this.data.length;o++){let i=n.toSJIS(this.data[o]);if(i>=33088&&i<=40956)i-=33088;else{if(!(i>=57408&&i<=60351))throw new Error("Invalid SJIS character: "+this.data[o]+"\nMake sure your charset is UTF-8");i-=49472}i=192*(i>>>8&255)+(255&i),e.put(i,13)}},I.exports=t},9023:(I,s)=>{s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};function r(n,t,e){switch(n){case s.Patterns.PATTERN000:return(t+e)%2==0;case s.Patterns.PATTERN001:return t%2==0;case s.Patterns.PATTERN010:return e%3==0;case s.Patterns.PATTERN011:return(t+e)%3==0;case s.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(e/3))%2==0;case s.Patterns.PATTERN101:return t*e%2+t*e%3==0;case s.Patterns.PATTERN110:return(t*e%2+t*e%3)%2==0;case s.Patterns.PATTERN111:return(t*e%3+(t+e)%2)%2==0;default:throw new Error("bad maskPattern:"+n)}}s.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},s.from=function(t){return s.isValid(t)?parseInt(t,10):void 0},s.getPenaltyN1=function(t){const e=t.size;let o=0,i=0,u=0,a=null,c=null;for(let w=0;w<e;w++){i=u=0,a=c=null;for(let A=0;A<e;A++){let f=t.get(w,A);f===a?i++:(i>=5&&(o+=i-5+3),a=f,i=1),f=t.get(A,w),f===c?u++:(u>=5&&(o+=u-5+3),c=f,u=1)}i>=5&&(o+=i-5+3),u>=5&&(o+=u-5+3)}return o},s.getPenaltyN2=function(t){const e=t.size;let o=0;for(let i=0;i<e-1;i++)for(let u=0;u<e-1;u++){const a=t.get(i,u)+t.get(i,u+1)+t.get(i+1,u)+t.get(i+1,u+1);(4===a||0===a)&&o++}return 3*o},s.getPenaltyN3=function(t){const e=t.size;let o=0,i=0,u=0;for(let a=0;a<e;a++){i=u=0;for(let c=0;c<e;c++)i=i<<1&2047|t.get(a,c),c>=10&&(1488===i||93===i)&&o++,u=u<<1&2047|t.get(c,a),c>=10&&(1488===u||93===u)&&o++}return 40*o},s.getPenaltyN4=function(t){let e=0;const o=t.data.length;for(let u=0;u<o;u++)e+=t.data[u];return 10*Math.abs(Math.ceil(100*e/o/5)-10)},s.applyMask=function(t,e){const o=e.size;for(let i=0;i<o;i++)for(let u=0;u<o;u++)e.isReserved(u,i)||e.xor(u,i,r(t,u,i))},s.getBestMask=function(t,e){const o=Object.keys(s.Patterns).length;let i=0,u=1/0;for(let a=0;a<o;a++){e(a),s.applyMask(a,t);const c=s.getPenaltyN1(t)+s.getPenaltyN2(t)+s.getPenaltyN3(t)+s.getPenaltyN4(t);s.applyMask(a,t),c<u&&(u=c,i=a)}return i}},1239:(I,s,l)=>{const r=l(6161),n=l(2427);s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(o,i){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!r.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?o.ccBits[0]:i<27?o.ccBits[1]:o.ccBits[2]},s.getBestModeForData=function(o){return n.testNumeric(o)?s.NUMERIC:n.testAlphanumeric(o)?s.ALPHANUMERIC:n.testKanji(o)?s.KANJI:s.BYTE},s.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},s.isValid=function(o){return o&&o.bit&&o.ccBits},s.from=function(o,i){if(s.isValid(o))return o;try{return function t(e){if("string"!=typeof e)throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+e)}}(o)}catch{return i}}},8722:(I,s,l)=>{const r=l(1239);function n(t){this.mode=r.NUMERIC,this.data=t.toString()}n.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(e){let o,i,u;for(o=0;o+3<=this.data.length;o+=3)i=this.data.substr(o,3),u=parseInt(i,10),e.put(u,10);const a=this.data.length-o;a>0&&(i=this.data.substr(o),u=parseInt(i,10),e.put(u,3*a+1))},I.exports=n},2376:(I,s,l)=>{const r=l(1674);s.mul=function(t,e){const o=new Uint8Array(t.length+e.length-1);for(let i=0;i<t.length;i++)for(let u=0;u<e.length;u++)o[i+u]^=r.mul(t[i],e[u]);return o},s.mod=function(t,e){let o=new Uint8Array(t);for(;o.length-e.length>=0;){const i=o[0];for(let a=0;a<e.length;a++)o[a]^=r.mul(e[a],i);let u=0;for(;u<o.length&&0===o[u];)u++;o=o.slice(u)}return o},s.generateECPolynomial=function(t){let e=new Uint8Array([1]);for(let o=0;o<t;o++)e=s.mul(e,new Uint8Array([1,r.exp(o)]));return e}},6208:(I,s,l)=>{const r=l(2562),n=l(4505),t=l(6509),e=l(5147),o=l(5281),i=l(5232),u=l(9023),a=l(7191),c=l(1297),w=l(9467),A=l(8508),f=l(1239),m=l(1799);function S(g,B,y){const d=g.size,M=A.getEncodedBits(B,y);let C,h;for(C=0;C<15;C++)h=1==(M>>C&1),g.set(C<6?C:C<8?C+1:d-15+C,8,h,!0),g.set(8,C<8?d-C-1:C<9?15-C-1+1:15-C-1,h,!0);g.set(d-8,8,1,!0)}function U(g,B,y,d){let M;if(Array.isArray(g))M=m.fromArray(g);else{if("string"!=typeof g)throw new Error("Invalid data");{let z=B;if(!z){const V=m.rawSplit(g);z=w.getBestVersionForData(V,y)}M=m.fromString(g,z||40)}}const C=w.getBestVersionForData(M,y);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(B){if(B<C)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+C+".\n")}else B=C;const h=function p(g,B,y){const d=new t;y.forEach(function(T){d.put(T.mode.bit,4),d.put(T.getLength(),f.getCharCountIndicator(T.mode,g)),T.write(d)});const h=8*(r.getSymbolTotalCodewords(g)-a.getTotalCodewordsCount(g,B));for(d.getLengthInBits()+4<=h&&d.put(0,4);d.getLengthInBits()%8!=0;)d.putBit(0);const P=(h-d.getLengthInBits())/8;for(let T=0;T<P;T++)d.put(T%2?17:236,8);return function D(g,B,y){const d=r.getSymbolTotalCodewords(B),C=d-a.getTotalCodewordsCount(B,y),h=a.getBlocksCount(B,y),T=h-d%h,z=Math.floor(d/h),V=Math.floor(C/h),_=V+1,G=z-V,Z=new c(G);let K=0;const H=new Array(h),j=new Array(h);let J=0;const W=new Uint8Array(g.buffer);for(let v=0;v<h;v++){const O=v<T?V:_;H[v]=W.slice(K,K+O),j[v]=Z.encode(H[v]),K+=O,J=Math.max(J,O)}const Y=new Uint8Array(d);let F,k,Q=0;for(F=0;F<J;F++)for(k=0;k<h;k++)F<H[k].length&&(Y[Q++]=H[k][F]);for(F=0;F<G;F++)for(k=0;k<h;k++)Y[Q++]=j[k][F];return Y}(d,g,B)}(B,y,M),P=r.getSymbolSize(B),T=new e(P);return function E(g,B){const y=g.size,d=i.getPositions(B);for(let M=0;M<d.length;M++){const C=d[M][0],h=d[M][1];for(let P=-1;P<=7;P++)if(!(C+P<=-1||y<=C+P))for(let T=-1;T<=7;T++)h+T<=-1||y<=h+T||g.set(C+P,h+T,P>=0&&P<=6&&(0===T||6===T)||T>=0&&T<=6&&(0===P||6===P)||P>=2&&P<=4&&T>=2&&T<=4,!0)}}(T,B),function R(g){const B=g.size;for(let y=8;y<B-8;y++){const d=y%2==0;g.set(y,6,d,!0),g.set(6,y,d,!0)}}(T),function L(g,B){const y=o.getPositions(B);for(let d=0;d<y.length;d++){const M=y[d][0],C=y[d][1];for(let h=-2;h<=2;h++)for(let P=-2;P<=2;P++)g.set(M+h,C+P,-2===h||2===h||-2===P||2===P||0===h&&0===P,!0)}}(T,B),S(T,y,0),B>=7&&function N(g,B){const y=g.size,d=w.getEncodedBits(B);let M,C,h;for(let P=0;P<18;P++)M=Math.floor(P/3),C=P%3+y-8-3,h=1==(d>>P&1),g.set(M,C,h,!0),g.set(C,M,h,!0)}(T,B),function b(g,B){const y=g.size;let d=-1,M=y-1,C=7,h=0;for(let P=y-1;P>0;P-=2)for(6===P&&P--;;){for(let T=0;T<2;T++)if(!g.isReserved(M,P-T)){let z=!1;h<B.length&&(z=1==(B[h]>>>C&1)),g.set(M,P-T,z),C--,-1===C&&(h++,C=7)}if(M+=d,M<0||y<=M){M-=d,d=-d;break}}}(T,h),isNaN(d)&&(d=u.getBestMask(T,S.bind(null,T,y))),u.applyMask(d,T),S(T,y,d),{modules:T,version:B,errorCorrectionLevel:y,maskPattern:d,segments:M}}s.create=function(B,y){if(typeof B>"u"||""===B)throw new Error("No input text");let M,C,d=n.M;return typeof y<"u"&&(d=n.from(y.errorCorrectionLevel,n.M),M=w.from(y.version),C=u.from(y.maskPattern),y.toSJISFunc&&r.setToSJISFunction(y.toSJISFunc)),U(B,M,d,C)}},1297:(I,s,l)=>{const r=l(2376);function n(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}n.prototype.initialize=function(e){this.degree=e,this.genPoly=r.generateECPolynomial(this.degree)},n.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(e.length+this.degree);o.set(e);const i=r.mod(o,this.genPoly),u=this.degree-i.length;if(u>0){const a=new Uint8Array(this.degree);return a.set(i,u),a}return i},I.exports=n},2427:(I,s)=>{const l="[0-9]+";let n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";n=n.replace(/u/g,"\\u");const t="(?:(?![A-Z0-9 $%*+\\-./:]|"+n+")(?:.|[\r\n]))+";s.KANJI=new RegExp(n,"g"),s.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),s.BYTE=new RegExp(t,"g"),s.NUMERIC=new RegExp(l,"g"),s.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");const e=new RegExp("^"+n+"$"),o=new RegExp("^"+l+"$"),i=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");s.testKanji=function(a){return e.test(a)},s.testNumeric=function(a){return o.test(a)},s.testAlphanumeric=function(a){return i.test(a)}},1799:(I,s,l)=>{const r=l(1239),n=l(8722),t=l(120),e=l(277),o=l(9995),i=l(2427),u=l(2562),a=l(7206);function c(N){return unescape(encodeURIComponent(N)).length}function w(N,S,b){const p=[];let D;for(;null!==(D=N.exec(b));)p.push({data:D[0],index:D.index,mode:S,length:D[0].length});return p}function A(N){const S=w(i.NUMERIC,r.NUMERIC,N),b=w(i.ALPHANUMERIC,r.ALPHANUMERIC,N);let p,D;return u.isKanjiModeEnabled()?(p=w(i.BYTE,r.BYTE,N),D=w(i.KANJI,r.KANJI,N)):(p=w(i.BYTE_KANJI,r.BYTE,N),D=[]),S.concat(b,p,D).sort(function(g,B){return g.index-B.index}).map(function(g){return{data:g.data,mode:g.mode,length:g.length}})}function f(N,S){switch(S){case r.NUMERIC:return n.getBitsLength(N);case r.ALPHANUMERIC:return t.getBitsLength(N);case r.KANJI:return o.getBitsLength(N);case r.BYTE:return e.getBitsLength(N)}}function L(N,S){let b;const p=r.getBestModeForData(N);if(b=r.from(S,p),b!==r.BYTE&&b.bit<p.bit)throw new Error('"'+N+'" cannot be encoded with mode '+r.toString(b)+".\n Suggested mode is: "+r.toString(p));switch(b===r.KANJI&&!u.isKanjiModeEnabled()&&(b=r.BYTE),b){case r.NUMERIC:return new n(N);case r.ALPHANUMERIC:return new t(N);case r.KANJI:return new o(N);case r.BYTE:return new e(N)}}s.fromArray=function(S){return S.reduce(function(b,p){return"string"==typeof p?b.push(L(p,null)):p.data&&b.push(L(p.data,p.mode)),b},[])},s.fromString=function(S,b){const D=function E(N){const S=[];for(let b=0;b<N.length;b++){const p=N[b];switch(p.mode){case r.NUMERIC:S.push([p,{data:p.data,mode:r.ALPHANUMERIC,length:p.length},{data:p.data,mode:r.BYTE,length:p.length}]);break;case r.ALPHANUMERIC:S.push([p,{data:p.data,mode:r.BYTE,length:p.length}]);break;case r.KANJI:S.push([p,{data:p.data,mode:r.BYTE,length:c(p.data)}]);break;case r.BYTE:S.push([{data:p.data,mode:r.BYTE,length:c(p.data)}])}}return S}(A(S,u.isKanjiModeEnabled())),U=function R(N,S){const b={},p={start:{}};let D=["start"];for(let U=0;U<N.length;U++){const g=N[U],B=[];for(let y=0;y<g.length;y++){const d=g[y],M=""+U+y;B.push(M),b[M]={node:d,lastCount:0},p[M]={};for(let C=0;C<D.length;C++){const h=D[C];b[h]&&b[h].node.mode===d.mode?(p[h][M]=f(b[h].lastCount+d.length,d.mode)-f(b[h].lastCount,d.mode),b[h].lastCount+=d.length):(b[h]&&(b[h].lastCount=d.length),p[h][M]=f(d.length,d.mode)+4+r.getCharCountIndicator(d.mode,S))}}D=B}for(let U=0;U<D.length;U++)p[D[U]].end=0;return{map:p,table:b}}(D,b),g=a.find_path(U.map,"start","end"),B=[];for(let y=1;y<g.length-1;y++)B.push(U.table[g[y]].node);return s.fromArray(function m(N){return N.reduce(function(S,b){const p=S.length-1>=0?S[S.length-1]:null;return p&&p.mode===b.mode?(S[S.length-1].data+=b.data,S):(S.push(b),S)},[])}(B))},s.rawSplit=function(S){return s.fromArray(A(S,u.isKanjiModeEnabled()))}},2562:(I,s)=>{let l;const r=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];s.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},s.getSymbolTotalCodewords=function(t){return r[t]},s.getBCHDigit=function(n){let t=0;for(;0!==n;)t++,n>>>=1;return t},s.setToSJISFunction=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');l=t},s.isKanjiModeEnabled=function(){return typeof l<"u"},s.toSJIS=function(t){return l(t)}},6161:(I,s)=>{s.isValid=function(r){return!isNaN(r)&&r>=1&&r<=40}},9467:(I,s,l)=>{const r=l(2562),n=l(7191),t=l(4505),e=l(1239),o=l(6161),u=r.getBCHDigit(7973);function c(f,m){return e.getCharCountIndicator(f,m)+4}function w(f,m){let E=0;return f.forEach(function(R){const L=c(R.mode,m);E+=L+R.getBitsLength()}),E}s.from=function(m,E){return o.isValid(m)?parseInt(m,10):E},s.getCapacity=function(m,E,R){if(!o.isValid(m))throw new Error("Invalid QR Code version");typeof R>"u"&&(R=e.BYTE);const S=8*(r.getSymbolTotalCodewords(m)-n.getTotalCodewordsCount(m,E));if(R===e.MIXED)return S;const b=S-c(R,m);switch(R){case e.NUMERIC:return Math.floor(b/10*3);case e.ALPHANUMERIC:return Math.floor(b/11*2);case e.KANJI:return Math.floor(b/13);default:return Math.floor(b/8)}},s.getBestVersionForData=function(m,E){let R;const L=t.from(E,t.M);if(Array.isArray(m)){if(m.length>1)return function A(f,m){for(let E=1;E<=40;E++)if(w(f,E)<=s.getCapacity(E,m,e.MIXED))return E}(m,L);if(0===m.length)return 1;R=m[0]}else R=m;return function a(f,m,E){for(let R=1;R<=40;R++)if(m<=s.getCapacity(R,E,f))return R}(R.mode,R.getLength(),L)},s.getEncodedBits=function(m){if(!o.isValid(m)||m<7)throw new Error("Invalid QR Code version");let E=m<<12;for(;r.getBCHDigit(E)-u>=0;)E^=7973<<r.getBCHDigit(E)-u;return m<<12|E}},6422:(I,s,l)=>{const r=l(1101);s.render=function(o,i,u){let a=u,c=i;typeof a>"u"&&(!i||!i.getContext)&&(a=i,i=void 0),i||(c=function t(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}()),a=r.getOptions(a);const w=r.getImageWidth(o.modules.size,a),A=c.getContext("2d"),f=A.createImageData(w,w);return r.qrToImageData(f.data,o,a),function n(e,o,i){e.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=i,o.width=i,o.style.height=i+"px",o.style.width=i+"px"}(A,c,w),A.putImageData(f,0,0),c},s.renderToDataURL=function(o,i,u){let a=u;return typeof a>"u"&&(!i||!i.getContext)&&(a=i,i=void 0),a||(a={}),s.render(o,i,a).toDataURL(a.type||"image/png",(a.rendererOpts||{}).quality)}},7772:(I,s,l)=>{const r=l(1101);function n(o,i){const u=o.a/255,a=i+'="'+o.hex+'"';return u<1?a+" "+i+'-opacity="'+u.toFixed(2).slice(1)+'"':a}function t(o,i,u){let a=o+i;return typeof u<"u"&&(a+=" "+u),a}s.render=function(i,u,a){const c=r.getOptions(u),w=i.modules.size,A=i.modules.data,f=w+2*c.margin,m=c.color.light.a?"<path "+n(c.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",E="<path "+n(c.color.dark,"stroke")+' d="'+function e(o,i,u){let a="",c=0,w=!1,A=0;for(let f=0;f<o.length;f++){const m=Math.floor(f%i),E=Math.floor(f/i);!m&&!w&&(w=!0),o[f]?(A++,f>0&&m>0&&o[f-1]||(a+=w?t("M",m+u,.5+E+u):t("m",c,0),c=0,w=!1),m+1<i&&o[f+1]||(a+=t("h",A),A=0)):c++}return a}(A,w,c.margin)+'"/>',N='<svg xmlns="http://www.w3.org/2000/svg" '+(c.width?'width="'+c.width+'" height="'+c.width+'" ':"")+'viewBox="0 0 '+f+" "+f+'" shape-rendering="crispEdges">'+m+E+"</svg>\n";return"function"==typeof a&&a(null,N),N}},1101:(I,s)=>{function l(r){if("number"==typeof r&&(r=r.toString()),"string"!=typeof r)throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||5===n.length||n.length>8)throw new Error("Invalid hex color: "+r);(3===n.length||4===n.length)&&(n=Array.prototype.concat.apply([],n.map(function(e){return[e,e]}))),6===n.length&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:255&t,hex:"#"+n.slice(0,6).join("")}}s.getOptions=function(n){n||(n={}),n.color||(n.color={});const e=n.width&&n.width>=21?n.width:void 0;return{width:e,scale:e?4:n.scale||4,margin:typeof n.margin>"u"||null===n.margin||n.margin<0?4:n.margin,color:{dark:l(n.color.dark||"#000000ff"),light:l(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},s.getScale=function(n,t){return t.width&&t.width>=n+2*t.margin?t.width/(n+2*t.margin):t.scale},s.getImageWidth=function(n,t){const e=s.getScale(n,t);return Math.floor((n+2*t.margin)*e)},s.qrToImageData=function(n,t,e){const o=t.modules.size,i=t.modules.data,u=s.getScale(o,e),a=Math.floor((o+2*e.margin)*u),c=e.margin*u,w=[e.color.light,e.color.dark];for(let A=0;A<a;A++)for(let f=0;f<a;f++){let m=4*(A*a+f),E=e.color.light;A>=c&&f>=c&&A<a-c&&f<a-c&&(E=w[i[Math.floor((A-c)/u)*o+Math.floor((f-c)/u)]?1:0]),n[m++]=E.r,n[m++]=E.g,n[m++]=E.b,n[m]=E.a}}}}]);