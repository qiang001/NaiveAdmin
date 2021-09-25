<template>
  <div class="wrapper-404 d-flex a-center j-center">
    <n-button type="primary" @click="backToHome">立即登录</n-button>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()
const backToHome = () => {
  router.push({
    path: '/',
  })
}
</script>

<style scoped>
.wrapper-404 {
  background-color: white;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
