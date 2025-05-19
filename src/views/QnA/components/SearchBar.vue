<template>
  <div class="search-wrapper">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="검색어를 입력해주세요"
      class="search-input"
    />
    <span class="search-icon"><img :src="SearchIcon" alt="search" /></span>
  </div>
</template>

<script setup>
import SearchIcon from '@/assets/images/Common/SearchIcon.svg'

defineProps({
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.7rem;
  margin-top: 1.5rem;
  position: relative;
}

.search-input {
  width: 300px;
  padding: 0.25rem 1.5rem 0.25rem 0.5rem;
  border: 0px solid #ccc;
  border-radius: 100px;
  font-size: 0.9rem;
  outline: none;
  box-shadow: none;
  background-color: #e9e9e9;
  height: 35px;
}

.search-input:focus {
  border-color: #4f4f4f;
  box-shadow: none;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 55%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  pointer-events: none;
}

.search-icon img {
  width: 18px;
}
</style>
