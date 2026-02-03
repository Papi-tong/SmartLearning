<template>
  <div class="login-container">
    <!--背景轮播图 -->
    <div class="background-slider">
      <el-carousel height="100vh" arrow="never" indicator-position="none" :interval="5000" :pause-on-hover="false">
        <el-carousel-item v-for="item in features" :key="item.title">
          <div class="bg-slide" :style="{ backgroundImage: `url(${item.image})` }">
            <div class="bg-overlay"></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 登录框样式 -->
    <div class="login-content-wrapper">
      <div class="login-box glass-effect">
        <div class="login-header">
          <div class="logo-area">
            <el-icon :size="48" color="#409EFF"><School /></el-icon>
            <span class="app-name">智学课堂</span>
          </div>
          <p class="subtitle" v-if="currentView === 'login'">让学习更智能，让教学更高效</p>
          <p class="subtitle" v-else-if="currentView === 'register'">创建新账号，开启智慧学习之旅</p>
          <p class="subtitle" v-else-if="currentView === 'forgot'">重置密码，找回您的账号</p>
        </div>

        <!-- 登录表单 -->
        <el-form v-if="currentView === 'login'" :model="loginForm" class="login-form" @submit.prevent="handleLogin">
          <el-form-item>
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入学号 / 工号 / 手机号"
              prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码" 
              prefix-icon="Lock"
              show-password
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading" size="large">
              立即登录
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 注册表格 -->
        <el-form v-if="currentView === 'register'" :model="registerForm" class="login-form" @submit.prevent="handleRegister">
          <el-form-item>
            <el-input 
              v-model="registerForm.username" 
              placeholder="请输入学号 / 工号 (作为登录账号)"
              prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="registerForm.phone" 
              placeholder="请输入手机号"
              prefix-icon="Iphone"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="registerForm.password" 
              type="password" 
              placeholder="设置登录密码" 
              prefix-icon="Lock"
              show-password
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleRegister" :loading="loading" size="large">
              立即注册
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 忘记密码表格 -->
        <el-form v-if="currentView === 'forgot'" :model="forgotForm" class="login-form" @submit.prevent="handleForgot">
          <el-form-item>
            <el-input 
              v-model="forgotForm.phone" 
              placeholder="请输入注册手机号"
              prefix-icon="Iphone"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <div style="display: flex; gap: 10px; width: 100%;">
              <el-input 
                v-model="forgotForm.code" 
                placeholder="验证码"
                prefix-icon="Message"
                size="large"
                style="flex: 1;"
              />
              <el-button size="large" :disabled="timer > 0" @click="sendCode">
                {{ timer > 0 ? `${timer}s` : '获取验证码' }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="forgotForm.newPassword" 
              type="password" 
              placeholder="请输入新密码" 
              prefix-icon="Lock"
              show-password
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleForgot" :loading="loading" size="large">
              重置密码
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <div class="links" v-if="currentView === 'login'">
            <el-link type="info" @click="currentView = 'forgot'">忘记密码?</el-link>
            <el-divider direction="vertical" />
            <el-link type="primary" @click="currentView = 'register'">注册新账号</el-link>
          </div>
          <div class="links" v-else>
            <el-link type="primary" @click="currentView = 'login'">返回登录</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { registerApi } from '../api/auth'
import { ElMessage } from 'element-plus'
import { School, User, Lock, ChatDotRound, Monitor, Iphone, Message } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const currentView = ref<'login' | 'register' | 'forgot'>('login')
const loading = ref(false)
const timer = ref(0)

const loginForm = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  username: '',
  phone: '',
  password: ''
})

const forgotForm = ref({
  phone: '',
  code: '',
  newPassword: ''
})

const features = [
  {
    title: '智能题库',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    title: '个性化刷题',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'
  },
  {
    title: '本地知识库',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80'
  },
  {
    title: '专属智能体',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  }
]

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }

  loading.value = true
  
  try {
    const user = await userStore.login(loginForm.value)
    ElMessage.success(`欢迎回来，${user.name}`)
    
    if (user.role === 'student') router.push('/student/dashboard')
    else if (user.role === 'teacher') router.push('/teacher/dashboard')
    else if (user.role === 'admin') router.push('/admin/dashboard')
  } catch (error: any) {
    console.error(error)
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  if (!registerForm.value.username || !registerForm.value.phone || !registerForm.value.password) {
    ElMessage.warning('请填写完整注册信息')
    return
  }
  
  loading.value = true
  try {
    await registerApi(registerForm.value)
    ElMessage.success('注册成功，请登录')
    currentView.value = 'login'
    loginForm.value.username = registerForm.value.username
  } catch (error: any) {
    console.error(error)
    ElMessage.error(error.message || '注册失败')
  } finally {
    loading.value = false
  }
}

const sendCode = () => {
  if (!forgotForm.value.phone) {
    ElMessage.warning('请输入手机号')
    return
  }
  
  timer.value = 60
  const interval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
  
  ElMessage.success('验证码已发送')
}

const handleForgot = () => {
  if (!forgotForm.value.phone || !forgotForm.value.code || !forgotForm.value.newPassword) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('密码重置成功，请重新登录')
    currentView.value = 'login'
  }, 1500)
}
</script>

<style scoped lang="scss">
.login-container {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  .background-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    .bg-slide {
      width: 100%;
      height: 100%;
      background-size: cover; 
      background-position: center center; 
      background-repeat: no-repeat;
      position: relative;
    }

    .bg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .login-content-wrapper {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10%;
    
    @media (max-width: 768px) {
      justify-content: center;
      padding-right: 0;
    }
  }

  .login-box {
    width: 420px;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &.glass-effect {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 30px;
      
      .logo-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 12px;
        
        .app-name {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
        }
      }
      
      .subtitle {
        color: #606266;
        font-size: 16px;
        margin: 0;
      }
    }

    .login-form {
      .el-input {
        --el-input-hover-border-color: #409EFF;
        --el-input-focus-border-color: #409EFF;
      }
      
      .login-btn {
        width: 100%;
        font-size: 16px;
        padding: 22px 0;
        margin-top: 10px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    .login-footer {
      margin-top: 25px;
      
      .links {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
