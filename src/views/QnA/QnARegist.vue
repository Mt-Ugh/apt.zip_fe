<template>
  <div class="qna-regist">
    <div class="qna-regist-header">
      <button class="back-btn" @click="goBack" aria-label="뒤로가기">
        <img :src="BackIcon" alt="뒤로가기" />
      </button>

      <h2 class="title">QnA 등록</h2>
    </div>

    <div class="form-group">
      <label for="title">제목</label>
      <input id="title" v-model="title" type="text" placeholder="제목을 입력하세요" maxlength="255" />
    </div>

    <div class="form-group">
      <label for="category">카테고리</label>
      <select id="category" v-model="category">
        <option v-for="cat in QnACategory" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="content">내용</label>
      <textarea id="content" v-model="content" rows="10" placeholder="내용을 입력하세요" maxlength="255"></textarea>
    </div>

    <button class="regist-btn" @click="handleQnARegist">등록</button>

    <CommonModal
      :visible="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CommonModal from '@/components/common/CommonModal.vue'
import { registerQnA } from '@/api/QnA'
import BackIcon from '@/assets/images/Common/BackIcon.png'
import { QnACategory } from '@/constants/category.js'  // 카테고리 상수 파일 임포트

const router = useRouter()

const title = ref('')
const category = ref('')
const content = ref('')

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

const goBack = () => {
  router.push('/qna')
}

watch(title, (newVal) => {
  if (newVal.length >= 255) {
    showModalError('입력 제한', '제목은 255자를 넘을 수 없습니다.')
    title.value = newVal.slice(0, 255) // 자동으로 255자까지만 유지
  }
})

watch(content, (newVal) => {
  if (newVal.length >= 255) {
    showModalError('입력 제한', '내용은 255자를 넘을 수 없습니다.')
    content.value = newVal.slice(0, 255)
  }
})

const handleQnARegist = async () => {
  if (!title.value.trim() || !content.value.trim() || !category.value) {
    showModalError('입력 오류', '제목, 카테고리, 내용을 모두 입력해주세요.')
    return
  }

  try {
    const result = await registerQnA({
      title: title.value,
      category: category.value,
      content: content.value,
    })
    router.push('/qna/detail/' + result.qnaUuid)
  } catch {
    showModalError('등록 실패', 'QnA 등록 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.qna-regist {
  max-width: 1200px;
  margin: 12rem auto 18rem auto;
  padding: 4rem;
  background: #f8faff;
  border-radius: 12px;
  box-shadow: 0 2px 13px #d3cfc3;
  font-family: 'Noto Sans KR', sans-serif;
}

.qna-regist-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.back-container {
  margin-bottom: 0.5rem;
}

.back-btn {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #000000;
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
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
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #212529;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  background-color: #fff;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}

.form-group select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-position: right 1rem center;
  background-repeat: no-repeat;
  padding-right: 2.5rem; 
}

.regist-btn {
  background-color: #3399ff;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.regist-btn:hover {
  background-color: #267acc;
}

@media screen and (max-width: 2000px) {
  .qna-regist {
    max-width: 1000px;
    margin: 6.5rem auto 11rem auto;
  }
}
</style>
