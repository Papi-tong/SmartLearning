<template>
  <div class="ai-agent-container">
    <div 
      class="black-cat-agent" 
      :style="agentStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleJump"
    >
      <div class="cat-body-wrapper" :class="{ 'facing-left': !isFacingRight && currentState !== 'sit' }">
        <div class="cat-animator" :class="currentState">
          <img :src="currentImage" alt="Pixel Cat" class="cat-img" />
        </div>
      </div>

      <transition name="el-zoom-in-bottom">
        <div v-if="isHovered" class="speech-bubble">
          你有什么想要询问小堂的吗？
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 导入你的图片资源
import sitImg from '../assets/cat-sit.png'   // 对应：生成黑猫不同状态图片.jpg
import walkImg from '../assets/cat-walk.png' // 对应：漫步.jpg
import runImg from '../assets/cat-run.png'   // 对应：奔跑.jpg

const router = useRouter()

// 定义三种状态
type AgentState = 'sit' | 'walk' | 'run'

// 状态管理
const isHovered = ref(false)
// 初始位置设定在右下角
const position = ref({ x: window.innerWidth - 100, y: window.innerHeight - 100 })
const duration = ref(0) 
const isFacingRight = ref(true) 
const currentState = ref<AgentState>('walk') // 默认状态
const moveTimeout = ref<any>(null)

// 计算当前应该展示哪张图片
const currentImage = computed(() => {
  switch (currentState.value) {
    case 'sit': return sitImg
    case 'run': return runImg
    case 'walk': 
    default: return walkImg
  }
})

// 动态样式计算
const agentStyle = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px)`,
  // 悬停时或坐下时移除过渡效果，防止图片切换时的滑动感
  transition: isHovered.value || currentState.value === 'sit' ? 'none' : `transform ${duration.value}s linear`,
  zIndex: 2000
}))

/**
 * 获取屏幕边缘或底部的随机位置
 * 模拟“侧边栏漫步”和“底部漫步”的逻辑
 */
const getRandomEdgePosition = () => {
  const padding = 60
  const width = window.innerWidth - padding
  const height = window.innerHeight - padding
  const edgeThreshold = 150 // 距离边缘多少像素算“边栏”

  const rand = Math.random()
  
  // 70% 的概率在底部活动
  if (rand < 0.7) {
    return {
      x: Math.random() * width,
      y: height - (Math.random() * 50) // 贴近底部 50px 范围内
    }
  } 
  // 30% 的概率在左右侧边
  else {
    const isLeft = Math.random() > 0.5
    return {
      x: isLeft ? padding : width - padding, // 贴左边或贴右边
      y: Math.random() * height
    }
  }
}

/**
 * 核心行为逻辑：自主漫步或奔跑
 */
const startBehavior = () => {
  if (isHovered.value) return

  // 随机决定下一个动作：漫步(60%) vs 奔跑(40%)
  // 注意：不再随机进入 'sit' 状态，因为只有交互时才坐下
  const rand = Math.random()
  
  if (rand < 0.6) {
    // === 漫步模式 (对应图一) ===
    currentState.value = 'walk'
    // 漫步距离较短，速度较慢
    const nextPos = getRandomEdgePosition() 
    // 计算距离，限制单次漫步不要走太远，看起来更自然
    moveAgent(nextPos, 60) // 速度 60px/s
  } else {
    // === 奔跑模式 (对应图二) ===
    currentState.value = 'run'
    // 奔跑可以跨越屏幕
    const nextPos = getRandomEdgePosition()
    moveAgent(nextPos, 200) // 速度 200px/s (快)
  }
}

/**
 * 移动执行函数
 */
const moveAgent = (targetPos: {x: number, y: number}, speed: number) => {
  const dx = targetPos.x - position.value.x
  const dy = targetPos.y - position.value.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // 如果距离太近，直接开始下一次，避免抽搐
  if (distance < 10) {
    startBehavior()
    return
  }

  const moveTime = distance / speed
  
  // 判断朝向 (用于翻转漫步和奔跑图片)
  if (dx > 0) isFacingRight.value = true
  else if (dx < 0) isFacingRight.value = false
  
  duration.value = moveTime
  position.value = targetPos
  
  // 移动结束后，休息一小会儿再进行下一个动作
  moveTimeout.value = setTimeout(startBehavior, moveTime * 1000 + 500)
}

// === 交互事件 ===

const handleMouseEnter = () => {
  isHovered.value = true
  
  // 1. 立即停止移动逻辑
  if (moveTimeout.value) clearTimeout(moveTimeout.value)
  
  // 2. 切换为端坐状态 (对应图三)
  currentState.value = 'sit'
  
  // 3. 更新位置为当前视觉位置，防止 transition 移除时跳变
  const agent = document.querySelector('.black-cat-agent') as HTMLElement
  if (agent) {
    const rect = agent.getBoundingClientRect()
    position.value = { x: rect.left, y: rect.top }
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  // 离开后立即开始漫步/奔跑
  startBehavior()
}

const handleJump = () => {
  router.push('/ai-agent') 
}

// === 生命周期 ===
onMounted(() => {
  // 稍微延迟启动
  setTimeout(startBehavior, 1000)
  
  window.addEventListener('resize', () => {
    position.value = { x: window.innerWidth - 100, y: window.innerHeight - 100 }
  })
})

onUnmounted(() => {
  if (moveTimeout.value) clearTimeout(moveTimeout.value)
})
</script>

<style scoped lang="scss">
.ai-agent-container {
  position: absolute;
  top: 0; left: 0; width: 0; height: 0;
  overflow: visible;
  z-index: 9999;
}

.black-cat-agent {
  position: fixed;
  /* 根据图片比例，适当调整大小，像素风通常较小 */
  width: 80px; 
  height: 80px;
  cursor: pointer;
  will-change: transform;
  
  .cat-body-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.1s; /* 翻转时的平滑过渡 */
    
    /* 只有当 facing-left 为 true 时才翻转 
       逻辑在 script 中控制：坐下时不翻转
    */
    &.facing-left {
      transform: scaleX(-1);
    }
    
    /* 悬停时稍微放大，增强交互感 */
    .black-cat-agent:hover & {
      transform: scale(1.1) !important; 
    }

    .cat-animator {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      /* 可选：为奔跑添加轻微的上下颠簸动画 */
      &.run {
        animation: run-bounce 0.2s infinite alternate;
      }
    }
    
    .cat-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      /* 关键：像素艺术渲染模式，防止图片模糊 */
      image-rendering: pixelated; 
    }
  }

  .speech-bubble {
    position: absolute;
    /* 调整气泡位置，避免遮挡猫耳朵 */
    top: -50px; 
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    font-size: 13px;
    color: #333;
    font-weight: 600;
    pointer-events: none;
    border: 1px solid #333; /* 黑框风格匹配黑猫 */

    /* 气泡小三角 */
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #333;
    }
    
    &::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #fff;
      z-index: 1;
    }
  }
}

@keyframes run-bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-4px); }
}
</style>