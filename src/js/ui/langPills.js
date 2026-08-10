const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#&%'

function scrambleTo(el, target, duration = 520) {
  const totalSteps = Math.round(duration / 38)
  let step = 0
  let timer = setInterval(() => {
    step++
    const progress = step / totalSteps
    el.textContent = Array.from(target).map((char, i) => {
      if (char === ' ' || char === '.' || char === '।') return char
      if (i / target.length < progress) return char
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    }).join('')
    if (step >= totalSteps) {
      clearInterval(timer)
      el.textContent = target
    }
  }, 38)
}

export function initLangPills() {
  const pills = document.querySelectorAll('.lang-pill')
  const accent = document.querySelector('#hero-headline .accent')
  if (!pills.length || !accent) return

  const words = {
    en: 'nuance.',
    hi: 'बारीकियाँ.',
    ja: '機微.',
    te: 'సూక్ష్మత.',
  }

  // Shared tooltip element for mobile — one element, always same position
  const langRow = pills[0].closest('.hero-langs')
  const sharedTip = document.createElement('div')
  sharedTip.className = 'lang-tooltip'
  langRow.appendChild(sharedTip)
  let tipTimer = null

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const lang = pill.dataset.lang
      if (!lang || pill.classList.contains('active')) return

      pills.forEach(p => p.classList.remove('active'))
      pill.classList.add('active')

      accent.dataset.lang = lang
      scrambleTo(accent, words[lang] || 'nuance.')
    })

    // Mobile: show shared tooltip above the tapped pill
    pill.addEventListener('touchstart', () => {
      clearTimeout(tipTimer)
      sharedTip.textContent = pill.dataset.tooltip || ''

      // Position above the specific pill, clamped to stay within row bounds
      const pillCenter = pill.offsetLeft + pill.offsetWidth / 2
      const tipHalfW = sharedTip.offsetWidth / 2 || 60
      const rowW = langRow.offsetWidth
      const clamped = Math.min(Math.max(pillCenter, tipHalfW + 4), rowW - tipHalfW - 4)
      sharedTip.style.left = clamped + 'px'
      sharedTip.style.transform = 'translateX(-50%)'

      sharedTip.classList.add('visible')
      tipTimer = setTimeout(() => sharedTip.classList.remove('visible'), 2000)
    }, { passive: true })
  })
}
