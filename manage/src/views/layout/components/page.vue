<template>
  <router-view v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <keep-alive :include="store.getters.getCacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useStore } from '@/hooks/useStore'
const store = useStore()
</script>

<style scoped>
/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.route-enter-active {
  transition: all 0.3s ease;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.route-leave-active {
  transition: all 0.3s ease;
}
</style>
