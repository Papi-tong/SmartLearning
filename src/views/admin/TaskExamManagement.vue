<template>
  <div class="task-exam-wrapper">
    <el-card shadow="never" class="filter-card">
      <div class="filter-header">
        <div class="left-panel">
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索任务或试卷名称..." 
            class="search-input"
            clearable
          >
            <template #suffix>
              <el-icon class="search-icon"><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="right-panel">
          <el-select v-model="semester" placeholder="学期" class="filter-select">
            <el-option label="2025-2026学期" value="2025-2026" />
            <el-option label="2024-2025学期" value="2024-2025" />
          </el-select>
          
          <el-select v-model="category" placeholder="类型筛选" class="filter-select">
            <el-option label="全部类型" value="" />
            <el-option label="学习任务" value="task" />
            <el-option label="考试/小测" value="exam" />
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
const category = ref('')
</script>

<style scoped lang="scss">
.task-exam-wrapper {
  .filter-card {
    margin-bottom: 20px;
    border-radius: 8px;
    :deep(.el-card__body) { padding: 12px 20px; }
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .left-panel .search-input {
      width: 320px;
      :deep(.el-input__wrapper) { border-radius: 20px; }
    }

    .right-panel {
      display: flex;
      gap: 15px;
      .filter-select { width: 160px; }
    }
  }
}
</style>