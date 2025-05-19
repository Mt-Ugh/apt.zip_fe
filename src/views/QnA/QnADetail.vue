<template>
  <div>
    <div class="qna-detail" v-if="qna">
      <div class="qna-header">
        <div class="back-container">
          <button class="back-btn" @click="goBack" aria-label="뒤로가기">←</button>
        </div>

        <h2 class="title">
          {{ qna.title }}
          <button
            v-if="qna.isMineQnA === 1"
            class="delete-btn"
            @click="deleteQnA"
            title="삭제"
          >
            ✕
          </button>
        </h2>
      </div>
      <div class="meta">
        <span class="author">{{ qna.nickname }}</span>
        <span class="date">{{ formatDate(qna.createdAt) }}</span>
      </div>

      <hr />

      <div class="content" v-html="qna.content"></div>

      <section v-if="answers.length" class="answers">
        <h3>답변</h3>
        <ul>
          <li v-for="answerItem in answers" :key="answerItem.qnaAnsUuid" class="answer-item">
            <div class="answer-meta">
              <span class="answer-author">{{ answerItem.nickname }}</span>
              <div class="answer-right-meta">
                <span class="answer-date">{{ formatDate(answerItem.createdAt) }}</span>
                <button
                  v-if="answerItem.isMineAns === 1"
                  class="delete-btn"
                  @click="deleteAnswer(answerItem.qnaAnsUuid)"
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

      <section class="answer-input">
        <label for="answer">답변 작성</label>
        <textarea
          id="answer"
          rows="5"
          v-model="answer"
          placeholder="내용을 입력하세요"
        ></textarea>
        <button class="submit-btn" @click="submitAnswer">전달</button>
      </section>
    </div>

    <div v-else>Loading...</div>
  </div>

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
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { QnADetail } from '@/api/QnA'
import CommonModal from '@/components/common/CommonModal.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

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
const confirmCallback = ref(null) // 삭제 확정 시 호출할 함수 또는 람다 저장

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

watch(qnaUuid, (newId) => {
  if (newId) fetchDetail(newId)
}, { immediate: true })

const goBack = () => {
  router.back()
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2,'0')}.${date.getDate().toString().padStart(2,'0')}`
}

// 답변 제출 함수 예시 (구현 필요)
const submitAnswer = () => {
  if (!answer.value.trim()) {
    showModalError('입력 오류', '답변 내용을 입력하세요.')
    return
  }
  // TODO: API 호출하여 답변 등록 처리
  answer.value = ''
}

// QnA 삭제 함수 예시 (구현 필요)
const deleteQnA = () => {
  confirmTitle.value = 'QnA 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  confirmCallback.value = async () => {
    // TODO: API 호출하여 QnA 삭제 처리
    showConfirmModal.value = false
  }
  showConfirmModal.value = true
}

// 답변 삭제 함수 예시 (구현 필요)
const deleteAnswer = (ansId) => {
  confirmTitle.value = '답변 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  confirmCallback.value = async () => {
    // TODO: API 호출하여 답변 삭제 처리
    console.log('답변 삭제:', ansId)
    showConfirmModal.value = false
  }
  showConfirmModal.value = true
}

const onConfirm = () => {
  if (confirmCallback.value) {
    confirmCallback.value()
  }
}

const onCancel = () => {
  showConfirmModal.value = false
}
</script>

<style scoped>
.qna-header {
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  margin-bottom: 1rem;
  gap: 0.5rem; 
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

.qna-detail {
  max-width: 1200px;
  margin: 12rem auto 18rem auto; 
  padding: 4rem 4rem;           
  background: #f8faff;
  border-radius: 12px;
  box-shadow: 0 2px 13px #d3cfc3;
  font-family: 'Noto Sans KR', sans-serif;
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
  justify-content: space-between;
  color: #868e96;
  font-size: 1rem;
  margin-bottom: 1rem;
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
</style>
