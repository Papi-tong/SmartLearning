<template>
  <div class="teacher-dashboard">
    <h2>教师工作台</h2>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>我的课程</template>
          <div class="stat-number">3</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>学生总数</template>
          <div class="stat-number">128</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>待批改作业</template>
          <div class="stat-number" style="color: #F56C6C">15</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="large" style="width: 100%; height: 100%">+ 发布新课程</el-button>
      </el-col>
    </el-row>
    
    <div style="margin-top: 20px;">
      <el-card>
        <template #header>
          <span>课程管理</span>
        </template>
        <el-table :data="managedCourses" style="width: 100%">
          <el-table-column prop="name" label="课程名称" width="180" />
          <el-table-column prop="students" label="学生数" width="180" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="操作">
            <template #default>
              <el-button size="small">编辑</el-button>
              <el-button size="small" type="primary">发布作业</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const managedCourses = ref([
  { id: 1, name: 'Vue 3 基础', students: 45, status: '进行中' },
  { id: 2, name: 'Web 前端工程化', students: 30, status: '未开始' },
  { id: 3, name: 'JavaScript 高级', students: 53, status: '已结课' }
])
</script>

<style scoped>
.teacher-dashboard {
  padding: 20px;
}
.stat-number {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #409EFF;
}
</style>