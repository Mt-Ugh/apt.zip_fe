<template>
  <div class="review">
    <div class="review-input">
      <textarea v-model="content" placeholder="동에 대한 후기를 남겨보세요" />
      <button @click="submit">등록</button>
    </div>
    <ul>
      <li v-for="review in reviews" :key="review.reviewUuid" class="review-item">
        <img :src="review.profileUrl" alt="profile" class="review-avatar" />
        <div class="review-content">
          <div class="review-meta">
            <span class="nickname">{{ review.nickname }}</span>
            <span class="date">{{ formatDate(review.createdAt) }}</span>
          </div>
          <div class="text">{{ review.content }}</div>
        </div>
      </li>
    </ul>
  </div>

  <CommonModal
    :visible="showModal"
    :title="modalTitle"
    :message="modalMessage"
    @close="showModal = false"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CommonModal from '@/components/common/CommonModal.vue'
import { fetchDongReviewList, registReview } from '@/api/Review'
import { useUserStore } from '@/stores/user'

const { dongCode } = defineProps({ dongCode: String })
const userStore = useUserStore()

const content = ref('')
const reviews = ref([])

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

async function submit() {
  if (!userStore.isLoggedIn) {
    showModalError('등록 실패', '로그인 후 이용해주세요.')
    return
  }

  if (content.value === '') {
    showModalError('등록 실패', '리뷰 내용을 입력해주세요')
    return
  }

  try {
    await registReview(dongCode, content.value)
    await fetchReview(dongCode)
    content.value = ''
  } catch {
    showModalError('등록 실패', '리뷰 등록 중 오류가 발생했습니다.')
  }
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0].replaceAll('-', '.')
}

async function fetchReview(dongCode) {
  const result = await fetchDongReviewList(dongCode)
  reviews.value = result
}

onMounted(async () => {
  fetchReview(dongCode)
})
</script>

<style scoped>
.review {
  background: #fff;
  padding: 24px 28px 0 420px;
  border-top: 2px solid #eee;
  width: 98%;
  margin: 32px auto;
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;
}

.review-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.review-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.review-content {
  flex: 1;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
}

.nickname {
  font-weight: bold;
  color: #333;
}

.text {
  font-size: 14px;
  color: #444;
  line-height: 1.4;
}

textarea {
  width: 100%;
  height: 80px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
  height: 80px;
  resize: none;
}

button {
  align-self: flex-end;
  background-color: #4c94eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #357ae8;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}
li {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 8px;
  font-size: 14px;
}
</style>
