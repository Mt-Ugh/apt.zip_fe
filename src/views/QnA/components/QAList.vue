<template>
  <ul class="qa-list">
    <li
      v-for="item in filteredList"
      :key="item.qnaUuid"
      :class="{ selected: String(item.qnaUuid) === String(selectedId) }"
      class="qa-item"
      @click="$emit('update:selectedId', item.qnaUuid)"
    >
      <span class="category">{{ item.category }}</span>
      <span class="title">{{ item.title }}</span>
      <span class="date">
        {{ item.createdAt.slice(0, 10).replace(/-/g, '.') }}
      </span>
    </li>
  </ul>

  <div class="pagination">
    <button @click="prevPage" :disabled="page === 1">&lt;</button>

    <button v-for="p in totalPages" :key="p" :class="{ active: p === page }" @click="goToPage(p)">
      {{ p }}
    </button>

    <button @click="nextPage" :disabled="page === totalPages">&gt;</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  dataList: Array,
  searchQuery: String,
  selectedId: [String, Number],
})

const page = ref(1)
const pageSize = ref(10)

const handleResize = () => {
  const width = window.innerWidth
  if (width <= 1600) {
    pageSize.value = 7
  } else {
    pageSize.value = 10
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.searchQuery,
  () => {
    page.value = 1
  },
)

const filteredList = computed(() => {
  const filterText = props.searchQuery?.toLowerCase() || ''
  const filtered = props.dataList.filter((item) => item.title.toLowerCase().includes(filterText))

  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value

  if (pageSize.value <= 0 || isNaN(pageSize.value)) return []

  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  const filterText = props.searchQuery?.toLowerCase() || ''
  const filtered = props.dataList.filter((item) => item.title.toLowerCase().includes(filterText))

  if (!pageSize.value || isNaN(pageSize.value) || pageSize.value <= 0) return 1

  return Math.max(1, Math.ceil(filtered.length / pageSize.value))
})

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function goToPage(p) {
  page.value = p
}
</script>

<style scoped>
.qa-list {
  list-style: none;
  padding: 20px 0 0 0;
  margin: 0;
  height: 550px;
  border-top: rgb(136, 136, 136) 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen AND (max-width: 1600px) {
  .qa-list {
    height: 400px;
  }
}

.qa-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
  border-radius: 0.75rem;
  width: 1030px;
  box-sizing: border-box;
}

.qa-item.selected {
  background-color: #dbeffe;
}

.qa-item:hover {
  background-color: #eef6fc;
}

.category {
  color: #999;
  font-size: 0.8rem;
  align-self: center;
}

.title {
  padding-left: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}

.date {
  color: #999;
  font-size: 0.8rem;
  text-align: right;
  align-self: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin: auto 0;
  font-size: 1rem;
}

.pagination span {
  margin: 0.5rem 0;
}

.pagination button {
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 300;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
}

.pagination button.active {
  margin: -0.04rem 0;
  font-weight: 800;
}

.pagination button:disabled {
  cursor: default;
  opacity: 0.3;
}
</style>
