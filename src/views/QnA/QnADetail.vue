<template>
  <div class="qna-detail" v-if="qna">
    <div class="qna-header">
      <div class="back-container">
        <button class="back-btn" @click="goBack" aria-label="뒤로가기">
          <img :src="BackIcon" alt="" />
        </button>
      </div>

      <h2 class="title">
        {{ qna.title }}
        <button v-if="qna.isMineQnA === 1" class="delete-btn" @click="deleteQnA" title="삭제">
          ✕
        </button>
      </h2>
    </div>
    <div class="meta">
      <div class="meta-left">
        <img :src="qna.profileUrl ?? DefaultProfile" alt="프로필 이미지" class="profile-img" />
        <span class="author">{{ qna.nickname }}</span>
      </div>
      <span class="date">{{ formatDate(qna.createdAt) }}</span>
    </div>

    <hr />

    <div class="content" v-html="qna.content"></div>

    <QnAAnswer :answers="answers" @delete-answer="deleteAnswer" />

    <section class="answer-input">
      <label for="answer">답변 작성</label>
      <textarea id="answer" rows="5" v-model="answer" placeholder="내용을 입력하세요" maxlength="255"></textarea>
      <button class="submit-btn" @click="submitAnswer">전달</button>
    </section>
  </div>

  <div v-else>Loading...</div>

  <CommonModal
    :visible="showModal"
    :title="modalTitle"
    :message="modalMessage"
    @close="showModal = false"
  />
  <ConfirmModal
    :visible="showConfirmModal"
    :title="confirmTitle"
    :message="confirmMessage"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  QnADetail,
  deleteQnA as apiDeleteQnA,
  registerAnswer,
  deleteAnswer as apiDeleteAnswer,
} from '@/api/QnA'
import CommonModal from '@/components/common/CommonModal.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import QnAAnswer from '@/views/QnA/components/AnswerList.vue'
import BackIcon from '@/assets/images/Common/BackIcon.png'
import DefaultProfile from '@/assets/images/Common/DefaultProfile.svg'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const qnaUuid = computed(() => route.params.qnaUuid)
const qna = ref(null)
const answers = ref([])
const answer = ref('')
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmCallback = ref(null)
const userStore = useUserStore()

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

const fetchDetail = async (id) => {
  try {
    const data = await QnADetail(id)
    qna.value = data.detailResponse
    answers.value = data.qnAanswerResponse || []
  } catch (e) {
    console.error('QnA 상세 조회 실패', e)
  }
}

watch(
  qnaUuid,
  (newId) => {
    if (newId) fetchDetail(newId)
  },
  { immediate: true },
)

const goBack = () => router.push('/qna/')

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
}

watch(answer, (newVal) => {
  if (newVal.length >= 255) {
    showModalError('입력 제한', '답변은 255자를 넘을 수 없습니다.')
    answer.value = newVal.slice(0, 255)
  }
})

const submitAnswer = async () => {
  if (!answer.value.trim()) {
    showModalError('입력 오류', '답변 내용을 입력하세요.')
    return
  }

  if (userStore.isLoggedIn) {
    try {
      const payload = { ans_content: answer.value }
      await registerAnswer(qnaUuid.value, payload)
      answer.value = ''
      await fetchDetail(qnaUuid.value)
    } catch (error) {
      showModalError('등록 실패', 'QnA 등록 중 오류가 발생했습니다.')
      console.error(error)
    }
  } else {
    showModalError('등록 실패', '로그인을 해주세요')
  }
}

const deleteQnA = () => {
  confirmTitle.value = 'QnA 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  confirmCallback.value = async () => {
    try {
      await apiDeleteQnA(qnaUuid.value)
      showConfirmModal.value = false
      router.push('/qna')
    } catch (error) {
      showModalError('삭제 실패', 'QnA 삭제 중 오류가 발생했습니다.')
      console.error(error)
    }
  }
  showConfirmModal.value = true
}

const deleteAnswer = (ansId) => {
  confirmTitle.value = '답변 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  confirmCallback.value = async () => {
    try {
      await apiDeleteAnswer(ansId)
      answers.value = answers.value.filter((item) => item.qnaAnsUuid !== ansId)
      showConfirmModal.value = false
    } catch (error) {
      showModalError('삭제 실패', '답변 삭제 중 오류가 발생했습니다.')
      console.error(error)
    }
  }
  showConfirmModal.value = true
}

const onConfirm = () => {
  if (confirmCallback.value) {
    showConfirmModal.value = false
    confirmCallback.value()
  }
}

const onCancel = () => {
  showConfirmModal.value = false
}
</script>
<style>
.qna-detail {
  max-width: 1200px;
  margin: 12rem auto 18rem auto;
  padding: 3rem 3rem;
  background: #f8faff;
  border-radius: 12px;
  box-shadow: 0 2px 13px #d3cfc3;
  font-family: 'Noto Sans KR', sans-serif;
  display: block;
}

.qna-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.5rem;
  align-items: stretch;
}

.back-container {
  margin-bottom: 0.5rem;
}

.back-btn {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #92908a;
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  user-select: none;
}

.back-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
}

.title {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #868e96;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.profile-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.content {
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1.1rem;
  margin-top: 2rem;
  color: #212529;
  min-height: 150px;
}

hr {
  border: none;
  border-top: 1px solid #dee2e6;
  margin-bottom: 2rem;
}

.answer-input {
  margin-top: 3rem;
}

.answer-input label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #212529;
}

.answer-profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

textarea {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e4e4e4;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  resize: vertical;
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
  color: #212529;
}

.submit-btn {
  margin-top: 0.5rem;
  background-color: #3399ff;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #267acc;
}

.answers {
  margin-top: 2rem;
}

.answers h3 {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-left: 4px solid #3399ff;
  padding-left: 0.75rem;
  color: #3399ff;
}

.answers ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.answer-item {
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  background-color: #f9faff;
  position: relative;
}

.answer-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #495057;
  gap: 1rem;
}

.answer-author {
  font-weight: 600;
}

.answer-right-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.answer-date {
  font-size: 0.85rem;
  color: #868e96;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #d9534f;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
  line-height: 1;
}

.delete-btn:hover {
  color: #a12c2b;
}

@media screen and (max-width: 2000px) {
  .qna-detail {
    max-width: 1000px;
    margin: 6.5rem auto 11rem auto;
  }
}
</style>
