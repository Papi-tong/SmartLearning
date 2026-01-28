<template>
  <div class="textbook-container">
    <div class="page-header">
      <h2>电子教材</h2>
      <div class="header-actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索教材名称、作者..."
          prefix-icon="Search"
          style="width: 300px"
        />
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-group">
        <span class="label">学科：</span>
        <el-radio-group v-model="filters.subject" size="small">
          <el-radio-button label="全部" />
          <el-radio-button label="语文" />
          <el-radio-button label="数学" />
          <el-radio-button label="英语" />
          <el-radio-button label="物理" />
          <el-radio-button label="化学" />
          <el-radio-button label="计算机" />
        </el-radio-group>
      </div>
      <div class="filter-group">
        <span class="label">年级：</span>
        <el-radio-group v-model="filters.grade" size="small">
          <el-radio-button label="全部" />
          <el-radio-button label="大一" />
          <el-radio-button label="大二" />
          <el-radio-button label="大三" />
          <el-radio-button label="大四" />
        </el-radio-group>
      </div>
    </div>

    <!-- 教材列表 -->
    <div class="textbook-list" v-loading="loading">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="book in textbooks" :key="book.id">
          <el-card class="textbook-card" shadow="hover" :body-style="{ padding: '0px' }">
            <div class="cover-wrapper">
              <img :src="book.cover" class="book-cover" />
              <div class="hover-overlay">
                <el-button type="primary" round @click="readBook(book)">立即阅读</el-button>
              </div>
            </div>
            <div class="book-info">
              <h3 class="book-title" :title="book.title">{{ book.title }}</h3>
              <p class="book-meta">
                <span class="author">{{ book.author }}</span>
                <span class="publisher">{{ book.publisher }}</span>
              </p>
              <div class="book-tags">
                <el-tag size="small" effect="plain">{{ book.subject }}</el-tag>
                <el-tag size="small" type="info" effect="plain">{{ book.grade }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchQuery = ref('')
const loading = ref(false)

const filters = reactive({
  subject: '全部',
  grade: '全部'
})

// 模拟数据
const textbooks = ref([
  {
    id: 1,
    title: '高等数学（第七版）上册',
    author: '同济大学数学系',
    publisher: '高等教育出版社',
    subject: '数学',
    grade: '大一',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: '大学英语综合教程',
    author: '上海外语教育出版社',
    publisher: '上海外语教育出版社',
    subject: '英语',
    grade: '大一',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'C++ 程序设计',
    author: '谭浩强',
    publisher: '清华大学出版社',
    subject: '计算机',
    grade: '大一',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: '计算机网络（第7版）',
    author: '谢希仁',
    publisher: '电子工业出版社',
    subject: '计算机',
    grade: '大二',
    cover: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: '大学物理学',
    author: '张三',
    publisher: '科学出版社',
    subject: '物理',
    grade: '大一',
    cover: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: '数据结构（C语言版）',
    author: '严蔚敏',
    publisher: '清华大学出版社',
    subject: '计算机',
    grade: '大二',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
])

const readBook = (book: any) => {
  ElMessage.success(`开始阅读：${book.title}`)
}
</script>

<style scoped lang="scss">
.textbook-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

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
  }

  .filter-section {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);

    .filter-group {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      
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

  .textbook-list {
    .textbook-card {
      margin-bottom: 20px;
      transition: all 0.3s;
      border: none;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        
        .cover-wrapper .hover-overlay {
          opacity: 1;
        }
      }

      .cover-wrapper {
        position: relative;
        height: 200px;
        overflow: hidden;
        
        .book-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
      }

      .book-info {
        padding: 16px;

        .book-title {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 600;
          color: #303133;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .book-meta {
          margin: 0 0 12px;
          font-size: 13px;
          color: #909399;
          display: flex;
          justify-content: space-between;
        }

        .book-tags {
          display: flex;
          gap: 8px;
        }
      }
    }
  }
}
</style>
