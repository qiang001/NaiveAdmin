import { ref } from 'vue'
import {
  // Input
  I_useEditModal_open,
  I_useFilters_resetFilters,
  I_useFilters_setStatus,
  I_useFilters_resetSort,
  I_useFilters_setSort,
  I_useFilters_resetPage,
  I_useFilters_queryUsers,
  // Output
  I_useActionHeader_add,
  I_useActionHeader_changeStatus,
  I_useActionHeader_clear,
  I_useActionHeader_search,
  I_useActionHeader_changeSort,
} from '../interfaces/method'

interface Input {
  openEditModal: I_useEditModal_open
  resetFilters: I_useFilters_resetFilters
  setStatus: I_useFilters_setStatus
  resetSort: I_useFilters_resetSort
  setSort: I_useFilters_setSort
  resetPage: I_useFilters_resetPage
  queryUsers: I_useFilters_queryUsers
}

export const useActionHeader = ({
  openEditModal,
  resetFilters,
  setStatus,
  resetSort,
  setSort,
  resetPage,
  queryUsers,
}: Input) => {
  const add: I_useActionHeader_add = () => {
    openEditModal({ type: 'create' })
  }
  const changeStatus: I_useActionHeader_changeStatus = async (val) => {
    setStatus(val)
    resetPage()
    await queryUsers()
  }
  const clear: I_useActionHeader_clear = async () => {
    resetFilters()
    resetSort()
    resetPage()
    await queryUsers()
  }
  const searching = ref(false)
  const search: I_useActionHeader_search = async () => {
    searching.value = true
    resetPage()
    await queryUsers()
    searching.value = false
  }

  const changeSort: I_useActionHeader_changeSort = async (val) => {
    setSort(val)
    resetPage()
    await queryUsers()
  }
  const data = { searching }
  const method = { add, changeStatus, clear, search, changeSort }
  return {
    ...data,
    ...method,
  }
}
