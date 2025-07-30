import '@opentiny/vue-theme/index.css'
import './assets/css/reset.css'
import './assets/css/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { YucaiPlugins } from './plugins/plugins'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 自定义插件 自定义指令、全局组件都在这里注册
app.use(YucaiPlugins)

app.mount('#app')
