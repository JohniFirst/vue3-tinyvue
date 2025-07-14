import type { Plugin } from 'vue'
import vFocus from './v-focus'

/**
 * 注册全局指令
 */
export const YucaiPlugins: Plugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app, options) {
    app.directive('focus', vFocus)
  },
}
