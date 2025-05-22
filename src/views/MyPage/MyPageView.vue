<template>
  <div class="mypage-container">
    <SidebarMenu />
    <main class="profile-main">
      <ProfileInfoView v-if="!editMode" :user="user" @edit="editMode = true" />
      <ProfileInfoEdit
        v-else
        :user="user"
        @update="onUpdate"
        @withdraw="onWithdraw"
        @cancel="editMode = false"
      />
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DefaultProfile from '@/assets/images/Common/DefaultProfile.svg'
import ProfileInfoView from '@/views/MyPage/ProfileInfoView.vue'
import ProfileInfoEdit from '@/views/MyPage/ProfileInfoEdit.vue'
import SidebarMenu from './SidebarMenu.vue'

const editMode = ref(false)
const user = reactive({
  name: '이해산',
  nickname: '오호산',
  email: 'hesan6615@naver.com',
  password: '',
  passwordCheck: '',
  phone: '010-2572-6615',
})

function onUpdate(newUser) {
  Object.assign(user, newUser)
  editMode.value = false
}
function onWithdraw() {
  // 회원탈퇴 로직
  alert('회원탈퇴')
}
</script>

<style scoped>
.mypage-container {
  display: flex;
  min-height: 100vh; /* 변경: height -> min-height */
  background: #f8fafc;
  margin: 27px auto 0;
}
.sidebar {
  width: 400px;
  background: #f8fafc;
  padding: 100px 10px 0 30px;
  border-right: 1px solid #eee;
  min-height: 100vh; /* 변경: 110vh -> 100vh */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu {
  width: auto;
  min-width: 340px;
  max-width: 90%;
  padding: 18px 0 18px 30px; /* 좌우 패딩 제거 */
  font-size: 16px;
  color: #6b6b6b;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  text-align: left;
  margin-left: 0; /* 왼쪽 여백 제거 */
}
.menu.selected {
  background: #eaf6ff;
  color: #222;
  border-radius: 8px;
}
.profile-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 0;
  background: #fff;
  margin-top: 70px; /* header 높이만큼 */
}
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
.profile-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0 30px 0;
}
.edit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  padding: 8px 26px;
  border-radius: 20px;
  border: 1px solid #222;
  background: #fff;
  color: #222;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s;
}
.edit-btn:hover {
  background: #f5f5f5;
}
.edit-icon {
  display: flex;
  align-items: center;
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
.profile-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 0 30px 0;
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
