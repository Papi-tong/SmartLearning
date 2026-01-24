<template>
  <div class="question-bank">
    <div class="page-header">
      <h2>题库中心</h2>
      <el-input
        v-model="searchQuery"
        placeholder="搜索题目..."
        prefix-icon="Search"
        style="width: 300px"
      />
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never">
          <template #header>题目分类</template>
          <el-tree :data="categories" :props="defaultProps" @node-click="handleNodeClick" />
        </el-card>
      </el-col>
      
      <el-col :span="18">
        <el-card shadow="never">
          <div v-for="q in questions" :key="q.id" class="question-item">
            <div class="q-header">
              <el-tag size="small" :type="getDifficultyType(q.difficulty)">{{ q.difficulty }}</el-tag>
              <span class="q-type">[{{ q.type }}]</span>
              <span class="q-title">{{ q.title }}</span>
            </div>
            <div class="q-meta">
              <span>来源: {{ q.source }}</span>
              <span>浏览: {{ q.views }}</span>
              <el-button type="primary" link>查看解析</el-button>
            </div>
          </div>
          
          <el-pagination
            layout="prev, pager, next"
            :total="100"
            style="margin-top: 20px; justify-content: center"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchQuery = ref('')

const categories = [
  {
    label: '计算机科学',
    children: [
      { label: '数据结构' },
      { label: '算法' },
      { label: '操作系统' },
      { label: '计算机网络' }
    ]
  },
  {
    label: '数学',
    children: [
      { label: '高等数学' },
      { label: '线性代数' },
      { label: '概率论' }
    ]
  },
  {
    label: '英语',
    children: [
      { label: '四级' },
      { label: '六级' },
      { label: '考研英语' }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const questions = ref([
  { id: 1, title: '二叉树的遍历方式有哪些？', type: '简答题', difficulty: '中等', source: '2023考研真题', views: 1205 },
  { id: 2, title: 'Vue 3 生命周期钩子函数有哪些？', type: '简答题', difficulty: '简单', source: '前端面试题', views: 3400 },
  { id: 3, title: 'HTTP 和 HTTPS 的区别是什么？', type: '简答题', difficulty: '中等', source: '计算机网络期末考', views: 2100 },
  { id: 4, title: '求解矩阵的特征值', type: '计算题', difficulty: '困难', source: '线性代数习题集', views: 890 },
  { id: 5, title: 'Translation: Artificial Intelligence', type: '翻译题', difficulty: '简单', source: '英语四级', views: 1500 }
])

const handleNodeClick = (data: any) => {
  console.log(data)
}

const getDifficultyType = (diff: string) => {
  if (diff === '简单') return 'success'
  if (diff === '中等') return 'warning'
  if (diff === '困难') return 'danger'
  return 'info'
}
</script>

<style scoped lang="scss">
.question-bank {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .question-item {
    border-bottom: 1px solid #f0f2f5;
    padding: 15px 0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .q-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      
      .q-type {
        color: #909399;
        font-weight: bold;
      }
      
      .q-title {
        font-size: 16px;
        color: #303133;
        font-weight: 500;
      }
    }
    
    .q-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      color: #909399;
      font-size: 13px;
      padding-left: 5px;
    }
  }
}
</style>