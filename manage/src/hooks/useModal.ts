import { ref } from 'vue'
export type modalType = 'create' | 'edit' | 'none'
import { useToggle } from './useToggle'
export const useModal = () => {
  const {
    ifActive: modalShow,
    switchOn: openModal,
    switchOff: closeModal,
  } = useToggle()

  const modalType = ref<modalType>('none')
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
