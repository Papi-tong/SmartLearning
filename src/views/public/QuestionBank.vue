<template>
  <div class="question-bank-container">
    <div class="page-header">
      <h2>题库中心</h2>
      <div class="header-actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索题目内容、知识点..."
          prefix-icon="Search"
          style="width: 300px"
        />
        <el-button type="primary">搜索</el-button>
      </div>
    </div>

    <el-row :gutter="24">
      <!-- 左侧分类树 -->
      <el-col :span="6">
        <el-card shadow="never" class="category-card">
          <template #header>
            <div class="card-header">
              <span>知识点分类</span>
            </div>
          </template>
          <el-tree 
            :data="categories" 
            :props="defaultProps" 
            @node-click="handleNodeClick"
            default-expand-all
            highlight-current
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <el-icon v-if="data.children" class="folder-icon"><Folder /></el-icon>
                <el-icon v-else class="file-icon"><Document /></el-icon>
                <span>{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>
      
      <!-- 右侧题目列表 -->
      <el-col :span="18">
        <!-- 筛选工具栏 -->
        <div class="filter-bar">
          <div class="filter-item">
            <span class="label">题型：</span>
            <el-radio-group v-model="filters.type" size="small">
              <el-radio-button label="全部" />
              <el-radio-button label="单选题" />
              <el-radio-button label="多选题" />
              <el-radio-button label="填空题" />
              <el-radio-button label="简答题" />
            </el-radio-group>
          </div>
          <div class="filter-item">
            <span class="label">难度：</span>
            <el-radio-group v-model="filters.difficulty" size="small">
              <el-radio-button label="全部" />
              <el-radio-button label="简单" />
              <el-radio-button label="中等" />
              <el-radio-button label="困难" />
            </el-radio-group>
          </div>
        </div>

        <div class="question-list" v-loading="loading">
          <el-card v-for="q in questions" :key="q.id" class="question-item" shadow="hover">
            <div class="q-content">
              <div class="q-header">
                <div class="tags">
                  <el-tag :type="getDifficultyType(q.difficulty)" size="small" effect="plain">{{ q.difficulty }}</el-tag>
                  <el-tag type="info" size="small" effect="plain">{{ q.type }}</el-tag>
                </div>
                <h3 class="q-title">{{ q.title }}</h3>
              </div>
              <div class="q-meta">
                <span class="meta-item"><el-icon><View /></el-icon> {{ q.views }} 浏览</span>
                <span class="meta-item"><el-icon><Collection /></el-icon> {{ q.collections }} 收藏</span>
                <span class="meta-item">来源: {{ q.source }}</span>
              </div>
            </div>
            <div class="q-actions">
              <el-button type="primary" plain round size="small" @click="viewDetail(q)">查看详情</el-button>
            </div>
          </el-card>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="100"
            class="pagination"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Folder, Document, View, Collection } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchQuery = ref('')
const loading = ref(false)

const filters = reactive({
  type: '全部',
  difficulty: '全部'
})

const categories = [
  {
    label: '计算机科学',
    children: [
      { label: '数据结构', children: [{ label: '树与二叉树' }, { label: '图论' }, { label: '排序算法' }] },
      { label: '操作系统', children: [{ label: '进程管理' }, { label: '内存管理' }] },
      { label: '计算机网络' }
    ]
  },
  {
    label: '高等数学',
    children: [
      { label: '极限与连续' },
      { label: '导数与微分' },
      { label: '积分学' }
    ]
  },
  {
    label: '大学英语',
    children: [
      { label: '词汇' },
      { label: '语法' },
      { label: '阅读理解' }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const questions = ref([
  { id: 1, title: '二叉树的遍历方式有哪些？请分别描述其遍历顺序。', type: '简答题', difficulty: '中等', source: '2023考研真题', views: 1205, collections: 45 },
  { id: 2, title: 'Vue 3 生命周期钩子函数有哪些？与 Vue 2 有何不同？', type: '简答题', difficulty: '简单', source: '前端面试题', views: 3400, collections: 128 },
  { id: 3, title: 'HTTP 和 HTTPS 的区别是什么？', type: '简答题', difficulty: '中等', source: '计算机网络期末考', views: 2100, collections: 89 },
  { id: 4, title: '求解矩阵的特征值：A = [[1, 2], [3, 4]]', type: '计算题', difficulty: '困难', source: '线性代数习题集', views: 890, collections: 32 },
  { id: 5, title: 'Translation: Artificial Intelligence is transforming the world.', type: '翻译题', difficulty: '简单', source: '英语四级', views: 1500, collections: 56 },
  { id: 6, title: '以下哪个不是面向对象编程的特性？', type: '单选题', difficulty: '简单', source: 'Java基础', views: 800, collections: 12 }
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

const viewDetail = (q: any) => {
  ElMessage.info(`查看题目：${q.title}`)
}
</script>

<style scoped lang="scss">
.question-bank-container {
  padding: 20px;
  /* max-width: 1200px; */
  /* margin: 0 auto; */
  width: 100%;
  box-sizing: border-box;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h2 {
      margin: 0;
      font-size: 24px;
      color: #303133;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }
  }

  .category-card {
    height: calc(100vh - 140px);
    overflow-y: auto;
    
    .card-header {
      font-weight: bold;
    }

    .custom-tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .el-icon {
        color: #909399;
      }
    }
  }

  .filter-bar {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);

    .filter-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      
      &:last-child {
        margin-bottom: 0;
      }

      .label {
        width: 60px;
        color: #606266;
        font-weight: bold;
      }
    }
  }

  .question-list {
    .question-item {
      margin-bottom: 15px;
      border: none;
      
      :deep(.el-card__body) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
      }

      .q-content {
        flex: 1;

        .q-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;

          .q-title {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
            color: #303133;
          }
        }

        .q-meta {
          display: flex;
          gap: 20px;
          color: #909399;
          font-size: 13px;

          .meta-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }
      }
    }

    .pagination {
      margin-top: 30px;
      justify-content: center;
    }
  }
}
</style>
