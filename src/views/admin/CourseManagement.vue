<template>
  <div class="course-management-container">
    <el-card shadow="never" class="filter-card">
      <div class="filter-header">
        <div class="left-panel">
          <el-input 
            v-model="searchKeyword" 
            placeholder="请输入搜索内容" 
            class="search-input"
            @keyup.enter="handleSearch"
            clearable
          >
            <template #suffix>
              <el-icon class="el-input__icon search-icon" @click="handleSearch"><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="right-panel">
          <el-select v-model="semester" placeholder="学期筛选" class="filter-select">
            <el-option label="2025-2026学期" value="2025-2026" />
            <el-option label="2024-2025学期" value="2024-2025" />
          </el-select>
          <el-select v-model="major" placeholder="专业筛选" class="filter-select">
            <el-option label="全部专业" value="" />
            <el-option label="软件工程" value="SE" />
            <el-option label="计算机科学与技术" value="CS" />
          </el-select>
        </div>
      </div>
    </el-card>

    <div class="content-area">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchKeyword = ref('')
const semester = ref('2025-2026')
const major = ref('')

const handleSearch = () => {
  console.log('Searching:', searchKeyword.value)
}
</script>

<style scoped lang="scss">
/* 直接复用 UserManagement 的 CSS */
.course-management-container {
  .filter-card {
    margin-bottom: 20px;
    border-radius: 8px;
    :deep(.el-card__body) { padding: 12px 20px; }
  }
  .filter-header {
    display: flex; justify-content: space-between; align-items: center;
    .left-panel { flex: 1; display: flex; justify-content: flex-start; 
      .search-input { width: 320px; :deep(.el-input__wrapper) { border-radius: 20px; padding-left: 15px; } 
      .search-icon { cursor: pointer; &:hover { color: #409EFF; } } }
    }
    .right-panel { display: flex; gap: 15px; .filter-select { width: 160px; } }
  }
  .content-area { min-height: 500px; }
}
</style>