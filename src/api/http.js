import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  (res) => {
    if (res.data && typeof res.data === 'object') {
      // camelCase로 변환
      res.data = camelcaseKeys(res.data, { deep: true })
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default instance
