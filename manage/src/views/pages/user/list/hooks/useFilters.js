import { ref, reactive, unref, onMounted } from 'vue'
export const useFilters = (getUsers) => {
  const filters = reactive({
    name: '',
    username: '',
  })
  const sort = ref('')
  const pagination = reactive({
    total: 0,
    page: 1,
    pageSize: 5,
    sizes: [5, 10, 15, 20],
  })

  function resetFilters(){
    filters.name = ''
    filters.username = ''
  }

  function resetSort(){
    sort.value = ''
  }

  function setSort(val){
    sort.value = val
  }

  onMounted(async () => {
    await initUsers()
  })

  const initUsers = async () => {
    pagination.page = 1
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
    await initUsers()
  }
  return {
    filters,
    resetFilters,
    sort,
    resetSort,
    setSort,
    pagination,
    initUsers,
    changePage,
    changePageSize,
  }
}
