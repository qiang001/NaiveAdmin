<template>
  <div
    style="width: 100%"
    class="page-panel"
    id="page-panel"
    :class="`${store.state.ifDark ? 'page-panel-dark' : 'page-panel-light'}`"
    :style="`${store.state.ifPageTitle ? 'padding-top:35px' : ''}`"
  >
    <transition name="slide" mode="out-in">
      <div class="title" v-if="title && store.state.ifPageTitle">
        {{ title }}
      </div>
    </transition>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/hooks/useStore'
const store = useStore()
import { toRefs, watchEffect, inject, Ref } from 'vue'
import type { PropType } from '@vue/runtime-core'
const props = defineProps({
  title: String as PropType<string>,
  allowExpand: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})
const { title, allowExpand } = toRefs(props)

import { useResizeContainer } from '../hooks/useResizeContainer'
const { width, height, container } = useResizeContainer('page-panel')

const ifFullpage = inject('ifFullpage') as Ref<boolean>
const setHeight = (key: string, val: number) => {
  container.value.style.setProperty(key, `calc(100vh - ${val}px)`)
}

const emit = defineEmits(['resize'])
watchEffect(() => {
  let otherHeight = 120
  if (ifFullpage.value) {
    otherHeight -= 64
  }
  if (container.value) {
    setTimeout(() => {
      setHeight('min-height', otherHeight)
      if (!allowExpand.value) {
        setHeight('max-height', otherHeight)
      }
    })
    emit('resize', { width: width.value, height: height.value })
  }
})
</script>

<style scoped>
.page-panel {
  min-height: calc(100vh - 120px);
  /* max-height: calc(100vh - 120px); */
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  transition: all 0.3s ease;
}
.page-panel-light {
  background: white;
  box-shadow: 0 0 30px #eee;
}
.page-panel-dark {
  background: #ffffff08;
  box-shadow: 0 0 30px #00000070;
}
.title {
  font-family: Youshe Biaotihei;
  font-size: 14px;
  padding: 0 10px;
  background: #333333;
  color: #f8f8f8;
  position: absolute;
  /* padding-left: 15px; */
  left: -5px;
  top: -5px;
  border-radius: 2px 0 2px 0;
}
.title:before {
  content: '';
  width: 0px;
  height: 0px;
  border-bottom: 4px solid transparent;
  border-right: 5px solid #4b4b4b;
  position: absolute;
  bottom: -4px;
  left: 0;
}

.title:after {
  content: '';
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-left: 5px solid #4b4b4b;
  position: absolute;
  top: 0;
  right: -5px;
}

/* slide transitions */
.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
