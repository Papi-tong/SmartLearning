<template>
  <div class="admin-layout">
    <el-container class="layout-container">
      <el-aside width="220px" class="aside">
        <div class="logo">
          <el-icon :size="24" color="#F56C6C"><Setting /></el-icon>
          <span>智学课堂管理平台</span>
        </div>
        
        <el-menu
          :default-active="$route.path"
          :router="true"
          class="menu"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :unique-opened="true"
        >
          <el-menu-item index="/admin/dashboard">
            <el-icon><Odometer /></el-icon>
            <span>系统概览</span>
          </el-menu-item>

          <el-sub-menu index="/admin/users">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/admin/users/stats" class="sub-menu-item">实时用户统计</el-menu-item>
            <el-menu-item index="/admin/users/online" class="sub-menu-item">在线学生</el-menu-item>
            <el-menu-item index="/admin/users/permissions" class="sub-menu-item">用户数据权限</el-menu-item>
            <el-menu-item index="/admin/users/logs" class="sub-menu-item">操作权限日志</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="/admin/courses">
            <template #title>
              <el-icon><Reading /></el-icon>
              <span>课程管理</span>
            </template>
            <el-menu-item index="/admin/courses/audit" class="sub-menu-item">课程审核</el-menu-item>
            <el-menu-item index="/admin/courses/records" class="sub-menu-item">学生记录</el-menu-item>

            <el-sub-menu index="/admin/courses/resources">
              <template #title>
                <span class="sub-menu-title">教学资源管理</span>
              </template>
              <el-menu-item index="/admin/courses/resources/audit" class="sub-menu-item deep-menu">资源审核</el-menu-item>
              <el-menu-item index="/admin/courses/resources/warning" class="sub-menu-item deep-menu">学业预警</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-menu-item index="/admin/tasks-exams">
            <el-icon><List /></el-icon>
            <span>任务与考试管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/question-bank">
            <el-icon><Collection /></el-icon>
            <span>题库与试卷管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/practice-data">
            <el-icon><TrendCharts /></el-icon>
            <span>刷题数据监控</span>
          </el-menu-item>

          <el-menu-item index="/admin/system-config">
            <el-icon><Operation /></el-icon>
            <span>系统配置管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/data-backup">
            <el-icon><DocumentCopy /></el-icon>
            <span>数据备份与恢复</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container class="main-container">
        <el-header class="header">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $route.meta.title || routeNameMap[$route.path] || '当前页面' }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <div class="user-info">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="username">{{ userStore.userInfo?.name || '管理员' }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <el-main class="main">
          <div class="main-content">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    
    <AIAgent />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { 
  Setting, 
  Odometer, 
  User, 
  Reading,
  List,
  Collection,
  TrendCharts,
  Operation,
  DocumentCopy,
  ArrowDown 
} from '@element-plus/icons-vue'
import AIAgent from '../components/AIAgent.vue'

const userStore = useUserStore()
const router = useRouter()

const routeNameMap: Record<string, string> = {
  '/admin/dashboard': '系统概览',
  '/admin/users': '用户管理',
  '/admin/users/stats': '实时用户统计',
  '/admin/users/online': '在线学生',
  '/admin/users/permissions': '用户数据权限',
  '/admin/users/logs': '操作权限日志',
  '/admin/courses': '课程管理',
  '/admin/tasks-exams': '任务与考试管理',
  '/admin/question-bank': '题库与试卷管理',
  '/admin/practice-data': '刷题数据监控',
  '/admin/system-config': '系统配置管理',
  '/admin/data-backup': '数据备份与恢复'
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
/* 此处保持您原有的样式不变 */
.admin-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f2f5;
}

.layout-container {
  width: 100%;
  height: 100%;
}

.aside {
  background-color: #304156;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  z-index: 10;
  
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  
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
    background-color: #2b2f3a;
    flex-shrink: 0;
  }
  
  .menu {
    border-right: none;
    flex: 1;
    width: 100%;
  }
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 9;
  
  .user-info {
    .el-dropdown-link {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      color: #303133;
      
      &:hover {
        color: #409EFF;
      }
    }
  }
}

.main {
  flex: 1;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f0f2f5;
  position: relative;
  
  .main-content {
    padding: 20px;
    min-height: 100%;
    box-sizing: border-box;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sub-menu-item {
  font-size: 13px !important;
  background-color: #1f2d3d !important;
  
  &:hover {
    background-color: #001528 !important;
  }
}
</style>
<style scoped>
/* 增加样式区分三级菜单 */
.deep-menu {
  padding-left: 60px !important; /* 增加缩进 */
  background-color: #001528 !important;
}
.sub-menu-title {
  font-size: 13px;
}
</style>