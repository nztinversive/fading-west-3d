import{S as e,_ as t,b as n,c as r,d as i,f as a,g as o,h as s,i as c,l,m as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _,x as v,y}from"./hardscape-gD4MW1Jo.js";import{At as b,B as x,Bt as ee,Gt as S,I as C,Kt as w,L as T,M as E,N as D,Ot as te,Tt as O,V as k,Wt as ne,X as A,_t as re,a as j,gt as ie,i as ae,j as M,kt as oe,lt as N,mt as P,nt as se,q as F,qt as I,r as L,ut as R}from"./index-5do8CNAt.js";var z=.87/12742017.6,B=(e,t)=>(e*e+t*t)*z,V=class{constructor(e,t){this.n=e.n,this.half=e.half,this.sp=e.spacing,this.h=t}x(e){return-this.half+e*this.sp}contains(e,t){return Math.abs(e)<=this.half&&Math.abs(t)<=this.half}sample(e,t,n=!1){let r=this.n,i=this.h,a=(e+this.half)/this.sp,o=(t+this.half)/this.sp;a=Math.min(Math.max(a,0),r-1.000001),o=Math.min(Math.max(o,0),r-1.000001);let s=1;if(this.stride&&!n){let e=this.nc,t=Math.min(Math.floor(a/this.cs),e-1),n=Math.min(Math.floor(o/this.cs),e-1);s=this.stride[n*e+t]}let c=Math.min(Math.floor(a/s)*s,r-1-s),l=Math.min(Math.floor(o/s)*s,r-1-s),u=(a-c)/s,d=(o-l)/s,f=l*r+c,p=s*r,m=i[f],h=i[f+s],g=i[f+p],_=i[f+p+s];return u+d<=1?m+(h-m)*u+(g-m)*d:_+(g-_)*(1-u)+(h-_)*(1-d)}setLod(e,t){this.cs=e,this.nc=(this.n-1)/e,this.stride=new Uint8Array(this.nc*this.nc);for(let n=0;n<this.nc;n++)for(let r=0;r<this.nc;r++){let i=1/0,a=-1/0;for(let t=n*e;t<=(n+1)*e;t+=2)for(let n=r*e;n<=(r+1)*e;n+=2){let e=this.h[t*this.n+n];e<i&&(i=e),e>a&&(a=e)}this.stride[n*this.nc+r]=t([this.x(r*e),this.x(n*e),this.x((r+1)*e),this.x((n+1)*e)],a-i)}}};async function ce(e,t){if(t.packed&&typeof DecompressionStream==`function`)try{let n=await fetch(e+t.packed);if(!n.ok)throw Error(n.status);let r=new Uint8Array(await new Response(n.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer()),i=r.length>>1,a=new Uint16Array(i),o=0;for(let e=0;e<i;e++)o=o+(r[e]|r[i+e]<<8)&65535,a[e]=o;return a}catch(e){console.warn(`[terrain] packed heights failed, using raw`,t.packed,e?.message)}return new Uint16Array(await(await fetch(e+t.file)).arrayBuffer())}async function le(n=`assets/terrain/`){let r=await(await fetch(n+`terrain.json`)).json(),i={},a=null;await Promise.all(Object.entries(r.levels).map(async([e,t])=>{let o=await ce(n,t),s=new Float32Array(o.length),c=(t.max-t.min)/65535,l=t.min-r.originElevation;for(let e=0;e<o.length;e++)s[e]=l+o[e]*c;t.rect?a={...t,h:s}:i[e]=new V(t,s)}));{let e=i.horizon,t=(e.n-1)/2+1,n=new Float32Array(t*t);for(let r=0;r<t;r++)for(let i=0;i<t;i++)n[r*t+i]=e.h[2*r*e.n+2*i];i.horizon=new V({n:t,half:e.half,spacing:e.sp*2},n)}let{near:o,far:s,horizon:c}=i,l=(e,t,n)=>{let r=e.n,i=e.half;for(let a=0;a<r;a++)for(let o=0;o<r;o++){let s=e.x(o),c=e.x(a),l=Math.max(Math.abs(s),Math.abs(c));if(l<i-n)continue;let u=(l-(i-n))/n,d=u*u*(3-2*u),f=a*r+o;e.h[f]+=(t.sample(s,c,!0)-e.h[f])*d}};l(s,c,3e3),l(o,s,220);let u=-1200,d=new Float32Array(301);for(let e=0;e<301;e++)d[e]=o.sample(300,u+e*8,!0);for(let e=0;e<4;e++){let e=new Float32Array(301);for(let t=0;t<301;t++){let n=0,r=0;for(let e=-6;e<=6;e++){let i=Math.min(Math.max(t+e,0),300);n+=d[i],r++}e[t]=n/r}d=e}e({z0:u,step:8,h:d}),o.natural=o.h.slice();let f=_(),p=f.reduce((e,t)=>[Math.min(e[0],t.r[0]-t.blend),Math.min(e[1],t.r[1]-t.blend),Math.max(e[2],t.r[2]+t.blend),Math.max(e[3],t.r[3]+t.blend)],[1/0,1/0,-1/0,-1/0]);for(let e=0;e<o.n;e++){let n=o.x(e);if(!(n<p[1]||n>p[3]))for(let r=0;r<o.n;r++){let i=o.x(r);if(i<p[0]||i>p[2])continue;let a=e*o.n+r,s=Math.max(Math.abs(i),Math.abs(n)),c=s>o.half-230?Math.min(1,(s-(o.half-230))/10):0;o.h[a]+=(t(f,i,n,o.h[a])-o.h[a])*(1-c)}}let m=[95,-50],h=(e,t,n)=>Math.hypot(Math.max(e[0]-t,0,t-e[2]),Math.max(e[1]-n,0,n-e[3]));return o.setLod(32,(e,t)=>{let n=h(e,m[0],m[1]);return n<220?1:n<520||t>25?2:4}),s.setLod(40,(e,t)=>{let n=h(e,0,0);return n<4500||t>800&&n<12e3?1:t>450?2:t>200?n<11e3?2:4:n<9e3?2:n<18e3?4:8}),c.setLod(24,(e,t)=>{let n=h(e,0,0);return n<4e4&&t>400?1:n<6e4?2:4}),{meta:r,grids:i,detail:a,heightAt:(e,t)=>(o.contains(e,t)?o:s.contains(e,t)?s:c).sample(e,t)-B(e,t),zones:f}}function H(e,{hole:t=0,skirt:n=1}={}){let r=e.n,i=e.sp,a=e.h,o=e.cs,s=e.nc,c=[],l=[],u=[],d=(e,t)=>a[Math.min(Math.max(t,0),r-1)*r+Math.min(Math.max(e,0),r-1)],f=(t,n,r=0)=>{let a=e.x(t),o=e.x(n);c.push(a,d(t,n)-B(a,o)-r,o);let s=(d(t+1,n)-d(t-1,n))/(2*i),u=(d(t,n+1)-d(t,n-1))/(2*i),f=Math.hypot(s,1,u);return l.push(-s/f,1/f,-u/f),c.length/3-1},p=(n,r,i,a)=>t>0&&Math.max(Math.abs(e.x(n)),Math.abs(e.x(i)))<=t+.001&&Math.max(Math.abs(e.x(r)),Math.abs(e.x(a)))<=t+.001;for(let r=0;r<s;r++)for(let i=0;i<s;i++){let a=e.stride[r*s+i],l=i*o,d=r*o,m=o/a;if(p(l,d,l+o,d+o))continue;let h=c.length/3;for(let e=0;e<=m;e++)for(let t=0;t<=m;t++)f(l+t*a,d+e*a);let g=(e,t)=>h+t*(m+1)+e;for(let e=0;e<m;e++)for(let t=0;t<m;t++){if(p(l+t*a,d+e*a,l+(t+1)*a,d+(e+1)*a))continue;let n=g(t,e),r=g(t+1,e),i=g(t,e+1),o=g(t+1,e+1);u.push(n,i,r,r,i,o)}if(!n)continue;let _=[[e=>[e,0]],[e=>[e,m]],[e=>[0,e]],[e=>[m,e]]];for(let[r]of _){let[i,o]=r(0),[s,c]=r(m),p=[(e.x(l+i*a)+e.x(l+s*a))/2,(e.x(d+o*a)+e.x(d+c*a))/2];if(t>0&&Math.max(Math.abs(p[0]),Math.abs(p[1]))<t)continue;let h=[],_=[];for(let e=0;e<=m;e++){let[t,i]=r(e);h.push(g(t,i)),_.push(f(l+t*a,d+i*a,n))}for(let e=0;e<m;e++)u.push(h[e],_[e],h[e+1],h[e+1],_[e],_[e+1],h[e],h[e+1],_[e],h[e+1],_[e+1],_[e])}}let m=new D;return m.setAttribute(`position`,new F(c,3)),m.setAttribute(`normal`,new F(l,3)),m.setIndex(new E(new Uint32Array(u),1)),m.computeBoundingSphere(),m.computeBoundingBox(),m}function U(e,t,n,r,i=2,a=e){let o=new Uint8Array(t*n*4),s=(e,r,i)=>e[Math.min(Math.max(i,0),n-1)*t+Math.min(Math.max(r,0),t-1)],c=(e,t,n)=>((s(a,e+n,t)+s(a,e-n,t)+s(a,e,t+n)+s(a,e,t-n))/4-s(a,e,t))/(n*r);for(let a=0;a<n;a++)for(let n=0;n<t;n++){let l=(s(e,n+1,a)-s(e,n-1,a))/(2*r),u=(s(e,n,a+1)-s(e,n,a-1))/(2*r),d=Math.hypot(l,1,u),f=(a*t+n)*4;o[f]=Math.round((-l/d*.5+.5)*255),o[f+1]=Math.round((-u/d*.5+.5)*255),o[f+2]=Math.round(Math.min(Math.max(.5+c(n,a,i)*2.5,0),1)*255),o[f+3]=Math.round(Math.min(Math.max(.5+c(n,a,1)*2,0),1)*255)}let l=new k(o,t,n,O,ne);return l.wrapS=l.wrapT=T,l.magFilter=N,l.minFilter=R,l.generateMipmaps=!0,l.anisotropy=8,l.needsUpdate=!0,l}var W=(e,t=2)=>U(e.h,e.n,e.n,e.sp,t,e.natural||e.h);function ue(e=256){let t=new Uint8Array(e*e*4),n=e=>{let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296};for(let r=0;r<4;r++){let i=new Float32Array(e*e),a=1,o=0;for(let t=0;t<5;t++){let s=4<<t,c=n(1234+r*97+t*13),l=new Float32Array(s*s).map(()=>c());for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=n/e*s,o=t/e*s,c=Math.floor(r),u=Math.floor(o),d=r-c,f=o-u;d=d*d*(3-2*d),f=f*f*(3-2*f);let p=(e,t)=>l[t%s*s+e%s],m=(p(c,u)*(1-d)+p(c+1,u)*d)*(1-f)+(p(c,u+1)*(1-d)+p(c+1,u+1)*d)*f;i[t*e+n]+=m*a}o+=a,a*=.5}let s=1/0,c=-1/0;for(let e of i)s=Math.min(s,e),c=Math.max(c,e);for(let n=0;n<e*e;n++)t[n*4+r]=Math.round((i[n]-s)/(c-s)*255)}let r=new k(t,e,e,O);return r.wrapS=r.wrapT=te,r.magFilter=N,r.minFilter=R,r.generateMipmaps=!0,r.needsUpdate=!0,r}async function de(e){let[t,n,r,i]=await Promise.all([L(`dry_ground_rocks`,{tile:1}),L(`sparse_grass`,{tile:1}),L(`aerial_rocks_02`,{tile:1}),L(`snow_02`,{tile:1})]);return{uniforms:{uOrigin:{value:e},tNoise:{value:ue()},tDirt:{value:t.map},tDirtN:{value:t.normalMap},tGrass:{value:n.map},tRock:{value:r.map},tRockN:{value:r.normalMap},tSnow:{value:i.map}}}}var fe=`
uniform float uOrigin;
varying vec3 vWPos;
varying float vElev;
`,pe=`
vec4 tw = modelMatrix * vec4(transformed, 1.0);
vWPos = tw.xyz;
vElev = tw.y + uOrigin + dot(tw.xz, tw.xz) * ${z.toExponential(6)};
`,G=`
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
`,me=`
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
`,he=`
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
`;function ge(e,{normalTex:t,half:n,sp:r,n:i,det:a=null,img:o=null,imgDet:c=null,site:l=[]}){let u=new re({color:16777215,roughness:.95,metalness:0});return u.onBeforeCompile=u=>{Object.assign(u.uniforms,e.uniforms,{tNrm:{value:t},uHalf:{value:n},uSp:{value:r},uN:{value:i},tDet:{value:a?a.tex:t},uUseDet:{value:+!!a},uDetMin:{value:new S(a?a.rect[0]:0,a?a.rect[1]:0)},uDetSp:{value:a?a.spacing:1},uDetN:{value:new S(a?a.nx:1,a?a.nz:1)},tImg:{value:o?o.tex:t},uImgRect:{value:new I(...o?o.rect:[0,0,1,1])},tImgD:{value:c?c.tex:t},uImgW:{value:+!!o},uImgGain:{value:1.12},uSite:{value:[0,1,2].map(e=>new I(...l[e]||[1e7,1e7,1e7,1e7]))}}),u.defines={...u.defines||{},ROAD_X:300 .toFixed(1),ROAD_HALF:s.toFixed(1)},u.vertexShader=u.vertexShader.replace(`#include <common>`,`#include <common>\n${fe}`).replace(`#include <begin_vertex>`,`#include <begin_vertex>\n${pe}`),u.fragmentShader=u.fragmentShader.replace(`#include <common>`,`#include <common>\n${G}`).replace(`#include <map_fragment>`,me).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = tRough;`).replace(`#include <normal_fragment_maps>`,he).replace(`#include <fog_fragment>`,`
        #ifdef USE_FOG
        { float hz = 1.0 - exp(-length(vWPos - cameraPosition) / 55000.0);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor * 0.85, hz * 0.8); }
        #endif
        #include <fog_fragment>`)},u.customProgramCacheKey=()=>`fw-terrain-v14`,u}var K={plastic:0,glass:.25,chrome:.5,lamp:.75};function q(e,t,n,r=0){e=e.index?e.toNonIndexed():e;for(let t of Object.keys(e.attributes))[`position`,`normal`].includes(t)||e.deleteAttribute(t);let i=e.attributes.position.count,a=new Float32Array(i*3),o=new Float32Array(i*2);for(let e=0;e<i;e++)a.set(t,e*3),o[e*2]=r,o[e*2+1]=n;return e.setAttribute(`tcol`,new E(a,3)),e.setAttribute(`pg`,new E(o,2)),e}var J=(e,t,n,r,i,a,o,s=K.plastic)=>{let c=new M(e,t,n);return c.translate(r,i,a),q(c,o,s)},_e=(e,t)=>{if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++)if(t<=e[n][0]){let[r,i]=e[n-1],[a,o]=e[n];return i+(o-i)*(t-r)/(a-r)}return e[e.length-1][1]},ve=(e,t,n)=>{let r=Math.min(Math.max((n-e)/(t-e),0),1);return r*r*(3-2*r)},Y={sedan:{L:4.76,hw:.91,wr:.33,wx:1.43,yb0:.3,belt:.97,cab:[-1.42,1.1],bpillar:-.2,weight:.24,top:[[-2.38,.72],[-2.33,.9],[-2.1,.97],[-1.42,1],[-.8,1.41],[.3,1.44],[1.08,1],[1.6,.92],[2.22,.82],[2.38,.62]]},hatch:{L:4.25,hw:.89,wr:.32,wx:1.3,yb0:.3,belt:.98,cab:[-1.98,1],bpillar:-.45,weight:.16,top:[[-2.12,.78],[-2.1,1.02],[-1.98,1.36],[-1.62,1.45],[.3,1.47],[1,1],[1.55,.9],[2.02,.8],[2.12,.6]]},cuv:{L:4.55,hw:.92,wr:.35,wx:1.35,yb0:.34,belt:1.03,cab:[-2.05,1.2],bpillar:-.3,weight:.24,top:[[-2.27,.88],[-2.24,1.08],[-2.05,1.5],[-1.7,1.57],[.45,1.6],[1.2,1.04],[1.75,.97],[2.18,.86],[2.27,.64]]},suv:{L:4.85,hw:.97,wr:.38,wx:1.45,yb0:.38,belt:1.1,cab:[-2.25,1.25],bpillar:-.3,weight:.18,top:[[-2.42,.94],[-2.39,1.12],[-2.25,1.72],[.5,1.78],[1.25,1.12],[1.85,1.06],[2.32,.96],[2.42,.72]]},pickup:{L:5.6,hw:.99,wr:.4,wx:1.75,yb0:.46,belt:1.22,cab:[-.82,1.2],bpillar:-.1,weight:.18,bed:[-2.78,-.86],top:[[-2.8,1.1],[-2.76,1.23],[-.86,1.23],[-.82,1.86],[.55,1.9],[1.2,1.24],[1.95,1.17],[2.66,1.06],[2.8,.8]]}};function ye(e,t){let n=e.L/2,r=[],i=t?.22:.1,a=t?.5:.24;for(let e=-n;e<n-1e-6;e+=Math.abs(e)>n-.4?i:a)r.push(e);r.push(n);let o=[],s=[],c=0;for(let t of r){let r=e.yb0+.1*ve(n-.45,n,Math.abs(t)),i=_e(e.top,t),a=e.hw*(1-.06*(Math.abs(t)/n)**4);a*=.7+.3*Math.sqrt(Math.max(0,1-(Math.max(0,Math.abs(t)-(n-.38))/.38)**2));let l=t>e.cab[0]&&t<e.cab[1]&&i>e.belt+.05,u=Math.min(e.belt,i-.03),d=[[0,r-.02],[.84*a,r],[.96*a,r+.06],[a,r+.2],[a,Math.max(r+.24,u-.14)],[.97*a,u],[.86*a,Math.min(e.belt+.03,i)],[.71*a,Math.max(Math.min(e.belt+.03,i),i-.06)],[.58*a,i],[0,i+.015]],f=[...d,...d.slice(1,-1).reverse().map(([e,t])=>[-e,t])];c=f.length,s.push({ring:f.map(([e,n])=>(o.push(t,n,e),o.length/3-1)),x:t,yt:i,cab:l})}let l=e=>e<10?e:c-e,u=[],d=[],f=e=>{let t=s[Math.max(e-1,0)],n=s[Math.min(e+1,s.length-1)];return(n.yt-t.yt)/Math.max(n.x-t.x,.001)};for(let t=0;t<s.length-1;t++)for(let n=0;n<c;n++){let r=s[t],i=s[t+1],a=(n+1)%c,o=r.ring[n],p=i.ring[n],m=i.ring[a],h=r.ring[a];u.push(o,p,h,p,m,h);let g=(r.x+i.x)/2,_=r.cab&&i.cab,v=Math.min(l(n),l(a)),y=Math.abs(f(t))>.35,b=_&&v===6&&Math.abs(g-e.bpillar)>.06||_&&(v===7||v===8)&&y;d.push(b,b)}for(let[e,t]of[[0,-1],[s.length-1,1]]){let n=s[e],r=o.length/3;o.push(n.x+t*.015,(o[n.ring[0]*3+1]+n.yt)/2,0);for(let e=0;e<c;e++){let i=n.ring[e],a=n.ring[(e+1)%c];t>0?u.push(r,a,i):u.push(r,i,a),d.push(!1)}}let p=new D;p.setAttribute(`position`,new F(o,3)),p.setIndex(u),p.computeVertexNormals();let m=e=>{let t=[],n=[],r=p.attributes.position,i=p.attributes.normal;for(let a=0;a<u.length/3;a++)if(d[a]===e)for(let e=0;e<3;e++){let o=u[a*3+e];t.push(r.getX(o),r.getY(o),r.getZ(o)),n.push(i.getX(o),i.getY(o),i.getZ(o))}let a=new D;return a.setAttribute(`position`,new F(t,3)),a.setAttribute(`normal`,new F(n,3)),a};return{body:m(!1),glass:m(!0)}}function be(e,t,n,r){let{wr:i,wx:a,hw:o}=e,s=[],c=[.028,.028,.03],l=[.56,.57,.6],u=[.05,.05,.055],d=n*(o-.13);if(r){let e=new x(i,i,.22,8);e.rotateX(Math.PI/2),e.translate(t*a,i,d),s.push(q(e,c,K.plastic));let r=new C(i*.62,8);return n<0&&r.rotateY(Math.PI),r.translate(t*a,i,d+n*.112),s.push(q(r,l,K.chrome)),s}let f=i,p=i*.64,m=.115,h=[[p,-.115*.9],[f-.04,-.115],[f-.006,-.0828],[f,-.02875],[f,m*.25],[f-.006,m*.72],[f-.04,m],[p,m*.9]].map(([e,t])=>new S(e,t)),g=new se(h,12);g.rotateX(Math.PI/2),g.translate(t*a,i,d),s.push(q(g,c,K.plastic));let _=d+m*.75*n,v=new C(p,10);n<0&&v.rotateY(Math.PI),v.translate(t*a,i,_-n*.03),s.push(q(v,u,K.plastic));let y=new oe(p*.86,p,12);n<0&&y.rotateY(Math.PI),y.translate(t*a,i,_),s.push(q(y,l,K.chrome));for(let e=0;e<5;e++){let r=new M(p*.82,.055,.025);r.translate(p*.43,0,0),r.rotateZ(e/5*Math.PI*2+t*.3),r.translate(t*a,i,_-n*.012),s.push(q(r,l,K.chrome))}let b=new x(p*.2,p*.22,.04,6);return b.rotateX(Math.PI/2),b.translate(t*a,i,_),s.push(q(b,l,K.chrome)),s}function X(e,t){let n=Y[e],r=n.L/2,i=n.hw*2,{body:a,glass:o}=ye(n,t),s=[q(a,[1,1,1],K.plastic,1),q(o,[.012,.014,.016],K.glass)],c=[.03,.03,.032],l=[.95,.95,.9],u=[.45,.015,.015],d=[.85,.42,.04],f=[.6,.6,.62];for(let e of[-1,1])for(let r of[-1,1]){s.push(...be(n,e,r,t));let i=new C(n.wr+.1,t?6:10,0,Math.PI);r<0&&i.rotateY(Math.PI),i.translate(e*n.wx,n.wr-.02,r*(n.hw+.004)),s.push(q(i,c,K.plastic))}let p=n.yb0+.38,m=n.yb0+.5;for(let e of[-1,1])s.push(J(.08,.1,.38,r-.1,p,e*.5,l,K.lamp)),s.push(J(.08,.12,.34,-r+.09,m,e*.56,u,K.lamp)),t||(s.push(J(.06,.035,.12,r-.11,p-.1,e*.66,d,K.lamp)),s.push(J(.22,.11,.06,n.cab[1]-.2,n.belt+.07,e*(n.hw-.02),c)),s.push(J(.17,.025,.012,n.bpillar-.35,n.belt-.12,e*(n.hw+.004),f,K.chrome)),s.push(J(.17,.025,.012,n.bpillar+.45,n.belt-.12,e*(n.hw+.004),f,K.chrome)),s.push(J(n.L*.62,.05,.012,-.1,n.yb0+.06,e*(n.hw*.97),c)));if(s.push(J(.08,.17,.8,r-.04,p-.16,0,c)),!t&&(s.push(J(.03,.02,.82,r-.02,p-.06,0,f,K.chrome)),s.push(J(.1,.13,1.55,r-.07,n.yb0+.08,0,[.035,.035,.04])),s.push(J(.1,.13,1.55,-r+.07,n.yb0+.08,0,[.035,.035,.04])),s.push(J(.04,.12,.5,-r+.03,n.yb0+.3,0,[.85,.85,.8])),n.bed)){for(let e of[-1,1])s.push(J(n.bed[1]-n.bed[0],.04,.08,(n.bed[0]+n.bed[1])/2,1.245,e*(n.hw*.62),c));s.push(J(.02,.4,i*.7,n.bed[0]+.03,.95,0,c))}s.push(J(n.L-.6,.2,i-.55,0,n.yb0+.02,0,c));let h=ae(s);return h.computeBoundingSphere(),h}function xe(){let e=new ie({color:16777215,roughness:.4,metalness:.2,clearcoat:1,clearcoatRoughness:.06});return e.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec3 tcol; attribute vec2 pg; varying vec3 vTCol; varying vec2 vPG; varying vec3 vCarP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vTCol = tcol; vPG = pg; vCarP = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vTCol; varying vec2 vPG; varying vec3 vCarP;
float carHash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }`).replace(`#include <color_fragment>`,`
float met = vColor.r < 0.0 ? 1.0 : 0.0;
vec3 paint = abs(vColor.rgb);
// metallic flake: fine sparkle in the base coat (faded out before it can alias)
float fl = carHash(floor(vCarP * 260.0));
float flk = met * (1.0 - smoothstep(4.0, 14.0, length(vViewPosition)));
paint *= 1.0 + (fl - 0.5) * 0.22 * flk;
diffuseColor.rgb = mix(vTCol, paint, vPG.x);`).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = vPG.x > 0.5 ? mix(0.42, 0.3, met) :
          (vPG.y < 0.1 ? 0.82 : vPG.y < 0.4 ? 0.02 : vPG.y < 0.6 ? 0.22 : 0.15);`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = vPG.x > 0.5 ? mix(0.0, 0.62, met) : (vPG.y > 0.4 && vPG.y < 0.6 ? 0.95 : 0.0);`).replace(`material.clearcoat = clearcoat;`,`material.clearcoat = clearcoat * ((vPG.x > 0.5 || (vPG.y > 0.1 && vPG.y < 0.4)) ? 1.0 : 0.0);`).replace(`#include <lights_fragment_begin>`,`if (vPG.x < 0.5 && vPG.y > 0.1 && vPG.y < 0.4) { material.specularColor = vec3(0.09); material.specularF90 = 1.0; }
