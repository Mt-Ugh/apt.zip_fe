import axios from './http'

export const fetchSidoList = async () => {
  const res = await axios.get('/dealMap/sidoList')
  return res.data
}

export const fetchGugunList = async (sidoName) => {
  const res = await axios.get('/dealMap/gugunList', { params: { sidoName } })
  return res.data
}

export const fetchDongList = async (sidoName, gugunName) => {
  const res = await axios.get('/dealMap/dongList', { params: { sidoName, gugunName } })
  return res.data
}

export const fetchAptList = async (dongCode, aptNm) => {
  const params = { dongCode }
  if (aptNm || aptNm.length > 0) {
    params.aptNm = aptNm
  }

  const res = await axios.get('/dealMap/list', { params })
  return res.data
}
