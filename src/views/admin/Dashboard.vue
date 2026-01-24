<template>
  <div class="admin-dashboard">
    <h2>管理员后台</h2>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>用户总数</template>
          <div class="stat-number">1,205</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>课程总数</template>
          <div class="stat-number">86</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>今日活跃</template>
          <div class="stat-number">320</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>系统负载</template>
          <div class="stat-number" style="color: #67C23A">Normal</div>
        </el-card>
      </el-col>
    </el-row>
    
    <div style="margin-top: 20px;">
      <el-card>
        <template #header>
          <span>用户管理</span>
          <el-button style="float: right; padding: 3px 0" text>查看全部</el-button>
        </template>
        <el-table :data="users" style="width: 100%">
          <el-table-column prop="date" label="注册日期" width="180" />
          <el-table-column prop="name" label="用户名" width="180" />
          <el-table-column prop="role" label="角色" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="操作">
            <template #default>
              <el-button size="small">编辑</el-button>
              <el-button size="small" type="danger">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { date: '2023-10-01', name: 'zhangsan', role: '学生', status: '正常' },
  { date: '2023-10-02', name: 'teacher_li', role: '教师', status: '正常' },
  { date: '2023-10-03', name: 'admin', role: '管理员', status: '正常' }
])
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}
.stat-number {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #909399;
}
</style>