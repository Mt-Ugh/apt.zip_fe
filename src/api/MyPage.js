import axios from './http'

export const UserDetail = async () => {
  const res = await axios.get('/user/detail')
  return res.data
}

export const UpdateProfile = async (payload) => {
  const res = await axios.put('/user/update/profile', payload)
  if (res.status === 200) {
    return res.data
  } else {
    throw new Error('등록 실패')
  }
}

export const UpdateImage = async (file) => {
  const formData = new FormData()
  formData.append('profileImage', file)
  const res = await axios.put('/user/update/profileUrl', formData)
  return res.data
}

export const DeleteUser = async () => {
  const res = await axios.delete(`/user/delete`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('삭제 실패')
  }
}

export const UserAreaList = async () => {
  const res = await axios.get('/interestArea/list')
  return res.data
}

export const UserReviewList = async () => {
  const res = await axios.get('/review/list/user')
  return res.data
}

export const UserQnAList = async () => {
  const res = await axios.get('/qna/userList')
  return res.data
}

export const DeleteReview = async (reviewUuid) => {
  const res = await axios.delete(`/review/delete/${reviewUuid}`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('등록 실패')
  }
}