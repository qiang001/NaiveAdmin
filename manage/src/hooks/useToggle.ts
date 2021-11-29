import { ref } from 'vue'

export const useToggle = () => {
  const ifActive = ref(false)
  const switchOn = () => {
    ifActive.value = true
  }
  const switchOff = () => {
    ifActive.value = false
  }
  return {
    ifActive,
    switchOn,
    switchOff,
  }
}
