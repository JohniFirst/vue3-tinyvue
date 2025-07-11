import '@opentiny/vue-theme/index.css'
import './assets/css/reset.css'
import './assets/css/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
