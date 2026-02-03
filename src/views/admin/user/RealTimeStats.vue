<template>
  <el-card shadow="never">
    <el-table :data="sortedTableData" style="width: 100%" stripe border>
      <el-table-column prop="courseName" label="课程" min-width="150" />
      <el-table-column prop="courseCode" label="课程代码" width="120" />
      <el-table-column prop="status" label="授课状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="dark">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="teacher" label="授课人" width="100" />
      <el-table-column prop="classNo" label="班级号" width="100" />
      <el-table-column prop="students" label="学生人数" width="120">
        <template #default="{ row }">
          <span>{{ row.attendance }}/{{ row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="100" fixed="right">
        <template #default>
          <el-button type="primary" link size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 模拟数据
const tableData = ref([
  { courseName: '软件工程', courseCode: 'SS2107', status: '正在上课中', teacher: '张三', classNo: '01班', attendance: 49, total: 47 },
  { courseName: '计算机科学与技术', courseCode: 'SS1103', status: '已下课', teacher: '李四', classNo: '05班', attendance: 49, total: 48 },
  { courseName: '计算机导论', courseCode: 'SS1235', status: '未上课', teacher: '王五', classNo: '01班', attendance: 36, total: 36 },
])

// 排序逻辑：优先展示正在上课中
const sortedTableData = computed(() => {
  const priorityMap: Record<string, number> = {
    '正在上课中': 3,
    '未上课': 2,
    '已下课': 1
  }
  return [...tableData.value].sort((a, b) => {
    return priorityMap[b.status] - priorityMap[a.status]
  })
})

const getStatusType = (status: string) => {
  switch (status) {
    case '正在上课中': return 'success'
    case '已下课': return 'info'
    case '未上课': return 'warning'
    default: return ''
  }
}
</script>