<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h2>系统概览</h2>
      <span class="refresh-time">最后更新: {{ currentTime }}</span>
    </div>

    <el-row :gutter="20" class="section-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>用户总数</span>
              <el-tag type="info" effect="plain">User</el-tag>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-value">1,205</div>
            <div class="stat-footer">
              <span class="label">实时在线:</span>
              <span class="value highlight">320</span>
              <el-icon class="trend-icon" color="#67C23A"><Top /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>课程资源</span>
              <el-tag type="warning" effect="plain">Course</el-tag>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-value">86</div>
            <div class="stat-footer">
              <span class="label">待审核:</span>
              <span class="value warning">4</span>
              <span class="sub-text">需尽快处理</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>今日刷题量</span>
              <el-tag type="primary" effect="plain">Data</el-tag>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-value">4,521</div>
            <div class="stat-footer">
              <span class="label">平均正确率:</span>
              <span class="value">78.5%</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>系统负载</span>
              <el-tag type="success" effect="plain">System</el-tag>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-value success-text">健康</div>
            <div class="stat-footer">
              <span class="label">CPU: 12%</span>
              <el-divider direction="vertical" />
              <span class="label">Mem: 34%</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" class="section-row">
      <el-col :span="24">
        <el-card shadow="never" class="notice-card">
          <template #header>
            <div class="card-header">
              <span class="title-with-icon">
                <el-icon><Bell /></el-icon> 系统公告与快捷入口
              </span>
              <div class="header-actions">
                 <el-button icon="Plus" size="small" plain>发布公告</el-button>
              </div>
            </div>
          </template>
          
          <el-row :gutter="40">
            <el-col :span="16">
              <div class="notice-list">
                <div v-for="(item, index) in notices" :key="index" class="notice-item">
                  <div class="notice-main">
                    <el-tag size="small" effect="light" class="notice-tag">通知</el-tag>
                    <span class="notice-content">{{ item.content }}</span>
                  </div>
                  <span class="notice-time">{{ item.time }}</span>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
               <div class="quick-actions">
                <p class="section-title">快捷操作</p>
                <div class="action-buttons">
                  <el-button icon="UserFilled" type="primary" plain @click="$router.push('/admin/users')">添加用户</el-button>
                  <el-button icon="Upload" type="success" plain>导入题目</el-button>
                  <el-button icon="DataLine" type="warning" plain @click="$router.push('/admin/data-backup')">数据备份</el-button>
                  <el-button icon="Setting" type="info" plain @click="$router.push('/admin/system-config')">系统设置</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="section-row">
      <el-col :span="24">
        <el-card shadow="never" class="todo-card">
          <template #header>
            <div class="card-header">
              <span class="title-with-icon">
                <el-icon><List /></el-icon> 待办审核事项
              </span>
              <el-badge :value="todoList.length" class="item" type="danger">
                <el-button link type="primary">查看全部待办</el-button>
              </el-badge>
            </div>
          </template>
          
          <el-table :data="todoList" style="width: 100%" :border="false">
            <el-table-column prop="type" label="业务类型" width="120">
              <template #default="{ row }">
                <el-tag :type="getTodoTagType(row.type)" effect="dark" size="small">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="申请内容" min-width="300" show-overflow-tooltip>
               <template #default="{ row }">
                 <span style="font-weight: 500">{{ row.content }}</span>
               </template>
            </el-table-column>
            <el-table-column prop="applicant" label="申请人" width="150">
               <template #default="{ row }">
                 <el-avatar :size="20" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="vertical-align: middle; margin-right: 5px"/>
                 <span>{{ row.applicant }}</span>
               </template>
            </el-table-column>
            <el-table-column prop="time" label="提交时间" width="200" />
            <el-table-column label="操作" width="150" fixed="right">
              <template #default>
                <el-button type="primary" size="small" plain>审核通过</el-button>
                <el-button type="danger" size="small" text>驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Top, List, Bell, UserFilled, Upload, DataLine, Setting } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router' // 引入 router

