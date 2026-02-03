<template>
  <el-card shadow="never">
    <el-table :data="permissionData" style="width: 100%" border>
      <el-table-column prop="userName" label="用户" width="100" fixed />
      <el-table-column prop="classNo" label="班级" width="80" />
      <el-table-column prop="courseName" label="课程" min-width="120" />
      <el-table-column prop="courseCode" label="课程代码" width="100" />
      <el-table-column prop="major" label="专业" width="120" />
      <el-table-column prop="userId" label="工号/学号" width="120" />
      
      <el-table-column label="发布任务" align="center" width="90">
        <template #default="{ row }">
          <el-checkbox v-model="row.p_publishTask" :disabled="row.role === 'student'" />
        </template>
      </el-table-column>
      <el-table-column label="编辑任务" align="center" width="90">
        <template #default="{ row }">
          <el-checkbox v-model="row.p_editTask" :disabled="row.role === 'student'" />
        </template>
      </el-table-column>
      <el-table-column label="发布考试" align="center" width="90">
        <template #default="{ row }">
          <el-checkbox v-model="row.p_publishExam" :disabled="row.role === 'student'" />
        </template>
      </el-table-column>
      <el-table-column label="编辑考试" align="center" width="90">
        <template #default="{ row }">
          <el-checkbox v-model="row.p_editExam" :disabled="row.role === 'student'" />
        </template>
      </el-table-column>
      <el-table-column label="发布题库" align="center" width="90">
        <template #default="{ row }">
          <el-checkbox v-model="row.p_publishBank" />
        </template>
      </el-table-column>
      <el-table-column label="发布成绩" align="center" width="90">
        <template #default="{ row }">
          <el-checkbox v-model="row.p_publishGrade" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const permissionData = ref([
  { 
    userName: '张三', role: 'teacher', classNo: '01', courseName: '软件工程', courseCode: 'SS2107', major: '软工', userId: 'T001',
    p_publishTask: true, p_editTask: true, p_publishExam: true, p_editExam: true, p_publishBank: true, p_publishGrade: true
  },
  { 
    userName: '李四', role: 'student', classNo: '01', courseName: '软件工程', courseCode: 'SS2107', major: '软工', userId: 'S001',
    p_publishTask: false, p_editTask: false, p_publishExam: false, p_editExam: false, p_publishBank: true, p_publishGrade: true // 根据需求学生拥有后两项
  }
])
</script>