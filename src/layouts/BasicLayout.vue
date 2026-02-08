<template>
  <div class="basic-layout">
    <el-container>
      <el-header v-if="!isHomePage" class="header" height="60px">
        <div class="logo">
          <el-icon :size="24" color="#409EFF"><School /></el-icon>
          <span class="title">智学课堂</span>
        </div>
        
        <div class="nav-menu"></div>

        <div class="actions">
          <el-input 
            v-model="searchQuery" 
            placeholder="搜索..." 
            class="search-input"
            :prefix-icon="Search"
          />
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="32" :src="userStore.userInfo?.avatar" class="user-avatar" />
              <span class="username">{{ userStore.userInfo?.name || '用户' }}</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main 
        :style="{ 
          padding: isHomePage ? '0' : '20px', 
          height: '100vh',   /* 容器高度占满屏幕 */
          overflowY: 'auto', /* 关键：允许垂直方向滚动 */
          overflowX: 'hidden' 
        }"
      >
        <router-view />
      </el-main>
      
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, useRoute } from 'vue-router'
import { Search, School, ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute() 
const searchQuery = ref('')

const isHomePage = computed(() => route.name === 'Home')
</script>

<style scoped lang="scss">
.basic-layout {
  height: 100%;
  width: 100%;
}

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
    flex: 1;
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
      
      .user-avatar { margin-right: 8px; }
      .username { font-weight: 500; }
    }
  }
}

.el-main {
  scroll-behavior: smooth;
  background-color: #f5f7fa; 
}
</style>