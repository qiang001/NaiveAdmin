import { ref } from 'vue'
export const useActionHeader = ({
  openEditModal,
  resetFilters,
  resetSort,
  setSort,
  initUsers,
}) => {
  const add = () => {
    openEditModal({ type: 'create' })
  }

  const clear = async () => {
    resetFilters()
    resetSort()
    await initUsers()
  }
  const searching = ref(false)
  const search = async () => {
    searching.value = true
    await initUsers()
    searching.value = false
  }

  const changeSort = async (val) => {
    setSort(val)
    await initUsers()
  }
  return {
    add,
    clear,
    searching,
    search,
    changeSort,
  }
}
