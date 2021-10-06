<template>
  <div>
    <n-element
      tag="div"
      class="resize-bar"
      @mousedown="mouseDown"
      unselectable="on"
      onselectstart="return false"
    ></n-element>
  </div>
</template>

<script setup>
import { NElement } from 'naive-ui'
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

onMounted(() => {
  document.addEventListener('mouseup', mouseUp)
})

const emit = defineEmits(['widthChange','widthChangeDone'])

const mouseMove = (event) => {
  const movement = event.screenX - lastX.value
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
  emit('widthChangeDone')
}
</script>

<style scoped>
.resize-bar {
  cursor: col-resize;
  width: 3px;
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  transition: all 0.3s ease;
}
.resize-bar:hover {
  background-color: var(--primary-color);
  transition: all 0.3s ease;
}

</style>
