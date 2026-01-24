<template>
  <div class="student-dashboard">
    <h2>学生工作台</h2>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>我的课程</span>
              <el-button class="button" text>查看全部</el-button>
            </div>
          </template>
          <div v-for="course in myCourses" :key="course.id" class="text item">
            {{ course.name }} - 进度: {{ course.progress }}%
            <el-progress :percentage="course.progress" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>待办任务</span>
            </div>
          </template>
          <div v-for="task in tasks" :key="task.id" class="text item">
            <el-tag :type="task.type === 'exam' ? 'danger' : 'warning'" size="small">{{ task.typeText }}</el-tag>
            {{ task.title }} (截止: {{ task.dueDate }})
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const myCourses = ref([
  { id: 1, name: 'Vue 3 基础', progress: 45 },
  { id: 2, name: 'TypeScript 进阶', progress: 10 },
  { id: 3, name: 'Web 安全', progress: 80 }
])

const tasks = ref([
  { id: 1, title: '完成 Vue 路由作业', type: 'homework', typeText: '作业', dueDate: '2023-11-01' },
  { id: 2, title: '期中考试', type: 'exam', typeText: '考试', dueDate: '2023-11-05' }
])
</script>

<style scoped>
.student-dashboard {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item {
  margin-bottom: 18px;
}
</style>