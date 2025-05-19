import axios from './http'

export const NewsList = async () => {
  const res = await axios.get('/news/list?query=부동산&display=10&start=1')
  return res.data
}
