<template>
  <div class="home-container">
    <el-carousel trigger="click" height="100vh" class="banner-carousel" :interval="5000" :pause-on-hover="false">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-content">
          <div class="banner-bg" :style="{ backgroundImage: `url(${item.image})` }"></div>
          
          <div class="banner-overlay"></div>
          
          <div class="banner-text">
            <h1 class="animate__animated animate__fadeInDown">{{ item.title }}</h1>
            <p class="animate__animated animate__fadeInUp">{{ item.description }}</p>
            <el-button type="primary" size="large" class="animate__animated animate__fadeInUp" @click="handleBannerClick(item)">
              立即探索
            </el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">热门课程推荐</h2>
        <div class="section-divider"></div>
      </div>
      
      <el-row :gutter="20" class="course-list">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="course in recommendedCourses" :key="course.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="course-card">
            <div class="course-image-wrapper">
              <div class="course-image" :style="{ backgroundImage: `url(${course.cover})` }"></div>
              <div class="course-overlay">
                <el-button type="primary" round>查看详情</el-button>
              </div>
            </div>
            <div class="course-info">
              <h3 class="course-title">{{ course.title }}</h3>
              <div class="course-instructor">
                <el-avatar :size="24" :src="course.instructorAvatar" />
                <span>{{ course.instructor }}</span>
              </div>
              <div class="course-meta">
                <span class="students"><el-icon><User /></el-icon> {{ course.studentCount }}</span>
                <span class="rating"><el-icon><StarFilled /></el-icon> {{ course.rating }}</span>
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
import { User, StarFilled } from '@element-plus/icons-vue'

const banners = ref([
  {
    id: 1,
    title: '开启智慧学习新时代',
    description: 'AI 驱动，个性化定制，让每一次学习都事半功倍',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 2,
    title: '海量题库，智能批改',
    description: '覆盖全学科，实时反馈，精准定位知识盲区',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: '沉浸式互动课堂',
    description: '随时随地，与名师面对面，体验极致教学互动',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }
])

const recommendedCourses = ref([
  {
    id: 1,
    title: 'Vue 3 + TypeScript 高级实战',
    instructor: '张老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    studentCount: 2305,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Python 数据分析与可视化',
    instructor: '李老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    studentCount: 1890,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: '零基础入门深度学习',
    instructor: '王老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    studentCount: 3500,
    rating: 5.0,
    cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 4,
    title: 'Web 全栈开发工程师',
    instructor: '赵老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Precious',
    studentCount: 1200,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80'
  },
    {
    id: 5,
    title: 'React Native 移动端开发',
    instructor: '周老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoey',
    studentCount: 800,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 6,
    title: 'UI/UX 设计思维与实践',
    instructor: '陈老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ginger',
    studentCount: 1500,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'
  },
    {
    id: 7,
    title: 'Java 并发编程核心技术',
    instructor: '刘老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    studentCount: 2100,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 8,
    title: 'Go 语言微服务架构',
    instructor: '孙老师',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abby',
    studentCount: 950,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1631&q=80'
  }
])

const handleBannerClick = (item: any) => {
  console.log('Clicked banner:', item.title)
}
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden; /* 防止横向滚动 */

  .banner-carousel {
    // 确保轮播内容占满整个容器
    :deep(.el-carousel__container) {
      height: 100vh !important;
    }

    .banner-content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden; // 关键：隐藏图片放大后溢出的部分
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      // 新增：动态背景图层
      .banner-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: 0;
        // 关键动画：5s 对应轮播间隔，linear 或 ease-out 都可以
        animation: zoomEffect 5s linear infinite; 
      }

      .banner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
      }
      
      .banner-text {
        position: relative;
        z-index: 2;
        padding: 0 20px;
        max-width: 800px;
        
        h1 {
          font-size: 48px;
          color: #fff;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          animation: fadeInUp 1s ease-out;
        }
        
        p {
          font-size: 20px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 40px;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        .el-button {
          animation: fadeInUp 1s ease-out 0.6s backwards;
        }
      }
    }
  }
  
  // 背景放大动画的关键帧
  @keyframes zoomEffect {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.15); // 放大到 1.15 倍，实现推进效果
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .content-section {
    width: 100%;       // 修改点：占据全宽
    margin: 40px 0;    // 修改点：移除左右 margin
    padding: 0 20px;   // 修改点：极小的内边距防止卡片紧贴浏览器边缘，若需完全贴合可设为 0
    box-sizing: border-box;
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      padding: 0 10px; // 标题稍微缩进一点
      
      .section-title {
        font-size: 32px;
        color: #303133;
        font-weight: 700;
        margin: 0;
        margin-right: 20px;
        white-space: nowrap;
      }
      
      .section-divider {
        flex: 1;
        height: 1px;
        background: #ebeef5;
      }
    }
    
    .course-list {
      margin: 0 !important; // 强制去除 row 的默认负 margin，防止撑开页面
      width: 100%;
      
      .course-card {
        border: none;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        margin-bottom: 30px;
        
        &:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          
          .course-image {
            transform: scale(1.1);
          }
          
          .course-overlay {
            opacity: 1;
          }
        }
        
        .course-image-wrapper {
          position: relative;
          height: 200px; // 稍微增加高度以适应大屏
          overflow: hidden;
          
          .course-image {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            transition: transform 0.6s ease;
          }
          
          .course-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
        }
        
        .course-info {
          padding: 20px;
          
          .course-title {
            font-size: 16px;
            font-weight: 600;
            color: #303133;
            margin: 0 0 15px 0;
            line-height: 1.4;
            height: 44px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          
          .course-instructor {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 15px;
            font-size: 14px;
            color: #606266;
          }
          
          .course-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #909399;
            
            .students {
              display: flex;
              align-items: center;
              gap: 4px;
            }
            
            .rating {
              display: flex;
              align-items: center;
              gap: 4px;
              color: #ff9900;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

// Media Queries 
@media (max-width: 992px) {
  .home-container .banner-carousel .banner-content .banner-text h1 {
    font-size: 36px;
  }
}
</style>