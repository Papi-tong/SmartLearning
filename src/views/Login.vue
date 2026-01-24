<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <el-icon :size="40" color="#409EFF"><School /></el-icon>
        <h2>智学课堂</h2>
        <p>让学习更智能，让教学更高效</p>
      </div>

      <el-tabs v-model="activeTab" class="role-tabs" stretch>
        <el-tab-pane label="学生登录" name="student"></el-tab-pane>
        <el-tab-pane label="教师登录" name="teacher"></el-tab-pane>
        <el-tab-pane label="管理员登录" name="admin"></el-tab-pane>
      </el-tabs>

      <el-form :model="loginForm" class="login-form">
        <el-form-item>
          <el-input 
            v-model="loginForm.username" 
            :placeholder="usernamePlaceholder"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码" 
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <el-link type="info">忘记密码?</el-link>
        <el-link type="primary">注册新账号</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import { School, User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref('student')
const loading = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})

const usernamePlaceholder = computed(() => {
  switch (activeTab.value) {
    case 'student': return '请输入学号/手机号'
    case 'teacher': return '请输入工号/手机号'
    case 'admin': return '请输入管理员账号'
    default: return '请输入账号'
  }
})

const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }

  loading.value = true
  
  // Mock login process
  setTimeout(() => {
    loading.value = false
    const role = activeTab.value as 'student' | 'teacher' | 'admin'
    const mockUser = {
      id: '1',
      username: loginForm.value.username,
      name: role === 'student' ? '张三' : (role === 'teacher' ? '李老师' : '管理员'),
      role: role
    }
    
    userStore.login(mockUser, 'mock-jwt-token')
    ElMessage.success('登录成功')
    
    // Redirect based on role
    if (role === 'student') router.push('/student/dashboard')
    else if (role === 'teacher') router.push('/teacher/dashboard')
    else if (role === 'admin') router.push('/admin/dashboard')
  }, 1000)
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  .login-box {
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    
    .login-header {
      text-align: center;
      margin-bottom: 30px;
      
      h2 {
        margin: 10px 0;
        color: #303133;
      }
      
      p {
        color: #909399;
        font-size: 14px;
        margin: 0;
      }
    }
    
    .login-form {
      margin-top: 20px;
      
      .login-btn {
        width: 100%;
        padding: 20px 0;
        font-size: 16px;
      }
    }
    
    .login-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
}
</style>
