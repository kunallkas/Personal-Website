export function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]')
  if (!navLinks.length) return

  const sectionIds = Array.from(navLinks)
    .map(a => a.getAttribute('href').slice(1))
    .filter(Boolean)

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean)

  if (!sections.length) return

  const activate = (id) => {
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activate(entry.target.id)
      })
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
  )

  sections.forEach(s => observer.observe(s))
}
