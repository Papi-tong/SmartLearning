<template>
  <div class="home-container">
    <!-- Hero Carousel -->
    <el-carousel trigger="click" height="400px" class="banner-carousel">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-content" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="banner-text">
            <h1>{{ item.title }}</h1>
            <p>{{ item.description }}</p>
            <el-button type="primary" size="large" @click="handleBannerClick(item)">查看详情</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="content-section">
      <!-- Features Section -->
      <h2 class="section-title">平台特色</h2>
      <el-row :gutter="20" class="features-row">
        <el-col :span="8" v-for="feature in features" :key="feature.title">
          <el-card shadow="hover" class="feature-card">
            <el-icon :size="40" class="feature-icon" :color="feature.color">
              <component :is="feature.icon" />
            </el-icon>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </el-card>
        </el-col>
      </el-row>

      <!-- Recommended Courses -->
      <h2 class="section-title">热门课程推荐</h2>
      <el-row :gutter="20">
        <el-col :span="6" v-for="course in recommendedCourses" :key="course.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="course-card">
            <div class="course-image" :style="{ backgroundImage: `url(${course.cover})` }"></div>
            <div class="course-info">
              <h3>{{ course.title }}</h3>
              <p class="instructor">讲师: {{ course.instructor }}</p>
              <div class="course-meta">
                <span class="students"><el-icon><User /></el-icon> {{ course.studentCount }}人学习</span>
                <span class="rating"><el-icon><Star /></el-icon> {{ course.rating }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Monitor, ChatDotRound, DataLine, User, Star } from '@element-plus/icons-vue'

const banners = ref([
  {
    id: 1,
    title: '智学课堂 2.0 全新上线',
    description: 'AI 驱动的个性化学习平台，让学习更高效',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'
  },
  {
    id: 2,
    title: '智能题库 & 自动批改',
    description: '海量题库资源，AI 智能批改，实时反馈学习进度',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: '专属 AI 助教 "小堂"',
    description: '24小时在线答疑，生成个性化练习题',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  }
])

const features = ref([
  {
    title: '智能推荐',
    description: '根据你的学习习惯和薄弱点，智能推荐课程和练习',
    icon: 'DataLine',
    color: '#409EFF'
  },
  {
    title: 'AI 助教',
    description: '遇到问题随时提问，AI 助教实时为你解答疑惑',
    icon: 'ChatDotRound',
    color: '#67C23A'
  },
  {
    title: '多端同步',
    description: '电脑、平板、手机多端同步，随时随地开启学习',
    icon: 'Monitor',
    color: '#E6A23C'
  }
])

const recommendedCourses = ref([
  {
    id: 1,
    title: 'Vue 3 + TypeScript 实战',
    instructor: '张老师',
    studentCount: 1205,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Python 数据分析入门',
    instructor: '李老师',
    studentCount: 890,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80'
  },
  {
    id: 3,
    title: 'Web 前端开发全栈课程',
    instructor: '王老师',
    studentCount: 2300,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 4,
    title: '机器学习与深度学习',
    instructor: '赵老师',
    studentCount: 560,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  }
])

const handleBannerClick = (item: any) => {
  console.log('Clicked banner:', item.title)
}
</script>

<style scoped lang="scss">
.home-container {
  .banner-carousel {
    .banner-content {
      height: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
      }
      
      .banner-text {
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;
        
        h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        p {
          font-size: 20px;
          margin-bottom: 30px;
        }
      }
    }
  }
  
  .content-section {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    
    .section-title {
      text-align: center;
      font-size: 32px;
      margin-bottom: 40px;
      color: #303133;
    }
    
    .features-row {
      margin-bottom: 60px;
      
      .feature-card {
        text-align: center;
        padding: 20px;
        height: 100%;
        
        .feature-icon {
          margin-bottom: 20px;
        }
        
        h3 {
          margin-bottom: 10px;
          color: #303133;
        }
        
        p {
          color: #606266;
          line-height: 1.6;
        }
      }
    }
    
    .course-card {
      cursor: pointer;
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      .course-image {
        height: 160px;
        background-size: cover;
        background-position: center;
      }
      
      .course-info {
        padding: 15px;
        
        h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .instructor {
          color: #909399;
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .course-meta {
          display: flex;
          justify-content: space-between;
          color: #606266;
          font-size: 13px;
          
          .students, .rating {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .rating {
            color: #E6A23C;
          }
        }
      }
    }
  }
}
</style>