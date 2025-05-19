import axios from './http'

export const QnAList = async () => {
  const res = await axios.get('/qna/list')
  return res.data
}
