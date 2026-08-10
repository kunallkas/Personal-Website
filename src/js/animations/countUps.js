import { CountUp } from 'countup.js'

export function initCountUps() {
  const cards = document.querySelectorAll('[data-count-target]')
  if (!cards.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const numberEls = entry.target.querySelectorAll('.soar-number[data-count]')
        numberEls.forEach(el => {
          const end    = parseFloat(el.dataset.count)
          const prefix = el.dataset.prefix || ''
          const suffix = el.dataset.suffix || ''
          const cu = new CountUp(el, end, {
            startVal: 0,
            duration: end > 50 ? 2 : 1.5,
            prefix,
            suffix,
            separator: ',',
            decimal: '.',
            useEasing: true,
            easingFn: (t, b, c, d) => {
              t /= d
              t--
              return c * (t * t * t * t * t + 1) + b
            },
          })
          if (!cu.error) cu.start()
        })
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.3 }
  )

  cards.forEach(card => observer.observe(card))
}
