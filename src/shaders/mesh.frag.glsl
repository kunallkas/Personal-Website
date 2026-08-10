uniform vec3 uColorA;    // dark bg color (e.g. plum or charcoal)
uniform vec3 uColorB;    // secondary bg color (e.g. indigo or darker charcoal)
uniform vec3 uColorC;    // accent hint (very subtle, barely visible)
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
  // Blend between two bg colors based on UV + elevation
  float mixStrength = (vElevation + 0.5) * 0.5;

  // Slow horizontal drift
  float drift = sin(vUv.x * 2.0 + uTime * 0.15) * 0.5 + 0.5;

  vec3 color = mix(uColorA, uColorB, vUv.y * 0.6 + drift * 0.4);

  // Extremely subtle accent blush in high-elevation areas
  color = mix(color, uColorC, clamp(mixStrength * 0.08, 0.0, 0.06));

  gl_FragColor = vec4(color, 1.0);
}
