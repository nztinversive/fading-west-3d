import{a as e,r as t}from"./preload-helper-TpZDrtmz.js";import{$r as n,A as r,B as i,Hn as a,Ja as o,Lt as s,O as c,Rn as l,Tn as u,V as d,Wi as f,ct as p,ft as m,io as h,j as g,mr as _,no as v,pa as y,pr as b,qi as x,qt as S,ro as C}from"./three.core-BF58tRDi.js";import{C as w,M as T,c as E,j as D,l as ee,z as te}from"./surfaces-sZuS4nAU.js";var O=.87/12742017.6,k=(e,t)=>(e*e+t*t)*O,A=class{constructor(e,t){this.n=e.n,this.half=e.half,this.sp=e.spacing,this.h=t}x(e){return-this.half+e*this.sp}contains(e,t){return Math.abs(e)<=this.half&&Math.abs(t)<=this.half}sample(e,t,n=!1){let r=this.n,i=this.h,a=(e+this.half)/this.sp,o=(t+this.half)/this.sp;a=Math.min(Math.max(a,0),r-1.000001),o=Math.min(Math.max(o,0),r-1.000001);let s=1;if(this.stride&&!n){let e=this.nc,t=Math.min(Math.floor(a/this.cs),e-1),n=Math.min(Math.floor(o/this.cs),e-1);s=this.stride[n*e+t]}let c=Math.min(Math.floor(a/s)*s,r-1-s),l=Math.min(Math.floor(o/s)*s,r-1-s),u=(a-c)/s,d=(o-l)/s,f=l*r+c,p=s*r,m=i[f],h=i[f+s],g=i[f+p],_=i[f+p+s];return u+d<=1?m+(h-m)*u+(g-m)*d:_+(g-_)*(1-u)+(h-_)*(1-d)}setLod(e,t){this.cs=e,this.nc=(this.n-1)/e,this.stride=new Uint8Array(this.nc*this.nc);for(let n=0;n<this.nc;n++)for(let r=0;r<this.nc;r++){let i=1/0,a=-1/0;for(let t=n*e;t<=(n+1)*e;t+=2)for(let n=r*e;n<=(r+1)*e;n+=2){let e=this.h[t*this.n+n];e<i&&(i=e),e>a&&(a=e)}this.stride[n*this.nc+r]=t([this.x(r*e),this.x(n*e),this.x((r+1)*e),this.x((n+1)*e)],a-i)}}};async function j(e,t){if(t.packed&&typeof DecompressionStream==`function`)try{let n=await fetch(e+t.packed);if(!n.ok)throw Error(n.status);let r=new Uint8Array(await new Response(n.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer()),i=r.length>>1,a=new Uint16Array(i),o=0;for(let e=0;e<i;e++)o=o+(r[e]|r[i+e]<<8)&65535,a[e]=o;return a}catch(e){console.warn(`[terrain] packed heights failed, using raw`,t.packed,e?.message)}return new Uint16Array(await(await fetch(e+t.file)).arrayBuffer())}async function M(e=`assets/terrain/`,t={}){let n=await(await fetch(e+`terrain.json`)).json(),r={},i=null;await Promise.all(Object.entries(n.levels).filter(([e])=>!t.levels||t.levels.includes(e)||e!==`detail`).map(async([t,a])=>{let o=await j(e,a),s=new Float32Array(o.length),c=(a.max-a.min)/65535,l=a.min-n.originElevation;for(let e=0;e<o.length;e++)s[e]=l+o[e]*c;a.rect?i={...a,h:s}:r[t]=new A(a,s)}));{let e=r.horizon,t=(e.n-1)/2+1,n=new Float32Array(t*t);for(let r=0;r<t;r++)for(let i=0;i<t;i++)n[r*t+i]=e.h[2*r*e.n+2*i];r.horizon=new A({n:t,half:e.half,spacing:e.sp*2},n)}let{near:a,far:o,horizon:s}=r,c=(e,t,n)=>{let r=e.n,i=e.half;for(let a=0;a<r;a++)for(let o=0;o<r;o++){let s=e.x(o),c=e.x(a),l=Math.max(Math.abs(s),Math.abs(c));if(l<i-n)continue;let u=(l-(i-n))/n,d=u*u*(3-2*u),f=a*r+o;e.h[f]+=(t.sample(s,c,!0)-e.h[f])*d}};c(o,s,3e3),c(a,o,220);let l=-1200,u=new Float32Array(301);for(let e=0;e<301;e++)u[e]=a.sample(300,l+e*8,!0);for(let e=0;e<4;e++){let e=new Float32Array(301);for(let t=0;t<301;t++){let n=0,r=0;for(let e=-6;e<=6;e++){let i=Math.min(Math.max(t+e,0),300);n+=u[i],r++}e[t]=n/r}u=e}if(te({z0:l,step:8,h:u}),a.natural=a.h.slice(),t.grading){let e=t.grading(a,(e,t)=>a.sample(e,t,!0));for(let t=0;t<a.n;t++){let n=a.x(t);if(!(n<e.bbox[1]||n>e.bbox[3]))for(let r=0;r<a.n;r++){let i=a.x(r);if(i<e.bbox[0]||i>e.bbox[2])continue;let o=t*a.n+r,s=Math.max(Math.abs(i),Math.abs(n)),c=s>a.half-230?Math.min(1,(s-(a.half-230))/10):0;a.h[o]+=(e.fn(i,n,a.h[o])-a.h[o])*(1-c)}}return N(n,r,i,a,o,s,null,e.lodCenter)}let d=T(),f=d.reduce((e,t)=>[Math.min(e[0],t.r[0]-t.blend),Math.min(e[1],t.r[1]-t.blend),Math.max(e[2],t.r[2]+t.blend),Math.max(e[3],t.r[3]+t.blend)],[1/0,1/0,-1/0,-1/0]);for(let e=0;e<a.n;e++){let t=a.x(e);if(!(t<f[1]||t>f[3]))for(let n=0;n<a.n;n++){let r=a.x(n);if(r<f[0]||r>f[2])continue;let i=e*a.n+n,o=Math.max(Math.abs(r),Math.abs(t)),s=o>a.half-230?Math.min(1,(o-(a.half-230))/10):0;a.h[i]+=(D(d,r,t,a.h[i])-a.h[i])*(1-s)}}return N(n,r,i,a,o,s,d,null)}function N(e,t,n,r,i,a,o,s){let c=s||[95,-50],l=(e,t,n)=>Math.hypot(Math.max(e[0]-t,0,t-e[2]),Math.max(e[1]-n,0,n-e[3]));return r.setLod(32,(e,t)=>{let n=l(e,c[0],c[1]);return n<220?1:n<520||t>25?2:4}),i.setLod(40,(e,t)=>{let n=l(e,0,0);return n<4500||t>800&&n<12e3?1:t>450?2:t>200?n<11e3?2:4:n<9e3?2:n<18e3?4:8}),a.setLod(24,(e,t)=>{let n=l(e,0,0);return n<4e4&&t>400?1:n<6e4?2:4}),{meta:e,grids:t,detail:n,heightAt:(e,t)=>(r.contains(e,t)?r:i.contains(e,t)?i:a).sample(e,t)-k(e,t),zones:o}}function P(e,{hole:t=0,skirt:n=1}={}){let i=e.n,a=e.sp,o=e.h,c=e.cs,l=e.nc,u=[],d=[],f=[],p=(e,t)=>o[Math.min(Math.max(t,0),i-1)*i+Math.min(Math.max(e,0),i-1)],m=(t,n,r=0)=>{let i=e.x(t),o=e.x(n);u.push(i,p(t,n)-k(i,o)-r,o);let s=(p(t+1,n)-p(t-1,n))/(2*a),c=(p(t,n+1)-p(t,n-1))/(2*a),l=Math.hypot(s,1,c);return d.push(-s/l,1/l,-c/l),u.length/3-1},h=(n,r,i,a)=>t>0&&Math.max(Math.abs(e.x(n)),Math.abs(e.x(i)))<=t+.001&&Math.max(Math.abs(e.x(r)),Math.abs(e.x(a)))<=t+.001;for(let r=0;r<l;r++)for(let i=0;i<l;i++){let a=e.stride[r*l+i],o=i*c,s=r*c,d=c/a;if(h(o,s,o+c,s+c))continue;let p=u.length/3;for(let e=0;e<=d;e++)for(let t=0;t<=d;t++)m(o+t*a,s+e*a);let g=(e,t)=>p+t*(d+1)+e;for(let e=0;e<d;e++)for(let t=0;t<d;t++){if(h(o+t*a,s+e*a,o+(t+1)*a,s+(e+1)*a))continue;let n=g(t,e),r=g(t+1,e),i=g(t,e+1),c=g(t+1,e+1);f.push(n,i,r,r,i,c)}if(!n)continue;let _=[[e=>[e,0]],[e=>[e,d]],[e=>[0,e]],[e=>[d,e]]];for(let[r]of _){let[i,c]=r(0),[l,u]=r(d),p=[(e.x(o+i*a)+e.x(o+l*a))/2,(e.x(s+c*a)+e.x(s+u*a))/2];if(t>0&&Math.max(Math.abs(p[0]),Math.abs(p[1]))<t)continue;let h=[],_=[];for(let e=0;e<=d;e++){let[t,i]=r(e);h.push(g(t,i)),_.push(m(o+t*a,s+i*a,n))}for(let e=0;e<d;e++)f.push(h[e],_[e],h[e+1],h[e+1],_[e],_[e+1],h[e],h[e+1],_[e],h[e+1],_[e+1],_[e])}}let _=new g;return _.setAttribute(`position`,new s(u,3)),_.setAttribute(`normal`,new s(d,3)),_.setIndex(new r(new Uint32Array(f),1)),_.computeBoundingSphere(),_.computeBoundingBox(),_}function F(e,t,r,i,s=2,c=e){let u=new Uint8Array(t*r*4),f=(e,n,i)=>e[Math.min(Math.max(i,0),r-1)*t+Math.min(Math.max(n,0),t-1)],p=(e,t,n)=>((f(c,e+n,t)+f(c,e-n,t)+f(c,e,t+n)+f(c,e,t-n))/4-f(c,e,t))/(n*i);for(let n=0;n<r;n++)for(let r=0;r<t;r++){let a=(f(e,r+1,n)-f(e,r-1,n))/(2*i),o=(f(e,r,n+1)-f(e,r,n-1))/(2*i),c=Math.hypot(a,1,o),l=(n*t+r)*4;u[l]=Math.round((-a/c*.5+.5)*255),u[l+1]=Math.round((-o/c*.5+.5)*255),u[l+2]=Math.round(Math.min(Math.max(.5+p(r,n,s)*2.5,0),1)*255),u[l+3]=Math.round(Math.min(Math.max(.5+p(r,n,1)*2,0),1)*255)}let h=new m(u,t,r,n,o);return h.wrapS=h.wrapT=d,h.magFilter=l,h.minFilter=a,h.generateMipmaps=!0,h.anisotropy=8,h.needsUpdate=!0,h}var I=(e,t=2)=>F(e.h,e.n,e.n,e.sp,t,e.natural||e.h);function ne(e=256){let t=new Uint8Array(e*e*4),r=e=>{let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296};for(let n=0;n<4;n++){let i=new Float32Array(e*e),a=1,o=0;for(let t=0;t<5;t++){let s=4<<t,c=r(1234+n*97+t*13),l=new Float32Array(s*s).map(()=>c());for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=n/e*s,o=t/e*s,c=Math.floor(r),u=Math.floor(o),d=r-c,f=o-u;d=d*d*(3-2*d),f=f*f*(3-2*f);let p=(e,t)=>l[t%s*s+e%s],m=(p(c,u)*(1-d)+p(c+1,u)*d)*(1-f)+(p(c,u+1)*(1-d)+p(c+1,u+1)*d)*f;i[t*e+n]+=m*a}o+=a,a*=.5}let s=1/0,c=-1/0;for(let e of i)s=Math.min(s,e),c=Math.max(c,e);for(let r=0;r<e*e;r++)t[r*4+n]=Math.round((i[r]-s)/(c-s)*255)}let i=new m(t,e,e,n);return i.wrapS=i.wrapT=f,i.magFilter=l,i.minFilter=a,i.generateMipmaps=!0,i.needsUpdate=!0,i}async function re(e){let[n,r,i,a]=await Promise.all([t(`dry_ground_rocks`,{tile:1}),t(`sparse_grass`,{tile:1}),t(`aerial_rocks_02`,{tile:1}),t(`snow_02`,{tile:1})]);return{uniforms:{uOrigin:{value:e},tNoise:{value:ne()},tDirt:{value:n.map},tDirtN:{value:n.normalMap},tGrass:{value:r.map},tRock:{value:i.map},tRockN:{value:i.normalMap},tSnow:{value:a.map}}}}var ie=`
uniform float uOrigin;
varying vec3 vWPos;
varying float vElev;
`,ae=`
vec4 tw = modelMatrix * vec4(transformed, 1.0);
vWPos = tw.xyz;
vElev = tw.y + uOrigin + dot(tw.xz, tw.xz) * ${O.toExponential(6)};
`,L=`
uniform float uOrigin;
uniform sampler2D tNrm; uniform float uHalf, uSp, uN;
uniform sampler2D tDet; uniform vec2 uDetMin, uDetN; uniform float uDetSp, uUseDet;
uniform sampler2D tImg, tImgD; uniform vec4 uImgRect; uniform float uImgW, uImgGain; uniform vec4 uSite[3];
uniform sampler2D tNoise, tDirt, tDirtN, tGrass, tRock, tRockN, tSnow;
varying vec3 vWPos;
varying float vElev;
vec3 tNw; float tCurv, tCurvF;
// avg linear albedo of each detail texture (normalize detail → macro colour drives the look)
const vec3 AVG_DIRT = vec3(0.3017, 0.1744, 0.0776);
const vec3 AVG_GRASS = vec3(0.0794, 0.0476, 0.0077);
const vec3 AVG_ROCK = vec3(0.1647, 0.1158, 0.0461);
const vec3 AVG_SNOW = vec3(0.3783, 0.3779, 0.388);
vec3 srgb(vec3 c) { return pow(c / 255.0, vec3(2.2)); }
vec3 det(sampler2D t, vec2 p, float s, vec3 avg) {
  vec3 a = texture2D(t, p / s).rgb, b = texture2D(t, p / (s * 4.37) + 0.31).rgb;
  return clamp(mix(a, b, 0.4) / avg, 0.0, 2.5);
}
`,R=`
vec2 wp = vWPos.xz;
float dist = length(vWPos - cameraPosition);
vec4 nt = texture2D(tNrm, ((wp + uHalf) / uSp + 0.5) / uN);
float detMask = 0.0;
if (uUseDet > 0.5) {
  vec2 duv = ((wp - uDetMin) / uDetSp + 0.5) / uDetN;
  detMask = smoothstep(0.0, 0.03, duv.x) * smoothstep(1.0, 0.97, duv.x) * smoothstep(0.0, 0.03, duv.y) * smoothstep(1.0, 0.97, duv.y);
  if (detMask > 0.0) nt = mix(nt, texture2D(tDet, duv), detMask);
}
vec2 nxz = nt.rg * 2.0 - 1.0;
tNw = normalize(vec3(nxz.x, sqrt(max(1.0 - dot(nxz, nxz), 0.0)), nxz.y));
tCurv = nt.b - 0.5;      // ~128 m scale: valleys/gullies (+) vs ridges (−)
tCurvF = nt.a - 0.5;     // finest data scale: couloirs, rib ridges
float slope = 1.0 - tNw.y;                     // 0 flat … ~0.3 at 45°
float north = -tNw.z;                          // + = north-facing
float e = vElev;
// surfaces facing the camera keep fine noise much further (no grazing-angle moiré)
float facing = abs(dot(tNw, normalize(cameraPosition - vWPos)));
// rotated multi-scale noise (rotations + odd ratios hide the texture lattice/tiling)
const mat2 R1 = mat2(0.8, -0.6, 0.6, 0.8);
const mat2 R2 = mat2(0.39, 0.92, -0.92, 0.39);
vec4 nA = texture2D(tNoise, (R1 * wp) / 5300.0);
vec4 nB = texture2D(tNoise, (R2 * wp) / 1130.0 + 0.37);
float fC = 1.0 - smoothstep(mix(900.0, 9000.0, facing), mix(3500.0, 32000.0, facing), dist);
vec4 nC = mix(vec4(0.5), texture2D(tNoise, (R1 * wp) / 173.0 + 0.71), fC);
vec4 nD = mix(vec4(0.5), texture2D(tNoise, (R2 * wp) / 29.0 + 0.13), 1.0 - smoothstep(200.0, 900.0, dist));
float fineFade = 1.0 - smoothstep(mix(1500.0, 9000.0, facing), mix(6000.0, 32000.0, facing), dist);
vec4 nF4 = mix(vec4(0.5), texture2D(tNoise, (R1 * wp) / 41.0 + 0.5), fineFade);
vec4 nG4 = mix(vec4(0.5), texture2D(tNoise, (R2 * wp) / 67.0 + 0.21), fineFade);
float detailFade = 1.0 - smoothstep(60.0, 700.0, dist);

// ── valley: golden bunchgrass, grey-green sagebrush, sandy soil
vec3 cStraw = srgb(vec3(174., 153., 110.));
vec3 cSage  = srgb(vec3(112., 115., 94.));
vec3 cSoil  = srgb(vec3(170., 146., 116.));
vec4 nB2 = texture2D(tNoise, (R1 * wp) / 1730.0 + 0.53);
float sageMix = clamp((nB.r - 0.5) * 1.0 + (nB2.g - 0.5) * 1.0 + (nC.g - 0.5) * 0.8 + (nA.a - 0.5) * 1.0 + 0.45, 0.0, 1.0);
vec3 valley = mix(cStraw, cSage, sageMix * 0.7);
valley = mix(valley, cSoil, clamp((nC.b - 0.55) * 2.5, 0.0, 1.0) * 0.5);
valley *= 0.92 + 0.16 * nA.g;
// green-up along drainages (concave natural ground) — willows / irrigated hay meadows
float wet = smoothstep(0.03, 0.14, tCurv) * (1.0 - smoothstep(2600.0, 2750.0, e)) * smoothstep(0.35, 0.6, nB.g);
valley = mix(valley, srgb(vec3(98., 108., 66.)), wet * 0.6);
// near detail
vec3 dtMod = vec3(1.0);
if (detailFade > 0.0) {
  vec3 dd = det(tDirt, wp, 4.0, AVG_DIRT), dg = det(tGrass, wp, 2.2, AVG_GRASS);
  float gm = smoothstep(0.3, 0.6, nD.r * 0.5 + nC.r * 0.5);
  vec3 dt = mix(dd, dg, gm * 0.7);
  dtMod = mix(vec3(1.0), dt, detailFade * 0.85);
  valley *= dtMod;
}

// ── montane: dense spruce-fir / lodgepole on the mid slopes, aspen patches, meadows
float shelter = clamp(tCurv * 0.7 + tCurvF * 0.5, -0.25, 0.25);  // hollows (+) vs ribs/ridges (−)
float treeline = 3560.0 + (nB.g - 0.5) * 150.0 + north * 80.0 + clamp(shelter, -0.3, 0.3) * 260.0 + (nC.r - 0.5) * 90.0;
float forestLow = 2700.0 + (nB.b - 0.5) * 220.0 - north * 200.0 - clamp(shelter, 0.0, 0.3) * 250.0;
float band = smoothstep(forestLow - 70.0, forestLow + 110.0, e) * (1.0 - smoothstep(treeline - 90.0, treeline + 25.0, e));
float forest = band;
forest *= 1.0 - smoothstep(0.30, 0.48, slope - clamp(shelter, -0.2, 0.2) * 0.3);   // cliffs, avalanche ribs bare
forest *= clamp(1.05 + north * 0.4 + shelter * 1.2 + (nC.a - 0.5) * 0.7 + (nB.r - 0.5) * 0.35, 0.0, 1.0);
float meadow = smoothstep(0.7, 0.84, nB.r * 0.7 + nC.a * 0.3) * (1.0 - smoothstep(0.05, 0.16, slope));
forest *= 1.0 - meadow * 0.85;
// pinyon-juniper / ponderosa savanna on the foothills: partial cover
float pj = smoothstep(2470.0, 2650.0, e) * (1.0 - band) * clamp(0.38 + north * 0.35 + shelter * 0.35 + (nB.b - 0.5) * 0.5 + (nC.r - 0.5) * 0.4, 0.0, 0.85);
// valley-floor ponderosa/juniper groves beyond the instanced-tree area (fade in 850–1100 m)
float instR = length(wp - vec2(95.0, -50.0));
float groveMask = smoothstep(0.5, 0.7, nA.b * 0.7 + nA.r * 0.3);
float grove = smoothstep(0.58, 0.82, nB.b * 0.5 + nC.a * 0.3 + nG4.r * 0.2) * groveMask * 0.42 + 0.025;
pj = max(pj, grove * (1.0 - smoothstep(2500.0, 2650.0, e)) * smoothstep(850.0, 1100.0, instR) * (1.0 - wet));
vec3 cConifer = srgb(vec3(26., 39., 30.)) * (0.85 + 0.3 * nB.a) * (1.0 - clamp(tCurv * 2.0, 0.0, 0.25));
vec3 cAspen = srgb(vec3(66., 82., 44.));
float aspen = smoothstep(0.7, 0.84, nB.a) * smoothstep(2700.0, 2900.0, e) * (1.0 - smoothstep(3150.0, 3300.0, e)) * (1.0 - smoothstep(0.0, 0.3, north));
vec3 cForest = mix(cConifer, cAspen, aspen * 0.75);
vec3 cMeadow = srgb(vec3(116., 112., 86.));

// ── alpine: tundra → talus / rock, snow in north-facing couloirs near the summits
vec3 cTundra = srgb(vec3(122., 112., 84.));
vec3 cRock = srgb(vec3(118., 110., 102.)) * (0.82 + 0.36 * nC.g);
vec3 cTalus = srgb(vec3(158., 150., 140.));
float alpine = smoothstep(treeline - 30.0, treeline + 110.0, e);
float rockAmt = smoothstep(0.17, 0.33, slope) + smoothstep(3760.0, 4000.0, e + (nB.r - 0.5) * 200.0) * 0.75 + max(-shelter, 0.0) * 1.5 * alpine;
rockAmt = clamp(rockAmt, 0.0, 1.0);
// talus fans collect in hollows below cliffs; exposed ribs are darker solid rock
vec3 rockC = mix(cRock, cTalus, clamp(smoothstep(0.35, 0.7, nC.b) * 0.6 + shelter * 1.5, 0.0, 1.0) * (1.0 - smoothstep(0.28, 0.42, slope)));
if (detailFade > 0.0) rockC *= mix(vec3(1.0), det(tRock, wp, 9.0, AVG_ROCK), detailFade * 0.8);

vec3 col = valley;
col = mix(col, cMeadow, smoothstep(2520.0, 2800.0, e) * (1.0 - alpine) * 0.85);
// individual crowns: threshold noise + real fine curvature by density (antialiased)
float dens = clamp(max(forest * 1.2, pj), 0.0, 1.0);
float nF = 0.5 + (nF4.a * 0.5 + nG4.b * 0.5 - 0.5) + clamp(tCurvF, -0.2, 0.2) * 1.2 * (1.0 - detailFade);
float fw = clamp(fwidth(nF) * 1.5, 0.03, 0.45);
float trees = smoothstep(1.0 - dens - fw, 1.0 - dens + fw, nF);
vec3 floorC = mix(col, srgb(vec3(92., 92., 72.)), smoothstep(0.1, 0.5, dens) * 0.75);
col = mix(floorC, cForest * (0.8 + 0.5 * nF4.b), trees);
col = mix(col, cTundra, alpine * (1.0 - trees));
col = mix(col, rockC, clamp(rockAmt * (alpine * 0.9 + 0.1) + smoothstep(0.34, 0.5, slope) * (1.0 - trees), 0.0, 1.0));
// curvature shading: ribs catch light, gullies hold shadow (reads at 10–20 km)
float mtn = smoothstep(2650.0, 2900.0, e);
col *= 1.0 + clamp(-tCurvF * 1.2 - tCurv * 0.5, -0.2, 0.16) * mtn;

// ── real aerial imagery (USDA NAIP) as albedo, de-lit with the DEM, procedural detail on top
if (uImgW > 0.0) {
  vec2 iuv = (wp - uImgRect.xy) / (uImgRect.zw - uImgRect.xy);
  vec3 img = texture2D(tImg, iuv).rgb;
  vec3 imgB = texture2D(tImg, iuv, 5.0).rgb;            // ~20 m blur: tone only (inside the site)
  if (uUseDet > 0.5 && detMask > 0.0) {
    vec2 duvI = (wp - uDetMin) / ((uDetN - 1.0) * uDetSp);
    img = mix(img, texture2D(tImgD, duvI).rgb, detMask);
    imgB = mix(imgB, texture2D(tImgD, duvI, 3.0).rgb, detMask);
  }
  // de-light: remove the acquisition-time sun shading (NAIP, ~10:30 MDT late Sept, sun SSE ~45°)
  const vec3 LACQ = vec3(0.36, 0.72, 0.59);
  float sAcq = (0.4 + 0.6 * max(dot(tNw, normalize(LACQ)), 0.0)) / (0.4 + 0.6 * normalize(LACQ).y);
  float dl = clamp(mix(1.0, sAcq, 0.85), 0.45, 1.8);
  img = img / dl * uImgGain; imgB = imgB / dl * uImgGain;
  // keep our own surfaces inside the graded site: imagery tone (no old dirt tracks) × procedural ground
  float sd = 1e9;
  for (int i = 0; i < 3; i++) {
    vec4 r = uSite[i]; vec2 dd2 = max(r.xy - wp, wp - r.zw);
    sd = min(sd, length(max(dd2, 0.0)) + min(max(dd2.x, dd2.y), 0.0));
  }
  float inSite = 1.0 - smoothstep(-6.0, 26.0, sd);
  vec3 siteC = imgB * (0.9 + 0.2 * sageMix) * dtMod;
  vec3 imgC = mix(img * dtMod, siteC, inSite);
  col = mix(col, imgC, uImgW);
  rockAmt *= 0.5;
}

// snow: high, north/east-facing couloirs and summit hollows; late-summer remnants
float snowLine = 3880.0 + (nB.g - 0.5) * 200.0 - north * 200.0;
float snow = smoothstep(snowLine, snowLine + 110.0, e);
snow *= smoothstep(-0.1, 0.3, north + shelter * 1.5);
snow *= smoothstep(0.0, 0.1, shelter + (nC.r - 0.5) * 0.12);
snow *= 1.0 - smoothstep(0.42, 0.58, slope);
snow = clamp(snow * 1.8, 0.0, 1.0);
vec3 cSnow = srgb(vec3(236., 240., 246.));
if (detailFade > 0.0) cSnow *= mix(vec3(1.0), det(tSnow, wp, 6.0, AVG_SNOW), detailFade);
col = mix(col, cSnow, snow * (uImgW > 0.0 ? 0.55 : 1.0));

// county road painted onto the coarse levels (geometry covers it in the near patch)
float road = 1.0 - smoothstep(ROAD_HALF - 0.6, ROAD_HALF + 0.6, abs(wp.x - ROAD_X));
road *= 1.0 - smoothstep(6000.0, 9000.0, abs(wp.y));
col = mix(col, srgb(vec3(62., 63., 64.)), road);

diffuseColor.rgb = col;
float tRough = mix(0.97, 0.9, rockAmt * alpine) - snow * 0.35;
`,z=`
{
  vec3 nw = tNw;
  {
    // procedural micro-relief (finer than the heightmap) at mid range
    float relief = (1.0 - smoothstep(2500.0, 12000.0, dist)) * (0.3 + rockAmt * 0.7) * smoothstep(0.04, 0.14, slope) * (1.0 - detMask * 0.6);
    if (relief > 0.0) {
      vec2 q = (R1 * wp) / 173.0 + 0.71; float h0 = texture2D(tNoise, q).g;
      float hx = texture2D(tNoise, q + vec2(0.004, 0.0)).g, hz = texture2D(tNoise, q + vec2(0.0, 0.004)).g;
      vec2 gq = vec2(hx - h0, hz - h0) / 0.004 / 173.0 * 40.0;   // ~40 m amplitude
      gq = gq * R1;                                                // back to world xz
      nw = normalize(nw - vec3(gq.x, 0.0, gq.y) * relief);
    }
  }
  if (detailFade > 0.0) {
    vec3 dn = texture2D(tDirtN, wp / 4.0).xyz * 2.0 - 1.0;
    vec3 rn = texture2D(tRockN, wp / 9.0).xyz * 2.0 - 1.0;
    vec3 pn = mix(dn, rn, clamp(rockAmt, 0.0, 1.0));
    nw = normalize(nw + vec3(pn.x, 0.0, -pn.y) * 0.55 * detailFade);
  }
  normal = normalize((viewMatrix * vec4(nw, 0.0)).xyz);
}
`;function B(e,{normalTex:t,half:n,sp:r,n:i,det:a=null,img:o=null,imgDet:s=null,site:c=[]}){let l=new _({color:16777215,roughness:.95,metalness:0});return l.onBeforeCompile=l=>{Object.assign(l.uniforms,e.uniforms,{tNrm:{value:t},uHalf:{value:n},uSp:{value:r},uN:{value:i},tDet:{value:a?a.tex:t},uUseDet:{value:+!!a},uDetMin:{value:new v(a?a.rect[0]:0,a?a.rect[1]:0)},uDetSp:{value:a?a.spacing:1},uDetN:{value:new v(a?a.nx:1,a?a.nz:1)},tImg:{value:o?o.tex:t},uImgRect:{value:new h(...o?o.rect:[0,0,1,1])},tImgD:{value:s?s.tex:t},uImgW:{value:+!!o},uImgGain:{value:1.12},uSite:{value:[0,1,2].map(e=>new h(...c[e]||[1e7,1e7,1e7,1e7]))}}),l.defines={...l.defines||{},ROAD_X:300 .toFixed(1),ROAD_HALF:w.toFixed(1)},l.vertexShader=l.vertexShader.replace(`#include <common>`,`#include <common>\n${ie}`).replace(`#include <begin_vertex>`,`#include <begin_vertex>\n${ae}`),l.fragmentShader=l.fragmentShader.replace(`#include <common>`,`#include <common>\n${L}`).replace(`#include <map_fragment>`,R).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = tRough;`).replace(`#include <normal_fragment_maps>`,z).replace(`#include <fog_fragment>`,`
        #ifdef USE_FOG
        { float hz = 1.0 - exp(-length(vWPos - cameraPosition) / 55000.0);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor * 0.85, hz * 0.8); }
        #endif
        #include <fog_fragment>`)},l.customProgramCacheKey=()=>`fw-terrain-v14`,l}var V={plastic:0,glass:.25,chrome:.5,lamp:.75};function H(e,t,n,i=0){e=e.index?e.toNonIndexed():e;for(let t of Object.keys(e.attributes))[`position`,`normal`].includes(t)||e.deleteAttribute(t);let a=e.attributes.position.count,o=new Float32Array(a*3),s=new Float32Array(a*2);for(let e=0;e<a;e++)o.set(t,e*3),s[e*2]=i,s[e*2+1]=n;return e.setAttribute(`tcol`,new r(o,3)),e.setAttribute(`pg`,new r(s,2)),e}function U(e){e=e.index?e.toNonIndexed():e;let t=e.attributes.position,n=e.attributes.normal;for(let e=0;e<t.count;e+=3)for(let r of[t,n]){let t=[r.getX(e+1),r.getY(e+1),r.getZ(e+1)];r.setXYZ(e+1,r.getX(e+2),r.getY(e+2),r.getZ(e+2)),r.setXYZ(e+2,...t)}for(let e=0;e<n.count;e++)n.setXYZ(e,-n.getX(e),-n.getY(e),-n.getZ(e));return e}var W=(e,t,n,r,i,a,o,s=V.plastic,l=0)=>{let u=new c(e,t,n);return u.translate(r,i,a),H(u,o,s,l)},G=(e,t)=>{if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++)if(t<=e[n][0]){let[r,i]=e[n-1],[a,o]=e[n];return i+(o-i)*(t-r)/(a-r)}return e[e.length-1][1]},K=(e,t,n)=>{let r=Math.min(Math.max((n-e)/(t-e),0),1);return r*r*(3-2*r)};function q(e){let t=e.length,n=[],r=Array(t).fill(0);for(let r=0;r<t-1;r++)n.push((e[r+1][1]-e[r][1])/(e[r+1][0]-e[r][0]));r[0]=n[0],r[t-1]=n[t-2];for(let i=1;i<t-1;i++){if(n[i-1]*n[i]<=0)continue;let t=e[i][0]-e[i-1][0],a=e[i+1][0]-e[i][0],o=2*a+t,s=a+2*t;r[i]=(o+s)/(o/n[i-1]+s/n[i])}return n=>{if(n<=e[0][0])return e[0][1];let i=1;for(;i<t-1&&n>e[i][0];)i++;let[a,o]=e[i-1],[s,c]=e[i],l=s-a,u=Math.min(1,(n-a)/l),d=u*u,f=d*u;return(2*f-3*d+1)*o+(f-2*d+u)*l*r[i-1]+(-2*f+3*d)*c+(f-d)*l*r[i]}}var J=(e,t,n)=>{let r=Math.max(n-Math.abs(e-t),0)/n;return Math.min(e,t)-r*r*n*.25},Y={sedan:{L:4.76,hw:.91,wr:.33,wx:1.43,yb0:.3,belt:.97,cab:[-1.42,1.1],bpillar:-.2,clad:0,weight:.24,top:[[-2.38,.72],[-2.33,.9],[-2.1,.97],[-1.42,1],[-.8,1.41],[.3,1.44],[1.08,1],[1.6,.92],[2.22,.82],[2.38,.62]]},hatch:{L:4.25,hw:.89,wr:.32,wx:1.3,yb0:.3,belt:.98,cab:[-1.98,1],bpillar:-.45,clad:0,weight:.16,top:[[-2.12,.78],[-2.1,1.02],[-1.98,1.36],[-1.62,1.45],[.3,1.47],[1,1],[1.55,.9],[2.02,.8],[2.12,.6]]},cuv:{L:4.55,hw:.92,wr:.35,wx:1.35,yb0:.34,belt:1.03,cab:[-2.05,1.2],bpillar:-.3,clad:.13,weight:.24,top:[[-2.27,.88],[-2.24,1.08],[-2.05,1.5],[-1.7,1.57],[.45,1.6],[1.2,1.04],[1.75,.97],[2.18,.86],[2.27,.64]],rails:!0},suv:{L:4.85,hw:.97,wr:.38,wx:1.45,yb0:.38,belt:1.1,cab:[-2.25,1.25],bpillar:-.3,clad:.15,weight:.18,top:[[-2.42,.94],[-2.39,1.12],[-2.25,1.72],[.5,1.78],[1.25,1.12],[1.85,1.06],[2.32,.96],[2.42,.72]],rails:!0},pickup:{L:5.6,hw:.99,wr:.4,wx:1.75,yb0:.46,belt:1.22,cab:[-.82,1.2],bpillar:-.1,clad:.08,weight:.18,bed:[-2.78,-.86],top:[[-2.8,1.1],[-2.76,1.23],[-.86,1.23],[-.82,1.86],[.55,1.9],[1.2,1.24],[1.95,1.17],[2.66,1.06],[2.8,.8]]}},X=e=>e.wr+.075;function oe(e,t){let n=X(e),r=Math.abs(t)-e.wx;return Math.abs(r)<n?e.wr+Math.sqrt(n*n-r*r):-1}function Z(e,t){let n=e.L/2,r=X(e),i=t?.2:.035,a=t?.45:.19,o=t?.13:.06,c=t?t=>G(e.top,t):q(e.top),l=t=>Math.abs(Math.abs(t)-e.wx)<r+.1,u=[];for(let e=-n;e<n-1e-6;e+=Math.abs(e)>n-.4?i:l(e)?o:a)u.push(e);u.push(n,-e.wx-r,-e.wx+r,e.wx-r,e.wx+r,e.bpillar-.07,e.bpillar+.07),u.sort((e,t)=>e-t),u=u.filter((e,t)=>t===0||e-u[t-1]>.015);let d=[],f=[],p=0,m=r=>{let i=e.yb0+.1*K(n-.45,n,Math.abs(r)),a=c(r),o=e.hw*(1-.06*(Math.abs(r)/n)**4);o*=.7+.3*Math.sqrt(Math.max(0,1-(Math.max(0,Math.abs(r)-(n-.38))/.38)**2));let s=r>e.cab[0]&&r<e.cab[1]&&a>e.belt+.05,l=t?Math.min(e.belt,a-.03):J(e.belt,a-.03,.12),u=Math.max(l-i,.05),d=t?Math.min(e.belt+.03,a):J(e.belt+.03,a,.12),f=[[0,i-.02],[.82*o,i],[.95*o,i+Math.min(.05,.12*u)],[.995*o,i+Math.min(.17,.35*u)],[o,i+Math.min(.3,.55*u)],[o,i+.75*u],[.985*o,l-Math.min(.07,.12*u)],[.955*o,l],[.87*o,d],[.72*o,Math.max(d,a-.07)],[.6*o,Math.max(d,a-.01)],[0,a+.015]],p=oe(e,r);if(p>0)for(let e=1;e<=5;e++)f[e][1]=Math.max(f[e][1],Math.min(p,f[6][1]-.03));let m=f;if(!t){let e=[[-f[1][0],f[1][1]],...f,[-f[10][0],f[10][1]]];m=[];for(let t=0;t<f.length-1;t++){let[n,r,i,a]=[e[t],e[t+1],e[t+2],e[t+3]],o=[0,1].map(e=>Math.min(Math.max((-n[e]+9*r[e]+9*i[e]-a[e])/16,Math.min(r[e],i[e])),Math.max(r[e],i[e])));m.push(r,o)}m.push(f[f.length-1])}return{ringPts:[...m,...m.slice(1,-1).reverse().map(([e,t])=>[-e,t])],yt:a,cab:s,back:r<e.cab[0]&&a>e.belt+.1}};for(let e of u){let{ringPts:t,yt:n,cab:r,back:i}=m(e);p=t.length,f.push({ring:t.map(([t,n])=>(d.push(e,n,t),d.length/3-1)),x:e,yt:n,cab:r,back:i})}let h=t?1:2,_=11*h,v=e=>e<=_?e:p-e,y=[],b=[],x=e=>{let t=f[Math.max(e-1,0)],n=f[Math.min(e+1,f.length-1)];return(n.yt-t.yt)/Math.max(n.x-t.x,.001)};if(!t){let e=f.findIndex((e,t)=>t<f.length-1&&e.back&&f[t+1].back&&Math.abs(x(t))>.35);if(e>0&&e<f.length-1){let t=f[e],n=e=>[d[t.ring[e]*3+1],d[t.ring[e]*3+2]],[r]=n(_),[i,a]=n(_-h),o=(r-i)/Math.max(a*a,1e-4);for(let n=_-2*h;n<_;n++){if(n===_-h)continue;let i=e=>{let[t,i]=m(e).ringPts[n];return i-(r-o*t*t)},a=f[e-1].x,s=f[e+1].x;if(!(i(t.x)<0&&i(s)>0))continue;a=t.x;for(let e=0;e<30;e++){let e=(a+s)/2;i(e)<0?a=e:s=e}let[c,l]=m(s).ringPts[n];for(let[e,r]of[[n,1],[p-n,-1]]){let n=t.ring[e];d[n*3]=s,d[n*3+1]=l,d[n*3+2]=r*c}}}}for(let t=0;t<f.length-1;t++)for(let n=0;n<p;n++){let r=f[t],i=f[t+1],a=(n+1)%p,o=r.ring[n],s=i.ring[n],c=i.ring[a],l=r.ring[a];y.push(o,s,l,s,c,l);let u=(r.x+i.x)/2,d=r.cab&&i.cab,m=Math.floor(Math.min(v(n),v(a))/h),g=Math.abs(x(t))>.35,_=0;d&&m===8?_=Math.abs(u-e.bpillar)>.07?1:2:d&&m===7?_=2:(d&&(m===9||m===10)&&g||r.back&&i.back&&(m===9||m===10)&&g)&&(_=1),b.push(_,_)}for(let[e,n]of[[0,-1],[f.length-1,1]]){let r=f[e],i=(d[r.ring[0]*3+1]+r.yt)/2,a=r.ring;for(let e of t?[]:[.72,.4]){let t=a.map((t,a)=>{let o=d[r.ring[a]*3+2],s=d[r.ring[a]*3+1];return d.push(r.x+n*.05*(1-e*e),i+(s-i)*e,o*e),d.length/3-1});for(let e=0;e<p;e++){let r=(e+1)%p,i=a[e],o=a[r],s=t[e],c=t[r];n>0?y.push(s,o,i,s,c,o):y.push(s,i,o,s,o,c),b.push(0,0)}a=t}let o=d.length/3;d.push(r.x+n*.05,i,0);for(let e=0;e<p;e++){let t=a[e],r=a[(e+1)%p];n>0?y.push(o,r,t):y.push(o,t,r),b.push(0)}}let S=new g;S.setAttribute(`position`,new s(d,3)),S.setIndex(y),S.computeVertexNormals();let C=e=>{let t=[],n=[],r=S.attributes.position,i=S.attributes.normal;for(let a=0;a<y.length/3;a++)if(b[a]===e)for(let e=0;e<3;e++){let o=y[a*3+e];t.push(r.getX(o),r.getY(o),r.getZ(o)),n.push(i.getX(o),i.getY(o),i.getZ(o))}let a=new g;return a.setAttribute(`position`,new s(t,3)),a.setAttribute(`normal`,new s(n,3)),a};return{body:C(0),glass:C(1),trim:C(2)}}function se(t,n){let{wr:r,hw:a}=t,o=[],s=[.03,.03,.032],l=[.5,.51,.53],d=[.04,.04,.045],f=[.012,.012,.013],m=X(t);if(n){let t=new p(r,r,.22,10);t.rotateX(Math.PI/2),t.translate(0,r,0),o.push(H(t,s,V.plastic));let n=new i(r*.62,10);n.translate(0,r,.112),o.push(H(n,l,V.chrome));let a=new i(m,8,0,Math.PI);return a.translate(0,r,-.12),o.push(H(a,f,V.plastic)),e(o)}let h=new p(m+.01,m+.01,.42,24,1,!0,Math.PI/2,Math.PI);h.rotateX(Math.PI/2),h.translate(0,r,-.09),o.push(H(U(h),f,V.plastic));let g=r,_=r*.66,y=.115,b=[[_,-.115*.9],[g-.045,-.115],[g-.008,-.115*.75],[g,-.0345],[g,y*.3],[g-.008,y*.75],[g-.045,y],[_,y*.9]].map(([e,t])=>new v(e,t)),S=new u(b,30);S.rotateX(Math.PI/2),S.translate(0,r,0),o.push(H(S,s,V.plastic));let C=new i(_,28);C.translate(0,r,.036250000000000004),o.push(H(C,d,V.plastic));let w=new x(_*.88,_,30);w.translate(0,r,.08625000000000001),o.push(H(w,l,V.chrome));let T=[];for(let e=0;e<5;e++)for(let t of[-.11,.11]){let n=new c(_*.8,.032,.03);n.translate(_*.44,0,0),n.rotateZ(e/5*Math.PI*2+t),T.push(n)}let E=e(T);E.translate(0,r,.07225000000000001),o.push(H(E,l,V.chrome));let D=new p(_*.2,_*.24,.05,16);return D.rotateX(Math.PI/2),D.translate(0,r,.07625000000000001),o.push(H(D,l,V.chrome)),e(o)}function Q(t,n){let r=Y[t],i=r.L/2,a=r.hw*2,{body:o,glass:s,trim:c}=Z(r,n),l=[H(o,[1,1,1],V.plastic,1),H(s,[.012,.014,.016],V.glass),H(c,[.018,.018,.02],V.lamp)],u=[.03,.03,.032],d=[.8,.8,.76],f=se(r,n);for(let e of[-1,1])for(let t of[-1,1]){let n=f.clone();t<0&&n.rotateY(Math.PI),l.push(n.translate(e*r.wx,0,t*(r.hw-.13)))}for(let e of[-1,1]){let t=r.cab[1]-.2,i=r.belt+.08;if(n)l.push(W(.16,.1,.13,t,i,e*(r.hw+.03),[1,1,1],V.plastic,1));else{let n=new y(1,14,10);n.scale(.085,.055,.075),n.translate(t,i,e*(r.hw+.035)),l.push(H(n,[1,1,1],V.plastic,1))}n||(l.push(W(.07,.035,.08,t+.04,i-.05,e*(r.hw-.03),u)),l.push(W(.17,.028,.014,r.bpillar-.38,r.belt-.13,e*(r.hw+.004),[1,1,1],V.plastic,1)),l.push(W(.17,.028,.014,r.bpillar+.48,r.belt-.13,e*(r.hw+.004),[1,1,1],V.plastic,1)),r.rails&&l.push(W(r.L*.42,.035,.035,-.35,G(r.top,-.35)+.04,e*r.hw*.52,u)))}if(!n&&(l.push(W(.03,.12,.5,-i-.01,r.yb0+.3,0,d)),l.push(W(.03,.12,.5,i+.02,r.yb0+.17,0,d)),r.bed)){for(let e of[-1,1])l.push(W(r.bed[1]-r.bed[0],.04,.08,(r.bed[0]+r.bed[1])/2,1.245,e*(r.hw*.62),u));l.push(W(.02,.4,a*.7,r.bed[0]+.03,.95,0,u))}l.push(W(r.L-1.2,.16,a-.6,0,r.yb0,0,u));let p=e(l);return p.computeBoundingSphere(),p}function ce(e){let t=new b({color:16777215,roughness:.4,metalness:.2,clearcoat:1,clearcoatRoughness:.09}),n=e.L/2,r=X(e),i=e.bed?e.cab[0]+.03:-e.wx+r+.06,a={uC0:{value:new h(n,e.yb0+.4,e.yb0+.5,e.belt)},uC1:{value:new h(e.cab[1]-.06,e.bpillar,i,e.hw)},uC2:{value:new h(e.yb0,e.clad,e.wx,r)}};return t.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec3 tcol; attribute vec2 pg; varying vec3 vTCol; varying vec2 vPG; varying vec3 vCarP; varying vec3 vCarN; varying vec3 vCarV;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vTCol = tcol; vPG = pg; vCarP = position; vCarN = normal;
#ifdef USE_INSTANCING
  mat4 cM = modelMatrix * instanceMatrix;
#else
  mat4 cM = modelMatrix;
#endif
vCarV = transpose( mat3( cM ) ) * ( cameraPosition - ( cM * vec4( position, 1.0 ) ).xyz );   // to the eye, car frame`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vTCol; varying vec2 vPG; varying vec3 vCarP; varying vec3 vCarN; varying vec3 vCarV;
uniform vec4 uC0, uC1, uC2;
// tail-lamp outline: inside distance (m) at a car-frame point (positive inside)
float carTl(vec3 p, float H, float hw) {
  float zr = abs(p.z) / hw, ur = H + p.x, dy = p.y - uC0.z;
  return min(min((zr - 0.48) * hw, (0.99 - zr) * hw), min(min(dy + 0.07, 0.05 - dy), 0.04 + 0.32 * smoothstep(0.7, 0.98, zr) - ur));
}
// bump from a height field (three's perturbNormalArb): heights in metres, positions in view space
vec3 carBump(vec3 sp, vec3 sn, vec2 dH, float fd) {
  vec3 sx = dFdx(sp), sy = dFdy(sp), r1 = cross(sy, sn), r2 = cross(sn, sx);
  float det = dot(sx, r1) * fd;
  return normalize(abs(det) * sn - sign(det) * (dH.x * r1 + dH.y * r2));
}
float carHash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
// antialiased 0/1 for v in [a, b]
float cBx(float v, float a, float b) { float w = fwidth(v) * 0.75 + 1e-4; return smoothstep(a - w, a + w, v) * (1.0 - smoothstep(b - w, b + w, v)); }
float cLine(float d, float hw) { return 1.0 - smoothstep(hw, hw + fwidth(d) * 1.5 + 1e-4, abs(d)); }`).replace(`#include <color_fragment>`,`
float met = vColor.r < 0.0 ? 1.0 : 0.0;
vec3 paint = abs(vColor.rgb);
// metallic flake: fine sparkle in the base coat (faded out before it can alias)
float fl = carHash(floor(vCarP * 260.0));
float vd = length(vViewPosition);
float flk = met * (1.0 - smoothstep(1.5, 5.0, vd));
paint *= 1.0 + (fl - 0.5) * 0.05 * flk;
diffuseColor.rgb = mix(vTCol, paint, vPG.x);
float cRough = -1.0, cMetal = -1.0, cCoat = 1.0, cH = 0.0; vec3 cEm = vec3(0.0);
if (vPG.x > 0.5) {
  vec3 p = vCarP;
  float H = uC0.x, hw = uC1.w;
  float zr = abs(p.z) / hw, uf = H - p.x, ur = H + p.x;
  float sideN = smoothstep(0.7, 0.92, abs(normalize(vCarN).z));
  // lower cladding (crossovers / SUVs / pickups) + front intake + rear valance: unpainted textured black
  float blk = cBx(p.y - uC2.x, -1.0, uC2.y) * smoothstep(0.3, 0.6, max(sideN, step(H - 0.5, abs(p.x))));
  blk = max(blk, cBx(zr, -1.0, 0.74) * cBx(p.y - uC2.x, 0.05, 0.15) * cBx(uf, -1.0, 0.09));
  blk = max(blk, cBx(p.y - uC2.x, -1.0, 0.11) * cBx(ur, -1.0, 0.09));
  // grille between the lamps (fine mesh)
  float gr = cBx(zr, -1.0, 0.45) * cBx(p.y - uC0.y, -0.15, 0.035) * cBx(uf, -1.0, 0.07);
  // head lamps (wrap round the front corners) with an LED running-light strip; tail lamps wrap the rear corners
  float hl = cBx(zr, 0.45, 0.985) * cBx(p.y - uC0.y, -0.05, 0.055) * cBx(uf, -1.0, 0.05 + 0.27 * smoothstep(0.72, 0.98, zr));
  float drl = hl * cBx(p.y - uC0.y, 0.032, 0.052);
  // tail lamps: a separate raised lens — rounded 3 mm rim (bump) inside a dark gasket — over a red reflector
  // housing seen ~2 cm behind it (parallax: ribs + an LED light guide shift with the view), clear reverse
  // section toward the middle. Up close only; further out it settles to the flat lens colour.
  float dIn = carTl(p, H, hw);
  float aaT = fwidth(dIn) * 0.75 + 1e-4;
  float tl = smoothstep(-aaT, aaT, dIn);
  float gsk = smoothstep(-aaT, aaT, dIn + 0.007) * (1.0 - tl);                  // gasket ring round the lens
  float rev = tl * cBx(zr, 0.48, 0.6);
  float nearL = 1.0 - smoothstep(7.0, 22.0, vd);
  cH = nearL * (0.003 * smoothstep(0.0, 0.012, dIn) - 0.0015 * gsk);
  vec3 cV = normalize(vCarV), cN = normalize(vCarN);
  float vn = max(dot(cV, cN), 0.3);
  vec3 q = p - (cV - cN * dot(cV, cN)) / vn * 0.02;                            // 2 cm behind the lens
  float qIn = carTl(q, H, hw), qdy = q.y - uC0.z;
  float aaQ = fwidth(qdy) * 0.75 + 1e-4;
  float guide = (1.0 - smoothstep(0.004, 0.004 + aaQ, abs(qdy - 0.018))) * smoothstep(0.008, 0.016, qIn);   // LED light guide
  float ribs = 0.5 + 0.5 * cos(qdy * 380.0) * (1.0 - smoothstep(2.0, 6.0, vd));
  float cup = smoothstep(0.0, 0.02, qIn);                                       // housing darkens toward its walls
  vec3 col = diffuseColor.rgb;
  float mesh = step(0.45, fract(p.z * 38.0)) * step(0.45, fract(p.y * 38.0 + 0.5 * step(0.5, fract(p.z * 19.0))));
  col = mix(col, vec3(0.03) * (0.6 + 0.8 * mesh), gr);
  col = mix(col, vec3(0.028, 0.028, 0.03), blk);
  col = mix(col, vec3(0.62, 0.63, 0.65), hl);
  vec3 redL = vec3(0.13, 0.006, 0.005) * (0.55 + 0.45 * cup) * (0.85 + 0.3 * ribs) + vec3(0.42, 0.025, 0.015) * guide;
  vec3 clrL = vec3(0.34, 0.34, 0.35) * (0.6 + 0.4 * cup) * (0.8 + 0.4 * ribs);
  vec3 lensC = mix(redL, clrL, rev);
  lensC = mix(mix(vec3(0.3, 0.012, 0.01), vec3(0.55), rev), lensC, nearL);       // far: the old flat colour
  col = mix(col, vec3(0.015), gsk * nearL);
  col = mix(col, lensC, tl);
  // door / hood shut lines (sides between sill and belt; hood edge on top), fade before they alias
  float near = 1.0 - smoothstep(9.0, 26.0, vd);
  float shut = (cLine(p.x - uC1.x, 0.0025) + cLine(p.x - uC1.y, 0.0025) + cLine(p.x - uC1.z, 0.0025)) * cBx(p.y, uC2.x + 0.12, uC0.w - 0.01) * sideN;
  shut += cLine(zr - 0.87, 0.0025 / hw) * step(uC1.x + 0.04, p.x) * smoothstep(0.5, 0.8, normalize(vCarN).y);
  col *= 1.0 - 0.7 * clamp(shut, 0.0, 1.0) * near * (1.0 - blk);
  diffuseColor.rgb = col;
  float lamp = max(hl, tl);
  cRough = lamp > 0.5 ? mix(0.12, 0.05, tl) : (gsk * nearL > 0.5 ? 0.7 : (max(blk, gr) > 0.5 ? 0.6 : -1.0));
  cMetal = lamp > 0.5 ? mix(0.0, 0.8, hl) : (max(blk, gr) > 0.5 ? 0.0 : -1.0);
  cCoat = 1.0 - max(blk, gr);
  cEm = vec3(1.0, 0.97, 0.92) * 1.1 * drl + vec3(0.05, 0.0, 0.0) * tl * (1.0 - rev) + vec3(0.09, 0.004, 0.002) * guide * tl * (1.0 - rev) * nearL;
}`).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = cRough >= 0.0 ? cRough : vPG.x > 0.5 ? mix(0.42, 0.3, met) :
          (vPG.y < 0.1 ? 0.82 : vPG.y < 0.4 ? 0.02 : vPG.y < 0.6 ? 0.22 : 0.35);`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = cMetal >= 0.0 ? cMetal : vPG.x > 0.5 ? mix(0.0, 0.62, met) : (vPG.y > 0.4 && vPG.y < 0.6 ? 0.95 : 0.0);`).replace(`material.clearcoat = clearcoat;`,`material.clearcoat = clearcoat * cCoat * ((vPG.x > 0.5 || (vPG.y > 0.1 && vPG.y < 0.4) || vPG.y > 0.7) ? 1.0 : 0.0);`).replace(`#include <lights_fragment_begin>`,`if (vPG.x < 0.5 && vPG.y > 0.1 && vPG.y < 0.4) { material.specularColor = vec3(0.09); material.specularF90 = 1.0; }
#include <lights_fragment_begin>`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
totalEmissiveRadiance += cEm;`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
normal = carBump(- vViewPosition, normal, vec2(dFdx(cH), dFdy(cH)), faceDirection);`).replace(`#include <clearcoat_normal_fragment_begin>`,`#include <clearcoat_normal_fragment_begin>
clearcoatNormal = normal;`).replace(`#include <opaque_fragment>`,`{ float lm = max(outgoingLight.r, max(outgoingLight.g, outgoingLight.b));
  if (lm > 1.8) outgoingLight *= (1.8 + (lm - 1.8) / (1.0 + (lm - 1.8) / 1.4)) / lm; }
#include <opaque_fragment>`)},t.customProgramCacheKey=()=>`fw-car-v6`,t}var $=[[[.78,.78,.76],0,15],[[.7,.69,.64],1,7],[[.82,.82,.81],0,4],[[.012,.012,.014],0,12],[[.02,.021,.024],1,10],[[.16,.165,.17],1,8],[[.075,.08,.085],1,6],[[.3,.3,.29],0,5],[[.5,.51,.52],1,8],[[.38,.39,.4],1,4],[[.028,.05,.1],1,5],[[.09,.12,.16],1,4],[[.26,.022,.022],1,5],[[.13,.018,.022],1,3],[[.035,.055,.042],1,2],[[.2,.16,.11],1,2]],le=$.reduce((e,t)=>e+t[2],0);function ue(e){let t=e()*le;for(let[e,n,r]of $)if((t-=r)<=0)return n?e.map(e=>-e):e;return $[0][0]}function de(e,{stalls:t,fill:n=.4,seed:r=99}){let i=E(r),a=Object.keys(Y),o=[],s=0;for(let e of a)s+=Y[e].weight,o.push(s);let c=()=>{let e=i()*s;return a[o.findIndex(t=>e<=t)]},l=Object.fromEntries(a.map(e=>[e,[]]));for(let e of t){if(i()>(e.ada?n*.4:n))continue;let t=c(),r=Y[t],[a,o]=e.dir,s=(i()-.5)*.3,u=.15+(i()-.5)*.25-Math.max(0,r.L-4.8)*.5,d=e.x+a*u-o*s,f=e.z+o*u+a*s,p=Math.atan2(-o,a)+(i()-.5)*.06;l[t].push({x:d,y:e.y,z:f,yaw:i()<.12?p+Math.PI:p,s:1,sy:1,tint:ue(i)})}let u=new S;u.name=`cars`;let d=[],f=!e.params?.has?.(`shot`),p=[];for(let e of a){if(!l[e].length)continue;let t=ce(Y[e]),n=Q(e,1),r={name:`car-${e}`,height:2,lods:[f?n:Q(e,0),n],mats:[t,t]},i=new ee(r,l[e],[55,3e3,0],{shadow:!0,key:`car-${e}`});i.meshes[1].castShadow=!0,u.add(i.group),d.push(i),f&&p.push([e,i])}if(p.length){let e=e=>window.requestIdleCallback?requestIdleCallback(e,{timeout:2e3}):setTimeout(e,60),t=()=>{let n=p.shift();if(!n)return;let[r,i]=n;i.meshes[0].geometry=Q(r,0),e(t)},n=()=>window.__APP_READY?e(t):setTimeout(n,250);n()}let m=new C,h=()=>{e.camera.getWorldPosition(m);for(let e of d)e.update(m)};h(),e.onUpdate?.(h);let g=new C;return{group:u,clearArea:e=>{u.updateWorldMatrix(!0,!0);for(let t of d)t.setHidden(e?(n,r,i)=>e(g.set(n,r,i).applyMatrix4(t.group.matrixWorld)):null)},count:Object.values(l).reduce((e,t)=>e+t.length,0)}}export{I as a,P as i,B as n,F as o,re as r,M as s,de as t};