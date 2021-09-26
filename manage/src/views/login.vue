<template>
  <div class="wrapper-404 d-flex a-center j-center">
    <n-button type="primary" size="large" @click="login">立即登录</n-button>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()
const login = () => {
  store.dispatch('login',{})
}
</script>

<style scoped>
.wrapper-404 {
  background-color: white;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
