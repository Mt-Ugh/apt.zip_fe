<template>
  <ul class="qa-list">
    <li
      v-for="item in filteredList"
      :key="item.qnaUuid"
      :class="{ selected: String(item.qnaUuid) === String(selectedId) }"
      class="qa-item"
      @click="handleClick(item.qnaUuid)"
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
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['update:selectedId'])

function handleClick(qnaUuid) {
  emit('update:selectedId', qnaUuid)
  router.push({ name: 'QnADetail', params: { qnaUuid } })
}

const props = defineProps({
  dataList: Array,
  searchQuery: String,
  category: String,
  selectedId: [String, Number],
})

const page = ref(1)
const pageSize = ref(10)

const handleResize = () => {
  const width = window.innerWidth
  if (width <= 1600) {
    pageSize.value = 3
  }else if (width <= 2100) {
    pageSize.value = 5
  } 
  else if (width <= 2400) {
    pageSize.value = 7
  }   
  else {
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
  () => [props.searchQuery, props.category],
  () => {
    page.value = 1
  }
)

const filteredData = computed(() => {
  const filterText = props.searchQuery?.toLowerCase() || ''
  const categoryFilter = props.category || ''

  return props.dataList.filter((item) => {
    const matchesText = item.title.toLowerCase().includes(filterText)
    const matchesCategory = !categoryFilter || item.category === categoryFilter
    return matchesText && matchesCategory
  })
})

const filteredList = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})


const totalPages = computed(() => {
  if (!pageSize.value || isNaN(pageSize.value) || pageSize.value <= 0) return 1
  return Math.max(1, Math.ceil(filteredData.value.length / pageSize.value))
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
  padding-top: 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.qa-item {
  display: grid;
  grid-template-columns: 120px 1fr 110px;
  align-items: center;
  padding: 1.2rem 2rem;
  width: 100%;
  max-width: 1080px;
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  background-color: #fff;
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.qa-item:hover {
  background-color: #f8f9fa;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #d3cfc3;
  z-index: 1; 
}

.qa-item.selected {
  background-color: #e9f2ff;
  border-color: #90c2ff;
  box-shadow: 0 4px 16px rgba(51, 153, 255, 0.25);
}

.category {
  color: #d3cfc3;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #212529;
  padding-left: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 0.85rem;
  color: #868e96;
  text-align: right;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 6rem;
  gap: 0.4rem;
}

.pagination span {
  margin: 0.5rem 0;
}

.pagination button {
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  border: none;
  background-color: transparent;
  color: #666;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.pagination button:hover {
  background-color: #f1f3f5;
}

.pagination button.active {
  background-color: #d3cfc3;
  color: #fff;
  font-weight: 600;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media screen AND (max-width: 1545px) {
  .qa-item {
    display: grid;
    grid-template-columns: 80px 1fr 100px;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    cursor: pointer;
    color: #333;
    border-radius: 0.75rem;
    width: 1030px;
    box-sizing: border-box;
  }
  
   .pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 0.4rem;
  }

  .qa-list {
    height: 400px;
  }
}


@media screen AND (max-width: 2100px) {  
   .pagination {
    margin-top: 1rem;
  }
}

@media screen AND (max-height: 1500px) {  
   .pagination {
    margin-top: 2rem;
  }
}
</style>
