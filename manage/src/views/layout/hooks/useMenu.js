import { ref } from 'vue'
export const useMenu = ({refreshRoute,router}) => {
  const collapsed = ref(false)
  const inverted = ref(false)
  const collapsedChange = (val) => {
    collapsed.value = val
  }
  const invertedChange = (val) => {
    inverted.value = val
  }
  const navigateTo = ({ name, ifCurrent }) => {
    !ifCurrent ? router.push({ name }) : refreshRoute()
  }
  return {
    collapsed,
    inverted,
    collapsedChange,
    invertedChange,
    navigateTo
  }
}
