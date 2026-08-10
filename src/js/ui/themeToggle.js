const THEMES = ['golden-hour', 'ink-ember']
const LABELS = { 'golden-hour': 'Golden Hour', 'ink-ember': 'Ink & Ember' }

export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle')
  if (!btn) return

  const stored = localStorage.getItem('theme') || 'golden-hour'
  applyTheme(stored, btn)

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
    applyTheme(next, btn)
    localStorage.setItem('theme', next)
  })
}

function applyTheme(theme, btn) {
  document.documentElement.dataset.theme = theme
  btn.textContent = LABELS[theme]
}
