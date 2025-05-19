import axios from './http'

export const signin = async (email, password) => {
  const res = await axios.post('/auth/signin', { email, password })
  return res.data
}

export const signup = async (email, password, name, nickname, phoneNumber) => {
  const res = await axios.post('/user/signup', {
    email,
    password,
    name,
    nickname,
    phoneNumber,
  })
  return res.data
}

export const getGoogleLoginUrl = () => {
  return import.meta.env.VITE_API_BASE_URL + '/oauth2/authorization/google'
}
