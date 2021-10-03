import { ref, onMounted } from 'vue'
export const useMenu = ({ refreshRoute, router }) => {
  const collapsed = ref(false)
  const inverted = ref(false)
  onMounted(() => {
    const menuSetting = localStorage.getItem('menuSetting')
    if (menuSetting) {
      let { _collapsed, _inverted } = JSON.parse(menuSetting)
      collapsed.value = _collapsed
      inverted.value = _inverted
    }
    window.addEventListener('beforeunload', () => {
      const menuSetting = {
        _collapsed: collapsed.value,
        _inverted: inverted.value,
      }
      localStorage.setItem('menuSetting', JSON.stringify(menuSetting))
    })
  })
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
    navigateTo,
  }
}
