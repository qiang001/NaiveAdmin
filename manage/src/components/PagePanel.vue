<template>
  <div
    style="width: 100%"
    class="page-panel"
    id="page-panel"
    :class="`${store.state.ifDark ? 'page-panel-dark' : 'page-panel-light'}`"
  >
    <div class="title" v-if="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
import { toRefs, watch, inject } from 'vue'

const props = defineProps({
  title: String,
  ifExpand:{
    type:Boolean,
    default:true
  }
})
const { title,ifExpand } = toRefs(props)

import { useResizeContainer } from '../hooks/useResizeContainer'
const { width, height, container } = useResizeContainer('page-panel')

const ifFullpage = inject('ifFullpage')
const emit = defineEmits(['resize'])

watch(height, () => {
  let otherHeight = 147
  if (ifFullpage.value) {
    otherHeight -= 64
  }
  setTimeout(() => {
    container.value.style.setProperty(
      'min-height',
      `calc(100vh - ${otherHeight}px)`
    )
    if(!ifExpand.value){
      container.value.style.setProperty(
      'max-height',
      `calc(100vh - ${otherHeight}px)`
    )
    }
  })
  emit('resize', { width: width.value, height: height.value })
},{ immediate: true })

watch(width, () => {
  emit('resize', { width: width.value, height: height.value })
},{ immediate: true })
</script>

<style scoped>
.page-panel {
  min-height: calc(100vh - 147px);
  /* max-height: calc(100vh - 147px); */
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
  font-size: 18px;
  padding: 2px 10px;
  background: #333333;
  color: #f8f8f8;
  position: absolute;
  /* padding-left: 15px; */
  left: -9px;
  top: -9px;
  border-radius: 2px 0 2px 0;
}
.title:before {
  content: '';
  width: 0px;
  height: 0px;
  border-bottom: 6px solid transparent;
  border-right: 9px solid #4b4b4b;
  position: absolute;
  bottom: -6px;
  left: 0;
}

.title:after {
  content: '';
  width: 0px;
  height: 0px;
  border-top: 9px solid transparent;
  border-left: 9px solid #4b4b4b;
  position: absolute;
  top: 0;
  right: -9px;
}
</style>
