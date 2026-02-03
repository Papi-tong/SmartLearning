<template>
  <el-card shadow="never">
    <el-table :data="onlineData" style="width: 100%" stripe>
      <el-table-column prop="courseName" label="课程" min-width="150" />
      <el-table-column prop="courseCode" label="课程代码" width="120" />
      <el-table-column prop="studentName" label="学生" width="100" />
      <el-table-column prop="studentId" label="学号" width="120" />
      <el-table-column prop="isOnline" label="在线状态" width="100">
        <template #default="{ row }">
          <el-badge is-dot :type="row.isOnline ? 'success' : 'info'" class="online-badge">
            {{ row.isOnline ? '在线' : '离线' }}
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column prop="hw1" label="作业一" width="100" align="center">
        <template #default="{ row }"><span :style="{ color: row.hw1 >= 60 ? '#67C23A' : '#F56C6C' }">{{ row.hw1 }}</span></template>
      </el-table-column>
      <el-table-column prop="hw2" label="作业二" width="100" align="center">
        <template #default="{ row }"><span :style="{ color: row.hw2 >= 60 ? '#67C23A' : '#F56C6C' }">{{ row.hw2 }}</span></template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const onlineData = ref([
  { courseName: '软件工程', courseCode: 'SS2107', studentName: '赵六', studentId: '2021001', isOnline: true, hw1: 85, hw2: 90 },
  { courseName: '软件工程', courseCode: 'SS2107', studentName: '钱七', studentId: '2021002', isOnline: false, hw1: 70, hw2: 55 },
  // ... 更多数据
])
</script>
<style scoped>
.online-badge { margin-top: 5px; }
</style>
