<template>
  <div class="practice-data">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>全站总刷题量</template>
          <h2 style="margin:0; color: #409EFF">128,930</h2>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>平均正确率</template>
          <el-progress type="dashboard" :percentage="72.5" :color="colors" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>今日活跃刷题人数</template>
          <h2 style="margin:0;">542</h2>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>
            <span>🔥 高频错题排行榜</span>
          </template>
          <el-table :data="wrongQuestions" stripe style="width: 100%">
            <el-table-column type="index" label="排名" width="60" />
            <el-table-column prop="content" label="题目预览" show-overflow-tooltip />
            <el-table-column prop="course" label="所属课程" width="120" />
            <el-table-column prop="errorRate" label="错误率" width="100">
               <template #default="{ row }">
                 <span style="color: #F56C6C; font-weight: bold">{{ row.errorRate }}%</span>
               </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>刷题活跃时间段分布</template>
          <div v-for="item in activeTimes" :key="item.time" style="margin-bottom: 15px;">
            <span>{{ item.time }}</span>
            <el-progress :percentage="item.val" :format="() => ''" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 80 },
]

const wrongQuestions = ref([
  { content: '若进栈序列为1,2,3,4，则不可能的出栈序列是？', course: '数据结构', errorRate: 68 },
  { content: '快速排序在最坏情况下的时间复杂度是？', course: '算法', errorRate: 62 },
  { content: 'HTTP状态码302表示什么？', course: '计算机网络', errorRate: 55 },
])

const activeTimes = ref([
  { time: '08:00 - 12:00', val: 40 },
  { time: '12:00 - 18:00', val: 65 },
  { time: '18:00 - 22:00', val: 90 }, // 晚间高峰
  { time: '22:00 - 08:00', val: 15 },
])
</script>