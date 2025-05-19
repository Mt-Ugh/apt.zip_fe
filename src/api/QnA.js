import axios from './http'

export const QnAList = async () => {
  const res = await axios.get('/qna/list')
  return res.data
}

export const QnADetail = async (qnaUuid) => {
  const res = await axios.get(`/qna/detail/${qnaUuid}`)
  return res.data
}
