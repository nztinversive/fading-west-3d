import{F as e}from"./preload-helper-CBSh75Uc.js";var t=e,n=`/* fw-surface */`;if(!t.uv_pars_vertex.includes(n)){let e=`${n}
#ifdef FW_MACRO
varying vec3 vFwWorld;
#endif
`;t.uv_pars_vertex=e+t.uv_pars_vertex,t.uv_pars_fragment=e+t.uv_pars_fragment,t.worldpos_vertex+=`
#ifdef FW_MACRO
{
  vec4 fwP = vec4( transformed, 1.0 );
  #ifdef USE_BATCHING
    fwP = batchingMatrix * fwP;
  #endif
  #ifdef USE_INSTANCING
    fwP = instanceMatrix * fwP;
  #endif
  vFwWorld = ( modelMatrix * fwP ).xyz;
}
#endif
`,t.beginnormal_vertex+=`
#ifdef FW_SLATS
float fwK = 0.0;
int fwSlat = 0;            // 1 broad face, 2 edge face
vec3 fwC = position, fwPN = vec3( 0.0 ), fwZ = vec3( 0.0 );
{
  vec4 fwS = vec4( position, 1.0 );
  #ifdef USE_INSTANCING
    fwS = instanceMatrix * fwS;
  #endif
  float fwDist = max( - ( modelViewMatrix * fwS ).z, 0.0 );
  float fwPix = fwDist * 2.0 / ( projectionMatrix[ 1 ][ 1 ] * 1080.0 ); // metres per pixel (1080p reference)
  float fwAu = abs( uv.y );
  vec3 fwN = objectNormal;
  if ( abs( fwAu - 0.0125 ) < 2e-4 && abs( fwN.y ) > 0.3 && abs( fwN.y ) < 0.99 ) {
    vec3 ny = fwN.y > 0.0 ? fwN : - fwN;          // +y face normal
    float sh = length( ny.xz );
    fwZ = vec3( ny.x * ny.y / sh, - sh, ny.z * ny.y / sh );   // slat-local +z: room-ward, tilted down
    fwC = position - fwZ * uv.y - fwN * 0.0009;
    fwSlat = 1;
  } else if ( abs( fwAu - 0.0009 ) < 2e-4 && abs( fwN.y ) > 0.2 && abs( fwN.y ) < 0.8 ) {
    fwZ = fwN.y < 0.0 ? fwN : - fwN;
    fwC = position - fwN * 0.0125;
    fwSlat = 2;
  }
  if ( fwSlat > 0 ) {
    fwPN = - normalize( vec3( fwZ.x, 0.0, fwZ.z ) );   // window normal (toward the glass)
    fwK = smoothstep( 0.003, 0.007, fwPix ) * FW_SLATS;
    if ( fwSlat == 1 ) objectNormal = normalize( mix( objectNormal, fwPN, fwK ) );
  }
}
#endif
`,t.begin_vertex+=`
#ifdef FW_SLATS
if ( fwSlat == 1 ) {
  // lower (glass-facing) faces 0.5 mm in front of the plane, upper ones behind
  vec3 fwT = fwC - vec3( 0.0, 0.0112, 0.0 ) * sign( uv.y ) + fwPN * ( normal.y > 0.0 ? -0.0005 : 0.0005 );
  transformed = mix( transformed, fwT, fwK );
} else if ( fwSlat == 2 ) {
  transformed = mix( transformed, fwC, fwK );
}
#endif
`,t.worldpos_vertex+=`
#if defined( FW_SLATS ) && defined( USE_SHADOWMAP )
  if ( fwSlat > 0 ) {
    worldPosition = vec4( fwC + fwPN * 0.06, 1.0 );
    #ifdef USE_INSTANCING
      worldPosition = instanceMatrix * worldPosition;
    #endif
    worldPosition = modelMatrix * worldPosition;
  }
#endif
`,t.map_pars_fragment=`
#if defined( FW_MACRO ) || defined( FW_STOCH )
float fwHash3( vec3 p ) {
  p = fract( p * vec3( 0.1031, 0.1030, 0.0973 ) );
  p += dot( p, p.yxz + 33.33 );
  return fract( ( p.x + p.y ) * p.z );
}
float fwNoise3( vec3 x ) {
  vec3 i = floor( x ), f = fract( x );
  f = f * f * ( 3.0 - 2.0 * f );
  return mix( mix( mix( fwHash3( i ), fwHash3( i + vec3( 1, 0, 0 ) ), f.x ),
                   mix( fwHash3( i + vec3( 0, 1, 0 ) ), fwHash3( i + vec3( 1, 1, 0 ) ), f.x ), f.y ),
              mix( mix( fwHash3( i + vec3( 0, 0, 1 ) ), fwHash3( i + vec3( 1, 0, 1 ) ), f.x ),
                   mix( fwHash3( i + vec3( 0, 1, 1 ) ), fwHash3( i + vec3( 1, 1, 1 ) ), f.x ), f.y ), f.z );
}
#endif
#ifdef FW_MACRO
// ~[-1, 1], mostly within ±0.6: broad blotches + mid mottling + fine variation + vertical streaks
float fwMacroNoise( vec3 p ) {
  float n = 0.45 * fwNoise3( p * 0.11 ) + 0.27 * fwNoise3( p * 0.37 + 17.0 ) + 0.13 * fwNoise3( p * 1.3 + 41.0 )
          + 0.15 * fwNoise3( vec3( p.x * 1.7, p.y * 0.12, p.z * 1.7 ) + 7.0 );
  return clamp( ( n - 0.5 ) * 3.0, -1.0, 1.0 );
}
#endif
#ifdef FW_STOCH
// offset-only stochastic tiling (Quilez, "texture repetition" #3)
float fwStochK( vec2 uv ) { return fwNoise3( vec3( uv * 0.9, 3.7 ) ); }
vec4 fwTexNT( sampler2D s, vec2 uv, float k, bool useCol ) {
  float l = k * 8.0, ia = floor( l ), f = fract( l );
  vec2 oa = sin( vec2( 3.0, 7.0 ) * ia ), ob = sin( vec2( 3.0, 7.0 ) * ( ia + 1.0 ) );
  vec2 dx = dFdx( uv ), dy = dFdy( uv );
  vec4 a = textureGrad( s, uv + oa, dx, dy ), b = textureGrad( s, uv + ob, dx, dy );
  float d = useCol ? 0.1 * dot( a.rgb - b.rgb, vec3( 1.0 ) ) : 0.0;
  return mix( a, b, smoothstep( 0.2, 0.8, f - d ) );
}
#endif
`+t.map_pars_fragment,t.map_fragment=t.map_fragment.replace(`vec4 sampledDiffuseColor = texture2D( map, vMapUv );`,`#ifdef FW_STOCH
	vec4 sampledDiffuseColor = fwTexNT( map, vMapUv, fwStochK( vMapUv ), true );
	#else
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#endif`)+`
#ifdef FW_MACRO
  float fwM = fwMacroNoise( vFwWorld );
  // tonal: luminance ±FW_MACRO, darker patches very slightly warmer (dust / weathering)
  diffuseColor.rgb *= ( 1.0 + FW_MACRO * fwM ) * mix( vec3( 1.0 ), vec3( 1.02, 1.0, 0.96 ), clamp( - fwM, 0.0, 1.0 ) * FW_MACRO * 4.0 );
#endif
`,t.roughnessmap_fragment=t.roughnessmap_fragment.replace(`vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );`,`#ifdef FW_STOCH
	vec4 texelRoughness = fwTexNT( roughnessMap, vRoughnessMapUv, fwStochK( vRoughnessMapUv ), false );
	#else
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	#endif`)+`
#ifdef FW_MACRO
  roughnessFactor = clamp( roughnessFactor * ( 1.0 + 0.9 * FW_MACRO * fwM ), 0.04, 1.0 );
#endif
`,t.lights_fragment_end=`
#if defined( FW_ENVGAIN ) && defined( RE_IndirectSpecular )
  {
    // the sky cube has no ground: reflections pointing below the horizon see the (darker) site instead
    vec3 fwR = transformDirectionByInverseViewMatrix( reflect( - geometryViewDir, geometryNormal ), viewMatrix );
    radiance *= FW_ENVGAIN * mix( 0.22, 1.0, smoothstep( -0.12, 0.04, fwR.y ) );
  }
#endif
#if defined( FW_BOUNCE ) && defined( RE_IndirectDiffuse ) && NUM_DIR_LIGHTS > 0
  {
    // sunlight bounced off the (bright, sunlit) ground: irradiance ≈ ground albedo × horizontal sun
    // irradiance × the face's view factor to the ground (1 facing down, ½ vertical, 0 facing up)
    vec3 fwUp = normalize( ( viewMatrix * vec4( 0.0, 1.0, 0.0, 0.0 ) ).xyz );
    float fwSunH = saturate( dot( directionalLights[ 0 ].direction, fwUp ) );
    irradiance += directionalLights[ 0 ].color * ( fwSunH * FW_BOUNCE * 0.5 * ( 1.0 - dot( geometryNormal, fwUp ) ) );
  }
#endif
`+t.lights_fragment_end,t.opaque_fragment=t.opaque_fragment.replace(`gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,`#ifdef FW_FRESNEL
	{
		float fwC = 1.0 - saturate( abs( dot( normalize( normal ), normalize( vViewPosition ) ) ) );
		float fwF = 0.04 + 0.96 * fwC * fwC * fwC * fwC * fwC;
		diffuseColor.a = mix( diffuseColor.a, 1.0, saturate( fwF * FW_FRESNEL ) );
	}
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );`),t.normal_fragment_maps=t.normal_fragment_maps.replace(`vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;`,`#ifdef FW_STOCH
	vec3 mapN = fwTexNT( normalMap, vNormalMapUv, fwStochK( vNormalMapUv ), false ).xyz * 2.0 - 1.0;
	#else
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#endif`)}function r(e){Object.prototype.hasOwnProperty.call(e,`clone`)||(e.clone=function(){let e=new this.constructor().copy(this);return e.defines={...this.defines},r(e),e})}var i={wall:`0.10`,roof:`0.07`,trim:`0.035`};function a(e,{macro:t=null,stoch:n=!1,slats:a=null,envGain:o=null,fresnel:s=null,bounce:c=null}={}){if(!e)return e;let l={...e.defines||{}};return c&&(l.FW_BOUNCE=Number(c).toFixed(3)),o&&(l.FW_ENVGAIN=Number(o).toFixed(2)),s&&(l.FW_FRESNEL=Number(s).toFixed(2)),t&&(l.FW_MACRO=t===!0?i.wall:t),n&&(l.FW_STOCH=``),a&&(l.FW_SLATS=Number(a).toFixed(2)),e.defines=l,r(e),e.needsUpdate=!0,e}export{a as n,i as t};