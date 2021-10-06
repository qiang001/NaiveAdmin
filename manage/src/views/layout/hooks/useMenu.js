import { ref, onMounted,nextTick } from 'vue'
export const useMenu = ({ refreshRoute, router }) => {
  const widthSpan = {
    min: 210,
    max: 420,
  }
  const sectionWidth = ref(0)
  let sider = null
  const widthChange = (val) => {
    // 暂时设置为none 避免不跟手
    sider.style.setProperty('transition', `none`)
    sectionWidth.value = val
  }

  const widthChangeDone = () => {
    // 恢复transition
    sider.style.setProperty('transition', `all 0.3s ease`)
  }

  const collapsed = ref(false)
  const inverted = ref(false)
  onMounted(() => {
    // 本地缓存状态
    const menuSetting = localStorage.getItem('menuSetting')
    if (menuSetting) {
      let { _sectionWidth, _collapsed, _inverted } = JSON.parse(menuSetting)
      sectionWidth.value = _sectionWidth || widthSpan.min
      collapsed.value = _collapsed
      inverted.value = _inverted
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const menuSetting = {
          _sectionWidth: sectionWidth.value,
          _collapsed: collapsed.value,
          _inverted: inverted.value,
        }
        localStorage.setItem('menuSetting', JSON.stringify(menuSetting))
      }
    })
    // 获取外层sider便于调整transition延迟
    sider = document.getElementById('sider')
    // 自适应collapsed
    let lastWidth = document.body.getBoundingClientRect().width
    window.addEventListener('resize', () => {
      const mql = window.matchMedia(`(max-width:${960 + sectionWidth.value}px)`)
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
  const invertedChange = (val) => {
    inverted.value = val
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
    collapsedChange,
    invertedChange,
    navigateTo,
  }
}
