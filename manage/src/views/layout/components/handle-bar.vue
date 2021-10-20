<template>
  <div class="d-flex handle-bar">
    <n-element
      class="d-flex a-center j-center"
      id="left-arrow"
      @click="onLeft"
      :style="`width:${arrowWidth}px`"
    >
      <n-icon size="18">
        <left-icon />
      </n-icon>
    </n-element>
    <div class="d-flex a-center tab-wrapper" id="tab-wrapper">
      <div class="d-flex a-center" id="tab-bar">
        <draggable
          class="d-flex a-center"
          tag="transition-group"
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null,
          }"
          v-model="history"
          v-bind="dragOptions"
          @start="setDrag(true)"
          @end="setDrag(false)"
          item-key="fullPath"
        >
          <template #item="{ element: tab }">
            <div class="tab-box">
              <n-element
                class="tab tab-current d-flex a-center"
                v-if="tab.ifCurrent"
              >
                <div
                  class="d-flex a-center j-center pr"
                  v-if="store.state.cacheList.includes(tab.name)"
                >
                  <div class="tab-cached"></div>
                </div>
                <div class="tab-text d-flex a-center" @click="gotoTab(tab)">
                  {{ tab.label }}
                  <span v-if="Object.keys(tab.query).length > 0">
                    :
                    {{
                      Object.keys(tab.query)
                        .map((key) => `${key}=${tab.query[key]}`)
                        .join(', ')
                    }}</span
                  >
                </div>
                <div
                  class="d-flex a-center j-center close-btn"
                  @click="deleteTab(tab)"
                  v-if="history.length > 1"
                >
                  <n-icon size="12">
                    <close-icon />
                  </n-icon>
                </div>
              </n-element>
              <n-element class="tab tab-no-current d-flex a-center" v-else>
                <div
                  class="d-flex a-center j-center pr"
                  v-if="store.state.cacheList.includes(tab.name)"
                >
                  <div class="tab-cached"></div>
                </div>
                <div class="tab-text d-flex a-center" @click="gotoTab(tab)">
                  {{ tab.label }}
                  <span v-if="Object.keys(tab.query).length > 0">
                    :
                    {{
                      Object.keys(tab.query)
                        .map((key) => `${key}=${tab.query[key]}`)
                        .join(', ')
                    }}</span
                  >
                </div>
                <div
                  class="d-flex a-center j-center close-btn"
                  @click="deleteTab(tab)"
                >
                  <n-icon size="12">
                    <close-icon />
                  </n-icon>
                </div>
              </n-element>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <n-element
      class="d-flex a-center j-center"
      id="right-arrow"
      @click="onRight"
      :style="`width:${arrowWidth}px`"
    >
      <n-icon size="18">
        <right-icon />
      </n-icon>
    </n-element>
    <div class="ml-1 d-flex a-center j-center refresh-btn">
      <n-button
        @click="refresh"
        size="small"
        :text="true"
        :loading="refreshing"
        :disabled="refreshing"
      >
        <template #icon>
          <n-icon>
            <refresh-icon />
          </n-icon>
        </template>
      </n-button>
    </div>
    <div class="mx-1 d-flex a-center j-center fullpage-btn">
      <n-button @click="setFullpage" size="small" :text="true">
        <template #icon>
          <n-icon>
            <fullpage-icon v-if="!ifFullpage" />
            <normal-page-icon v-else />
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup>
import {
  DoubleArrowRound as LeftIcon,
  DoubleArrowRound as RightIcon,
  RefreshSharp as RefreshIcon,
  CloseOutlined as CloseIcon,
  FullscreenFilled as FullpageIcon,
  FullscreenExitFilled as NormalPageIcon,
} from '@vicons/material'
import { NIcon, NButton, NElement } from 'naive-ui'
import draggable from 'vuedraggable/src/vuedraggable'
import {
  ref,
  reactive,
  inject,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue'
// 拖动tab
const drag = ref(false)
const dragOptions = reactive({
  animation: 200,
  group: 'tabs',
  disabled: false,
  ghostClass: 'ghost',
})
const setDrag = (bool) => {
  drag.value = bool
}
// 渲染 tabs 以及交互动画
const store = inject('store')
const history = inject('history')

let updateTimer = null
function animationStart() {
  if (updateTimer) {
    clearTimeout(updateTimer)
  }
  updateTimer = setTimeout(() => {
    updateTabBar()
  }, 50)
}

watch(
  history.value,
  () => {
    animationStart()
  },
  { immediate: true }
)

let resizeObserver = null
let tabWrapper = null
let tabBar = null

onMounted(() => {
  tabWrapper = document.getElementById('tab-wrapper')
  tabBar = document.getElementById('tab-bar')
  const ResizeObserver = window.ResizeObserver
  resizeObserver = new ResizeObserver(() => {
    animationStart()
  })
  resizeObserver.observe(tabWrapper)
})

onBeforeUnmount(() => {
  resizeObserver.unobserve(tabWrapper)
})

const arrowWidth = ref(0)

function updateTabBar() {
  nextTick(() => {
    const tabBarWidth = getTabBarWidth()
    console.log(tabBarWidth)
    const tabWrapperWidth = getTabWrapperWidth()
    if (tabBarWidth > tabWrapperWidth) {
      arrowWidth.value = 30
      setTimeout(() => {
        onShift()
      }, 20)
    } else {
      arrowWidth.value = 0
      setTimeout(() => {
        onLeft()
      }, 20)
    }
  })
}

function getTabBarWidth() {
  return Array.from(document.querySelectorAll('.tab-box')).reduce((a, c) => {
    a += c.getBoundingClientRect().width
    return a
  }, 0)
}

function getTabCurrentWidth() {
  let currentIdx = history.value.findIndex((v) => v.ifCurrent)
  return Array.from(document.querySelectorAll('.tab-box')).reduce(
    (a, c, idx) => {
      let curWidth = c.getBoundingClientRect().width
      a.head += idx < currentIdx ? curWidth : 0
      a.tail += idx > currentIdx ? curWidth : 0
      if (idx === currentIdx) {
        a.head += curWidth * 0.5
        a.tail += curWidth * 0.5
      }
      return a
    },
    {
      head: 0,
      tail: 0,
    }
  )
}

function getTabWrapperWidth() {
  return tabWrapper.getBoundingClientRect().width
}

function onShift() {
  const tabBarWidth = getTabCurrentWidth()
  const tabWrapperWidth = getTabWrapperWidth()
  let shift = tabWrapperWidth * 0.5 - tabBarWidth.head
  const over = tabWrapperWidth * 0.5 - tabBarWidth.tail
  if (shift < 0 && over > 0) {
    shift += over - 4
  }
  if (shift > 0) {
    shift = 4
  }
  tabBar.style.setProperty('left', `${shift}px`, 'important')
}

const onLeft = () => {
  tabBar.style.setProperty('left', `4px`, 'important')
}

const onRight = () => {
  tabBar.style.setProperty(
    'left',
    `${getTabWrapperWidth() - getTabBarWidth() - 4}px`,
    'important'
  )
}

// 暴露事件
const emit = defineEmits(['gotoTab', 'deleteTab', 'refreshPage', 'setFullpage'])

// 切换tab
const gotoTab = ({ name, ifCurrent, query, path }) => {
  emit('gotoTab', { name, ifCurrent, query, path })
}

// 删除tab
const deleteTab = ({ name, ifCurrent, fullPath, meta }) => {
  emit('deleteTab', { name, ifCurrent, fullPath, meta })
}

// 刷新页面
const refreshing = inject('refreshing')
const refresh = () => {
  emit('refreshPage')
}

// 设置全屏
const ifFullpage = inject('ifFullpage')
const setFullpage = () => {
  emit('setFullpage', !ifFullpage.value)
}
</script>

<style scoped>
.handle-bar {
  /* border-bottom: 1px solid var(--border-color); */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  height: 34px;
}

#left-arrow {
  transform: rotate(180deg);
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  width: 30px;
  box-shadow: inset -12px 0 8px -14px rgba(0, 0, 0, 0.18);
  background-color: var(--tag-color);
  transition: all 0.1s ease;
}

