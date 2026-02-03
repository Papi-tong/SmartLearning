<template>
  <div class="task-exam-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="学习任务管理" name="tasks">
        <el-table :data="tasks" style="width: 100%">
          <el-table-column prop="title" label="任务标题" />
          <el-table-column prop="course" label="所属课程" />
          <el-table-column prop="deadline" label="截止时间" />
          <el-table-column prop="submitRate" label="提交率" />
          <el-table-column label="操作">
            <el-button link type="primary">查看</el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="考试/试卷审核" name="exams">
        <el-alert title="教师发布的考试需要管理员审核后学生才可见" type="info" show-icon style="margin-bottom: 20px" />
        <el-table :data="exams" style="width: 100%">
          <el-table-column prop="title" label="试卷名称" />
          <el-table-column prop="type" label="类型" width="100" />
          <el-table-column prop="creator" label="出卷人" width="100" />
          <el-table-column prop="status" label="审核状态">
            <template #default="{ row }">
              <el-tag :type="row.status === 'pending' ? 'warning' : 'success'">
                {{ row.status === 'pending' ? '待审核' : '已发布' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button v-if="row.status === 'pending'" size="small" type="primary">审核</el-button>
              <el-button size="small">预览试卷</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('exams')

const tasks = ref([
  { title: '完成第一章课后习题', course: '计算机基础', deadline: '2023-11-01', submitRate: '85%' },
  { title: '上传实验报告', course: 'Java程序设计', deadline: '2023-11-05', submitRate: '40%' },
])

const exams = ref([
  { title: '2023秋季期中考试', type: '期中考', creator: '李老师', status: 'pending' },
  { title: '第一单元随堂测', type: '小测', creator: '张老师', status: 'published' },
])
</script>