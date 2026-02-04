<template>
  <el-card shadow="never">
    <div v-if="!isDetailMode">
      <el-table 
        :data="tableData" 
        border 
        @selection-change="handleSelectionChange"
        style="width: 100%"
        stripe
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        
        <el-table-column label="名称" min-width="180">
          <template #default="{ row }">
            <el-link type="primary" :underline="false" @click="showDetail(row)">
              {{ row.name }}
            </el-link>
          </template>
        </el-table-column>

        <el-table-column prop="major" label="专业" width="120" />
        <el-table-column prop="semester" label="学期" width="120" />
        <el-table-column prop="creator" label="创建人" width="100" />
        <el-table-column prop="format" label="格式" width="80" align="center">
          <template #default="{ row }">
            <el-tag size="small" effect="plain" type="info">{{ row.format }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        
        <el-table-column label="可见性" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.visibility === '公开' ? 'success' : 'info'">{{ row.visibility }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="申请状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="最终修改时间" width="160" />
        
        <el-table-column label="编辑" width="80" fixed="right" align="center">
          <template #default>
            <el-button link type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer-actions" style="margin-top: 20px;">
        <el-button type="primary">选择</el-button>
        <el-button type="danger" @click="confirmBatchDelete">删除</el-button>
      </div>
    </div>

    <div v-else class="audit-panel">
      <div class="detail-header">
        <el-button icon="ArrowLeft" link @click="isDetailMode = false">返回列表</el-button>
        <h3>题库/试卷详情表</h3>
      </div>
      
      <el-descriptions border :column="2" class="mb-20">
        <el-descriptions-item label="名称">{{ currentRow.name }}</el-descriptions-item>
        <el-descriptions-item label="格式">{{ currentRow.format }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentRow.creator }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ currentRow.description }}</el-descriptions-item>
        <el-descriptions-item label="内容预览与下载" :span="2">
          <div class="preview-box">
             <div class="file-info">
                <el-icon><Document /></el-icon>
                <span>{{ currentRow.name }}.{{ currentRow.format.toLowerCase() }}</span>
             </div>
             <el-button type="primary" link icon="Download">下载本地查看</el-button>
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <div class="audit-section" style="background: #f8f9fb; padding: 20px; border-radius: 8px;">
        <p class="label" style="font-weight: bold; margin-bottom: 15px;">是否同意添加该题库/试卷？</p>
        <el-radio-group v-model="auditForm.result" class="mb-20">
          <el-radio label="pass" border>同意添加</el-radio>
          <el-radio label="reject" border>拒绝添加</el-radio>
        </el-radio-group>
        
        <p class="label" style="font-weight: bold; margin: 15px 0 10px 0;">审核理由：</p>
        <el-input 
          v-model="auditForm.reason" 
          type="textarea" 
          :rows="4" 
          placeholder="请输入审核理由..." 
        />
        
        <div class="mt-20" style="margin-top: 20px;">
          <el-button type="primary" @click="submitAudit">提交审核结果</el-button>
          <el-button @click="isDetailMode = false">取消</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ArrowLeft, Document, Download } from '@element-plus/icons-vue'

const isDetailMode = ref(false)
const currentRow = ref<any>({})
const selectedItems = ref([])
const auditForm = reactive({ result: 'pass', reason: '' })

// 模拟数据结构补全
const tableData = ref([
  {
    name: '计算机网络题库',
    major: '软件工程',
    semester: '2025-2026',
    creator: '张三',
    format: 'Word',
    createTime: '2026-02-01 10:21',
    description: '涵盖物理层到应用层核心知识点',
    visibility: '公开',
    status: '申请中',
    updateTime: '2026-02-03 15:30'
  }
])

const showDetail = (row: any) => {
  currentRow.value = row
  auditForm.reason = ''
  isDetailMode.value = true
}

const handleSelectionChange = (val: any) => {
  selectedItems.value = val
}

const confirmBatchDelete = () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请先选择要删除的内容')
    return
  }
  ElMessageBox.confirm('是否确认删除？删除后不可恢复', '警告', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

const getStatusTag = (status: string) => {
  const map: Record<string, string> = {
    '申请成功': 'success',
    '申请中': 'warning',
    '申请失败': 'danger'
  }
  return map[status] || 'info'
}

const submitAudit = () => {
  ElMessage.success(`审核已提交：${auditForm.result === 'pass' ? '同意' : '拒绝'}`)
  isDetailMode.value = false
}
</script>

<style scoped>
.mb-20 { margin-bottom: 20px; }
.preview-box { background: #fff; padding: 12px; border: 1px solid #dcdfe6; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
.file-info { display: flex; align-items: center; gap: 8px; }
</style>