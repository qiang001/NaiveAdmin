<template>
  <n-layout>
    <n-layout-content>
      <div class="wrapper-404">
          <div class="view d-flex a-center j-center">
            <img v-if="!store.state.ifDark" src="../assets/images/404.svg" alt="" style="width: 100%" />
            <img v-else src="../assets/images/404-white.svg" alt="" style="width: 100%" />
          </div>
          <div class="d-flex a-center j-center">
            <n-button
              type="primary"
              size="large"
              @click="backToHome"
              >回到主页
            </n-button>
          </div>
        </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutContent, NButton } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const backToHome = () => {
  router.push({
    name: 'Home',
  })
}
</script>

<style scoped>

.view {
  width: 100%;
  min-width: 240px;
  max-width: 520px;
  margin: 0 auto;
}

</style>
