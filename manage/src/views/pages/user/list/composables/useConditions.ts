import { ref, reactive, unref, onMounted, nextTick } from 'vue'
import { IFilters, IUserListItem } from '../interfaces/data'
import { usePagination } from '@/hooks/usePagination'
import {
  // Input
  I_useApiCenter_getUsers,
  // Output
  I_useConditions_resetFilters,
  I_useConditions_setStatus,
  I_useConditions_resetSort,
  I_useConditions_setSort,
  I_useConditions_resetPage,
  I_useConditions_changePage,
  I_useConditions_changePageSize,
  I_useConditions_queryUsers,
} from '../interfaces/method'
interface Input {
  _getUsers: I_useApiCenter_getUsers
}
export const useConditions = ({ _getUsers }: Input) => {
  // 筛选
  const filters = reactive<IFilters>({
    name: '',
    username: '',
    ifActive: null,
  })

  const resetFilters: I_useConditions_resetFilters = function () {
    filters.name = ''
    filters.username = ''
    filters.ifActive = null
  }

  const setStatus: I_useConditions_setStatus = function (val: string) {
    filters.ifActive = val
  }

  // 排序
  const sort = ref('')

  const resetSort: I_useConditions_resetSort = function () {
    sort.value = ''
  }

  const setSort: I_useConditions_setSort = function (val: string) {
    sort.value = val
  }

  // 分页
  const { pagination, setPagination } = usePagination()

  const resetPage: I_useConditions_resetPage = function () {
    pagination.page === 1 && setPagination({ page: 2 })
    nextTick(() => setPagination({ page: 1 }))
  }

  const changePage: I_useConditions_changePage = async (page) => {
    setPagination({ page })
    await queryUsers()
  }

  const changePageSize: I_useConditions_changePageSize = async (pageSize) => {
    setPagination({ page: 1, pageSize })
    await queryUsers()
  }

  // 数据交互
  const users = ref<Array<IUserListItem>>([])
  const queryUsers: I_useConditions_queryUsers = async () => {
    const { total, payload } = await _getUsers({
      filters: unref(filters),
      sort: unref(sort),
      pagination: unref(pagination),
    })
    users.value = payload
    setPagination({ total })
  }

  // 初始化数据
  onMounted(async () => {
    await queryUsers()
  })

  const data = { users, filters, sort, pagination }
  const method = {
    resetFilters,
    setStatus,
    resetSort,
    setSort,
    resetPage,
    changePage,
    changePageSize,
    queryUsers,
  }
  return {
    ...data,
    ...method,
  }
}
