import axios from './http'

export const fameAreaList = async () => {
  const res = await axios.get("/interestArea/fame")
  return res.data
}

export const registerInterestArea = async (area_uuid) => {
  const res = await axios.post('/interestArea/regist', { area_uuid })
  if (res.status === 201) {
    return true
  } else {
    throw new Error('등록 실패')
  }
}

export const deleteInterestArea = async (area_uuid) => {
  const res = await axios.delete(`/interestArea/delete/${area_uuid}`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('삭제 실패')
  }
}
