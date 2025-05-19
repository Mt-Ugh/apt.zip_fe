import axios from './http'

export const fameAreaList = async () => {
  const res = await axios.get('/interestArea/fame')
  return res.data
}

export const registerInterestArea = async (areaUuid) => {
  const res = await axios.post('/interestArea/regist', { areaUuid })
  if (res.status === 201) {
    return true
  } else {
    throw new Error('등록 실패')
  }
}

export const deleteInterestArea = async (areaUuid) => {
  const res = await axios.delete(`/interestArea/delete/${areaUuid}`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('삭제 실패')
  }
}
