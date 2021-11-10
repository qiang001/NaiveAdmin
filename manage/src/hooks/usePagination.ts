import { reactive } from 'vue'
export interface IPagination {
  itemCount: number
  page: number
  pageSize: number
  pageSizes: number[]
  showSizePicker: boolean
}

interface ISetPagination {
  total?: number
  page?: number
  pageSize?: number
}

export const usePagination = () => {
  const pagination = reactive<IPagination>({
    itemCount: 0,
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 15, 20],
    showSizePicker: true,
  })

  const setPagination = async (arg: ISetPagination) => {
    const { total, page, pageSize } = arg
    total && (pagination.itemCount = total)
    page && (pagination.page = page)
    pageSize && (pagination.pageSize = pageSize)
  }

  return {
    pagination,
    setPagination,
  }
}
