<template>
  <div class="practice-container">
    <div class="page-header">
      <div class="welcome-text">
        <h2>刷题中心</h2>
        <p>坚持练习，积少成多，见证你的每一次进步</p>
      </div>
      <div class="user-stats">
        <div class="stat-item">
          <div class="value">1,204</div>
          <div class="label">累计刷题</div>
        </div>
        <div class="stat-item">
          <div class="value">85%</div>
          <div class="label">正确率</div>
        </div>
        <div class="stat-item">
          <div class="value">12</div>
          <div class="label">连续打卡</div>
        </div>
      </div>
    </div>

    <!-- 主要功能入口 -->
    <div class="mode-selection">
      <el-row :gutter="20">
        <el-col :span="8" v-for="mode in practiceModes" :key="mode.id">
          <el-card class="mode-card" shadow="hover" @click="startPractice(mode)">
            <div class="mode-icon" :style="{ background: mode.color }">
              <el-icon :size="32" color="#fff"><component :is="mode.icon" /></el-icon>
            </div>
            <div class="mode-info">
              <h3>{{ mode.title }}</h3>
              <p>{{ mode.desc }}</p>
            </div>
            <el-icon class="arrow-icon"><ArrowRight /></el-icon>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 推荐练习 -->
    <div class="recommend-section">
      <h3 class="section-title">智能推荐</h3>
      <el-row :gutter="20">
        <el-col :span="12" v-for="item in recommended" :key="item.id">
          <el-card shadow="hover" class="recommend-card">
            <div class="card-content">
              <div class="info">
                <h4>{{ item.title }}</h4>
                <div class="tags">
                  <el-tag size="small" type="success">{{ item.tag }}</el-tag>
                  <span class="count">{{ item.count }}道题</span>
                </div>
              </div>
              <el-button type="primary" size="small" plain round>开始</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 练习记录 -->
    <div class="history-section">
      <h3 class="section-title">最近练习</h3>
      <el-table :data="history" style="width: 100%">
        <el-table-column prop="name" label="练习名称" />
        <el-table-column prop="time" label="完成时间" width="180" />
        <el-table-column prop="score" label="得分/正确率" width="120">
          <template #default="scope">
            <span :class="getScoreClass(scope.row.score)">{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'" size="small">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">查看解析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Timer, Medal, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const practiceModes = [
  {
    id: 1,
    title: '每日一练',
    desc: '根据你的学习进度，每日智能推送10道精选题目',
    icon: Calendar,
    color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)'
  },
  {
    id: 2,
    title: '专项练习',
    desc: '针对薄弱知识点进行集中突破，快速提升',
    icon: Medal,
    color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  },
  {
    id: 3,
    title: '模拟考试',
    desc: '全真模拟考试环境，检测真实水平',
    icon: Timer,
    color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  }
]

const recommended = ref([
  { id: 1, title: '数据结构：二叉树遍历专项', tag: '高频考点', count: 20 },
  { id: 2, title: '英语四级阅读理解模拟', tag: '模拟真题', count: 5 },
  { id: 3, title: '线性代数：矩阵运算', tag: '基础巩固', count: 15 },
  { id: 4, title: 'Vue.js 组件通信机制', tag: '前端进阶', count: 10 }
])

const history = ref([
  { name: '每日一练 (2023-10-25)', time: '2023-10-25 10:30', score: '80%', status: '已完成' },
  { name: '计算机网络单元测试', time: '2023-10-24 15:20', score: '92%', status: '已完成' },
  { name: '高等数学模拟卷二', time: '2023-10-23 09:00', score: '--', status: '进行中' }
])

const startPractice = (mode: any) => {
  ElMessage.success(`进入${mode.title}模式`)
}

const getScoreClass = (score: string) => {
  if (score === '--') return ''
  const val = parseInt(score)
  if (val >= 90) return 'score-high'
  if (val >= 60) return 'score-mid'
  return 'score-low'
}
</script>

<style scoped lang="scss">
.practice-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .page-header {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);

    .welcome-text {
      h2 {
        margin: 0 0 10px;
        font-size: 24px;
        color: #303133;
      }
      p {
        margin: 0;
        color: #909399;
      }
    }

    .user-stats {
      display: flex;
      gap: 40px;

      .stat-item {
        text-align: center;
        
        .value {
          font-size: 24px;
          font-weight: bold;
          color: #409EFF;
          margin-bottom: 5px;
        }
        
        .label {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }

  .mode-selection {
    margin-bottom: 30px;

    .mode-card {
      cursor: pointer;
      transition: all 0.3s;
      border: none;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      }

      :deep(.el-card__body) {
        display: flex;
        align-items: center;
        padding: 20px;
      }

      .mode-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }

      .mode-info {
        flex: 1;
        
        h3 {
          margin: 0 0 8px;
          font-size: 18px;
          color: #303133;
        }
        
        p {
          margin: 0;
          font-size: 13px;
          color: #909399;
          line-height: 1.4;
        }
      }

      .arrow-icon {
        color: #C0C4CC;
      }
    }
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 4px solid #409EFF;
  }

  .recommend-section {
    margin-bottom: 30px;
    
    .recommend-card {
      margin-bottom: 20px;
      
      .card-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .info {
          h4 {
            margin: 0 0 8px;
            font-size: 16px;
            color: #303133;
          }
          
          .tags {
            display: flex;
            align-items: center;
            gap: 10px;
            
            .count {
              font-size: 12px;
              color: #909399;
            }
          }
        }
      }
    }
  }

  .history-section {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);

    .score-high { color: #67C23A; font-weight: bold; }
    .score-mid { color: #E6A23C; font-weight: bold; }
    .score-low { color: #F56C6C; font-weight: bold; }
  }
}
</style>
