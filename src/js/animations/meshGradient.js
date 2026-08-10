import * as THREE from 'three'
import vertexShader from '../../shaders/mesh.vert.glsl?raw'
import fragmentShader from '../../shaders/mesh.frag.glsl?raw'

// Theme color palettes in linear RGB (Three.js uses linear by default)
const PALETTES = {
  'golden-hour': {
    colorA: new THREE.Color('#2B1B33'),
    colorB: new THREE.Color('#1D1B3A'),
    colorC: new THREE.Color('#3A2250'),
  },
  'ink-ember': {
    colorA: new THREE.Color('#1A1614'),
    colorB: new THREE.Color('#251F1C'),
    colorC: new THREE.Color('#221510'),
  }
}

let renderer, scene, camera, mesh, uniforms, animId

export function initMeshGradient() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Get initial theme
  const theme = document.documentElement.dataset.theme || 'golden-hour'
  const palette = PALETTES[theme] || PALETTES['golden-hour']

  // Uniforms
  uniforms = {
    uTime:      { value: 0 },
    uAmplitude: { value: 0.18 },
    uColorA:    { value: palette.colorA },
    uColorB:    { value: palette.colorB },
    uColorC:    { value: palette.colorC },
  }

  // Plane geometry — low poly for performance
  const geometry = new THREE.PlaneGeometry(2, 2, 48, 48)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Animate
  const clock = new THREE.Clock()

  function animate() {
    animId = requestAnimationFrame(animate)
    uniforms.uTime.value = clock.getElapsedTime()
    renderer.render(scene, camera)
  }
  animate()

  // Resize
  window.addEventListener('resize', onResize, { passive: true })

  // Theme change — observe data-theme attribute
  const observer = new MutationObserver(() => {
    const t = document.documentElement.dataset.theme || 'golden-hour'
    updatePalette(t)
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
}

function updatePalette(theme) {
  const p = PALETTES[theme] || PALETTES['golden-hour']
  if (!uniforms) return
  uniforms.uColorA.value = p.colorA
  uniforms.uColorB.value = p.colorB
  uniforms.uColorC.value = p.colorC
}

function onResize() {
  if (!renderer) return
  renderer.setSize(window.innerWidth, window.innerHeight)
}
