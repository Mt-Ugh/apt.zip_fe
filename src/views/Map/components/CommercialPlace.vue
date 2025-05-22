<template>
  <div class="commercial-place">
    <button
      v-for="item in PLACE_CATEGORIES"
      :key="item.label"
      class="category-btn"
      :class="{ active: selectedCategory === item.type }"
      @click="handleCategorySelect(item.type)"
    >
      <img :src="item.icon" :alt="item.label" class="category-icon" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { PLACE_CATEGORIES } from '@/constants/placeCategory'
import { useMapStore } from '@/stores/mapStore'
import { fetchCommercialPlaceList } from '@/api/CommercialPlace'
import { defineEmits, ref, watch } from 'vue'

const mapStore = useMapStore()
const emit = defineEmits(['show-places'])
const selectedCategory = ref(null)

async function handleCategorySelect(type) {
  if (selectedCategory.value === type) return // 이미 선택된 카테고리면 무시
  selectedCategory.value = type
  const dongCode = mapStore.dongCode
  if (!dongCode) return
  const result = await fetchCommercialPlaceList(dongCode, type)
  emit('show-places', result)
}

watch(
  () => mapStore.dongCode,
  () => {
    selectedCategory.value = null
  },
)
</script>

<style scoped>
.commercial-place {
  position: absolute;
  top: 60px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.7em;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 8px 18px 8px 12px;
  font-size: 14px;
  color: #ff8000;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: background 0.15s;
}

.category-btn:hover {
  background: #f7f7f7;
}

.category-btn.active {
  background: #ff8000;
  color: #fff;
  border: 1.5px solid #ff8000;
}

.category-btn.active .category-icon {
  filter: brightness(0) invert(1);
}

.category-icon {
  width: 23px;
}
</style>
