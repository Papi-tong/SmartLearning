<template>
  <div class="ai-agent-container" :class="{ 'is-expanded': isExpanded }">
    <!-- Floating Character -->
    <div class="agent-avatar" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="toggleChat">
      <img src="https://api.dicebear.com/7.x/bottts/svg?seed=SmartLearning" alt="AI Agent" class="avatar-img" />
      <div v-if="isHovered && !isExpanded" class="speech-bubble">
        你有什么想要询问小堂的吗？
      </div>
    </div>

    <!-- Chat Interface -->
    <div v-if="isExpanded" class="chat-window">
      <div class="chat-header">
        <div class="header-left">
          <el-avatar :size="30" src="https://api.dicebear.com/7.x/bottts/svg?seed=SmartLearning" />
          <span class="agent-name">小堂助手</span>
        </div>
        <div class="header-controls">
           <el-icon @click="toggleChat"><Close /></el-icon>
        </div>
      </div>
      
      <div class="chat-body">
        <div v-if="messages.length === 0" class="welcome-screen">
          <h3>Hi，我是小堂！</h3>
          <p>我可以帮你：</p>
          <div class="suggestion-chips">
            <el-tag class="chip" @click="sendMessage('解答问题')">解答问题</el-tag>
            <el-tag class="chip" @click="sendMessage('生成题库')">生成题库</el-tag>
            <el-tag class="chip" @click="sendMessage('搭建本地知识库')">搭建本地知识库</el-tag>
          </div>
        </div>
        
        <div v-else class="message-list">
          <div v-for="(msg, index) in messages" :key="index" class="message-item" :class="msg.role">
            <div class="message-content">{{ msg.content }}</div>
          </div>
        </div>
      </div>
      
      <div class="chat-footer">
        <el-input 
          v-model="inputMessage" 
          placeholder="输入你的问题..." 
          @keyup.enter="handleSend"
        >
          <template #append>
            <el-button @click="handleSend"><el-icon><Position /></el-icon></el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Close, Position } from '@element-plus/icons-vue'

const isExpanded = ref(false)
const isHovered = ref(false)
const inputMessage = ref('')
const messages = ref<{role: 'user' | 'assistant', content: string}[]>([])

const toggleChat = () => {
  isExpanded.value = !isExpanded.value
}

const sendMessage = (text: string) => {
  messages.value.push({ role: 'user', content: text })
  // Mock AI response
  setTimeout(() => {
    messages.value.push({ 
      role: 'assistant', 
      content: `收到！正在为你处理"${text}"相关的请求...（这是模拟回复）` 
    })
  }, 1000)
}

const handleSend = () => {
  if (!inputMessage.value.trim()) return
  sendMessage(inputMessage.value)
  inputMessage.value = ''
}
</script>

<style scoped lang="scss">
.ai-agent-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}

.agent-avatar {
  width: 60px;
  height: 60px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background: white;
  }
  
  .speech-bubble {
    position: absolute;
    right: 70px;
    top: 10px;
    background: white;
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    white-space: nowrap;
    font-size: 14px;
    
    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 6px solid white;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  .chat-header {
    padding: 15px;
    background: #409EFF;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
    }
    
    .header-controls {
      cursor: pointer;
    }
  }
  
  .chat-body {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background: #f9f9f9;
    
    .welcome-screen {
      text-align: center;
      margin-top: 50px;
      
      .suggestion-chips {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        
        .chip {
          cursor: pointer;
        }
      }
    }
    
    .message-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
      
      .message-item {
        max-width: 80%;
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 14px;
        
        &.user {
          align-self: flex-end;
          background: #409EFF;
          color: white;
          border-bottom-right-radius: 2px;
        }
        
        &.assistant {
          align-self: flex-start;
          background: white;
          border: 1px solid #e4e7ed;
          border-bottom-left-radius: 2px;
        }
      }
    }
  }
  
  .chat-footer {
    padding: 15px;
    border-top: 1px solid #eee;
    background: white;
  }
}
</style>
