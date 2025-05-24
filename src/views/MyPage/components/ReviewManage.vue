<template>
  <form class="profile-content profile-content-fixed-height review-manage-form" @submit.prevent>
    <div class="profile-header">
      <h2 class="profile-title">리뷰 관리</h2>
      <div class="profile-title-underline"></div>
    </div>
    <div class="review-list-area">
      <div v-if="paginatedReviews.length > 0" class="review-list">
        <div class="review-row review-header">
          <div class="review-col area">동이름</div>
          <div class="review-col contents">내용</div>
          <div class="review-col date">작성일</div>
          <div class="review-col action"></div>
        </div>
        <div
          class="review-row"
          v-for="(review, idx) in paginatedReviews"
          :key="review.reviewUuid"
        >
          <div class="review-col area">{{ review.dongName }}</div>
          <div class="review-col contents">{{ review.content }}</div>
          <div class="review-col date">{{ formatDate(review.createdAt) }}</div>
          <div class="review-col action">
            <button class="delete-btn" @click.prevent="confirmDelete(review, idx)">
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="review-empty">작성한 리뷰가 없습니다.</div>
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
import { UserReviewList, DeleteReview } from '@/api/MyPage'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

const reviews = ref([])
const currentPage = ref(1)
const itemsPerPage = 7
const maxVisiblePages = 5

const totalPages = computed(() => Math.ceil(reviews.value.length / itemsPerPage))

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return reviews.value.slice(start, end)
})

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmReview = ref(null)
const confirmIndex = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = dateStr.split('T')[0]
  return d.replace(/-/g, '.')
}

function confirmDelete(review, idx) {
  confirmReview.value = review
  confirmIndex.value = idx
  confirmTitle.value = '리뷰 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  showConfirmModal.value = true
}

async function onConfirmDelete() {
  if (!confirmReview.value) return
  try {
    await DeleteReview(confirmReview.value.reviewUuid)
    const globalIndex = (currentPage.value - 1) * itemsPerPage + confirmIndex.value
    reviews.value.splice(globalIndex, 1)
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  } catch {
    alert('리뷰 삭제 중 오류가 발생했습니다.')
  } finally {
    showConfirmModal.value = false
    confirmReview.value = null
    confirmIndex.value = null
  }
}

function onCancelDelete() {
  showConfirmModal.value = false
  confirmReview.value = null
  confirmIndex.value = null
}

async function fetchReviews() {
  const result = await UserReviewList()
  reviews.value = result
}

onMounted(async () => {
  fetchReviews()
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
.review-list-area {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.review-list {
  width: 100%;
  padding: 0;
  margin: 0;
}
.review-row {
  display: flex;
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
.review-row:last-child {
  border-bottom: none;
}
.review-header {
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
.review-col {
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 100%;
  font-family: inherit;
}
.review-col.area {
  flex: 0 0 130px;
  color: #222;
  font-size: 16px;
  font-weight: 500;
}
.review-col.contents {
  flex: 1 1 900px;
  color: #222;
  font-size: 16px;
  font-weight: 400;
  align-items: center;
  line-height: 1.4;
}
.review-col.date {
  flex: 0 0 120px;
  color: #888;
  font-size: 15px;
  text-align: right;
  font-weight: 400;
}
.review-col.action {
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
.review-empty {
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
  background: #f0f0f0;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.page-btn.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}
.page-btn:disabled {
  background: #e9ecef;
  color: #6c757d;
  border-color: #dee2e6;
  cursor: not-allowed;
}
.page-btn:hover:not(:disabled) {
  background: #e2e6ea;
  transform: translateY(-1px);
}
</style>
