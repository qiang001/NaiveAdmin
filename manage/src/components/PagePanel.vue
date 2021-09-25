<template>
  <div
    style="width: 100%"
    :class="`${store.state.ifDark ? 'page-panel-dark' : 'page-panel-light'}`"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>

<style scoped>
.page-panel-light,
.page-panel-dark {
  min-height: calc(100vh - 112px);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 2px;
}
.page-panel-light {
  background: white;
  box-shadow: 0 0 30px #eee;
}
.page-panel-dark {
  background: #ffffff08;
  box-shadow: 0 0 30px #00000070;
}
</style>
