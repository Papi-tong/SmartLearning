<template>
  <div class="system-config">
    <el-tabs type="border-card">
      <el-tab-pane label="全局参数配置">
        <el-form label-width="150px" style="max-width: 600px;">
          <el-form-item label="默认考试时长(分钟)">
            <el-input-number v-model="config.examDuration" :min="30" :max="180" />
          </el-form-item>
          <el-form-item label="开启注册功能">
            <el-switch v-model="config.allowRegister" />
          </el-form-item>
          <el-form-item label="系统维护模式">
            <el-switch v-model="config.maintenanceMode" active-color="#13ce66" inactive-color="#ff4949" />
            <span style="margin-left: 10px; font-size: 12px; color: #999">开启后仅管理员可登录</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存配置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="首页轮播图管理">
        <el-button type="primary" icon="Plus" style="margin-bottom: 15px;">添加轮播图</el-button>
        <el-table :data="banners" border>
          <el-table-column prop="title" label="标题" />
          <el-table-column label="图片预览">
            <template #default="{ row }">
              <el-image :src="row.url" style="width: 100px; height: 50px" fit="cover" />
            </template>
          </el-table-column>
          <el-table-column prop="link" label="跳转链接" />
          <el-table-column label="排序" width="100">
             <template #default="{ row }"><el-input-number v-model="row.sort" size="small" :min="1"/></template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button size="small" type="danger">删除</el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="系统日志审计">
        <el-table :data="logs" stripe>
          <el-table-column prop="time" label="操作时间" width="180" />
          <el-table-column prop="user" label="操作人" width="120" />
          <el-table-column prop="ip" label="IP地址" width="140" />
          <el-table-column prop="action" label="操作内容" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const config = reactive({
  examDuration: 90,
  allowRegister: true,
  maintenanceMode: false
})

const banners = ref([
  { title: '开学季活动', url: 'https://placeholder.co/300x150', link: '/activity/start', sort: 1 },
  { title: '新课上线', url: 'https://placeholder.co/300x150', link: '/course/new', sort: 2 }
])

const logs = ref([
  { time: '2023-10-24 10:23:12', user: 'admin', ip: '192.168.1.10', action: '删除了用户 [test_01]' },
  { time: '2023-10-24 09:11:05', user: 'teacher_li', ip: '192.168.1.15', action: '发布了试卷 [期中考]' }
])
</script>