import axios from './http'

export const UserDetail = async () => {
  const res = await axios.get('/user/detail')
  return res.data
}

export const UpdateProfileImg = async () => {
  const res = await axios.put('/user/update/profileUrl')
  return res.data
}