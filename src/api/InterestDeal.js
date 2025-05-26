import axios from './http'

export const fetchInterestDealList = async () => {
  const res = await axios.get('/interestSale/list')
  return res.data
}

export const deleteInterestDeals = async (saleUuid) => {
  const res = await axios.delete('/interestSale/delete', {
    data: { saleUuid: saleUuid },
  })
  if (res.status === 200) {
    return true
  } else {
    throw new Error('다중 삭제 실패')
  }
}
