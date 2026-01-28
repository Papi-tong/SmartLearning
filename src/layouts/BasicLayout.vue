<template>
  <div class="basic-layout">
    <el-header class="header">
      <div class="logo">
        <el-icon :size="30" color="#409EFF"><School /></el-icon>
        <span class="title">智学课堂</span>
      </div>
      <el-menu mode="horizontal" :router="true" class="nav-menu">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/textbook">电子教材</el-menu-item>
        <el-menu-item index="/question-bank">题库</el-menu-item>
        <el-menu-item index="/practice">刷题</el-menu-item>
      </el-menu>
      <div class="actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索课程/教材..."
          prefix-icon="Search"
          class="search-input"
        />
        <el-button type="primary" @click="$router.push('/login')" v-if="!userStore.isLoggedIn">登录</el-button>
        <el-dropdown v-else @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userStore.userInfo?.name }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="dashboard">进入后台</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    
    <el-main class="main-content">
      <router-view />
    </el-main>
    
    <AIAgent />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import AIAgent from '../components/AIAgent.vue'
import { Search, School, ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const searchQuery = ref('')

const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/')
  } else if (command === 'dashboard') {
    if (userStore.role === 'student') router.push('/student/dashboard')
    if (userStore.role === 'teacher') router.push('/teacher/dashboard')
    if (userStore.role === 'admin') router.push('/admin/dashboard')
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #303133;
    }
  }
  
  .nav-menu {
    border-bottom: none;
    flex: 1;
    margin-left: 40px;
  }
  
  .actions {
    display: flex;
    align-items: center;
    gap: 15px;
    
    .search-input {
      width: 200px;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--el-color-primary);
      
      .user-avatar {
        margin-right: 8px;
      }
      
      .username {
        font-weight: 500;
      }
    }
  }
}

.main-content {
  padding: 0;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  background-color: #f5f7fa;
}
</style>
