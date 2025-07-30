import type { Plugin } from 'vue'
import vFocus from './directives/v-focus'
import vLazy from './directives/v-lazy'

/**
 * 注册全局指令
 */
export const YucaiPlugins: Plugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app, options) {
    // 自动获取焦点
    app.directive('focus', vFocus)

    // 图片懒加载
    app.directive('lazy', vLazy)
  },
}
