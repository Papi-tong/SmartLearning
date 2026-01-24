<template>
  <div class="course-console">
    <div class="page-header">
      <h2>{{ course.name }} - 管理控制台</h2>
      <el-button type="primary">返回课程列表</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>课程资源管理</span>
              <el-button type="primary" size="small">上传资源</el-button>
            </div>
          </template>
          <el-table :data="course.resources" style="width: 100%">
            <el-table-column prop="name" label="资源名称" />
            <el-table-column prop="type" label="类型" width="100" />
            <el-table-column prop="size" label="大小" width="100" />
            <el-table-column prop="date" label="上传日期" width="150" />
            <el-table-column label="操作" width="150">
              <template #default>
                <el-button link type="primary" size="small">预览</el-button>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card class="box-card" shadow="never" style="margin-top: 20px;">
          <template #header>
            <div class="card-header">
              <span>教学活动发布</span>
              <el-dropdown>
                <el-button type="primary" size="small">
                  发布活动<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>发布作业</el-dropdown-item>
                    <el-dropdown-item>发布考试</el-dropdown-item>
                    <el-dropdown-item>发布讨论</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item v-for="(activity, index) in course.activities" :key="index" :timestamp="activity.date" placement="top">
              <el-card>
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.description }}</p>
                <p style="color: #909399; font-size: 12px; margin-top: 10px;">截止日期: {{ activity.dueDate }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
              <el-button link type="primary">编辑</el-button>
            </div>
          </template>
          <div class="info-item">
            <span class="label">课程名称:</span>
            <span class="value">{{ course.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">学生人数:</span>
            <span class="value">{{ course.studentCount }}</span>
          </div>
          <div class="info-item">
            <span class="label">课程状态:</span>
            <el-tag type="success" size="small">{{ course.status }}</el-tag>
          </div>
          <div class="info-item">
            <span class="label">创建时间:</span>
            <span class="value">{{ course.createTime }}</span>
          </div>
        </el-card>
        
        <el-card class="box-card" shadow="never" style="margin-top: 20px;">
          <template #header>
            <div class="card-header">
              <span>学生列表 (前5名)</span>
              <el-button link type="primary">查看全部</el-button>
            </div>
          </template>
          <div v-for="student in course.students" :key="student.id" class="student-item">
            <el-avatar :size="30" :src="student.avatar" />
            <span class="student-name">{{ student.name }}</span>
            <span class="student-score">{{ student.score }}分</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const course = ref({
  id: 1,
  name: 'Vue 3 基础',
  studentCount: 45,
  status: '进行中',
  createTime: '2023-09-01',
  resources: [
    { name: '第一章课件.pptx', type: 'PPT', size: '5.2MB', date: '2023-09-01' },
    { name: 'Vue3 源码分析.pdf', type: 'PDF', size: '12.5MB', date: '2023-09-05' },
    { name: '实战项目源码.zip', type: 'ZIP', size: '45MB', date: '2023-09-10' }
  ],
  activities: [
    { title: '期中考试', description: '请同学们在规定时间内完成考试，考试范围涵盖前三章内容。', date: '2023-10-20', dueDate: '2023-10-22' },
    { title: '第二次作业：组件封装', description: '封装一个通用的表格组件，支持分页和排序。', date: '2023-10-15', dueDate: '2023-10-18' },
    { title: '第一次作业：环境搭建', description: '使用 Vite 搭建 Vue 3 + TypeScript 项目。', date: '2023-09-05', dueDate: '2023-09-08' }
  ],
  students: [
    { id: 1, name: '张三', score: 95, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
    { id: 2, name: '李四', score: 88, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
    { id: 3, name: '王五', score: 92, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
    { id: 4, name: '赵六', score: 85, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
    { id: 5, name: '孙七', score: 78, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
  ]
})
</script>

<style scoped lang="scss">
.course-console {
  padding: 20px;
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      margin: 0;
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 14px;
    
    .label {
      color: #909399;
    }
    
    .value {
      color: #303133;
    }
  }
  
  .student-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f2f5;
    
    &:last-child {
      border-bottom: none;
    }
    
    .student-name {
      margin-left: 10px;
      flex: 1;
    }
    
    .student-score {
      font-weight: bold;
      color: #409EFF;
    }
  }
}
</style>