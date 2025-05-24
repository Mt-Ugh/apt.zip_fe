<template>
  <div class="mypage-container">
    <SidebarMenu :selected="selectedMenu" @select="selectedMenu = $event" />
    <main class="profile-main">
      <ProfileInfoView
        v-if="selectedMenu === 'profile' && !editMode"
        :user="user"
        @edit="editMode = true"
      />
      <ProfileInfoEdit
        v-if="selectedMenu === 'profile' && editMode"
        :user="user"
        @withdraw="onWithdraw"
        @cancel="editMode = false"
        @update="onProfileUpdated"
      />
      <InterestArea v-if="selectedMenu === 'area'" />
      <ReviewManage v-if="selectedMenu === 'review'" />
      <QnaManage v-if="selectedMenu === 'qna'" />
    </main>
  </div>
  <ConfirmModal
    :visible="showConfirmModal"
    :title="confirmTitle"
    :message="confirmMessage"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProfileInfoView from '@/views/MyPage/components/ProfileInfoView.vue'
import ProfileInfoEdit from '@/views/MyPage/components/ProfileInfoEdit.vue'
import SidebarMenu from '@/views/MyPage/components/SidebarMenu.vue'
import { UserDetail } from '@/api/MyPage'
import { DeleteUser } from '@/api/MyPage'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import InterestArea from '@/views/MyPage/components/InterestArea.vue'
import ReviewManage from '@/views/MyPage/components/ReviewManage.vue'
import QnaManage from '@/views/MyPage/components/QnaManage.vue'

const selectedMenu = ref('profile') 
const router = useRouter()
const editMode = ref(false)
const user = ref(null)
const showConfirmModal = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmCallback = ref(null)

const showModalError = (title, message) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

function onWithdraw() {
  confirmTitle.value = 'QnA 삭제 확인'
  confirmMessage.value = '정말 삭제하시겠습니까?'
  confirmCallback.value = async () => {
    try {
      await DeleteUser()
      showConfirmModal.value = false
      router.push('/')
    } catch {
      showModalError('삭제 실패', 'QnA 삭제 중 오류가 발생했습니다.')
    }
  }
  showConfirmModal.value = true
}

const fetchUser = async () => {
  const res = await UserDetail()
  user.value = res
}

function onProfileUpdated() {
  editMode.value = false
  fetchUser()
}

onMounted(() => {
  fetchUser()
})

const onConfirm = () => {
  if (confirmCallback.value) {
    showConfirmModal.value = false
    confirmCallback.value()
  }
}

const onCancel = () => {
  showConfirmModal.value = false
}
</script>

<style scoped>
.mypage-container {
  display: flex;
  min-height: 100vh; 
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
