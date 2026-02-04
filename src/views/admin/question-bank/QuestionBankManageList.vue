<template>
  <el-card shadow="never">
    <div v-if="!isDetailMode">
      <el-table :data="tableData" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="名称" min-width="180">
          <template #default="{ row }">
            <el-link type="primary" :underline="false" @click="showDetail(row)">{{ row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="major" label="专业" width="120" />
        <el-table-column prop="semester" label="学期" width="120" />
        <el-table-column prop="creator" label="创建人" width="100" />
        <el-table-column prop="format" label="格式" width="80" align="center">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.format }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="可见性" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.visibility === '公开' ? 'success' : 'info'">{{ row.visibility }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最终修改时间" width="160" />
        <el-table-column label="编辑" width="80" fixed="right" align="center">
          <template #default>
            <el-button link type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer-actions">
        <el-button type="primary">选择</el-button>
        <el-button type="danger" @click="handleBatchDelete">删除</el-button>
      </div>
    </div>

    <div v-else class="detail-panel">
      <div class="detail-header">
        <el-button icon="ArrowLeft" link @click="isDetailMode = false">返回列表</el-button>
        <h3>题库/试卷详情预览</h3>
      </div>
      <el-descriptions border :column="2">
        <el-descriptions-item label="名称">{{ currentRow.name }}</el-descriptions-item>
        <el-descriptions-item label="格式">{{ currentRow.format }}</el-descriptions-item>
        <el-descriptions-item label="可见性">{{ currentRow.visibility }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ currentRow.description }}</el-descriptions-item>
        <el-descriptions-item label="文件操作" :span="2">
          <div class="preview-box">
            <span>{{ currentRow.name }}.{{ currentRow.format.toLowerCase() }}</span>
            <el-button type="primary" link icon="Download">下载本地查看</el-button>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ArrowLeft, Download } from '@element-plus/icons-vue'

const isDetailMode = ref(false)
const currentRow = ref<any>({})
const selectedItems = ref([])

const tableData = ref([
  { name: '计算机组成原理题库', major: '软件工程', semester: '2025-2026', creator: '李老师', format: 'PDF', createTime: '2026-01-10 08:30', description: '重点章节题型', visibility: '公开', updateTime: '2026-02-01 10:00' }
])

const showDetail = (row: any) => { currentRow.value = row; isDetailMode.value = true; }
const handleSelectionChange = (val: any) => { selectedItems.value = val; }

const handleBatchDelete = () => {
  if (selectedItems.value.length === 0) return ElMessage.warning('请选择要删除的项目')
  ElMessageBox.confirm('是否确认删除？删除后不可恢复', '警告', {
    confirmButtonText: '确认删除', cancelButtonText: '取消', type: 'warning'
  }).then(() => { ElMessage.success('已确认删除') })
}
</script>

<style scoped>
.footer-actions { margin-top: 20px; }
.detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.preview-box { background: #f5f7fa; padding: 10px; border-radius: 4px; display: flex; justify-content: space-between; }
</style>