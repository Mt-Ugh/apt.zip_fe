import axios from './http'

export const IterestDealList = async () => {
    const res = await axios.get('/interestArea/list')
    return res.data
  }
  