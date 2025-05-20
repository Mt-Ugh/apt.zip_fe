<template>
  <div class="search-wrapper">
    <div class="left-section">
      <button v-if="userStore.isLoggedIn" class="write-button" @click="handleWrite">
        작성하기
      </button>
    </div>

    <div class="right-section">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="검색어를 입력해주세요"
        class="search-input"
      />
      <span class="search-icon">
        <img :src="SearchIcon" alt="search" />
      </span>

      <select
        class="category-select"
        :value="modelCategory"
        @change="$emit('update:modelCategory', $event.target.value)"
      >
        <option value="">전체</option>
        <option value="SALES">매매</option>
        <option value="RENT">전세/월세</option>
        <option value="FINANCE">금융</option>
        <option value="INVESTMENT">투자</option>
        <option value="REGIONS">지역</option>
        <option value="MANAGEMENT">관리</option>
        <option value="ETC">기타</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import SearchIcon from '@/assets/images/Common/SearchIcon.svg'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

defineProps({
  modelValue: String,
  modelCategory: String,
})

defineEmits(['update:modelValue', 'update:modelCategory'])

const handleWrite = () => {
  router.push('/qna/regist')
}
</script>

<style scoped>
.search-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 40px;
}

.left-section {
  flex-shrink: 0;
  margin-left: 80px;
}

.right-section {
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  width: 300px;
  height: 40px;
  padding: 0 2.5rem 0 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.95rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s;
  margin-right: 0.8rem;
}

.search-input:focus {
  border-color: #d3cfc3;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 158px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-icon img {
  width: 18px;
  opacity: 0.7;
}

.category-select {
  width: 130px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  font-size: 0.9rem;
  padding: 0 1rem;
  color: #333;
  appearance: none;
}

.write-button {
  background-color: #d3cfc3;
  color: white;
  border: none;
  border-radius: 20px;
  height: 40px;
  padding: 0 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.write-button:hover {
  background-color: #c6c2b7;
}
</style>
