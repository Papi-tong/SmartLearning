<template>
  <div class="qb-management-wrapper">
    <el-card shadow="never" class="filter-card">
      <div class="filter-header">
        <div class="left-panel">
          <el-input v-model="searchKey" placeholder="搜索题库或试卷名称..." class="search-input" clearable>
            <template #suffix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>
        <div class="right-panel">
          <el-select v-model="major" placeholder="专业筛选" class="filter-select">
            <el-option label="软件工程" value="SE" />
            <el-option label="人工智能" value="AI" />
          </el-select>
          <el-select v-model="semester" placeholder="学期" class="filter-select">
            <el-option label="2025-2026学期" value="2025-2026" />
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
const searchKey = ref('')
const major = ref('')
const semester = ref('2025-2026')
</script>

<style scoped lang="scss">
.qb-management-wrapper {
  .filter-card { margin-bottom: 20px; border-radius: 8px; :deep(.el-card__body) { padding: 12px 20px; } }
  .filter-header { display: flex; justify-content: space-between; align-items: center;
    .left-panel .search-input { width: 300px; :deep(.el-input__wrapper) { border-radius: 20px; } }
    .right-panel { display: flex; gap: 15px; .filter-select { width: 150px; } }
  }
}
</style>