import { reactive } from 'vue'
interface IPagination {
  total: number
  page: number
  pageSize: number
  sizes: number[]
}

interface ISetPagination {
  total?: number
  page?: number
  pageSize?: number
}

export const usePagination = () => {
  const pagination = reactive<IPagination>({
    total: 0,
    page: 1,
    pageSize: 5,
    sizes: [5, 10, 15, 20],
  })

  const setPagination = async (arg: ISetPagination) => {
    const { total, page, pageSize } = arg
    total && (pagination.total = total)
    page && (pagination.page = page)
    pageSize && (pagination.pageSize = pageSize)
  }

  return {
    pagination,
    setPagination,
  }
}
