import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    handleLogin(userData) {
      this.isAuthenticated = true
      this.user = userData
    },
    handleLogout() {
      this.isAuthenticated = false
      this.user = null
    },
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
})