// 如果 setup 中没有自动解构 router，需要手动引入
const $router = useRouter() // 配合 template 中的 $router.push

const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// 模拟待办数据 - 对应需求中提到的课程审核、试卷审核
const todoList = ref([
  { type: '课程', content: '《Vue3 高级实战》课程上架申请', applicant: '李老师', time: '2023-10-24 10:00' },
  { type: '试卷', content: '计算机网络期中考试卷发布审核', applicant: '王老师', time: '2023-10-24 09:30' },
  { type: '资源', content: '数据结构题库批量导入(500题)', applicant: '张教授', time: '2023-10-23 16:00' },
  { type: '用户', content: '新注册教师身份认证: 赵老师', applicant: 'System', time: '2023-10-23 14:20' },
  { type: '课程', content: '《Python数据分析》课程资料更新', applicant: '刘老师', time: '2023-10-23 09:15' },
])

// 模拟公告数据
const notices = ref([
  { content: '系统将于本周六凌晨 02:00 进行例行维护，预计耗时 2 小时，请提前做好数据备份。', time: '2023-10-24' },
  { content: '关于加强题库审核规范的通知：所有导入题目必须包含解析字段。', time: '2023-10-22' },
  { content: '新版本 v2.0 已上线，新增智能组卷功能，欢迎各位老师试用。', time: '2023-10-20' },
  { content: '教务处关于2023-2024学年第一学期期末考试安排的通知。', time: '2023-10-18' },
])

const getTodoTagType = (type: string) => {
  switch (type) {
    case '课程': return ''
    case '试卷': return 'warning'
    case '资源': return 'success'
    case '用户': return 'info'
    default: return ''
  }
}

onMounted(() => {
  // 可以在这里设置定时器更新时间或拉取实时数据
  setInterval(() => {
    currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})
</script>

<style scoped lang="scss">
.admin-dashboard {
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      margin: 0;
      font-size: 20px;
      color: #303133;
      font-weight: 600;
    }
    
    .refresh-time {
      font-size: 13px;
      color: #909399;
    }
  }

  // 每一层级的间距
  .section-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  // 通用卡片头部样式
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .title-with-icon {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 16px;
      color: #303133;
    }
  }

  // 顶部统计卡片样式
  .stat-card {
    .stat-content {
      padding: 10px 0;
      
      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 12px;
        font-family: 'Helvetica Neue', sans-serif;
        
        &.success-text {
          color: #67C23A;
        }
      }
      
      .stat-footer {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #606266;
        gap: 8px;
        
        .label {
          color: #909399;
        }
        
        .value {
          font-weight: 600;
          
          &.highlight { color: #409EFF; }
          &.warning { color: #E6A23C; }
        }
        
        .sub-text {
          font-size: 12px;
          color: #F56C6C;
          margin-left: auto;
        }
      }
    }
  }

  // 系统公告样式
  .notice-card {
    .notice-list {
      // 增加右侧边框分隔线
      border-right: 1px solid #f0f2f5;
      padding-right: 20px;
      
      .notice-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px dashed #f0f2f5;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: #fafafa;
          border-radius: 4px;
        }
        
        &:last-child {
          border-bottom: none;
        }
        
        .notice-main {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          overflow: hidden;
          
          .notice-content {
            font-size: 14px;
            color: #606266;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            
            &:hover {
              color: #409EFF;
            }
          }
        }
        
        .notice-time {
          font-size: 13px;
          color: #909399;
          margin-left: 15px;
          font-family: monospace;
        }
      }
    }
    
    // 快捷入口样式
    .quick-actions {
      padding-left: 10px;
      
      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 20px;
        margin-top: 0;
      }
      
      .action-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        
        .el-button {
          margin-left: 0;
          width: calc(50% - 8px); // 两列布局
          justify-content: flex-start; // 按钮内容左对齐
        }
      }
    }
  }

  // 待办事项样式
  .todo-card {
    // 这里不需要太多额外的样式，主要靠 el-table
  }
}
</style>