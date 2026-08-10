import VanillaTilt from 'vanilla-tilt'

export function initCareerTreeTilt() {
  const card = document.getElementById('careertree-card')
  if (!card) return

  VanillaTilt.init(card, {
    max: 2,
    speed: 800,
    glare: false,
    scale: 1.006,
    perspective: 1400,
    gyroscope: false,
  })
}
