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
        <div v-for="(tab, index) in history" :key="tab.name" class="tab-box">
          <n-element
            class="tab tab-current d-flex a-center"
            v-if="tab.ifCurrent"
          >
            <div class="tab-text d-flex a-center" @click="gotoTab(tab.name)">
              {{ tab.label }}
            </div>
            <div
              class="d-flex a-center j-center close-btn"
              @click="deleteTab(tab.name, tab.ifCurrent)"
              v-if="history.length > 1"
            >
              <n-icon size="12">
                <close-icon />
              </n-icon>
            </div>
          </n-element>
          <n-element class="tab d-flex a-center" v-else>
            <div class="tab-text d-flex a-center" @click="gotoTab(tab.name)">
              {{ tab.label }}
            </div>
            <div
              class="d-flex a-center j-center close-btn"
              @click="deleteTab(tab.name, tab.ifCurrent)"
            >
              <n-icon size="12">
                <close-icon />
              </n-icon>
            </div>
          </n-element>
        </div>
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
    <div class="ml-auto d-flex a-center j-center" id="refresh-btn">
      <n-spin :show="refreshing" size="tiny">
        <n-button @click="refresh" size="tiny">
          <template #icon>
            <n-icon>
              <refresh-icon />
            </n-icon>
          </template>
          刷新
        </n-button>
      </n-spin>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeftRound as LeftIcon,
  ChevronRightRound as RightIcon,
  RefreshRound as RefreshIcon,
  CloseOutlined as CloseIcon,
} from '@vicons/material'
import { NIcon, NSpin, NButton, NElement } from 'naive-ui'
import { ref, inject, watch, nextTick, onMounted,onUnmounted } from 'vue'
const history = inject('history')
const tabBarWidth = ref(0)
const arrowWidth = ref(0)
watch(
  history.value,
  () => {
    updateTabBar()
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('resize', updateTabBar)
})

onUnmounted(()=>{
  window.removeEventListener('resize', updateTabBar)
})

function updateTabBar() {
  nextTick(() => {
    tabBarWidth.value = 0
    let tabs = document.querySelectorAll('.tab-box')
    tabs.forEach((tab) => {
      tabBarWidth.value += tab.getBoundingClientRect().width
    })
    let tabBarWrapperWidth = document
      .getElementById('tab-wrapper')
      .getBoundingClientRect().width
    if (tabBarWidth.value > tabBarWrapperWidth) {
      arrowWidth.value = 30
      setTimeout(() => {
        onRight()
      }, 350)
    } else {
      arrowWidth.value = 0
      setTimeout(() => {
        onLeft()
      }, 350)
    }
  })
}

function getShift() {
  let tabBarWrapperWidth = document
    .getElementById('tab-wrapper')
    .getBoundingClientRect().width
  return tabBarWrapperWidth - tabBarWidth.value - 2
}

const onLeft = () => {
  let tabBar = document.getElementById('tab-bar')
  tabBar.style.setProperty('left', `2px`, 'important')
}
const onRight = () => {
  let tabBar = document.getElementById('tab-bar')
  const shift = getShift()
  tabBar.style.setProperty('left', `${shift}px`, 'important')
}

const refreshing = ref(false)
const emit = defineEmits(['gotoTab', 'deleteTab', 'refreshPage'])

const gotoTab = (name) => {
  history.value.length > 1 ? emit('gotoTab', name) : refresh()
}
const deleteTab = (name, ifCurrent) => {
  emit('deleteTab', { name, ifCurrent })
}

const refresh = () => {
  refreshing.value = true
  emit('refreshPage')
  setTimeout(() => {
    refreshing.value = false
  }, 500)
}
</script>

<style scoped>
.handle-bar {
  border-bottom: 1px solid var(--border-color);
  padding-right: 10px;
  position: relative;
  height: 34px;
}

#left-arrow {
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  width: 30px;
  box-shadow: inset -12px 0 8px -14px rgba(0, 0, 0, 0.18);
  background-color: var(--tag-color);
  transition: all 0.1s ease;
}

#right-arrow {
  margin-right: 10px;
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
  padding: 0 4px;
  overflow: hidden;
  position: relative;
  flex: 1;
}
#tab-bar {
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
}
.tab-box {
  flex-shrink: 0;
}
.tab {
  margin: 0 2px;
  user-select: none;
  font-size: 12px;
  border-radius: 2px;
  color: var(--text-color);
  background-color: var(--divider-color);
}
.tab.tab-current {
  color: var(--base-color);
  background-color: var(--primary-color);
}
.tab-text {
  height: 22px;
  padding: 0 5px 0 5px;
  border-radius: 2px 0 0 2px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.1s ease;
}

.tab .tab-text:hover {
  color: var(--base-color);
  background-color: var(--primary-color);
  transition: all 0.1s ease;
}
.tab-current .tab-text:hover {
  background-color: var(--primary-color-pressed);
  transition: all 0.1s ease;
}
.close-btn {
  height: 22px;
  width: 22px;
  border-radius: 0 2px 2px 0;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.1s ease;
}

.tab .close-btn:hover {
  color: var(--base-color);
  background-color: var(--primary-color);
  transition: all 0.1s ease;
}
.tab-current .close-btn:hover {
  background-color: var(--primary-color-pressed);
  transition: all 0.1s ease;
}
#refresh-btn {
  right: 24px;
  height: 100%;
  padding-top: 1px;
}
</style>
