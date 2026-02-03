<template>
  <div class="qb-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card shadow="never" class="category-card">
          <template #header>
             <span>题库分类</span>
             <el-button style="float: right; padding: 3px 0" text type="primary">管理</el-button>
          </template>
          <el-tree :data="categories" :props="defaultProps" default-expand-all highlight-current />
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-card shadow="never">
          <div class="actions">
            <el-button type="primary" icon="Plus">单题录入</el-button>
            <el-button type="success" icon="Upload">批量导入(Excel/Word)</el-button>
            <el-button type="warning" icon="Document">智能组卷</el-button>
            <el-input v-model="searchKey" placeholder="搜索题目内容..." style="width: 200px; margin-left: auto;" prefix-icon="Search" />
          </div>

          <el-table :data="questions" style="margin-top: 20px;">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="content" label="题目内容" min-width="300" show-overflow-tooltip />
            <el-table-column prop="type" label="题型" width="100">
               <template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="difficulty" label="难度" width="100">
              <template #default="{ row }">
                <el-rate v-model="row.difficulty" disabled text-color="#ff9900" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <el-button link type="primary">编辑</el-button>
              <el-button link type="danger">删除</el-button>
            </el-table-column>
          </el-table>
          
          <el-pagination layout="prev, pager, next" :total="100" style="margin-top: 20px; float: right;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchKey = ref('')
const categories = [
  { label: '计算机科学', children: [{ label: '数据结构' }, { label: '操作系统' }] },
  { label: '数学', children: [{ label: '高等数学' }, { label: '线性代数' }] }
]
const defaultProps = { children: 'children', label: 'label' }

const questions = ref([
  { content: '在二叉树中，第5层最多有多少个节点？', type: '单选题', difficulty: 2 },
  { content: '简述TCP三次握手的过程。', type: '简答题', difficulty: 4 },
  { content: 'Java中String是基本数据类型吗？', type: '判断题', difficulty: 1 },
])
</script>

<style scoped>
.category-card { height: 100%; min-height: 500px; }
.actions { display: flex; gap: 10px; }
</style>