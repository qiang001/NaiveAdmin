<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
  <!-- <router-view></router-view> -->
</template>

<script setup></script>

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
