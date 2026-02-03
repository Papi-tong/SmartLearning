<template>
  <el-card shadow="never">
    <el-table :data="logData" style="width: 100%">
      <el-table-column prop="role" label="角色" width="100">
        <template #default="{ row }">
          <el-tag :type="getRoleType(row.role)">{{ row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="工号/学号" width="120" />
      <el-table-column prop="time" label="时间" width="180" />
      <el-table-column prop="content" label="修改内容" min-width="200" show-overflow-tooltip />
      <el-table-column prop="status" label="审核状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '已通过' ? 'success' : 'warning'" effect="plain">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const logData = ref([
  { role: '管理员', userId: 'ADMIN01', time: '2023-10-24 14:00:00', content: '修改了系统配置参数', status: '已通过' },
  { role: '教师', userId: 'T001', time: '2023-10-24 13:30:00', content: '发布了期中考试试卷', status: '审核中' },
  { role: '学生', userId: 'S001', time: '2023-10-24 12:15:00', content: '提交了作业一', status: '已通过' },
])

const getRoleType = (role: string) => {
  if (role === '管理员') return 'danger'
  if (role === '教师') return 'warning'
  return ''
}
</script>