export function initMobileCardStack() {
  const grid = document.querySelector('.projects-grid')
  if (!grid) return

  const cards = Array.from(grid.querySelectorAll('.project-card'))
  if (cards.length < 2) return

  let active = 0
  let totalCards = cards.length

  function isMobile() {
    return window.matchMedia('(max-width: 640px)').matches
  }

  // Set container height to the tallest card
  function syncHeight() {
    if (!isMobile()) { grid.style.height = ''; return }
    const heights = cards.map(c => {
      c.style.display = 'block'
      return c.scrollHeight
    })
    const max = Math.max(...heights)
    grid.style.height = (max + 20) + 'px'
  }

  function applyStack(dragOffsetX = 0, isDragging = false) {
    cards.forEach((card, i) => {
      const pos = ((i - active) % totalCards + totalCards) % totalCards
      const isFront = pos === 0
      const isBack1 = pos === 1

      if (isDragging && isFront) {
        card.style.transition = 'none'
        const pct = Math.min(Math.abs(dragOffsetX) / 120, 1)
        const rotate = dragOffsetX * 0.04
        const scale = 1 - pct * 0.04
        card.style.transform = `translateX(${dragOffsetX}px) rotate(${rotate}deg) scale(${scale})`
        card.style.opacity = String(1 - pct * 0.3)
        card.style.zIndex = '2'
      } else if (isDragging && isBack1) {
        const pct = Math.min(Math.abs(dragOffsetX) / 120, 1)
        card.style.transition = 'none'
        const y = 14 - pct * 14
        const scale = 0.94 + pct * 0.06
        card.style.transform = `translateY(${y}px) scale(${scale})`
        card.style.opacity = String(0.72 + pct * 0.28)
        card.style.zIndex = '1'
      } else {
        card.style.transition = 'transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.42s ease'
        if (isFront) {
          card.style.transform = 'translateY(0) scale(1)'
          card.style.opacity = '1'
          card.style.zIndex = '2'
        } else if (isBack1) {
          card.style.transform = 'translateY(14px) scale(0.94)'
          card.style.opacity = '0.72'
          card.style.zIndex = '1'
        } else {
          card.style.transform = 'translateY(24px) scale(0.89)'
          card.style.opacity = '0'
          card.style.zIndex = '0'
        }
      }
    })
  }

  function updateDots() {
    const dots = grid.parentElement?.querySelectorAll('.stack-dot')
    dots?.forEach((dot, i) => dot.classList.toggle('active', i === active))
  }

  function advance(dir) {
    active = ((active + dir) % totalCards + totalCards) % totalCards
    applyStack()
    updateDots()
    syncHeight()
  }

  // Touch handling
  let touchStartX = 0
  let touchStartY = 0
  let touchDeltaX = 0
  let isHorizDrag = false

  function onTouchStart(e) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    touchDeltaX = 0
    isHorizDrag = false
  }

  function onTouchMove(e) {
    const dx = e.touches[0].clientX - touchStartX
    const dy = e.touches[0].clientY - touchStartY

    if (!isHorizDrag && Math.abs(dy) > Math.abs(dx)) return

    isHorizDrag = true
    touchDeltaX = dx
    e.preventDefault()
    applyStack(dx, true)
  }

  function onTouchEnd() {
    if (!isHorizDrag) return
    if (Math.abs(touchDeltaX) > 60) {
      advance(touchDeltaX < 0 ? 1 : -1)
    } else {
      applyStack(0, false)
    }
    touchDeltaX = 0
    isHorizDrag = false
  }

  function enable() {
    grid.classList.add('stack-mode')
    syncHeight()
    applyStack()

    // Dot indicators
    const dotRow = document.createElement('div')
    dotRow.className = 'stack-dots'
    cards.forEach((_, i) => {
      const dot = document.createElement('span')
      dot.className = 'stack-dot' + (i === 0 ? ' active' : '')
      dot.addEventListener('click', () => { active = i; applyStack(); updateDots(); syncHeight() })
      dotRow.appendChild(dot)
    })
    grid.parentElement?.insertBefore(dotRow, grid.nextSibling)

    grid.addEventListener('touchstart', onTouchStart, { passive: true })
    grid.addEventListener('touchmove', onTouchMove, { passive: false })
    grid.addEventListener('touchend', onTouchEnd)
  }

  function disable() {
    grid.classList.remove('stack-mode')
    grid.style.height = ''
    cards.forEach(card => {
      card.style.cssText = ''
    })
    grid.parentElement?.querySelector('.stack-dots')?.remove()
    grid.removeEventListener('touchstart', onTouchStart)
    grid.removeEventListener('touchmove', onTouchMove)
    grid.removeEventListener('touchend', onTouchEnd)
  }

  let enabled = false

  function check() {
    const mobile = isMobile()
    if (mobile && !enabled) { enable(); enabled = true }
    else if (!mobile && enabled) { disable(); enabled = false }
  }

  check()
  window.addEventListener('resize', check)
}
