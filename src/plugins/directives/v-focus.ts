import type { Directive } from 'vue'

const vFocus: Directive<HTMLElement> = {
  mounted(el) {
    el.focus()
  },
}

export default vFocus
