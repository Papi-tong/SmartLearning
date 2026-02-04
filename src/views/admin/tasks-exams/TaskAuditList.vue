<template>
  <el-card shadow="never" class="audit-card">
    <div v-if="!isDetailMode">
      <el-alert 
        title="待审核队列：请在48小时内完成教师发布内容的合规性审查" 
        type="warning" 
        show-icon 
        class="mb-20" 
      />
      <el-table :data="auditList" style="width: 100%" border stripe>
        <el-table-column prop="applicant" label="申请人" width="100" />
        <el-table-column prop="employeeId" label="工号" width="100" />
        <el-table-column prop="major" label="专业" width="120" />
        <el-table-column prop="course" label="课程" min-width="150" />
        <el-table-column label="申请任务/考试" min-width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="showAuditDetail(row)">{{ row.taskName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === '待审核' ? 'warning' : 'success'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" plain @click="showAuditDetail(row)">去审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else class="detail-panel">
      <div class="detail-header">
        <div class="header-title">
          <el-icon @click="isDetailMode = false" class="back-icon"><ArrowLeft /></el-icon>
          <h3>任务/考试发布审核表</h3>
        </div>
        <el-button @click="isDetailMode = false">返回列表</el-button>
      </div>

      <el-descriptions border :column="2" class="mb-20">
        <el-descriptions-item label="任务/考试名称">{{ currentRow.taskName }}</el-descriptions-item>
        <el-descriptions-item label="对应课程">{{ currentRow.course }}</el-descriptions-item>
        <el-descriptions-item label="申请人">{{ currentRow.applicant }} (工号: {{ currentRow.employeeId }})</el-descriptions-item>
        <el-descriptions-item label="所属专业">{{ currentRow.major }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ currentRow.publishTime }}</el-descriptions-item>
        <el-descriptions-item label="申请理由" :span="2">{{ currentRow.reason || '无' }}</el-descriptions-item>
      </el-descriptions>

      <div class="audit-action-box">
        <div class="action-item">
          <p class="action-label">是否同意添加该任务/考试？</p>
          <el-radio-group v-model="auditForm.result" class="mb-20">
            <el-radio label="pass" size="large" border>是 (准予发布)</el-radio>
            <el-radio label="reject" size="large" border>否 (驳回申请)</el-radio>
          </el-radio-group>
        </div>

        <div class="action-item">
          <p class="action-label">审核意见：</p>
          <el-input 
            v-model="auditForm.opinion" 
            type="textarea" 
            :rows="4" 
            placeholder="请输入详细的审核意见（若驳回则必填）..." 
            class="mb-20" 
          />
        </div>
        
        <div class="button-bar">
          <el-button type="primary" size="large" @click="submitAudit">提交审核结果</el-button>
          <el-button size="large" @click="isDetailMode = false">取消</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue' // 必须导入，解决之前的报错问题 

const isDetailMode = ref(false)
const currentRow = ref<any>({})
const auditForm = reactive({ result: 'pass', opinion: '' })

const auditList = ref([
  { 
    applicant: '张三', 
    employeeId: '2103', 
    major: '软件工程', 
    course: 'web前端开发', 
    taskName: '任务一', 
    reason: '无', 
    status: '待审核',
    publishTime: '2026.1.18 10:21'
  }
])

// 切换到详情模式 
const showAuditDetail = (row: any) => {
  currentRow.value = row
  auditForm.result = 'pass'
  auditForm.opinion = ''
  isDetailMode.value = true
}

const submitAudit = () => {
  if (auditForm.result === 'reject' && !auditForm.opinion) {
    ElMessage.warning('驳回申请时请填写审核意见')
    return
  }

  ElMessageBox.confirm('确认提交此审核结果吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info'
  }).then(() => {
    ElMessage.success('审核已提交')
    isDetailMode.value = false
  })
}
</script>

<style scoped>
.mb-20 { margin-bottom: 20px; }
.header-title { display: flex; align-items: center; gap: 10px; }
.back-icon { cursor: pointer; font-size: 20px; color: #909399; transition: 0.3s; }
.back-icon:hover { color: #409EFF; }
.detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; }
.audit-action-box { background: #f8f9fb; padding: 25px; border-radius: 8px; border: 1px solid #ebeef5; }
.action-label { font-weight: bold; margin-bottom: 15px; display: block; color: #303133; }
.button-bar { border-top: 1px solid #eee; padding-top: 20px; }
</style>