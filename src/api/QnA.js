import axios from './http'

export const QnAList = async () => {
  const res = await axios.get('/qna/list')
  return res.data
}

export const QnADetail = async (qnaUuid) => {
  const res = await axios.get(`/qna/detail/${qnaUuid}`)
  return res.data
}

export const registerQnA = async (payload) => {
  const res = await axios.post(`/qna/regist`, payload)
  if (res.status === 201) {
    return res.data
  } else {
    throw new Error('등록 실패')
  }
}

export const deleteQnA = async (qnaUuid) => {
  const res = await axios.delete(`/qna/delete/${qnaUuid}`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('등록 실패')
  }
}

export const registerAnswer = async (qnaUuid, payload) => {
  console.log(qnaUuid, payload)
  const res = await axios.post(`/qna/answerRegist/${qnaUuid}`, payload)
  if (res.status === 201) {
    return res.data
  } else {
    throw new Error('등록 실패')
  }
}

export const deleteAnswer = async (qnaUuid) => {
  const res = await axios.delete(`/qna/answerDelete/${qnaUuid}`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('등록 실패')
  }
}
