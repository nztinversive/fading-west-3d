import{t as e}from"./rolldown-runtime-DK3Fl9T5.js";import{r as t}from"./preload-helper-CBSh75Uc.js";import{$r as n,Hn as r,Rn as i,Wi as a,ft as o,io as s,mr as c,no as l}from"./three.core-BF58tRDi.js";import{t as u}from"./terrain-i7uFBqtX.js";import{m as d}from"./plan-Ck4oGvH0.js";var f=e({createTerrainMaterial:()=>b,createTerrainShared:()=>m});function p(e=256){let t=new Uint8Array(e*e*4),s=e=>{let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296};for(let n=0;n<4;n++){let r=new Float32Array(e*e),i=1,a=0;for(let t=0;t<5;t++){let o=4<<t,c=s(1234+n*97+t*13),l=new Float32Array(o*o).map(()=>c());for(let t=0;t<e;t++)for(let n=0;n<e;n++){let a=n/e*o,s=t/e*o,c=Math.floor(a),u=Math.floor(s),d=a-c,f=s-u;d=d*d*(3-2*d),f=f*f*(3-2*f);let p=(e,t)=>l[t%o*o+e%o],m=(p(c,u)*(1-d)+p(c+1,u)*d)*(1-f)+(p(c,u+1)*(1-d)+p(c+1,u+1)*d)*f;r[t*e+n]+=m*i}a+=i,i*=.5}let o=1/0,c=-1/0;for(let e of r)o=Math.min(o,e),c=Math.max(c,e);for(let i=0;i<e*e;i++)t[i*4+n]=Math.round((r[i]-o)/(c-o)*255)}let c=new o(t,e,e,n);return c.wrapS=c.wrapT=a,c.magFilter=i,c.minFilter=r,c.generateMipmaps=!0,c.needsUpdate=!0,c}async function m(e){let[n,r,i,a]=await Promise.all([t(`dry_ground_rocks`,{tile:1}),t(`sparse_grass`,{tile:1}),t(`aerial_rocks_02`,{tile:1}),t(`snow_02`,{tile:1})]);return{uniforms:{uOrigin:{value:e},tNoise:{value:p()},tDirt:{value:n.map},tDirtN:{value:n.normalMap},tGrass:{value:r.map},tRock:{value:i.map},tRockN:{value:i.normalMap},tSnow:{value:a.map}}}}var h=`
uniform float uOrigin;
varying vec3 vWPos;
varying float vElev;
`,g=`
vec4 tw = modelMatrix * vec4(transformed, 1.0);
vWPos = tw.xyz;
vElev = tw.y + uOrigin + dot(tw.xz, tw.xz) * ${u.toExponential(6)};
`,_=`
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
`,v=`
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
`,y=`
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
`;function b(e,{normalTex:t,half:n,sp:r,n:i,det:a=null,img:o=null,imgDet:u=null,site:f=[]}){let p=new c({color:16777215,roughness:.95,metalness:0});return p.onBeforeCompile=c=>{Object.assign(c.uniforms,e.uniforms,{tNrm:{value:t},uHalf:{value:n},uSp:{value:r},uN:{value:i},tDet:{value:a?a.tex:t},uUseDet:{value:+!!a},uDetMin:{value:new l(a?a.rect[0]:0,a?a.rect[1]:0)},uDetSp:{value:a?a.spacing:1},uDetN:{value:new l(a?a.nx:1,a?a.nz:1)},tImg:{value:o?o.tex:t},uImgRect:{value:new s(...o?o.rect:[0,0,1,1])},tImgD:{value:u?u.tex:t},uImgW:{value:+!!o},uImgGain:{value:1.12},uSite:{value:[0,1,2].map(e=>new s(...f[e]||[1e7,1e7,1e7,1e7]))}}),c.defines={...c.defines||{},ROAD_X:300 .toFixed(1),ROAD_HALF:d.toFixed(1)},c.vertexShader=c.vertexShader.replace(`#include <common>`,`#include <common>\n${h}`).replace(`#include <begin_vertex>`,`#include <begin_vertex>\n${g}`),c.fragmentShader=c.fragmentShader.replace(`#include <common>`,`#include <common>\n${_}`).replace(`#include <map_fragment>`,v).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = tRough;`).replace(`#include <normal_fragment_maps>`,y).replace(`#include <fog_fragment>`,`
        #ifdef USE_FOG
        { float hz = 1.0 - exp(-length(vWPos - cameraPosition) / 55000.0);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor * 0.85, hz * 0.8); }
        #endif
        #include <fog_fragment>`)},p.customProgramCacheKey=()=>`fw-terrain-v14`,p}export{m as n,f as r,b as t};