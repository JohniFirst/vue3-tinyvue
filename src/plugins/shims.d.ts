import type { Directive } from 'vue'

declare module 'vue' {
  export interface ComponentCustomProperties {
    vFocus: Directive<HTMLElement>
    vLazy: Directive<HTMLElement>
  }
}

export {}
