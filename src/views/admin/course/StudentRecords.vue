<template>
  <el-card shadow="never">
    <el-table :data="records" style="width: 100%" border stripe>
      <el-table-column prop="major" label="专业" width="120" />
      <el-table-column prop="courseName" label="课程" min-width="150" />
      <el-table-column prop="courseCode" label="课程代码" width="100" />
      <el-table-column prop="classNo" label="班级" width="80" />
      <el-table-column prop="studentName" label="学生" width="100" />
      <el-table-column prop="studentId" label="学号" width="120" />
      <el-table-column prop="studyTime" label="学习时长" width="100">
        <template #default="{ row }">{{ row.studyTime }}h</template>
      </el-table-column>
      <el-table-column prop="hw1" label="作业一" width="80" />
      <el-table-column prop="hw2" label="作业二" width="80" />
      <el-table-column prop="exam1" label="考试一" width="80" />
      <el-table-column label="编辑" width="80" fixed="right">
        <template #default>
          <el-button type="primary" link size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const records = ref([
  { major: '软件工程', courseName: 'Java程序设计', courseCode: 'CS101', classNo: '01', studentName: '王五', studentId: '2021001', studyTime: 45, hw1: 88, hw2: 92, exam1: 85 },
  { major: '软件工程', courseName: 'Java程序设计', courseCode: 'CS101', classNo: '01', studentName: '赵六', studentId: '2021002', studyTime: 30, hw1: 75, hw2: 80, exam1: 78 },
])
</script>