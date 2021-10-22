import { ref, reactive, unref, onMounted } from 'vue'
import {IFilters} from '../interfaces/filters'
import {IPagination} from '../interfaces/pagination'
export const useFilters = (getUsers) => {
  const filters = reactive<IFilters>({
    name: '',
    username: '',
    ifActive: null,
  })
  const sort = ref('')
  const pagination = reactive<IPagination>({
    total: 0,
    page: 1,
    pageSize: 5,
    sizes: [5, 10, 15, 20],
  })

  function resetFilters() {
    filters.name = ''
    filters.username = ''
    filters.ifActive = null
  }

  function setStatus(val) {
    filters.ifActive = val
  }

  function resetSort() {
    sort.value = ''
  }

  function setSort(val) {
    sort.value = val
  }

  function resetPage(){
    pagination.page = 1
  }

  onMounted(async () => {
    await queryUsers()
  })

  const queryUsers = async () => {
    const { total } = await getUsers({
      filters: unref(filters),
      sort: unref(sort),
      pagination: unref(pagination),
    })
    pagination.total = total
  }

  const changePage = async (num) => {
    pagination.page = num
    const { total } = await getUsers({
      filters: unref(filters),
      sort: unref(sort),
      pagination: unref(pagination),
    })
    pagination.total = total
  }

  const changePageSize = async (num) => {
    pagination.pageSize = num
    resetPage()
    await queryUsers()
  }
  return {
    filters,
    resetFilters,
    setStatus,
    sort,
    resetSort,
    setSort,
    pagination,
    resetPage,
    queryUsers,
    changePage,
    changePageSize,
  }
}
