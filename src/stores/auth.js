import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  // 🔥 getter
  const isLoggedIn = computed(() => !!token.value)

  // 🔥 login
  const setAuth = (data) => {
    user.value = data.user
    token.value = data.token

    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
  }

  // 🔥 logout
  const logout = () => {
    user.value = null
    token.value = null

    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // 🔥 restore khi reload
  const loadFromStorage = () => {
    const savedUser = localStorage.getItem('user', JSON.stringify(user.value))
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedUser !== 'undefined') {
      user.value = JSON.parse(savedUser)
    }

    if (savedToken) {
      token.value = savedToken
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    setAuth,
    logout,
    loadFromStorage,
  }
})
