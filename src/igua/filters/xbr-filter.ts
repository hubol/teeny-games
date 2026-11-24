import { Filter } from "pixi.js";

const fragment = `// thanks to madbrain: https://www.shadertoy.com/view/3slfWB

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float resolutionX;
uniform float resolutionY;

void main(void)
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = vTextureCoord;

  vec2 rf = vec2(resolutionX, resolutionY); // Resolution
  vec2 irf = 1.0 / rf; // Inversed resolution
  // uv, floored to multiple of rf
  vec2 uvf = floor(uv * rf) * irf;
  vec2 uvi = (uv - uvf) * rf; // Distance from floor

  // Each col is the color located at a point relative to uvf
  // col , col2
  // col3, col4
  vec3 col  = texture2D(uSampler, vec2(uvf.x         , uvf.y       )).xyz;
  vec3 col2 = texture2D(uSampler, vec2(uvf.x + irf.x , uvf.y       )).xyz;
  vec3 col3 = texture2D(uSampler, vec2(uvf.x         , uvf.y + irf.y )).xyz;
  vec3 col4 = texture2D(uSampler, vec2(uvf.x + irf.x , uvf.y + irf.y )).xyz;

  vec3 cre; // Color result
  vec3 dix;
  vec3 diy;
  vec3 blk;
  if(uvi.x < 0.5 && uvi.y < 0.5)
    cre = col , dix = col2, diy = col3, blk = col4;
  else if(uvi.y < 0.5)
    cre = col2, dix = col , diy = col4, blk = col3;
  else if(uvi.x < 0.5)
    cre = col3, dix = col4, diy = col , blk = col2;
  else
    cre = col4, dix = col3, diy = col2, blk = col ;

  // The diamond distance from of the mid point
  float diamond = abs(uvi.x-0.5) + abs(uvi.y-0.5);
  if(diamond < .5) {
    vec3 cdx = abs(dix - diy); // Color differce between dix and diy
    float dism = cdx.x + cdx.y + cdx.z;
    vec3 cdx2 = abs(cre - blk); // ???
    float dism2 = cdx2.x + cdx2.y + cdx2.z;
    if(dism < 0.1) {
      if (dism2 < 0.1) {
      } else {
        cre = dix;

      }
    }
  }

  // Output to screen
  gl_FragColor = vec4(cre, 1.0);
}`;

export class XbrFilter extends Filter {
    get resolutionX() {
        return this._resolutionX;
    }

    set resolutionX(value) {
        this._resolutionX = value;
        this.uniforms.resolutionX = value;
    }

    get resolutionY() {
        return this._resolutionY;
    }

    set resolutionY(value) {
        this._resolutionY = value;
        this.uniforms.resolutionY = value;
    }

    constructor(private _resolutionX: number, private _resolutionY: number) {
        const uniforms = {
            resolutionX: _resolutionX,
            resolutionY: _resolutionY,
        };
        super(undefined, fragment, uniforms);
    }
}
