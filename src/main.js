import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import { useAuthStore } from './stores/auth'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

const clientId = '458812528171-jo4pfalheoff7u4tlqfqrvf7albherrj.apps.googleusercontent.com'

// Kiểm tra nếu chưa khởi tạo thì mới dùng plugin
app.use(vue3GoogleLogin, {
  clientId: clientId,
  // KHÔNG thêm scope hay prompt ở đây nếu muốn lấy JWT Token
})

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.loadFromStorage() // Tải lại thông tin đăng nhập từ LocalStorage khi app khởi động

app.mount('#app')
