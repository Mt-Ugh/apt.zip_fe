import axios from './http'

export const fetchDongReviewList = async (dongCode) => {
  const res = await axios.get(`/review/list/dong/${dongCode}`)
  return res.data
}

export const registReview = async (dongCode, content) => {
  const res = await axios.post('/review/regist', { dongCode, content })
  if (res.status === 201) {
    return true
  } else {
    throw new Error('등록 실패')
  }
}
