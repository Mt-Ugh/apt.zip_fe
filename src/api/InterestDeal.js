import axios from './http'

export const IterestDealList = async () => {
    const res = await axios.get('/interestSale/list')
    return res.data
}

export const deleteInterestDeals = async (saleUuids) => {
    console.log('saleUuids', saleUuids)
    const res = await axios.delete('/interestSale/delete', {
        data: { sale_uuid: saleUuids }
    })
    if (res.status === 200) {
        return true
    } else {
        throw new Error('다중 삭제 실패')
    }
}