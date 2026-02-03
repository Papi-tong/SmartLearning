<template>
  <el-card shadow="never">
    <div v-if="!isDetailMode">
      <el-table :data="auditList" style="width: 100%" border stripe>
        <el-table-column prop="applicant" label="申请人" width="100" />
        <el-table-column prop="teacherId" label="工号" width="100" />
        <el-table-column prop="major" label="专业" width="120" />
        <el-table-column label="申请课程" min-width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="showDetail(row)">{{ row.courseName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="申请理由" show-overflow-tooltip />
        <el-table-column prop="status" label="申请状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else class="detail-panel">
      <div class="detail-header">
        <h3>课程申请表</h3>
        <el-button @click="isDetailMode = false">返回列表</el-button>
      </div>
      
      <el-descriptions border :column="2" class="mb-20">
        <el-descriptions-item label="申请课程">{{ currentRow.courseName }}</el-descriptions-item>
        <el-descriptions-item label="申请人">{{ currentRow.applicant }} ({{ currentRow.teacherId }})</el-descriptions-item>
        <el-descriptions-item label="所属专业">{{ currentRow.major }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">2023-10-24</el-descriptions-item>
        <el-descriptions-item label="详细说明" :span="2">
          {{ currentRow.fullDescription || '希望开设此课程以补充大三下学期的实战项目空缺。' }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="audit-action">
        <p class="label">是否同意添加课程？</p>
        <el-radio-group v-model="auditForm.result" class="mb-20">
          <el-radio label="pass" size="large">是 (同意)</el-radio>
          <el-radio label="reject" size="large">否 (拒绝)</el-radio>
        </el-radio-group>
        
        <p class="label">审核理由：</p>
        <el-input 
          v-model="auditForm.reason" 
          type="textarea" 
          :rows="4" 
          placeholder="请输入审核理由..." 
          class="mb-20"
        />
        
        <el-button type="primary" @click="submitAudit">提交审核</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const isDetailMode = ref(false)
const currentRow = ref<any>({})
const auditForm = reactive({ result: 'pass', reason: '' })

const auditList = ref([
  { applicant: '张三', teacherId: 'T001', major: '软件工程', courseName: 'Vue3 高级实战', reason: '补充前端课程', status: '待审核' },
  { applicant: '李四', teacherId: 'T002', major: '计算机', courseName: 'Python 数据分析', reason: '新开选修课', status: '审核中' }
])

const showDetail = (row: any) => {
  currentRow.value = row
  isDetailMode.value = true
}

const submitAudit = () => {
  ElMessage.success(`审核已提交：${auditForm.result === 'pass' ? '通过' : '拒绝'}`)
  isDetailMode.value = false
}

const getStatusType = (status: string) => {
  return status === '待审核' ? 'warning' : (status === '审核中' ? 'primary' : 'success')
}
</script>

<style scoped>
.mb-20 { margin-bottom: 20px; }
.detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
.audit-action { background: #f9f9f9; padding: 20px; border-radius: 4px; }
.label { font-weight: bold; margin-bottom: 10px; display: block; }
</style>