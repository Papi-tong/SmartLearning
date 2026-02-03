import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// 注意：暂时保留 logoutApi 用于退出，loginApi 暂时注释掉
import { logoutApi, type LoginParams, type UserInfo } from '../api/auth'

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

  /**
   * 登录 Action (修改为 Mock 模式)
   * 根据输入的用户名返回不同的角色身份
   */
  async function login(params: LoginParams) {
    try {
      // -----------------------------------------------------------
      // [测试模式] 模拟网络请求延迟，不调用真实接口
      await new Promise(resolve => setTimeout(resolve, 800))

      const { username } = params
      let mockRole = 'student' // 默认角色
      let mockName = '张同学'

      // 1. 判断是否为管理员
      if (username === 'admin') {
        mockRole = 'admin'
        mockName = '系统管理员'
      } 
      // 2. 判断是否为教师 (包含 teacher 或以 T 开头)
      else if (username.includes('teacher') || username.startsWith('T')) {
        mockRole = 'teacher'
        mockName = '李老师'
      }
      
      // 3. 构建模拟的用户对象
      // 注意：这里需要匹配你 UserInfo 的类型定义，不够的字段可以暂时省略或补全
      const mockUser: UserInfo = {
        // 修改点：加上 .toString() 将数字转换为字符串，以匹配 UserInfo 类型
        id: Date.now().toString(), 
        username: username,
        name: mockName,
        role: mockRole,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      } as UserInfo

      const mockToken = 'mock-token-' + Date.now()
      // -----------------------------------------------------------

      /* * [生产模式] 原有的真实接口调用代码 (暂时注释)
       * const { token: newToken, user } = await loginApi(params)
       * const mockToken = newToken
       * const mockUser = user
       */

      // 更新状态
      token.value = mockToken
      userInfo.value = mockUser
      
      // 持久化存储
      localStorage.setItem('token', mockToken)
      localStorage.setItem('userInfo', JSON.stringify(mockUser))
      
      return mockUser
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      // 退出时可以保留调用 API，也可以直接前端清除
      // await logoutApi() 
    } catch (e) {
      console.warn('Logout api failed', e)
    } finally {
      // 清理前端状态
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