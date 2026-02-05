import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from './auth.service'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(authService.getCurrent())

  const isAuthenticated = computed(() => !!session.value)
  const currentUser = computed(() => session.value?.user ?? session.value ?? null)

  async function login(emailOrUsername, password) {
    const data = await authService.login({ emailOrUsername, password })
    session.value = data
    return data
  }

  async function register(username, email, password) {
    return await authService.register({ username, email, password })
  }

  function logout() {
    authService.logout()
    session.value = null
  }

  return { session, isAuthenticated, currentUser, login, register, logout }
})
