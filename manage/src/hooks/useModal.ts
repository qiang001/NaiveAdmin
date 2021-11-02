import { ref } from 'vue'
export type modalType = 'create' | 'edit' | 'none'
export const useModal = () => {
  const modalShow = ref(false)
  const modalType = ref<modalType>('none')
  const openModal = () => {
    modalShow.value = true
  }
  const closeModal = () => {
    modalShow.value = false
  }
  const setModalType = (type: modalType) => {
    modalType.value = type
  }
  return {
    modalShow,
    modalType,
    openModal,
    closeModal,
    setModalType,
  }
}
