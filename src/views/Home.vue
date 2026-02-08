<template>
  <div class="home-container">
    <header class="nav-header">
      <div class="nav-left">
        <div class="logo">
          <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="logo-img" />
          <span class="logo-text">智学课堂</span>
        </div>
      </div>

      <div class="nav-center">
        <el-menu
          mode="horizontal"
          :ellipsis="false"
          class="transparent-menu"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          
          <el-sub-menu index="2" popper-class="custom-submenu-popper">
            <template #title>课程</template>
            <el-menu-item index="2-1">推荐课程</el-menu-item>
            <el-menu-item index="2-2">专业课</el-menu-item>
            <el-menu-item index="2-3">公开课</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3" popper-class="custom-submenu-popper">
            <template #title>电子教材</template>
            <el-menu-item index="3-1">计算机科学</el-menu-item>
            <el-menu-item index="3-2">数学基础</el-menu-item>
            <el-menu-item index="3-3">外语教材</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4" popper-class="custom-submenu-popper">
            <template #title>学校</template>
            <el-menu-item index="4-1">清华大学</el-menu-item>
            <el-menu-item index="4-2">北京大学</el-menu-item>
            <el-menu-item index="4-3">浙江大学</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="5" popper-class="custom-submenu-popper">
            <template #title>题库</template>
            <el-menu-item index="5-1">历年真题</el-menu-item>
            <el-menu-item index="5-2">模拟试卷</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="6" popper-class="custom-submenu-popper">
            <template #title>刷题</template>
            <el-menu-item index="6-1">每日一练</el-menu-item>
            <el-menu-item index="6-2">错题本</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <div class="nav-right">
        <div class="search-box">
           <el-input 
             placeholder="搜索课程..." 
             :prefix-icon="Search"
             class="nav-search"
           />
        </div>
        <el-button type="primary" round class="login-btn">登录 / 注册</el-button>
      </div>
    </header>

    <el-carousel trigger="click" height="100vh" class="banner-carousel" :interval="5000" :pause-on-hover="false">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-content">
          <div class="banner-bg" :style="{ backgroundImage: `url(${item.image})` }"></div>
          
          <div class="banner-overlay"></div>
          
          <div class="banner-text">
            <h1 class="animate__animated animate__fadeInDown">{{ item.title }}</h1>
            <p class="animate__animated animate__fadeInUp">{{ item.description }}</p>
            <el-button type="primary" size="large" class="animate__animated animate__fadeInUp hero-btn" @click="handleBannerClick(item)">
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
import { User, StarFilled, Search } from '@element-plus/icons-vue'

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
  position: relative; /* 为绝对定位的 header 提供基准 */
  overflow-x: hidden;

  /* --- 1. 顶部导航栏样式 --- */
  .nav-header {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 80px; /* 导航栏高度 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    z-index: 1000; /* 确保层级高于轮播图 */
    box-sizing: border-box;
    /* 渐变背景，保证在亮色图片上文字也能看清 */
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    
    .nav-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        
        .logo-img {
          height: 32px;
          flex-shrink: 0;
        }
        .logo-text {
          font-size: 22px;
          font-weight: bold;
          color: #fff;
          letter-spacing: 1px;
          white-space: nowrap;
        }
      }
    }

    .nav-center {
      flex: 1;
      display: flex;
      justify-content: center;

      /* 魔改 el-menu 样式，使其透明 */
      .transparent-menu {
        background-color: transparent !important;
        border-bottom: none !important;
        width: 100%;
        display: flex;
        justify-content: center;

        :deep(.el-sub-menu__title), :deep(.el-menu-item) {
          background-color: transparent !important;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9) !important;
          
          &:hover {
            color: #fff !important;
            background-color: rgba(255, 255, 255, 0.1) !important;
          }
        }
        
        /* 去除 submenu 箭头，仿影石风格 */
        :deep(.el-sub-menu__icon-arrow) {
          display: none; 
        }
      }
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 20px;

      .search-box {
        .nav-search {
          width: 200px;
          :deep(.el-input__wrapper) {
            background-color: rgba(255, 255, 255, 0.15);
            border: none;
            box-shadow: none;
            border-radius: 20px;
            
            .el-input__inner {
              color: #fff;
              &::placeholder {
                color: rgba(255, 255, 255, 0.7);
              }
            }
          }
        }
      }

      .login-btn {
        background-color: #fff;
        color: #000;
        border: none;
        font-weight: 600;
        &:hover {
          background-color: #f2f2f2;
        }
      }
    }
  }

  /* --- 2. 轮播图样式 (保持原逻辑，微调) --- */
  .banner-carousel {
    :deep(.el-carousel__container) {
      height: 100vh !important;
    }

    .banner-content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      .banner-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: 0;
        animation: zoomEffect 5s linear infinite; 
      }

      .banner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3); /* 降低遮罩透明度，因为有顶部渐变了 */
        z-index: 1;
      }
      
      .banner-text {
        position: relative;
        z-index: 2;
        padding: 0 20px;
        max-width: 800px;
        margin-top: 60px; /* 稍微下移，避开视觉中心被 Header 干扰 */
        
        h1 {
          font-size: 56px; /* 字体加大 */
          font-weight: 800;
          color: #fff;
          margin-bottom: 24px;
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
          animation: fadeInUp 1s ease-out;
        }
        
        p {
          font-size: 22px;
          color: rgba(255,255,255,0.95);
          margin-bottom: 48px;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        .hero-btn {
          padding: 25px 50px;
          font-size: 18px;
          border-radius: 50px;
          animation: fadeInUp 1s ease-out 0.6s backwards;
        }
      }
    }
  }
  
  // 动画部分
  @keyframes zoomEffect {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* --- 3. 热门课程推荐样式 (保持不变) --- */
  .content-section {
    width: 100%; 
    margin: 60px 0; 
    padding: 0 40px; 
    box-sizing: border-box;
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      
      .section-title {
        font-size: 32px;
        color: #303133;
        font-weight: 700;
        margin: 0 20px 0 0;
        white-space: nowrap;
      }
      
      .section-divider {
        flex: 1;
        height: 1px;
        background: #ebeef5;
      }
    }
    
    .course-list {
      margin: 0 !important;
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
          .course-image { transform: scale(1.1); }
          .course-overlay { opacity: 1; }
        }
        
        .course-image-wrapper {
          position: relative;
          height: 200px;
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
            top: 0; left: 0; right: 0; bottom: 0;
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
            .students, .rating {
              display: flex;
              align-items: center;
              gap: 4px;
            }
            .rating { color: #ff9900; font-weight: bold; }
          }
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 992px) {
  .home-container {
    .nav-header {
      padding: 0 20px;
      .nav-center, .nav-right .search-box { display: none; } /* 小屏幕隐藏中间导航 */
    }
    .banner-carousel .banner-content .banner-text h1 {
      font-size: 36px;
    }
  }
}
</style>

<style lang="scss">
.custom-submenu-popper {
  /* 下拉菜单背景改为深色半透明，仿影石效果 */
  &.el-popper {
    background: rgba(0, 0, 0, 0.85) !important;
    border: none !important;
    backdrop-filter: blur(10px);
    
    .el-menu--popup {
      background: transparent !important;
      padding: 10px 0;
    }

    .el-menu-item {
      color: #ccc !important;
      background: transparent !important;
      &:hover {
        color: #fff !important;
        background: rgba(255, 255, 255, 0.1) !important;
      }
    }
    
    /* 隐藏顶部小箭头 */
    .el-popper__arrow {
      display: none;
    }
  }
}
</style>