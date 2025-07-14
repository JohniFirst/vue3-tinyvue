import '@opentiny/vue-theme/index.css'
import './assets/css/reset.css'
import './assets/css/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { YucaiPlugins } from './directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(YucaiPlugins)

app.mount('#app')
