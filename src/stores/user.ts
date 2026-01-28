import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi, logoutApi, type LoginParams, type UserInfo } from '../api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)
  
  // Initialize from local storage if needed
  if (localStorage.getItem('userInfo')) {
    try {
      userInfo.value = JSON.parse(localStorage.getItem('userInfo')!)
    } catch (e) {
      console.error('Failed to parse user info', e)
    }
  }

  const isLoggedIn = computed(() => !!token.value)
  const role = computed(() => userInfo.value?.role || 'guest')

  async function login(params: LoginParams) {
    try {
      const { token: newToken, user } = await loginApi(params)
      token.value = newToken
      userInfo.value = user
      localStorage.setItem('token', newToken)
      localStorage.setItem('userInfo', JSON.stringify(user))
      return user
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      await logoutApi()
    } finally {
      token.value = null
      userInfo.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    role,
    login,
    logout
  }
})

