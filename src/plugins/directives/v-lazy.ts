import type { Directive } from 'vue'

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      img.src = img.dataset.src || ''
      img.removeAttribute('data-src')
      observer.unobserve(img)
    }
  })
})

const vLazy: Directive<HTMLElement> = {
  mounted(el, { value }) {
    if (value) {
      el.dataset.src = value

      observer.observe(el)
    }
  },
}

export default vLazy
