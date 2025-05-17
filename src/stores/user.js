import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: '',
    userUuid: '',
    nickname: '',
    profileUrl: '',
  }),
  actions: {
    setUser(data) {
      this.accessToken = data.accessToken
      this.userUuid = data.userUuid
      this.nickname = data.nickname
      this.profileUrl = data.profileUrl

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          userUuid: data.userUuid,
          nickname: data.nickname,
          profileUrl: data.profileUrl,
        }),
      )
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    initUserFromStorage() {
      this.accessToken = localStorage.getItem('accessToken') || ''
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      this.userUuid = userInfo.userUuid || ''
      this.nickname = userInfo.nickname || ''
      this.profileUrl = userInfo.profileUrl || ''
    },
    logout() {
      localStorage.clear()
      this.$reset()
    },
  },
})
