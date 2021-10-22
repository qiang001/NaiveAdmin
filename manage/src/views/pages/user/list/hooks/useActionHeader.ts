import { ref } from 'vue'
export const useActionHeader = ({
  openEditModal,
  resetFilters,
  setStatus,
  resetSort,
  setSort,
  resetPage,
  queryUsers,
}) => {
  const add = () => {
    openEditModal({ type: 'create' })
  }
  const changeStatus = async (val) => {
    setStatus(val)
    resetPage()
    await queryUsers()
  }
  const clear = async () => {
    resetFilters()
    resetSort()
    resetPage()
    await queryUsers()
  }
  const searching = ref(false)
  const search = async () => {
    searching.value = true
    resetPage()
    await queryUsers()
    searching.value = false
  }

  const changeSort = async (val) => {
    setSort(val)
    resetPage()
    await queryUsers()
  }
  return {
    add,
    changeStatus,
    clear,
    searching,
    search,
    changeSort,
  }
}
