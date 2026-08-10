uniform float uTime;
uniform float uAmplitude;

varying vec2 vUv;
varying float vElevation;

// Simple smooth noise approximation using sin/cos harmonics
float noise(vec2 p) {
  return sin(p.x * 1.3 + uTime * 0.4) * cos(p.y * 1.1 + uTime * 0.3) * 0.5
       + sin(p.x * 0.7 - uTime * 0.2) * sin(p.y * 1.7 + uTime * 0.25) * 0.3
       + cos(p.x * 2.1 + uTime * 0.15) * cos(p.y * 0.9 - uTime * 0.35) * 0.2;
}

void main() {
  vUv = uv;
  vec3 pos = position;
  float elevation = noise(pos.xy * 0.8) * uAmplitude;
  pos.z += elevation;
  vElevation = elevation;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
