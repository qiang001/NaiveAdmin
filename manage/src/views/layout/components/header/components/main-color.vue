<template>
  <n-space>
    <div v-for="(color, index) in colors" :key="color.name">
      <n-popover trigger="hover">
        <template #trigger>
          <div
            class="color-box"
            :style="{ backgroundColor: color.common.primaryColor }"
            @click="store.commit('SET_MAINCOLOR', color.key)"
          ></div>
        </template>
        <span>{{ color.name }}</span>
      </n-popover>
    </div>
  </n-space>
</template>

<script setup>
import { NSpace, NPopover } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()
const colors = store.getters.getMainColors
</script>

<style scoped>
.color-box {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.color-box:hover {
  transform: translateY(-1px);
  transition: all 0.3s ease;
}
</style>
