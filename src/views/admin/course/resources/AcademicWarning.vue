<template>
  <div class="warning-container">
    <el-card shadow="never" class="filter-bar mb-20">
      <div class="flex-justify">
        <div class="left-filters">
          <span class="label">筛选：</span>
          <el-select v-model="filterMajor" placeholder="专业筛选" style="width: 150px; margin-right: 10px;">
            <el-option label="软件工程" value="SE" />
            <el-option label="计算机" value="CS" />
          </el-select>
          <el-select v-model="filterClass" placeholder="班级筛选" style="width: 150px;">
            <el-option label="01班" value="01" />
            <el-option label="02班" value="02" />
          </el-select>
        </div>
        <div class="right-action">
          <el-button type="warning" plain icon="Refresh">规则重置</el-button>
        </div>
      </div>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="never" header="班级学业状态热力图">
          <div class="chart-container">
            <div class="heatmap-mock">
              <div class="y-axis">分均平</div>
              <div class="chart-body">
                <svg viewBox="0 0 100 50" class="line-chart">
                  <polyline points="0,40 20,35 40,20 60,30 80,10 100,15" fill="none" stroke="#409EFF" stroke-width="2" />
                  <polyline points="0,20 20,25 40,40 60,35 80,45 100,40" fill="none" stroke="#F56C6C" stroke-width="2" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="red" stroke-width="1" stroke-dasharray="2" />
                </svg>
                <div class="x-axis">周次 (1-10周)</div>
              </div>
            </div>
            <div class="chart-legend">
              <span class="dot normal"></span>正常 
              <span class="dot warning"></span>交常 
              <span class="dot alarm"></span>各警 
              <span class="dot pre"></span>预警
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never" header="当前预警人数统计">
          <div class="warning-stats">
            <div class="stat-item yellow">
              <span class="title">黄色预警 (轻度)</span>
              <span class="count">12 人</span>
            </div>
            <div class="stat-item orange">
              <span class="title">橙色预警 (中度)</span>
              <span class="count">5 人</span>
            </div>
            <div class="stat-item red">
              <span class="title">红色预警 (重度)</span>
              <span class="count">2 人</span>
            </div>
          </div>
          
          <el-divider />
          <p style="font-size: 13px; color: #666;">点击上方色块可查看具体学生名单</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const filterMajor = ref('')
const filterClass = ref('')
</script>

<style scoped lang="scss">
.mb-20 { margin-bottom: 20px; }
.flex-justify { display: flex; justify-content: space-between; align-items: center; }
.label { font-size: 14px; color: #606266; margin-right: 10px; }

/* 模拟图表样式 */
.heatmap-mock {
  display: flex;
  height: 300px;
  background: #f9faff;
  border: 1px solid #eee;
  padding: 10px;
  position: relative;
  
  .y-axis { writing-mode: vertical-lr; text-align: center; color: #666; font-size: 12px; }
  .chart-body { flex: 1; position: relative; display: flex; flex-direction: column; justify-content: flex-end; }
  .line-chart { width: 100%; height: 100%; }
  .x-axis { text-align: center; width: 100%; font-size: 12px; color: #666; margin-top: 5px; }
}

.chart-legend { margin-top: 10px; display: flex; justify-content: center; gap: 15px; font-size: 12px; }
.dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
.normal { background: #409EFF; }
.warning { background: #E6A23C; }
.alarm { background: #F56C6C; }
.pre { background: #67C23A; }

/* 预警统计卡片 */
.warning-stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .stat-item {
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    
    &.yellow { background: #fdf6ec; color: #e6a23c; border: 1px solid #faecd8; }
    &.orange { background: #fef0f0; color: #f56c6c; border: 1px solid #fde2e2; } // Element 只有 danger
    &.red { background: #ffeded; color: #ff0000; border: 1px solid #ffdbdb; }
    
    .count { font-size: 18px; }
  }
}
</style>