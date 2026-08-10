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

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const lang = pill.dataset.lang
      if (!lang || pill.classList.contains('active')) return

      pills.forEach(p => p.classList.remove('active'))
      pill.classList.add('active')

      accent.dataset.lang = lang
      scrambleTo(accent, words[lang] || 'nuance.')
    })
  })
}
