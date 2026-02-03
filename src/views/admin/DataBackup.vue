<template>
  <div class="data-backup">
    <el-card shadow="never" style="margin-bottom: 20px;">
      <template #header>系统运行状态监控</template>
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="monitor-item">
            <span>内存使用率</span>
            <el-progress :percentage="45" status="success" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="monitor-item">
            <span>磁盘空间</span>
            <el-progress :percentage="78" status="warning" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="monitor-item">
            <span>数据库连接池</span>
            <el-progress :percentage="30" />
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <div class="header-action" style="margin-bottom: 15px;">
        <el-button type="primary" icon="Download" @click="createBackup">立即备份全站数据</el-button>
        <el-button type="info" icon="Timer">设置定时备份策略</el-button>
      </div>

      <el-table :data="backups" style="width: 100%">
        <el-table-column prop="name" label="备份文件名" />
        <el-table-column prop="size" label="文件大小" width="120" />
        <el-table-column prop="type" label="备份类型" width="120">
           <template #default="{ row }">
             <el-tag>{{ row.type }}</el-tag>
           </template>
        </el-table-column>
        <el-table-column prop="time" label="备份时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button size="small" type="warning">恢复</el-button>
            <el-button size="small">下载</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const backups = ref([
  { name: 'backup_full_20231024.sql', size: '450MB', type: '全量备份', time: '2023-10-24 02:00:00' },
  { name: 'backup_inc_20231023.sql', size: '12MB', type: '增量备份', time: '2023-10-23 02:00:00' },
  { name: 'backup_full_20231020.sql', size: '448MB', type: '全量备份', time: '2023-10-20 02:00:00' },
])

const createBackup = () => {
  ElMessage.success('备份任务已提交到后台队列')
}
</script>

<style scoped>
.monitor-item { margin-bottom: 10px; }
.monitor-item span { display: block; margin-bottom: 5px; font-size: 14px; color: #606266; }
</style>