<template>
  <div class="wrapper-404">
    <div
      style="font-size: 100px; text-align: center; line-height: 0; color: #333"
    >
      404
    </div>
    <div class="animation"></div>
    <div class="d-flex a-center j-center">
      <n-button type="info" size="large" @click="backToHome">回到主页</n-button>
    </div>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()
const backToHome = () => {
  router.push({
    name: 'Home',
  })
}
</script>

<style scoped>
.wrapper-404 {
  background-color: white;
  min-height: 100vh;
  padding-top: 180px;
  box-sizing: border-box;
}
.animation {
  background-image: url('../assets/images/404.gif');
  height: 400px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
