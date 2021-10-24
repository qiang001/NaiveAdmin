<template>
  <n-layout>
    <n-layout-content>
      <div class="wrapper-404">
        <div style="flex: 1">
          <div class="view d-flex a-center j-center">
            <img
              v-if="!store.state.ifDark"
              src="../assets/images/404.svg"
              alt=""
              style="width: 100%"
            />
            <img
              v-else
              src="../assets/images/404-white.svg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div class="d-flex a-center j-center">
            <n-button
              v-if="store.state.token"
              type="primary"
              size="large"
              @click="backToHome"
              >回到主页
            </n-button>
            <n-button v-else type="primary" size="large" @click="goToLogin"
              >去登陆
            </n-button>
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NButton } from 'naive-ui'
import {useStore} from '@/hooks/useStore'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const backToHome = () => {
  router.push({
    name: 'Home',
  })
}
const goToLogin = () => {
  store.commit('SET_LOGIN_MESSAGE', {
    type: 'success',
    text: '欢迎光临，赶快立即登录体验吧！',
  })
  router.push({
    name: 'Login',
  })
}
</script>

<style scoped>
.wrapper-404 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.view {
  width: 100%;
  min-width: 240px;
  max-width: 520px;
  margin: 0 auto;
}
</style>
