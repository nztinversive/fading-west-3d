import{a as e}from"./preload-helper-CBSh75Uc.js";import{A as t,B as n,Lt as r,O as i,Tn as a,ct as o,io as s,j as c,no as l,pa as u,pr as d,qi as f,qt as p,ro as m}from"./three.core-BF58tRDi.js";import{c as h,l as g}from"./surfaces-kxXMbRMR.js";var _={plastic:0,glass:.25,chrome:.5,lamp:.75};function v(e,n,r,i=0){e=e.index?e.toNonIndexed():e;for(let t of Object.keys(e.attributes))[`position`,`normal`].includes(t)||e.deleteAttribute(t);let a=e.attributes.position.count,o=new Float32Array(a*3),s=new Float32Array(a*2);for(let e=0;e<a;e++)o.set(n,e*3),s[e*2]=i,s[e*2+1]=r;return e.setAttribute(`tcol`,new t(o,3)),e.setAttribute(`pg`,new t(s,2)),e}function y(e){e=e.index?e.toNonIndexed():e;let t=e.attributes.position,n=e.attributes.normal;for(let e=0;e<t.count;e+=3)for(let r of[t,n]){let t=[r.getX(e+1),r.getY(e+1),r.getZ(e+1)];r.setXYZ(e+1,r.getX(e+2),r.getY(e+2),r.getZ(e+2)),r.setXYZ(e+2,...t)}for(let e=0;e<n.count;e++)n.setXYZ(e,-n.getX(e),-n.getY(e),-n.getZ(e));return e}var b=(e,t,n,r,a,o,s,c=_.plastic,l=0)=>{let u=new i(e,t,n);return u.translate(r,a,o),v(u,s,c,l)},x=(e,t)=>{if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++)if(t<=e[n][0]){let[r,i]=e[n-1],[a,o]=e[n];return i+(o-i)*(t-r)/(a-r)}return e[e.length-1][1]},S=(e,t,n)=>{let r=Math.min(Math.max((n-e)/(t-e),0),1);return r*r*(3-2*r)};function C(e){let t=e.length,n=[],r=Array(t).fill(0);for(let r=0;r<t-1;r++)n.push((e[r+1][1]-e[r][1])/(e[r+1][0]-e[r][0]));r[0]=n[0],r[t-1]=n[t-2];for(let i=1;i<t-1;i++){if(n[i-1]*n[i]<=0)continue;let t=e[i][0]-e[i-1][0],a=e[i+1][0]-e[i][0],o=2*a+t,s=a+2*t;r[i]=(o+s)/(o/n[i-1]+s/n[i])}return n=>{if(n<=e[0][0])return e[0][1];let i=1;for(;i<t-1&&n>e[i][0];)i++;let[a,o]=e[i-1],[s,c]=e[i],l=s-a,u=Math.min(1,(n-a)/l),d=u*u,f=d*u;return(2*f-3*d+1)*o+(f-2*d+u)*l*r[i-1]+(-2*f+3*d)*c+(f-d)*l*r[i]}}var w=(e,t,n)=>{let r=Math.max(n-Math.abs(e-t),0)/n;return Math.min(e,t)-r*r*n*.25},T={sedan:{L:4.76,hw:.91,wr:.33,wx:1.43,yb0:.3,belt:.97,cab:[-1.42,1.1],bpillar:-.2,clad:0,weight:.24,top:[[-2.38,.72],[-2.33,.9],[-2.1,.97],[-1.42,1],[-.8,1.41],[.3,1.44],[1.08,1],[1.6,.92],[2.22,.82],[2.38,.62]]},hatch:{L:4.25,hw:.89,wr:.32,wx:1.3,yb0:.3,belt:.98,cab:[-1.98,1],bpillar:-.45,clad:0,weight:.16,top:[[-2.12,.78],[-2.1,1.02],[-1.98,1.36],[-1.62,1.45],[.3,1.47],[1,1],[1.55,.9],[2.02,.8],[2.12,.6]]},cuv:{L:4.55,hw:.92,wr:.35,wx:1.35,yb0:.34,belt:1.03,cab:[-2.05,1.2],bpillar:-.3,clad:.13,weight:.24,top:[[-2.27,.88],[-2.24,1.08],[-2.05,1.5],[-1.7,1.57],[.45,1.6],[1.2,1.04],[1.75,.97],[2.18,.86],[2.27,.64]],rails:!0},suv:{L:4.85,hw:.97,wr:.38,wx:1.45,yb0:.38,belt:1.1,cab:[-2.25,1.25],bpillar:-.3,clad:.15,weight:.18,top:[[-2.42,.94],[-2.39,1.12],[-2.25,1.72],[.5,1.78],[1.25,1.12],[1.85,1.06],[2.32,.96],[2.42,.72]],rails:!0},pickup:{L:5.6,hw:.99,wr:.4,wx:1.75,yb0:.46,belt:1.22,cab:[-.82,1.2],bpillar:-.1,clad:.08,weight:.18,bed:[-2.78,-.86],top:[[-2.8,1.1],[-2.76,1.23],[-.86,1.23],[-.82,1.86],[.55,1.9],[1.2,1.24],[1.95,1.17],[2.66,1.06],[2.8,.8]]}},E=e=>e.wr+.075;function D(e,t){let n=E(e),r=Math.abs(t)-e.wx;return Math.abs(r)<n?e.wr+Math.sqrt(n*n-r*r):-1}function O(e,t){let n=e.L/2,i=E(e),a=t?.2:.035,o=t?.45:.19,s=t?.13:.06,l=t?t=>x(e.top,t):C(e.top),u=t=>Math.abs(Math.abs(t)-e.wx)<i+.1,d=[];for(let e=-n;e<n-1e-6;e+=Math.abs(e)>n-.4?a:u(e)?s:o)d.push(e);d.push(n,-e.wx-i,-e.wx+i,e.wx-i,e.wx+i,e.bpillar-.07,e.bpillar+.07),d.sort((e,t)=>e-t),d=d.filter((e,t)=>t===0||e-d[t-1]>.015);let f=[],p=[],m=0,h=r=>{let i=e.yb0+.1*S(n-.45,n,Math.abs(r)),a=l(r),o=e.hw*(1-.06*(Math.abs(r)/n)**4);o*=.7+.3*Math.sqrt(Math.max(0,1-(Math.max(0,Math.abs(r)-(n-.38))/.38)**2));let s=r>e.cab[0]&&r<e.cab[1]&&a>e.belt+.05,c=t?Math.min(e.belt,a-.03):w(e.belt,a-.03,.12),u=Math.max(c-i,.05),d=t?Math.min(e.belt+.03,a):w(e.belt+.03,a,.12),f=[[0,i-.02],[.82*o,i],[.95*o,i+Math.min(.05,.12*u)],[.995*o,i+Math.min(.17,.35*u)],[o,i+Math.min(.3,.55*u)],[o,i+.75*u],[.985*o,c-Math.min(.07,.12*u)],[.955*o,c],[.87*o,d],[.72*o,Math.max(d,a-.07)],[.6*o,Math.max(d,a-.01)],[0,a+.015]],p=D(e,r);if(p>0)for(let e=1;e<=5;e++)f[e][1]=Math.max(f[e][1],Math.min(p,f[6][1]-.03));let m=f;if(!t){let e=[[-f[1][0],f[1][1]],...f,[-f[10][0],f[10][1]]];m=[];for(let t=0;t<f.length-1;t++){let[n,r,i,a]=[e[t],e[t+1],e[t+2],e[t+3]],o=[0,1].map(e=>Math.min(Math.max((-n[e]+9*r[e]+9*i[e]-a[e])/16,Math.min(r[e],i[e])),Math.max(r[e],i[e])));m.push(r,o)}m.push(f[f.length-1])}return{ringPts:[...m,...m.slice(1,-1).reverse().map(([e,t])=>[-e,t])],yt:a,cab:s,back:r<e.cab[0]&&a>e.belt+.1}};for(let e of d){let{ringPts:t,yt:n,cab:r,back:i}=h(e);m=t.length,p.push({ring:t.map(([t,n])=>(f.push(e,n,t),f.length/3-1)),x:e,yt:n,cab:r,back:i})}let g=t?1:2,_=11*g,v=e=>e<=_?e:m-e,y=[],b=[],T=e=>{let t=p[Math.max(e-1,0)],n=p[Math.min(e+1,p.length-1)];return(n.yt-t.yt)/Math.max(n.x-t.x,.001)};if(!t){let e=p.findIndex((e,t)=>t<p.length-1&&e.back&&p[t+1].back&&Math.abs(T(t))>.35);if(e>0&&e<p.length-1){let t=p[e],n=e=>[f[t.ring[e]*3+1],f[t.ring[e]*3+2]],[r]=n(_),[i,a]=n(_-g),o=(r-i)/Math.max(a*a,1e-4);for(let n=_-2*g;n<_;n++){if(n===_-g)continue;let i=e=>{let[t,i]=h(e).ringPts[n];return i-(r-o*t*t)},a=p[e-1].x,s=p[e+1].x;if(!(i(t.x)<0&&i(s)>0))continue;a=t.x;for(let e=0;e<30;e++){let e=(a+s)/2;i(e)<0?a=e:s=e}let[c,l]=h(s).ringPts[n];for(let[e,r]of[[n,1],[m-n,-1]]){let n=t.ring[e];f[n*3]=s,f[n*3+1]=l,f[n*3+2]=r*c}}}}for(let t=0;t<p.length-1;t++)for(let n=0;n<m;n++){let r=p[t],i=p[t+1],a=(n+1)%m,o=r.ring[n],s=i.ring[n],c=i.ring[a],l=r.ring[a];y.push(o,s,l,s,c,l);let u=(r.x+i.x)/2,d=r.cab&&i.cab,f=Math.floor(Math.min(v(n),v(a))/g),h=Math.abs(T(t))>.35,_=0;d&&f===8?_=Math.abs(u-e.bpillar)>.07?1:2:d&&f===7?_=2:(d&&(f===9||f===10)&&h||r.back&&i.back&&(f===9||f===10)&&h)&&(_=1),b.push(_,_)}for(let[e,n]of[[0,-1],[p.length-1,1]]){let r=p[e],i=(f[r.ring[0]*3+1]+r.yt)/2,a=r.ring;for(let e of t?[]:[.72,.4]){let t=a.map((t,a)=>{let o=f[r.ring[a]*3+2],s=f[r.ring[a]*3+1];return f.push(r.x+n*.05*(1-e*e),i+(s-i)*e,o*e),f.length/3-1});for(let e=0;e<m;e++){let r=(e+1)%m,i=a[e],o=a[r],s=t[e],c=t[r];n>0?y.push(s,o,i,s,c,o):y.push(s,i,o,s,o,c),b.push(0,0)}a=t}let o=f.length/3;f.push(r.x+n*.05,i,0);for(let e=0;e<m;e++){let t=a[e],r=a[(e+1)%m];n>0?y.push(o,r,t):y.push(o,t,r),b.push(0)}}let O=new c;O.setAttribute(`position`,new r(f,3)),O.setIndex(y),O.computeVertexNormals();let k=e=>{let t=[],n=[],i=O.attributes.position,a=O.attributes.normal;for(let r=0;r<y.length/3;r++)if(b[r]===e)for(let e=0;e<3;e++){let o=y[r*3+e];t.push(i.getX(o),i.getY(o),i.getZ(o)),n.push(a.getX(o),a.getY(o),a.getZ(o))}let o=new c;return o.setAttribute(`position`,new r(t,3)),o.setAttribute(`normal`,new r(n,3)),o};return{body:k(0),glass:k(1),trim:k(2)}}function k(t,r){let{wr:s,hw:c}=t,u=[],d=[.03,.03,.032],p=[.5,.51,.53],m=[.04,.04,.045],h=[.012,.012,.013],g=E(t);if(r){let t=new o(s,s,.22,10);t.rotateX(Math.PI/2),t.translate(0,s,0),u.push(v(t,d,_.plastic));let r=new n(s*.62,10);r.translate(0,s,.112),u.push(v(r,p,_.chrome));let i=new n(g,8,0,Math.PI);return i.translate(0,s,-.12),u.push(v(i,h,_.plastic)),e(u)}let b=new o(g+.01,g+.01,.42,24,1,!0,Math.PI/2,Math.PI);b.rotateX(Math.PI/2),b.translate(0,s,-.09),u.push(v(y(b),h,_.plastic));let x=s,S=s*.66,C=.115,w=[[S,-.115*.9],[x-.045,-.115],[x-.008,-.115*.75],[x,-.0345],[x,C*.3],[x-.008,C*.75],[x-.045,C],[S,C*.9]].map(([e,t])=>new l(e,t)),T=new a(w,30);T.rotateX(Math.PI/2),T.translate(0,s,0),u.push(v(T,d,_.plastic));let D=new n(S,28);D.translate(0,s,.036250000000000004),u.push(v(D,m,_.plastic));let O=new f(S*.88,S,30);O.translate(0,s,.08625000000000001),u.push(v(O,p,_.chrome));let k=[];for(let e=0;e<5;e++)for(let t of[-.11,.11]){let n=new i(S*.8,.032,.03);n.translate(S*.44,0,0),n.rotateZ(e/5*Math.PI*2+t),k.push(n)}let A=e(k);A.translate(0,s,.07225000000000001),u.push(v(A,p,_.chrome));let j=new o(S*.2,S*.24,.05,16);return j.rotateX(Math.PI/2),j.translate(0,s,.07625000000000001),u.push(v(j,p,_.chrome)),e(u)}function A(t,n){let r=T[t],i=r.L/2,a=r.hw*2,{body:o,glass:s,trim:c}=O(r,n),l=[v(o,[1,1,1],_.plastic,1),v(s,[.012,.014,.016],_.glass),v(c,[.018,.018,.02],_.lamp)],d=[.03,.03,.032],f=[.8,.8,.76],p=k(r,n);for(let e of[-1,1])for(let t of[-1,1]){let n=p.clone();t<0&&n.rotateY(Math.PI),l.push(n.translate(e*r.wx,0,t*(r.hw-.13)))}for(let e of[-1,1]){let t=r.cab[1]-.2,i=r.belt+.08;if(n)l.push(b(.16,.1,.13,t,i,e*(r.hw+.03),[1,1,1],_.plastic,1));else{let n=new u(1,14,10);n.scale(.085,.055,.075),n.translate(t,i,e*(r.hw+.035)),l.push(v(n,[1,1,1],_.plastic,1))}n||(l.push(b(.07,.035,.08,t+.04,i-.05,e*(r.hw-.03),d)),l.push(b(.17,.028,.014,r.bpillar-.38,r.belt-.13,e*(r.hw+.004),[1,1,1],_.plastic,1)),l.push(b(.17,.028,.014,r.bpillar+.48,r.belt-.13,e*(r.hw+.004),[1,1,1],_.plastic,1)),r.rails&&l.push(b(r.L*.42,.035,.035,-.35,x(r.top,-.35)+.04,e*r.hw*.52,d)))}if(!n&&(l.push(b(.03,.12,.5,-i-.01,r.yb0+.3,0,f)),l.push(b(.03,.12,.5,i+.02,r.yb0+.17,0,f)),r.bed)){for(let e of[-1,1])l.push(b(r.bed[1]-r.bed[0],.04,.08,(r.bed[0]+r.bed[1])/2,1.245,e*(r.hw*.62),d));l.push(b(.02,.4,a*.7,r.bed[0]+.03,.95,0,d))}l.push(b(r.L-1.2,.16,a-.6,0,r.yb0,0,d));let m=e(l);return m.computeBoundingSphere(),m}function j(e){let t=new d({color:16777215,roughness:.4,metalness:.2,clearcoat:1,clearcoatRoughness:.09}),n=e.L/2,r=E(e),i=e.bed?e.cab[0]+.03:-e.wx+r+.06,a={uC0:{value:new s(n,e.yb0+.4,e.yb0+.5,e.belt)},uC1:{value:new s(e.cab[1]-.06,e.bpillar,i,e.hw)},uC2:{value:new s(e.yb0,e.clad,e.wx,r)}};return t.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
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
#include <opaque_fragment>`)},t.customProgramCacheKey=()=>`fw-car-v6`,t}var M=[[[.78,.78,.76],0,15],[[.7,.69,.64],1,7],[[.82,.82,.81],0,4],[[.012,.012,.014],0,12],[[.02,.021,.024],1,10],[[.16,.165,.17],1,8],[[.075,.08,.085],1,6],[[.3,.3,.29],0,5],[[.5,.51,.52],1,8],[[.38,.39,.4],1,4],[[.028,.05,.1],1,5],[[.09,.12,.16],1,4],[[.26,.022,.022],1,5],[[.13,.018,.022],1,3],[[.035,.055,.042],1,2],[[.2,.16,.11],1,2]],N=M.reduce((e,t)=>e+t[2],0);function P(e){let t=e()*N;for(let[e,n,r]of M)if((t-=r)<=0)return n?e.map(e=>-e):e;return M[0][0]}function F(e,{stalls:t,fill:n=.4,seed:r=99}){let i=h(r),a=Object.keys(T),o=[],s=0;for(let e of a)s+=T[e].weight,o.push(s);let c=()=>{let e=i()*s;return a[o.findIndex(t=>e<=t)]},l=Object.fromEntries(a.map(e=>[e,[]]));for(let e of t){if(i()>(e.ada?n*.4:n))continue;let t=c(),r=T[t],[a,o]=e.dir,s=(i()-.5)*.3,u=.15+(i()-.5)*.25-Math.max(0,r.L-4.8)*.5,d=e.x+a*u-o*s,f=e.z+o*u+a*s,p=Math.atan2(-o,a)+(i()-.5)*.06;l[t].push({x:d,y:e.y,z:f,yaw:i()<.12?p+Math.PI:p,s:1,sy:1,tint:P(i)})}let u=new p;u.name=`cars`;let d=[],f=!e.params?.has?.(`shot`),_=[];for(let e of a){if(!l[e].length)continue;let t=j(T[e]),n=A(e,1),r={name:`car-${e}`,height:2,lods:[f?n:A(e,0),n],mats:[t,t]},i=new g(r,l[e],[55,3e3,0],{shadow:!0,key:`car-${e}`});i.meshes[1].castShadow=!0,u.add(i.group),d.push(i),f&&_.push([e,i])}if(_.length){let e=e=>window.requestIdleCallback?requestIdleCallback(e,{timeout:2e3}):setTimeout(e,60),t=()=>{let n=_.shift();if(!n)return;let[r,i]=n;i.meshes[0].geometry=A(r,0),e(t)},n=()=>window.__APP_READY?e(t):setTimeout(n,250);n()}let v=new m,y=()=>{e.camera.getWorldPosition(v);for(let e of d)e.update(v)};y(),e.onUpdate?.(y);let b=new m;return{group:u,clearArea:e=>{u.updateWorldMatrix(!0,!0);for(let t of d)t.setHidden(e?(n,r,i)=>e(b.set(n,r,i).applyMatrix4(t.group.matrixWorld)):null)},count:Object.values(l).reduce((e,t)=>e+t.length,0)}}export{F as t};