import axios from './http'

export const fetchCommercialPlaceList = async (dongCode, majorCategory) => {
  const res = await axios.get('/amenitiesMap/list', {
    params: { dongCode, majorCategory },
  })
  return res.data
}