#include <lights_fragment_begin>`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
if (vPG.y > 0.7 && vPG.x < 0.5) totalEmissiveRadiance += vTCol * 0.25;`)},e.customProgramCacheKey=()=>`fw-car-v3`,e}var Z=[[[.78,.78,.76],0,15],[[.7,.69,.64],1,7],[[.82,.82,.81],0,4],[[.012,.012,.014],0,12],[[.02,.021,.024],1,10],[[.16,.165,.17],1,8],[[.075,.08,.085],1,6],[[.3,.3,.29],0,5],[[.5,.51,.52],1,8],[[.38,.39,.4],1,4],[[.028,.05,.1],1,5],[[.09,.12,.16],1,4],[[.26,.022,.022],1,5],[[.13,.018,.022],1,3],[[.035,.055,.042],1,2],[[.2,.16,.11],1,2]],Se=Z.reduce((e,t)=>e+t[2],0);function Ce(e){let t=e()*Se;for(let[e,n,r]of Z)if((t-=r)<=0)return n?e.map(e=>-e):e;return Z[0][0]}function we(e,{stalls:t,fill:n=.4,seed:r=99}){let i=d(r),a=Object.keys(Y),o=[],s=0;for(let e of a)s+=Y[e].weight,o.push(s);let c=()=>{let e=i()*s;return a[o.findIndex(t=>e<=t)]},l=Object.fromEntries(a.map(e=>[e,[]]));for(let e of t){if(i()>(e.ada?n*.4:n))continue;let t=c(),r=Y[t],[a,o]=e.dir,s=(i()-.5)*.3,u=.15+(i()-.5)*.25-Math.max(0,r.L-4.8)*.5,d=e.x+a*u-o*s,f=e.z+o*u+a*s,p=Math.atan2(-o,a)+(i()-.5)*.06;l[t].push({x:d,y:e.y,z:f,yaw:i()<.12?p+Math.PI:p,s:1,sy:1,tint:Ce(i)})}let u=new A;u.name=`cars`;let f=xe(),p=[];for(let e of a){if(!l[e].length)continue;let t={name:`car-${e}`,height:2,lods:[X(e,0),X(e,1)],mats:[f,f]},n=new m(t,l[e],[55,3e3,0],{shadow:!0,key:`car-${e}`});n.meshes[1].castShadow=!0,u.add(n.group),p.push(n)}let h=new w,g=()=>{e.camera.getWorldPosition(h);for(let e of p)e.update(h)};g(),e.onUpdate?.(g);let _=new w;return{group:u,clearArea:e=>{u.updateWorldMatrix(!0,!0);for(let t of p)t.setHidden(e?(n,r,i)=>e(_.set(n,r,i).applyMatrix4(t.group.matrixWorld)):null)},count:Object.values(l).reduce((e,t)=>e+t.length,0)}}var Q=j.length/2,$=j.depth/2;function Te(e,t){if(t[0]>=e[2]||t[2]<=e[0]||t[1]>=e[3]||t[3]<=e[1])return[e];let n=[];t[1]>e[1]&&n.push([e[0],e[1],e[2],t[1]]),t[3]<e[3]&&n.push([e[0],t[3],e[2],e[3]]);let r=Math.max(e[1],t[1]),i=Math.min(e[3],t[3]);return t[0]>e[0]&&n.push([e[0],r,t[0],i]),t[2]<e[2]&&n.push([t[2],r,e[2],i]),n.filter(e=>e[2]-e[0]>.3&&e[3]-e[1]>.3)}var Ee=(e,t)=>[e[0]-t,e[1]-t,e[2]+t,e[3]+t];function De(){let e=[],t=e=>e[2]-e[0]>e[3]-e[1]?[1,0]:[0,1];for(let n of r){let r=v(n,-Q-3-7,-$-1.6-9,Q+3+7,-$-1.6);e.push({r,dir:t(r)});for(let r of[-1,1]){let i=r<0?v(n,-Q-3-7,-$-1.6,-Q-3,g[1]):v(n,Q+3,-$-1.6,Q+3+7,g[1]);e.push({r:i,dir:t(i)})}}e.push({r:[15,f.z1+.2,282,49.5],dir:[1,0]}),e.push({r:[i[0].x1+.2,22,i[1].x0-.2,f.z0-.2],dir:[1,0]}),e.push({r:[o.x-8,o.z-7,Math.min(o.x+7.5,300-s-2),f.z0-.2],dir:[0,1]});let n=[...u.map(e=>Ee(e,.2)),[300-s-1.5,-1e4,300+s+1.5,1e4],...r.map(e=>v(e,-Q-3,-$-1.6,Q+3,g[1])),...r.map(e=>v(e,-Q-2,g[0]-.1,Q+2,g[1]+.1)),[a.x-2.7,a.z-3.2,a.x+2.7,a.z+3.2],[i[0].x1,a.z-1.4,a.x,a.z+1.4],[l.x-6,l.z-5,l.x+4,l.z+5],[o.x-3.4,o.z-2.2,o.x+3.4,o.z+2.2]],c=[-44,-158,290,50],d=[];for(let t of e){let e=[[Math.max(t.r[0],c[0]),Math.max(t.r[1],c[1]),Math.min(t.r[2],c[2]),Math.min(t.r[3],c[3])]];for(let t of[...n,...d.map(e=>e.r)])e=e.flatMap(e=>Te(e,t));for(let n of e)d.push({r:n,dir:t.dir})}return d}function Oe({heightAt:e,noise:t}){let r=De(),i=[],a=[],o=[],s=[];for(let{r:t,dir:c}of r){let r=[t[0]],l=[t[1]];for(let e=Math.floor(t[0])+1;e<t[2];e++)r.push(e);for(let e=Math.floor(t[1])+1;e<t[3];e++)l.push(e);r.push(t[2]),l.push(t[3]);let d=i.length/3,f=r.length;for(let t of l)for(let s of r){let r=e(s,t)+.025,l=Math.min(...u.map(e=>n(e,s,t)));l<2.2&&(r=Math.max(r,r+(y(s,t)-.015-r)*(1-Math.min(Math.max((l-.2)/2,0),1)))),i.push(s,r,t);let d=e(s+.5,t)-e(s-.5,t),f=e(s,t+.5)-e(s,t-.5),p=Math.hypot(d,1,f);a.push(-d/p,1/p,-f/p),o.push(c[0],c[1])}for(let e=0;e<l.length-1;e++)for(let t=0;t<f-1;t++){let n=d+e*f+t,r=n+1,i=n+f,a=i+1;s.push(n,i,r,r,i,a)}}let c=new D;c.setAttribute(`position`,new F(i,3)),c.setAttribute(`normal`,new F(a,3)),c.setAttribute(`mow`,new F(o,2)),c.setIndex(new E(new Uint32Array(s),1)),c.computeBoundingSphere();let l=new P(c,p({noise:t}));return l.receiveShadow=!0,l.castShadow=!1,l.userData={tag:`site`,kind:`lawn`},l.matrixAutoUpdate=!1,l.name=`lawn`,{mesh:l,rects:r,onLawn:(e,t,n=0)=>r.some(({r})=>e>r[0]-n&&e<r[2]+n&&t>r[1]-n&&t<r[3]+n)}}async function ke(e){let t=new A;t.name=`site`;let n=await le(),{grids:i,meta:a,heightAt:o}=n,s=await de(a.originElevation),l=await fetch(`assets/terrain/imagery.json`).then(e=>e.ok?e.json():null).catch(()=>null),u=new ee,d={};l&&(await Promise.all(Object.entries(l.images).map(async([e,t])=>{let n=await u.loadAsync(`assets/terrain/`+t.file).catch(()=>null);n&&(n.colorSpace=b,n.anisotropy=8,n.wrapS=n.wrapT=T,d[e]={tex:n,rect:t.rect})})),a.attribution=`${a.attribution} · ${l.attribution}`);let f=[[-48,-162,245,56],[228,26,300,50],[289,-1200,311,1200]],p=[],m=n.detail,g=m?{...m,tex:U(m.h,m.nx,m.nz,m.spacing,4)}:null;p.push({g:i.near,geo:H(i.near,{skirt:1.5}),tex:W(i.near,32),shadow:!0,img:d.near}),p.push({g:i.far,geo:H(i.far,{hole:i.near.half,skirt:25}),tex:W(i.far,2),det:g,img:d.far,imgDet:d.detail}),p.push({g:i.horizon,geo:H(i.horizon,{hole:i.far.half,skirt:60}),tex:W(i.horizon,1),img:d.horizon});let _=new Map;for(let e of p){_.has(e.tex)||_.set(e.tex,ge(s,{normalTex:e.tex,half:e.g.half,sp:e.g.sp,n:e.g.n,det:e.det,img:e.img,imgDet:e.imgDet,site:f}));let n=new P(e.geo,_.get(e.tex));n.receiveShadow=!!e.shadow,n.castShadow=!1,n.userData={tag:`site`,terrain:!0},n.matrixAutoUpdate=!1,t.add(n)}let v=await h(e,{heightAt:o,noise:s.uniforms.tNoise.value});t.add(v.group);let y=Oe({heightAt:o,noise:s.uniforms.tNoise.value});t.add(y.mesh);let x=await c(e,{heightAt:o,...v,onLawn:y.onLawn});t.add(x.group);let S=we(e,{stalls:v.stalls,fill:.4});return t.add(S.group),e.params?.has(`sitelog`)&&console.warn(`[site] terrain tris`,p.map(e=>e.geo.index.count/3).join(`,`),`vegetation`,JSON.stringify(x.counts),`cars`,S.count,`stalls`,v.stalls.length),{group:t,heightAt:o,buildingSlots:r.map(e=>({position:new w(e.x,e.y,e.z),rotationY:e.rot,hero:!!e.hero,id:e.id})),originElevation:a.originElevation,meta:a,imagery:l,cars:S,vegetation:{clearArea:x.clearArea,lodSets:x.lodSets}}}export{ke as createSite};