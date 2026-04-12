import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

const clientId = "458812528171-jo4pfalheoff7u4tlqfqrvf7albherrj.apps.googleusercontent.com"

// Kiểm tra nếu chưa khởi tạo thì mới dùng plugin
if (!window._google_gsi_initialized) {
  app.use(vue3GoogleLogin, {
    clientId: clientId,
    scope: 'profile email',
    prompt: 'select_account',
  })
  window._google_gsi_initialized = true
}
app.use(createPinia())
app.use(router)

app.mount('#app')
