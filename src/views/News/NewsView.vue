<template>
  <div class="news-section">
    <h2 class="news-title">NEWS</h2>
    <div class="search-wrapper">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="뉴스를 검색하세요"
        class="news-search-input"
        @keyup.enter="onSearch"
      />
      <button class="search-btn" @click="onSearch">검색</button>
    </div>

    <div v-for="(item, idx) in newsList" :key="idx" class="news-item" @click="openLink(item.link)">
      <img
        :src="item.thumbnail || DefaultImage"
        alt="뉴스 썸네일"
        class="news-thumbnail"
        @click.stop
      />
      <div class="news-content" @click.stop>
        <p class="news-text">{{ item.title }}</p>
        <p class="news-description">{{ truncateText(item.description, 120) }}</p>
      </div>
      <div class="news-action-wrapper" @click.stop.prevent="openLink(item.link)">
        <span class="news-go-text">뉴스로 이동</span>
        <button
          class="news-action"
          aria-label="뉴스로 이동"
          @click.stop.prevent="openLink(item.link)"
        >
          <span class="plus-icon">+</span>
          <span class="arrow-icon">&gt;</span>
        </button>
      </div>
    </div>

    <button v-if="hasMore" class="load-more-btn" @click="loadMore">더보기</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NewsList } from '@/api/News'
import DefaultImage from '@/assets/images/Common/DefaultImage.webp'

const newsList = ref([])
const searchKeyword = ref('')
const defaultKeyword = '부동산'

const initialPageSize = 7
const loadMoreSize = 5
const currentStartIndex = ref(1)
const currentPageSize = ref(initialPageSize)
const hasMore = ref(true)

const openLink = (url) => {
  window.open(url, '_blank')
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

const loadNewsPage = async (start, size) => {
  try {
    const query = searchKeyword.value.trim() || defaultKeyword
    const newItems = await NewsList(query, size, start)

    if (!Array.isArray(newItems) || newItems.length === 0) {
      hasMore.value = false
      return
    }

    const existingLinks = new Set(newsList.value.map((item) => item.link))
    const filteredNewItems = newItems.filter((item) => !existingLinks.has(item.link))

    newsList.value = [...newsList.value, ...filteredNewItems]

    hasMore.value = newItems.length === size
  } catch {
    hasMore.value = false
  }
}

onMounted(async () => {
  currentStartIndex.value = 1
  currentPageSize.value = initialPageSize
  newsList.value = []
  hasMore.value = true
  await loadNewsPage(currentStartIndex.value, currentPageSize.value)
})

const loadMore = async () => {
  currentStartIndex.value += currentPageSize.value
  currentPageSize.value = loadMoreSize
  await loadNewsPage(currentStartIndex.value, currentPageSize.value)
}

const onSearch = async () => {
  currentStartIndex.value = 1
  currentPageSize.value = initialPageSize
  newsList.value = []
  hasMore.value = true
  await loadNewsPage(currentStartIndex.value, currentPageSize.value)
}
</script>

<style scoped>
.news-search-input {
  width: 300px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  box-sizing: border-box;
}

.search-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.search-btn {
  width: 80px;
  background-color: #b7b6a3;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #9e9c87;
}

.news-section {
  max-width: 1100px;
  margin: 140px auto;
}

.news-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px 0 30px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  height: 170px;
}

.news-item:hover {
  background-color: rgb(244, 249, 255);
  transform: translateX(10px);
}

.news-thumbnail {
  width: 150px;
  height: 105px;
  background: #ccc;
  margin-right: 25px;
  flex-shrink: 0;
}

.news-content {
  flex: 1;
  padding: 0 40px 0 0;
}

.news-text {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  word-break: break-word;
}

.news-description {
  color: #949493;
}

.news-action-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 10px;
}

.news-go-text {
  font-weight: 600;
  font-size: 14px;
  color: #d3cfc3;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-action-wrapper:hover .news-go-text,
.news-item:hover .news-action-wrapper .news-go-text {
  opacity: 1;
  color: #d3cfc3;
}

.news-action {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid #b7b6a3;
  border-radius: 50%;
  color: #b7b6a3;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    width 0.3s ease,
    border-radius 0.3s ease,
    padding 0.3s ease;
}

.plus-icon {
  transition: opacity 0.3s ease;
  color: #b7b6a3;
  display: inline-block;
}

.arrow-icon {
  display: none;
}

.news-action-wrapper:hover .news-action,
.news-item:hover .news-action-wrapper .news-action {
  min-width: 30px;
  padding: 0 15px;
  border-radius: 20px;
  background-color: #b7b6a3;
  border-color: #b7b6a3;
  color: white;
  font-size: 14px;
  justify-content: center;
}

.news-action-wrapper:hover .plus-icon,
.news-item:hover .news-action-wrapper .plus-icon {
  display: none;
}

.news-action-wrapper:hover .arrow-icon,
.news-item:hover .news-action-wrapper .arrow-icon {
  display: inline-block;
  font-size: 15px;
  color: white;
}

.load-more-btn {
  display: block;
  margin: 30px auto;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: 700;
  background-color: #c0bfae;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #a9a897;
}
</style>
