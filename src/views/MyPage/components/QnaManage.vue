<template>
  <form class="profile-content profile-content-fixed-height qna-manage-form" @submit.prevent>
    <div class="profile-header">
      <h2 class="profile-title">QnA 관리</h2>
      <div class="profile-title-underline"></div>
    </div>
    <div class="qna-list-area">
      <div v-if="paginatedQnas.length > 0" class="qna-list">
        <div class="qna-row qna-header">
          <div class="qna-col category">카테고리</div>
          <div class="qna-col title">제목</div>
          <div class="qna-col date">작성일</div>
          <div class="qna-col action"></div>
        </div>
        <div
          class="qna-row"
          v-for="(qna, idx) in paginatedQnas"
          :key="qna.qnaUuid"
        >
          <div class="qna-col category">{{ getCategoryLabel(qna.category) }}</div>
          <div class="qna-col title">{{ qna.title }}</div>
          <div class="qna-col date">{{ formatDate(qna.createdAt) }}</div>
          <div class="qna-col action">
            <button class="delete-btn" @click.prevent="confirmDelete(qna, idx)">
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="qna-empty">작성한 QnA가 없습니다.</div>
    </div>
    <div class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click.prevent="changePage(currentPage - 1)"
      >
        &lt;
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click.prevent="changePage(page)"
      >
        {{ page }}
      </button>
      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click.prevent="changePage(currentPage + 1)"
      >
        &gt;
      </button>
    </div>
    <ConfirmModal
      :visible="showConfirmModal"
      :title="confirmTitle"
      :message="confirmMessage"
      @confirm="onConfirmDelete"
      @cancel="onCancelDelete"
    />
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { UserQnAList } from '@/api/MyPage'
import { deleteQnA } from '@/api/QnA'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { QnACategory } from '@/constants/category.js'

const qnas = ref([])
const currentPage = ref(1)
const itemsPerPage = 7
const maxVisiblePages = 5

const totalPages = computed(() => Math.ceil(qnas.value.length / itemsPerPage))

const paginatedQnas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return qnas.value.slice(start, end)
})

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmQna = ref(null)
const confirmIndex = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = dateStr.split('T')[0]
  return d.replace(/-/g, '.')
}

function getCategoryLabel(categoryValue) {
  const category = QnACategory.find((cat) => cat.value === categoryValue)
  return category ? category.label : '기타'
}

async function fetchQna() {
  const result = await UserQnAList()
  qnas.value = result
}

function confirmDelete(qna, idx) {
  confirmQna.value = qna
  confirmIndex.value = idx
  confirmTitle.value = 'QnA 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  showConfirmModal.value = true
}

async function onConfirmDelete() {
  if (!confirmQna.value) return
  try {
    await deleteQnA(confirmQna.value.qnaUuid)
    const globalIndex = (currentPage.value - 1) * itemsPerPage + confirmIndex.value
    qnas.value.splice(globalIndex, 1)
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  } catch {
    alert('QnA 삭제 중 오류가 발생했습니다.')
  } finally {
    showConfirmModal.value = false
    confirmQna.value = null
    confirmIndex.value = null
  }
}

function onCancelDelete() {
  showConfirmModal.value = false
  confirmQna.value = null
  confirmIndex.value = null
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(async () => {
  fetchQna()
})
</script>

<style scoped>
.profile-content {
  width: 1100px;
  background: #fff;
  border-radius: 12px;
  padding: 40px 36px 0 36px;
  box-shadow: 0 2px 8px #7a7a7a;
  position: relative;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  transition:
    width 0.2s,
    padding 0.2s;
}
.profile-content-fixed-height {
  min-height: 800px;
  height: 800px;
  box-sizing: border-box;
}
.profile-header {
  width: 100%;
}
.profile-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0;
  padding-bottom: 0;
}
.profile-title-underline {
  width: 100%;
  height: 2px;
  background: #ddddddfd;
  margin-bottom: 32px;
  margin-top: 8px;
  border-radius: 2px;
}
.qna-list-area {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.qna-list {
  width: 100%;
  padding: 0;
  margin: 0;
}
.qna-row {
  display: flex;
  flex-direction: row; 
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 10px;
  font-size: 16px;
  min-height: 32px;
  height: 44px;
  transition: background 0.12s;
  font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', Arial, sans-serif;
  margin-bottom: 10px;
}
.qna-row:last-child {
  border-bottom: none;
}
.qna-header {
  font-weight: 600;
  color: #444;
  background: #f7f7fa;
  border-radius: 6px 6px 0 0;
  padding: 0 10px;
  font-size: 15px;
  min-height: 32px;
  height: 44px;
  font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', Arial, sans-serif;
  margin-bottom: 15px;
}
.qna-col {
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 100%;
  font-family: inherit;
}
.qna-col.category {
  flex: 0 0 130px;
  color: #222;
  font-size: 16px;
  font-weight: 500;
}
.qna-col.title {
  flex: 1 1 900px;
  color: #222;
  font-size: 16px;
  font-weight: 400;
  align-items: center;
  line-height: 1.4;
}
.qna-col.date {
  flex: 0 0 120px;
  color: #888;
  font-size: 15px;
  text-align: right;
  font-weight: 400;
}
.qna-col.action {
  flex: 0 0 38px;
  text-align: center;
}
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #f44336;
  font-size: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.13s;
  height: 100%;
}
.delete-btn:hover {
  color: #b71c1c;
  transform: scale(1.08);
}
.qna-empty {
  text-align: center;
  color: #aaa;
  padding: 36px 0;
  font-size: 16px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0; 
  margin-bottom: 100px; 
  gap: 5px;
}
.page-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}
.page-btn.active {
  background: #007bff;
  color: #fff;
  font-weight: bold;
}
.page-btn:disabled {
  background: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}
.page-btn:hover:not(:disabled) {
  background: #e9ecef;
}
</style>
