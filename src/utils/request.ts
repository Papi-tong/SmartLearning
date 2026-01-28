import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '../stores/user' // 引入你的 User Store
import router from '../router' // 引入路由用于跳转

// 定义通用响应结构 (根据后端实际接口修改)
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000, // 适当延长超时时间，防止网络波动
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// Request 拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 使用 Pinia Store 获取 Token (比直接读 localStorage 更规范)
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 假设后端直接返回数据，有些特殊接口(如导出文件)直接返回 Blob，需要透传
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
        return response
    }

    const res = response.data as ApiResponse
    
    // 假设 200 为业务成功代码 (请根据实际后端调整，有的后端是 0 或 20000)
    if (res.code === 200) {
      return res.data // 直接返回业务数据，调用时少写一层 .data
    }

    // 处理业务错误
    ElMessage.error(res.message || '系统错误')

    // 特殊业务状态码处理：例如 401 Token 过期
    if (res.code === 401) {
      handleLoginExpire()
    }
    
    return Promise.reject(new Error(res.message || 'Error'))
  },
  (error) => {
    console.error('Response error:', error)
    
    let message = error.message || '请求失败'
    
    // 处理 HTTP 状态码错误
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400: message = '请求参数错误'; break
        case 401: 
            message = '未授权，请登录'; 
            handleLoginExpire(); 
            break
        case 403: message = '拒绝访问'; break
        case 404: message = '请求地址出错'; break
        case 408: message = '请求超时'; break
        case 500: message = '服务器内部错误'; break
        case 502: message = '网关错误'; break
        case 503: message = '服务不可用'; break
        case 504: message = '网关超时'; break
        default: message = `连接错误 ${error.response.status}`; break
      }
    }
    
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

// 封装一个处理登录过期的函数
function handleLoginExpire() {
  const userStore = useUserStore()
  ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout() // 假设你的 store 有 logout 方法清除 token
    location.reload() // 或者 router.push('/login')
  })
}

export default service