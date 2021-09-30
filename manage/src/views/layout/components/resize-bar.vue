<template>
  <div
    class="handle-bar"
    @mousedown="mouseDown"
    unselectable="on"
    onselectstart="return false"
  ></div>
</template>

<script setup>
const emit = defineEmits(['widthChange'])

import { ref, onMounted, inject } from 'vue'

const lastX = ref(null)
const lastWidth = ref(null)
const sectionWidth = inject('sectionWidth')
const widthSpan = inject('widthSpan')

const mouseDown = (event) => {
  lastX.value = event.screenX
  lastWidth.value = sectionWidth.value
  document.addEventListener('mousemove', mouseMove)
}

const mouseMove = (event) => {
  const movement = event.screenX - lastX.value
  console.log(movement)
  let width = lastWidth.value + movement
  if (width < widthSpan.min) {
    width = widthSpan.min
  }
  if (width > widthSpan.max) {
    width = widthSpan.max
  }
  emit('widthChange', width)
}

const mouseUp = () => {
  lastX.value = null
  lastWidth.value = null
  document.removeEventListener('mousemove', mouseMove)
}

onMounted(() => {
  document.addEventListener('mouseup', mouseUp)
})
</script>

<style scoped>
.handle-bar {
  cursor: col-resize;
  width: 5px;
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
