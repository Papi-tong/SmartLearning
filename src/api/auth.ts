import request from '../utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  phone: string
  password: string
}

export interface UserInfo {
  id: string
  username: string
  name: string
  role: 'student' | 'teacher' | 'admin'
  avatar?: string
}

// MOCK FUNCTION: Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const loginApi = async (data: LoginParams): Promise<{ token: string, user: UserInfo }> => {
  // In a real app: return request.post('/auth/login', data)
  
  await delay(1000) // Simulate network delay

  // Simulate verification (Mock logic)
  const input = data.username
  let role: 'student' | 'teacher' | 'admin' = 'student'
  
  if (input.includes('admin')) {
    role = 'admin'
  } else if (input.includes('teach') || input.startsWith('T')) {
    role = 'teacher'
  }

  return {
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: '1',
      username: input,
      name: role === 'student' ? '张同学' : (role === 'teacher' ? '李老师' : '管理员'),
      role: role,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  }
}

export const registerApi = async (data: RegisterParams): Promise<void> => {
  // In a real app: return request.post('/auth/register', data)
  await delay(1500)
  // Simulate success
  return
}

export const logoutApi = async (): Promise<void> => {
  // In a real app: return request.post('/auth/logout')
  await delay(500)
  return
}
