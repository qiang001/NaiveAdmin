<template>
  <n-element class="my-dropdown">
    <n-button size="small" :text="true" @click="triggerDropdown">
      <template #icon>
        <slot name="icon"></slot>
      </template>
    </n-button>
    <transition name="slide-left" mode="out-in">
      <div class="my-dropdown-content" id="myDropdown" v-if="dropdownShow">
        <slot name="content"></slot>
      </div>
    </transition>
  </n-element>
</template>

<script setup lang="ts">
import { NElement, NButton } from 'naive-ui'
import { ref } from 'vue'
const dropdownShow = ref(false)
const triggerDropdown = () => (dropdownShow.value = !dropdownShow.value)
</script>

<style scoped>
.my-dropdown {
  position: relative;
}
.my-dropdown-content {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 24px;
  border-radius: 2px;
  padding: 5px 10px;
  background-color: var(--modal-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-left-enter-active {
  transition: all 0.3s ease;
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.slide-left-leave-active {
  transition: all 0.3s ease;
}
</style>
