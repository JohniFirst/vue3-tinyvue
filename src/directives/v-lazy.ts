import type { Directive } from 'vue'

const vLazy: Directive<HTMLElement> = {
  mounted(el, { value }) {
    if (value) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = value
            observer.unobserve(img)
          }
        })
      })

      observer.observe(el)
    }
  },
}

export default vLazy
