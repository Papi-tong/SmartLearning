<template>
  <div class="ai-agent-container">
    <div 
      class="black-cat-agent" 
      :style="agentStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleJump"
    >
      <div class="cat-body-wrapper" :class="{ 'facing-left': !isFacingRight }">
        <div class="cat-animator" :class="{ 'is-running': !isHovered }">
          
          <img src="https://cdn-icons-png.flaticon.com/512/375/375116.png" alt="Black Cat" class="cat-img" />
          
          <div class="glasses-overlay">
            <svg viewBox="0 0 100 40" class="glasses-svg">
              <g fill="none" stroke="white" stroke-width="6"> <path d="M10,20 Q25,35 40,20" stroke="black" fill="rgba(255,255,255,0.3)" stroke-width="4"/>
                <path d="M60,20 Q75,35 90,20" stroke="black" fill="rgba(255,255,255,0.3)" stroke-width="4"/>
                <line x1="40" y1="20" x2="60" y2="20" stroke="black" stroke-width="4" />
                <line x1="10" y1="20" x2="0" y2="15" stroke="black" stroke-width="3" />
                <line x1="90" y1="20" x2="100" y2="15" stroke="black" stroke-width="3" />
              </g>
            </svg>
          </div>
          
        </div>
      </div>

      <transition name="el-zoom-in-bottom">
        <div v-if="isHovered" class="speech-bubble">
          你有什么想问小堂的吗？
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const isHovered = ref(false)
const position = ref({ x: 0, y: 0 })
const duration = ref(0) 
const isFacingRight = ref(true) 
const moveTimeout = ref<any>(null)

// 初始位置
position.value = { 
  x: window.innerWidth - 100, 
  y: window.innerHeight - 100 
}

const agentStyle = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px)`,
  // 悬停时立即移除移动过渡，防止“滑步”
  transition: isHovered.value ? 'none' : `transform ${duration.value}s linear`
}))

const getRandomPosition = () => {
  const padding = 60 // 减小边距
  const maxX = window.innerWidth - padding
  const maxY = window.innerHeight - padding
  return {
    x: Math.max(padding, Math.random() * maxX),
    y: Math.max(padding, Math.random() * maxY)
  }
}

const startWandering = () => {
  if (isHovered.value) return

  const nextPos = getRandomPosition()
  
  // 计算速度：VS Code Pets 通常移动较慢，这里设置为 80px/s
  const dx = nextPos.x - position.value.x
  const dy = nextPos.y - position.value.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const speed = 80 
  const moveTime = distance / speed
  
  // 判断朝向
  if (dx > 0) isFacingRight.value = true
  else isFacingRight.value = false

  duration.value = moveTime
  position.value = nextPos
  
  // 随机休息时间 1-3秒
  const restTime = Math.random() * 2000 + 1000
  
  moveTimeout.value = setTimeout(() => {
    startWandering()
  }, moveTime * 1000 + restTime)
}

const handleMouseEnter = () => {
  isHovered.value = true
  const agent = document.querySelector('.black-cat-agent') as HTMLElement
  if (agent) {
    const rect = agent.getBoundingClientRect()
    position.value = { x: rect.left, y: rect.top }
  }
  if (moveTimeout.value) clearTimeout(moveTimeout.value)
}

const handleMouseLeave = () => {
  isHovered.value = false
  startWandering()
}

const handleJump = () => {
  router.push('/ai-agent') 
}

onMounted(() => {
  setTimeout(startWandering, 1000)
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
  /* 尺寸控制：1.5cm - 2cm 约等于 60px - 75px
     VS Code Pets 通常较小，这里设定为 65px
  */
  width: 65px; 
  height: 65px;
  cursor: pointer;
  will-change: transform;
  z-index: 2000;
  
  /* 容器：负责左右翻转 */
  .cat-body-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.2s;
    
    /* 默认朝右，若 facing-left 则翻转 */
    &.facing-left {
      transform: scaleX(-1);
    }
    
    /* 悬停时：强制回正并放大一点，产生互动感 */
    .black-cat-agent:hover & {
      transform: scaleX(1) scale(1.1) !important;
    }

    /* 动画层：负责奔跑时的上下颠簸 */
    .cat-animator {
      width: 100%;
      height: 100%;
      position: relative;
      
      /* 当不在悬停状态（即在奔跑）时，应用颠簸动画 */
      &.is-running {
        animation: run-bounce 0.25s infinite alternate ease-in-out;
      }
    }
    
    .cat-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      /* 纯黑剪影滤镜，确保猫是纯黑色的 */
      filter: brightness(0); 
    }

    .glasses-overlay {
      position: absolute;
      /* 针对全身猫素材的微调：
         因为是全身照，头通常在上方 10%-40% 的区域
         根据素材实际情况调整 top/left/width
      */
      top: 22%; 
      left: 45%; /* 假设猫头稍微偏右或居中 */
      transform: translateX(-50%);
      width: 45%; /* 眼镜占身体宽度的比例 */
      height: 20%;
      z-index: 2001;
      opacity: 0.9;
      
      .glasses-svg {
        width: 100%;
        height: 100%;
        /* 给眼镜加一点投影，使其在黑猫身上更明显 */
        filter: drop-shadow(0 1px 1px rgba(255,255,255,0.4));
      }
    }
  }

  .speech-bubble {
    position: absolute;
    top: -50px; 
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    font-size: 12px; /* 字体改小以匹配宠物尺寸 */
    color: #333;
    font-weight: bold;
    pointer-events: none;
    border: 1px solid #333;

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

/* 奔跑动画的关键帧：模拟小碎步的颠簸感 */
@keyframes run-bounce {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    /* 向上跳动 4px，并轻微前倾，模拟奔跑的动势 */
    transform: translateY(-4px) rotate(3deg); 
  }
}
</style>