<template>
  <el-card shadow="never">
    <div v-if="!showDetailModal">
      <el-table :data="resourceList" style="width: 100%" border stripe>
        <el-table-column prop="major" label="专业" width="120" />
        <el-table-column prop="courseName" label="课程" min-width="150" />
        <el-table-column prop="courseCode" label="课程代码" width="100" />
        <el-table-column prop="applicant" label="申请人" width="100" />
        <el-table-column prop="teacherId" label="工号" width="100" />
        <el-table-column label="格式" width="100">
          <template #default="{ row }">
            <el-button type="primary" link @click="openDetail(row)">{{ row.format }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="申请时间" width="120" />
        <el-table-column prop="reason" label="申请理由" show-overflow-tooltip />
      </el-table>
    </div>

    <el-dialog v-model="showDetailModal" title="资源申请审核" width="600px">
      <div class="resource-preview">
        <div class="preview-box">
          <el-icon :size="40" color="#909399"><Document /></el-icon>
          <p>{{ currentRow.resourceName }}</p>
          <el-button size="small">预览文件内容</el-button>
        </div>
        
        <el-form label-position="top" class="mt-20">
          <el-form-item label="是否同意添加该资源？">
            <el-radio-group v-model="auditResult">
              <el-radio label="pass">是 (同意)</el-radio>
              <el-radio label="reject">否 (拒绝)</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核理由">
            <el-input v-model="auditReason" type="textarea" :rows="3" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showDetailModal = false">取消</el-button>
        <el-button type="primary" @click="handleAudit">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const showDetailModal = ref(false)
const currentRow = ref<any>({})
const auditResult = ref('pass')
const auditReason = ref('')

const resourceList = ref([
  { major: '软件工程', courseName: '软件测试', courseCode: 'SE202', applicant: '张老师', teacherId: 'T003', format: 'PDF文档', time: '2023-10-24', reason: '期末复习资料', resourceName: '2023期末复习大纲.pdf' },
  { major: '计算机', courseName: '操作系统', courseCode: 'CS301', applicant: '李老师', teacherId: 'T004', format: '视频', time: '2023-10-23', reason: '实验演示视频', resourceName: '死锁演示.mp4' },
])

const openDetail = (row: any) => {
  currentRow.value = row
  showDetailModal.value = true
}

const handleAudit = () => {
  ElMessage.success('审核完成')
  showDetailModal.value = false
}
</script>

<style scoped>
.preview-box { text-align: center; padding: 20px; background: #f5f7fa; border-radius: 4px; border: 1px dashed #dcdfe6; }
.mt-20 { margin-top: 20px; }
</style>