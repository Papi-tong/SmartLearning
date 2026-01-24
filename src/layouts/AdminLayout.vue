<template>
  <div class="admin-layout">
    <el-container class="layout-container">
      <el-aside width="220px" class="aside">
        <div class="logo">
          <el-icon :size="24" color="#F56C6C"><Setting /></el-icon>
          <span>智学课堂 | 管理</span>
        </div>
        <el-menu
          :default-active="$route.path"
          :router="true"
          class="menu"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/admin/dashboard">
            <el-icon><Odometer /></el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-menu-item index="/admin/users">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <span>返回首页</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header class="header">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $route.meta.title || '当前页面' }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="user-info">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="username">{{ userStore.userInfo?.name }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <AIAgent />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { Setting, Odometer, User, HomeFilled } from '@element-plus/icons-vue'
import AIAgent from '../components/AIAgent.vue'

const userStore = useUserStore()
const router = useRouter()

const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}

.aside {
  background-color: #304156;
  display: flex;
  flex-direction: column;
  
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #1f2d3d;
    color: #fff;
  }
  
  .menu {
    border-right: none;
    flex: 1;
  }
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .user-info {
    .el-dropdown-link {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
  }
}

.main {
  background-color: #f5f7fa;
  padding: 20px;
}
</style>