#right-arrow {
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  width: 30px;
  box-shadow: inset 12px 0 8px -14px rgba(0, 0, 0, 0.18);
  background-color: var(--tag-color);
  transition: all 0.1s ease;
}

.tab-wrapper {
  overflow: hidden;
  position: relative;
  flex: 1;
}
#tab-bar {
  position: absolute;
  left: 0;
  padding-top: 9px;
  transition: all 0.3s ease;
}
.tab-box {
  flex-shrink: 0;
}
.tab {
  padding: 2px 6px 0 6px;
  margin: 0 4px;
  user-select: none;
  font-size: 12px;
  border-radius: 3px 3px 0 0;
  color: var(--text-color);
  background-color: var(--divider-color);
  transition: all 0.1s ease;
}

.tab.tab-current {
  color: var(--base-color);
  background-color: var(--primary-color);
  transition: all 0.1s ease;
}
.tab-text {
  height: 22px;
  border-radius: 2px 0 0 0;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.1s ease;
}

.tab:hover {
  color: var(--base-color);
  background-color: var(--primary-color);
  transition: all 0.1s ease;
}
.tab-no-current:hover .close-btn {
  width: 22px;
  margin-right: -6px;
  transition: all 0.3s ease;
}
.tab-current:hover {
  background-color: var(--primary-color-pressed);
  transition: all 0.1s ease;
}
.close-btn {
  overflow: hidden;
  box-sizing: border-box;
  width: 0px;
  border-radius: 0 2px 0 0;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-current .close-btn {
  width: 22px;
  margin-right: -6px;
}

.tab-cached {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

.tab-current .tab-cached {
  background-color: var(--base-color);
}

.tab-no-current:hover .tab-cached {
  background-color: var(--base-color);
  transition: all 0.3s ease;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
</style>
