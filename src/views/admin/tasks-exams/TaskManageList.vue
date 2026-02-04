<template>
  <div class="task-manage-container">
    <el-table :data="tasks" style="width: 100%" border stripe>
      <el-table-column prop="applicant" label="申请人" width="100" />
      <el-table-column prop="employeeId" label="工号" width="100" />
      <el-table-column prop="major" label="专业" width="120" />
      <el-table-column prop="course" label="课程" min-width="150" />
      
      <el-table-column label="申请任务/考试" min-width="150">
        <template #default="{ row }">
          <el-link type="primary" @click="handleViewDetail(row)">{{ row.taskName }}</el-link>
        </template>
      </el-table-column>

      <el-table-column prop="reason" label="申请理由" show-overflow-tooltip />
      
      <el-table-column label="申请状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusTag(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="publishTime" label="发布时间" width="180" />

      <el-table-column label="修改任务/考试" width="220" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button size="small" type="primary" plain>编辑</el-button>
            <el-button size="small" type="warning" plain>修改时间</el-button>
            <el-button size="small" type="danger" plain>删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="任务/考试申请表" width="550px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="任务/考试名称">{{ currentItem.taskName }}</el-descriptions-item>
        <el-descriptions-item label="对应课程">{{ currentItem.course }}</el-descriptions-item>
        <el-descriptions-item label="申请人">{{ currentItem.applicant }} (工号: {{ currentItem.employeeId }})</el-descriptions-item>
        <el-descriptions-item label="专业">{{ currentItem.major }}</el-descriptions-item>
        <el-descriptions-item label="原申请理由">{{ currentItem.reason || '无' }}</el-descriptions-item>
      </el-descriptions>
      
      <div style="margin-top: 20px; border-top: 1px dashed #dcdfe6; padding-top: 20px;">
        <p style="font-weight: bold; margin-bottom: 15px; color: #409EFF;">是否同意添加该任务/考试？</p>
        <el-input
          v-model="auditReason"
          type="textarea"
          placeholder="请输入补充说明或修改理由..."
          :rows="3"
        />
      </div>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 1. 模拟数据补全 
const tasks = ref([
  {
    applicant: '张三',
    employeeId: '2103',
    major: '软件工程',
    course: 'web前端开发',
    taskName: '任务一',
    reason: '无',
    status: '申请中',
    publishTime: '2026.1.18 10:21'
  },
  {
    applicant: '李四',
    employeeId: '2104',
    major: '人工智能',
    course: '机器学习基础',
    taskName: '期中考试',
    reason: '根据教学大纲安排',
    status: '申请成功',
    publishTime: '2026.1.19 09:00'
  }
])

const dialogVisible = ref(false)
const currentItem = ref<any>({})
const auditReason = ref('')

// 2. 查看详情逻辑 
const handleViewDetail = (row: any) => {
  currentItem.value = { ...row }
  auditReason.value = row.reason === '无' ? '' : row.reason
  dialogVisible.value = true
}

const handleConfirm = () => {
  ElMessage.success('详情已确认并保存')
  dialogVisible.value = false
}

// 3. 状态颜色转换 
const getStatusTag = (status: string) => {
  const map: Record<string, string> = {
    '申请中': 'warning',
    '申请成功': 'success',
    '申请失败': 'danger',
    '已撤回申请': 'info'
  }
  return map[status] || 'info'
}
</script>

<style scoped>
.task-manage-container { padding: 5px; }
:deep(.el-descriptions__label) { width: 120px; font-weight: bold; }
</style>