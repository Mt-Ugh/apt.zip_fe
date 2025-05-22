<template>
  <form class="profile-content" @submit.prevent="submit">
    <h2 class="profile-title">회원 정보 수정</h2>
    <div class="profile-title-underline"></div>
    <div class="profile-flex">
      <div class="profile-info">
        <div>
          <label>이름</label>
          <input type="text" :value="form.name" readonly />
        </div>
        <div>
          <label>닉네임</label>
          <input type="text" v-model="form.nickname" />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" v-model="form.email" />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" v-model="form.password" />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" v-model="form.passwordCheck" />
        </div>
        <div>
          <label>전화 번호</label>
          <input type="text" :value="form.phone" readonly />
        </div>
      </div>
      <div class="profile-image-area">
        <img class="profile-image" :src="DefaultProfile" alt="profile" />
      </div>
    </div>
    <div class="profile-actions">
      <button type="submit" class="confirm-btn">확인</button>
      <button type="button" class="withdraw-btn" @click="$emit('withdraw')">회원탈퇴</button>
    </div>
  </form>
</template>
<script setup>
import { reactive, watch } from 'vue'
import DefaultProfile from '@/assets/images/Common/DefaultProfile.svg'
const props = defineProps({ user: Object })
const emit = defineEmits(['update', 'withdraw', 'cancel'])
const form = reactive({ ...props.user })

watch(
  () => props.user,
  (val) => Object.assign(form, val),
)

function submit() {
  emit('update', { ...form })
}
</script>
<style scoped>
.profile-content {
  width: 900px;
  background: #fff;
  border-radius: 12px;
  padding: 60px 70px 0 70px;
  box-shadow: 0 2px 8px #7a7a7a;
  position: relative;
  min-height: 700px;
  display: flex;
  flex-direction: column;
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
.profile-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}
.profile-info {
  margin: 20px 0 0 20px;
  flex: 1;
}
.profile-info > div {
  margin-bottom: 24px;
}
.profile-info label {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
  display: block;
}
.profile-value {
  font-size: 16px;
  color: #222;
  margin-top: 4px;
  margin-bottom: 2px;
}
.profile-info input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 15px;
  background: #f5f5f5;
}
.profile-info input[readonly] {
  background: #f5f5f5;
  color: #888;
}
.profile-image-area {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 120px;
  margin: 10px 30px;
}
.profile-image {
  width: 110px;
  height: 110px;
  display: block;
}
.profile-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 0 30px 0;
}
.confirm-btn {
  margin-top: 30px;
  padding: 10px 30px;
  border-radius: 20px;
  border: none;
  background: #222;
  color: #fff;
  cursor: pointer;
}
.withdraw-btn {
  background: #fff0f0;
  color: #e00;
  border: 1px solid #e00;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 14px;
  cursor: pointer;
}
</style>
