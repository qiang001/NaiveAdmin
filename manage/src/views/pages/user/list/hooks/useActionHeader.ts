import { ref } from 'vue'
import {
  // Input
  I_useEditModal_open,
  I_useConditions_resetFilters,
  I_useConditions_setStatus,
  I_useConditions_resetSort,
  I_useConditions_setSort,
  I_useConditions_resetPage,
  I_useConditions_queryUsers,
  // Output
  I_useActionHeader_add,
  I_useActionHeader_changeStatus,
  I_useActionHeader_clear,
  I_useActionHeader_search,
  I_useActionHeader_changeSort,
} from '../interfaces/method'

interface Input {
  openEditModal: I_useEditModal_open
  resetFilters: I_useConditions_resetFilters
  setStatus: I_useConditions_setStatus
  resetSort: I_useConditions_resetSort
  setSort: I_useConditions_setSort
  resetPage: I_useConditions_resetPage
  queryUsers: I_useConditions_queryUsers
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
