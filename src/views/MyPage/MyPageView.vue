<template>
  <div class="mypage-container">
    <SidebarMenu />
    <main class="profile-main">
      <ProfileInfoView v-if="!editMode" :user="user" @edit="editMode = true" />
      <ProfileInfoEdit
        v-else
        :user="user"
        @withdraw="onWithdraw"
        @cancel="editMode = false"
        @update="editMode = false"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProfileInfoView from '@/views/MyPage/ProfileInfoView.vue'
import ProfileInfoEdit from '@/views/MyPage/ProfileInfoEdit.vue'
import SidebarMenu from './SidebarMenu.vue'
import { UserDetail } from '@/api/MyPage'

const editMode = ref(false)
const user = ref(null)

function onWithdraw() {
  // 회원탈퇴 로직
  alert('회원탈퇴')
}

const fetchUser = async () => {
  const res = await UserDetail()
  user.value = res
}

onMounted(()=>{
  fetchUser()
})
</script>

<style scoped>
.mypage-container {
  display: flex;
  min-height: 100vh; /* 변경: height -> min-height */
  background: #f8fafc;
  margin: 27px auto 0;
}
.profile-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 130px 0;
  background: #fff;
}
.profile-content {
  width: 1100px;
  background: #fff;
  border-radius: 12px;
  padding: 60px 70px 0 70px;
  box-shadow: 0 2px 8px #7a7a7a;
  position: relative;
  min-height: 700px;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1600px) {
  .profile-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 90px 0;
  background: #fff;
  }
  .profile-content {
    width: 980px;
    padding: 30px 36px 30px 36px;
    min-height: 600px;
  }
  
}
</style>
