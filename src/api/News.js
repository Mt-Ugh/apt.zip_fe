import axios from './http'

export const NewsList = async (query, display, start) => {
  const res = await axios.get(`/news/list?query=${query}&display=${display}&start=${start}`)
  return res.data
}
