import { ref, onMounted } from 'vue'
export const useMenu = ({ refreshRoute, router }) => {
  const widthSpan = {
    min: 180,
    max: 360,
  }
  const sectionWidth = ref(0)
  let sider = null
  const widthChange = (val) => {
    sider = document.getElementById('sider')
    // 暂时设置为none 避免不跟手
    sider?.style.setProperty('transition', `none`)
    sectionWidth.value = val
  }

  const widthChangeDone = () => {
    sider = document.getElementById('sider')
    // 恢复transition
    sider?.style.setProperty('transition', `all 0.3s ease`)
  }

  const collapsed = ref(false)
  const inverted = ref(false)
  const accordion = ref(false)
  const ifShowIcon = ref(true)
  const ifShowSearch = ref(true)

  onMounted(() => {
    // 本地缓存状态
    const menuSetting = localStorage.getItem('menuSetting')
    if (menuSetting) {
      let {
        _sectionWidth,
        _collapsed,
        _inverted,
        _accordion,
        _ifShowIcon,
        _ifShowSearch,
      } = JSON.parse(menuSetting)
      sectionWidth.value = _sectionWidth || widthSpan.min
      collapsed.value = !!_collapsed
      inverted.value = !!_inverted
      accordion.value = !!_accordion
      ifShowIcon.value = !!_ifShowIcon
      ifShowSearch.value = !!_ifShowSearch
    } else {
      sectionWidth.value = widthSpan.min
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const menuSetting = {
          _sectionWidth: sectionWidth.value,
          _collapsed: collapsed.value,
          _inverted: inverted.value,
          _accordion: accordion.value,
          _ifShowIcon: ifShowIcon.value,
          _ifShowSearch: ifShowSearch.value,
        }
        localStorage.setItem('menuSetting', JSON.stringify(menuSetting))
      }
    })

    // 自适应collapsed
    let lastWidth = document.body.getBoundingClientRect().width
    window.addEventListener('resize', () => {
      const mql = window.matchMedia(`(max-width:${720 + sectionWidth.value}px)`)
      let curWidth = document.body.getBoundingClientRect().width
      if (curWidth != lastWidth) {
        lastWidth = curWidth
        collapsedChange(mql.matches)
      }
    })
  })
  const collapsedChange = (val) => {
    collapsed.value = val
  }
  const navigateTo = ({ name, ifCurrent }) => {
    !ifCurrent ? router.push({ name }) : refreshRoute()
  }
  return {
    widthSpan,
    sectionWidth,
    widthChange,
    widthChangeDone,
    collapsed,
    inverted,
    accordion,
    ifShowIcon,
    ifShowSearch,
    collapsedChange,
    navigateTo,
  }
}
