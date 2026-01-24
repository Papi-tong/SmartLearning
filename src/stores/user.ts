import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export type UserRole = 'guest' | 'student' | 'teacher' | 'admin'

export interface UserInfo {
  id: string
  username: string
  name: string
  role: UserRole
  avatar?: string
}

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

  function login(user: UserInfo, newToken: string) {
    token.value = newToken
    userInfo.value = user
    localStorage.setItem('token', newToken)
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  function logout() {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
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
