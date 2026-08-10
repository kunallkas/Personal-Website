export function initScrollReveals() {
  // Fade-in reveal for .reveal elements
  const els = document.querySelectorAll('.reveal')
  if (els.length) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return
          const delay = (i % 3) * 70
          setTimeout(() => entry.target.classList.add('in-view'), delay)
          revealObs.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -56px 0px' }
    )
    els.forEach(el => revealObs.observe(el))
  }

  // Activate the timeline rail when #work enters view
  const rail = document.querySelector('.tl-spine')
  const workSection = document.getElementById('work')
  if (rail && workSection) {
    const railObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rail.classList.add('visible')
          railObs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    railObs.observe(workSection)
  }
}
