<template>
  <div>
    <div
      class="chatbot-toggle"
      @click="toggleChat"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      :class="{ 'hovered': isHovered }"
    >
      <img
        :src="chatbotImg"
        alt="Chatbot Icon"
      />
    </div>
    <transition name="chatbot-slide">
      <div v-if="isChatOpen" class="chatbot-container">
        <div class="chatbot-header">
          <div class="chatbot-title">APT ZIP Chatbot 🤖</div>
          <button class="close-button" @click="toggleChat">✖</button>
        </div>
        <div
          class="chatbot-messages"
          ref="chatMessagesContainer"
          @scroll="handleScroll"
        >
          <div
            v-for="(message, index) in chatMessages"
            :key="index"
            :class="['chatbot-message', message.role]"
          >
            <div
              class="message-bubble"
              v-html="formatMarkdown(message.content)"
            ></div>
          </div>
          <div v-if="isTyping" class="chatbot-message bot typing-indicator">
            <div class="typing-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="chatbot-input">
          <input
            v-model="userInput"
            type="text"
            placeholder="메세지를 입력하세요..."
            @keyup.enter="handleSendMessage"
          />
          <button @click="handleSendMessage">Send</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, computed } from 'vue';
import { sendMessage } from '@/api/Chatbot';
import chatbotWakeUp from '@/assets/images/Common/ChatbotWakeUp.png';
import chatbotSleep from '@/assets/images/Common/ChatbotSleep.png';
import { marked } from 'marked';

const isChatOpen = ref(false);
const isHovered = ref(false);
const chatMessages = ref([
  { role: 'bot', content: '안녕하세요! 무엇을 도와드릴까요?' }
]);
const userInput = ref('');
const chatMessagesContainer = ref(null);
const isUserScrolling = ref(false);
const isTyping = ref(false);

// 이미지 상태를 동적으로 반환
const chatbotImg = computed(() => (isChatOpen.value ? chatbotWakeUp : chatbotSleep));

function toggleChat() {
  isChatOpen.value = !isChatOpen.value;
}

function formatMarkdown(content) {
  return marked(content);
}

function handleScroll() {
  const container = chatMessagesContainer.value;
  if (!container) return;

  const isAtBottom =
    container.scrollHeight - container.scrollTop === container.clientHeight;
  isUserScrolling.value = !isAtBottom;
}

async function scrollToBottom() {
  const container = chatMessagesContainer.value;
  if (!container || isUserScrolling.value) return;

  container.scrollTop = container.scrollHeight;
}

async function handleSendMessage() {
  if (!userInput.value.trim()) return;

  chatMessages.value.push({ role: 'user', content: userInput.value });

  const messages = chatMessages.value.map(msg => ({
    role: msg.role === 'bot' ? 'assistant' : msg.role,
    content: msg.content
  }));

  userInput.value = '';
  isTyping.value = true;

  try {
    const reply = await sendMessage(messages);
    const botReply = reply?.choices?.[0]?.message?.content || 
                     '죄송합니다, 답변을 처리할 수 없습니다.';
    chatMessages.value.push({ role: 'bot', content: botReply });
  } catch (error) {
    chatMessages.value.push({ role: 'bot', content: '죄송합니다, 문제가 발생했습니다. 다시 시도해 주세요.' });
  } finally {
    isTyping.value = false;
    await nextTick();
    scrollToBottom();
  }
}

watch(chatMessages, async () => {
  await nextTick();
  scrollToBottom();
});
</script>

<style scoped>
.chatbot-toggle {
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b8b2a7, #a39e94);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
}

.chatbot-toggle.hovered {
  transform: scale(1.2);
}

.chatbot-toggle img {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}

.chatbot-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  position: fixed;
  bottom: 125px;
  right: 50px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background: #f5f5f5;
  z-index: 999;
  border: 1px solid #b8b2a7;
  height: 500px;
}

.chatbot-slide-enter-active,
.chatbot-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.chatbot-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.chatbot-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.chatbot-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.chatbot-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.chatbot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #b8b2a7, #a39e94);
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.chatbot-title {
  font-size: 18px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
}

.chatbot-messages {
  flex: 1;
  padding: 16px;
  background: #f2f2f2;
  overflow-y: auto;
  max-height: 500px;
}

.chatbot-message {
  display: flex;
  margin-bottom: 12px;
}

.chatbot-message.user {
  justify-content: flex-end;
}

.chatbot-message.bot {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 90%;
  padding: 0px 12px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.6;
}

.chatbot-message.user .message-bubble {
  background: #b8b2a7;
  color: #ffffff;
  border-bottom-right-radius: 0;
}

.chatbot-message.bot .message-bubble {
  background: #d6d3cb;
  color: #333333;
  border-bottom-left-radius: 0;
}

.chatbot-message.bot .message-bubble.typing {
  font-style: italic;
  color: #999999;
}

.chatbot-input {
  display: flex;
  padding: 12px;
  background: #f5f5f5;
  border-top: 1px solid #b8b2a7;
}

.chatbot-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #b8b2a7;
  border-radius: 8px;
  margin-right: 8px;
  font-size: 14px;
}

.chatbot-input button {
  padding: 10px 16px;
  background: linear-gradient(135deg, #b8b2a7, #a39e94);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.chatbot-input button:hover {
  background: linear-gradient(135deg, #a39e94, #b8b2a7);
}

.typing-indicator {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
}

.typing-icon {
  display: flex;
  gap: 4px;
}

.typing-icon span {
  width: 8px;
  height: 8px;
  background-color: #d6d3cb;
  border-radius: 50%;
  animation: typing-bounce 1.5s infinite ease-in-out;
}

.typing-icon span:nth-child(1) {
  animation-delay: 0s;
}

.typing-icon span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-icon span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
