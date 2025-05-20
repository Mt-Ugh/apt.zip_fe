<template>
  <section v-if="answers.length" class="answers">
    <h3>답변</h3>
    <ul>
      <li v-for="answerItem in answers" :key="answerItem.qnaAnsUuid" class="answer-item">
        <div
          class="answer-meta"
          style="display: flex; justify-content: space-between; align-items: center"
        >
          <div style="display: flex; align-items: center; gap: 0.5rem">
            <img
              :src="answerItem.profile_url || defaultProfileUrl"
              alt="프로필 이미지"
              class="answer-profile-img"
            />
            <span class="answer-author">{{ answerItem.nickname }}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem">
            <span class="answer-date">{{ formatDate(answerItem.createdAt) }}</span>
            <button
              v-if="answerItem.isMineAns === 1"
              class="delete-btn"
              @click="$emit('delete-answer', answerItem.qnaAnsUuid)"
              title="삭제"
            >
              ✕
            </button>
          </div>
        </div>
        <p class="answer-content">{{ answerItem.qnaContent }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
})

const defaultProfileUrl = 'https://image.blip.kr/v1/file/51b7fb37979d39449a9e61dd731ce4c6'

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
}
</script>

<style scoped>
.answer-meta {
  font-size: 0.85rem;
  color: #495057;
}

.delete-btn:hover {
  color: #a12c2b;
}
</style>
