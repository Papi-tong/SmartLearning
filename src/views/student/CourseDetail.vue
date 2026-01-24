<template>
  <div class="course-detail">
    <el-card class="course-header">
      <div class="header-content">
        <div class="cover-image"></div>
        <div class="info">
          <h1>{{ course.title }}</h1>
          <p class="instructor">讲师: {{ course.instructor }}</p>
          <p class="description">{{ course.description }}</p>
          <div class="meta">
            <el-tag>Web开发</el-tag>
            <span class="progress">学习进度: {{ course.progress }}%</span>
          </div>
          <el-button type="primary" class="start-btn">继续学习</el-button>
        </div>
      </div>
    </el-card>

    <el-tabs v-model="activeTab" class="course-tabs">
      <el-tab-pane label="课程目录" name="chapters">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="chapter in course.chapters" :key="chapter.id" :title="chapter.title" :name="chapter.id">
            <div v-for="lesson in chapter.lessons" :key="lesson.id" class="lesson-item">
              <el-icon><VideoPlay /></el-icon>
              <span class="lesson-title">{{ lesson.title }}</span>
              <span class="lesson-duration">{{ lesson.duration }}</span>
              <el-tag v-if="lesson.completed" type="success" size="small" class="status-tag">已完成</el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="作业与考试" name="assignments">
        <el-table :data="course.assignments" style="width: 100%">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.type === 'exam' ? 'danger' : 'warning'">
                {{ scope.row.type === 'exam' ? '考试' : '作业' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="dueDate" label="截止日期" width="180" />
          <el-table-column prop="status" label="状态" width="100" />
          <el-table-column label="操作" width="120">
            <template #default>
              <el-button size="small" type="primary">去完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="讨论区" name="discussion">
        <div class="discussion-area">
          <el-button type="primary" style="margin-bottom: 20px;">发起讨论</el-button>
          <el-card v-for="post in course.discussions" :key="post.id" shadow="hover" class="post-card">
            <div class="post-header">
              <span class="post-title">{{ post.title }}</span>
              <span class="post-author">{{ post.author }}</span>
            </div>
            <p class="post-content">{{ post.content }}</p>
            <div class="post-footer">
              <span>{{ post.date }}</span>
              <span>{{ post.replies }} 回复</span>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VideoPlay } from '@element-plus/icons-vue'

const activeTab = ref('chapters')
const activeNames = ref(['1'])

const course = ref({
  id: 1,
  title: 'Vue 3 + TypeScript 实战',
  instructor: '张老师',
  description: '本课程详细讲解 Vue 3 的 Composition API 和 TypeScript 的结合使用，帮助你快速掌握企业级开发技能。',
  progress: 45,
  chapters: [
    {
      id: '1',
      title: '第一章：Vue 3 基础',
      lessons: [
        { id: 101, title: '1.1 环境搭建', duration: '15:20', completed: true },
        { id: 102, title: '1.2 Composition API 简介', duration: '20:10', completed: true },
        { id: 103, title: '1.3 响应式原理', duration: '25:00', completed: false }
      ]
    },
    {
      id: '2',
      title: '第二章：TypeScript 进阶',
      lessons: [
        { id: 201, title: '2.1 泛型与接口', duration: '18:30', completed: false },
        { id: 202, title: '2.2 类型推断', duration: '12:45', completed: false }
      ]
    }
  ],
  assignments: [
    { id: 1, title: '实现 TodoList', type: 'homework', dueDate: '2023-11-10', status: '未提交' },
    { id: 2, title: '期中测试', type: 'exam', dueDate: '2023-11-15', status: '未开始' }
  ],
  discussions: [
    { id: 1, title: '关于 setup 语法糖的问题', author: '李同学', content: '请问 defineProps 在 setup 中怎么使用默认值？', date: '2023-10-25', replies: 3 },
    { id: 2, title: 'Vite 配置别名报错', author: '王同学', content: '配置了 @ 指向 src，但是 TS 报错找不到模块', date: '2023-10-24', replies: 5 }
  ]
})
</script>

<style scoped lang="scss">
.course-detail {
  padding: 20px;
  
  .course-header {
    margin-bottom: 20px;
    
    .header-content {
      display: flex;
      gap: 30px;
      
      .cover-image {
        width: 300px;
        height: 180px;
        background-color: #eee;
        background-image: url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
        background-size: cover;
        background-position: center;
        border-radius: 4px;
      }
      
      .info {
        flex: 1;
        
        h1 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        
        .instructor {
          color: #606266;
          margin-bottom: 10px;
        }
        
        .description {
          color: #909399;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .meta {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          
          .progress {
            color: #409EFF;
            font-weight: bold;
          }
        }
      }
    }
  }
  
  .course-tabs {
    background: white;
    padding: 20px;
    border-radius: 4px;
    
    .lesson-item {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #f0f2f5;
      
      &:hover {
        background-color: #f5f7fa;
      }
      
      .lesson-title {
        margin-left: 10px;
        flex: 1;
      }
      
      .lesson-duration {
        color: #909399;
        font-size: 13px;
        margin-right: 15px;
      }
    }
    
    .post-card {
      margin-bottom: 15px;
      
      .post-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        
        .post-title {
          font-weight: bold;
          font-size: 16px;
        }
        
        .post-author {
          color: #909399;
          font-size: 14px;
        }
      }
      
      .post-content {
        color: #606266;
        margin-bottom: 10px;
      }
      
      .post-footer {
        color: #C0C4CC;
        font-size: 12px;
        display: flex;
        gap: 15px;
      }
    }
  }
}
</style>