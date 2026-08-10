import './css/base.css'
import './css/nav.css'
import './css/sections.css'

// Force scroll to top on load — overrides browser anchor-jump from URL hash
window.addEventListener('load', () => {
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
})

import { initMeshGradient } from './js/animations/meshGradient.js'
import { initThemeToggle }  from './js/ui/themeToggle.js'
import { initNav }          from './js/ui/nav.js'
import { initFramingEngine } from './js/ui/framingEngine.js'
import { initScrollReveals } from './js/animations/scrollReveals.js'
import { initCountUps }      from './js/animations/countUps.js'
import { initCareerTreeTilt } from './js/animations/careerTreeTilt.js'
import { initLangPills }      from './js/ui/langPills.js'
import { initScrollSpy }      from './js/ui/scrollSpy.js'
import { initMobileCardStack } from './js/ui/mobileCardStack.js'

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle()
  initNav()
  initMeshGradient()
  initFramingEngine()
  initScrollReveals()
  initCountUps()
  initCareerTreeTilt()
  initLangPills()
  initScrollSpy()
  initMobileCardStack()
})
