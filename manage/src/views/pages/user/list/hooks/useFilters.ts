import { ref, reactive, unref, onMounted } from 'vue'
import { IFilters, IPagination, IUserListItem } from '../interfaces/data'
import {
  // Input
  I_useApiCenter_getUsers,
  // Output
  I_useFilters_resetFilters,
  I_useFilters_setStatus,
  I_useFilters_resetSort,
  I_useFilters_setSort,
  I_useFilters_resetPage,
  I_useFilters_queryUsers,
  I_useFilters_changePage,
  I_useFilters_changePageSize,
} from '../interfaces/method'
interface Input {
  _getUsers: I_useApiCenter_getUsers
}
export const useFilters = ({ _getUsers }: Input) => {
  const filters = reactive<IFilters>({
    name: '',
    username: '',
    ifActive: null,
  })

  const resetFilters: I_useFilters_resetFilters = function () {
    filters.name = ''
    filters.username = ''
    filters.ifActive = null
  }

  const setStatus: I_useFilters_setStatus = function (val: string) {
    filters.ifActive = val
  }

  const sort = ref('')

  const resetSort: I_useFilters_resetSort = function () {
    sort.value = ''
  }

  const setSort: I_useFilters_setSort = function (val: string) {
    sort.value = val
  }

  const pagination = reactive<IPagination>({
    total: 0,
    page: 1,
    pageSize: 5,
    sizes: [5, 10, 15, 20],
  })

  const resetPage: I_useFilters_resetPage = function () {
    pagination.page = 1
  }

  const users = ref<Array<IUserListItem>>([])
  const queryUsers: I_useFilters_queryUsers = async () => {
    const { total, payload } = await _getUsers({
      filters: unref(filters),
      sort: unref(sort),
      pagination: unref(pagination),
    })
    users.value = payload
    pagination.total = total
  }

  onMounted(async () => {
    await queryUsers()
  })

  const changePage: I_useFilters_changePage = async (num) => {
    pagination.page = num
    const { total, payload } = await _getUsers({
      filters: unref(filters),
      sort: unref(sort),
      pagination: unref(pagination),
    })
    users.value = payload
    pagination.total = total
  }

  const changePageSize: I_useFilters_changePageSize = async (num) => {
    pagination.pageSize = num
    resetPage()
    await queryUsers()
  }

  const data = { users, filters, sort, pagination }
  const method = {
    resetFilters,
    setStatus,
    resetSort,
    setSort,
    resetPage,
    queryUsers,
    changePage,
    changePageSize,
  }
  return {
    ...data,
    ...method,
  }
}
