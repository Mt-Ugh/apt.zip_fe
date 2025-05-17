import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { useUserStore } from '@/stores/user'
import { getActivePinia } from 'pinia'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

async function refreshTokens() {
  const res = await instance.post('/auth/tokens', null)
  const userStore = useUserStore(getActivePinia())
  userStore.setAccessToken(res.data.accessToken)
  return res.data.accessToken
}

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(getActivePinia())
    const accessToken = userStore.accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (config.data && typeof config.data === 'object') {
      // snakeCase로 변환
      config.data = snakecaseKeys(config.data, { deep: true })
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (res) => {
    if (res.data && typeof res.data === 'object') {
      // camelCase로 변환
      res.data = camelcaseKeys(res.data, { deep: true })
    }
    return res
  },
  async (error) => {
    const originalRequest = error.config
    const userStore = useUserStore(getActivePinia())
    console.log(error.response)
    console.log(!originalRequest._retry)
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true
        const newAccessToken = await refreshTokens()
        console.log('newAccessToken', newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return instance(originalRequest)
      } catch (err) {
        userStore.logout()
        window.location.href = '/auth'
      }
    }

    return Promise.reject(error)
  },
)

export default instance
