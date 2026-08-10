export function initFramingEngine() {
  const scenarioBtns = document.querySelectorAll('.scenario-btn')
  const regionTabs   = document.querySelectorAll('.region-tab')
  const allPanels    = document.querySelectorAll('.framing-panel')
  const compareBtn   = document.getElementById('compare-toggle')
  const engine       = document.getElementById('framing-engine')
  const indicator    = document.querySelector('.scenario-indicator')
  const picker       = document.querySelector('.scenario-picker')

  if (!scenarioBtns.length) return

  let activeScenario = '0'
  let activeRegion   = 'us'
  let compareMode    = false

  function positionIndicator() {
    if (!indicator || !picker) return
    const activeBtn = picker.querySelector('.scenario-btn.active')
    if (!activeBtn) return
    const pad = 3
    const pickerRect = picker.getBoundingClientRect()
    const btnRect    = activeBtn.getBoundingClientRect()
    indicator.style.width  = btnRect.width + 'px'
    indicator.style.height = btnRect.height + 'px'
    indicator.style.transform = `translateX(${btnRect.left - pickerRect.left - pad}px)`
  }

  function showPanel() {
    allPanels.forEach(p => {
      p.classList.remove('active', 'compare-visible')
      p.style.opacity = ''
      p.style.transition = ''
    })

    if (compareMode) {
      allPanels.forEach(p => {
        if (p.dataset.scenario === activeScenario) p.classList.add('compare-visible')
      })
    } else {
      const target = document.querySelector(
        `.framing-panel[data-scenario="${activeScenario}"][data-region="${activeRegion}"]`
      )
      if (!target) return
      target.classList.add('active')
    }
  }

  function setCompareMode(on) {
    compareMode = on
    if (on) engine.dataset.compare = 'true'
    else delete engine.dataset.compare
    compareBtn?.classList.toggle('active', on)
    compareBtn?.setAttribute('aria-pressed', String(on))
    showPanel()
  }

  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false') })
      btn.classList.add('active')
      btn.setAttribute('aria-selected', 'true')
      activeScenario = btn.dataset.scenario
      positionIndicator()
      showPanel()
    })
  })

  regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      regionTabs.forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      activeRegion = tab.dataset.region
      if (compareMode) setCompareMode(false)
      else showPanel()
    })
  })

  compareBtn?.addEventListener('click', () => setCompareMode(!compareMode))

  // Set initial indicator position after layout
  requestAnimationFrame(positionIndicator)
  window.addEventListener('resize', positionIndicator)
}
