<template>
  <n-config-provider
    :theme="store.getters.getTheme.theme"
    :theme-overrides="store.getters.getTheme.overrides"
    :locale="zhCN"
  >
    <!-- <n-theme-editor> -->
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <router-view></router-view>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <!-- </n-theme-editor> -->
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NThemeEditor,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  zhCN,
} from 'naive-ui'
import { onMounted } from 'vue'
import { useStore } from '@/hooks/useStore'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  // 本地初始化化加载
  const systemSetting = localStorage.getItem('systemSetting')
  if (systemSetting) {
    let { _mainColor, _ifDark, _ifPageTitle } = JSON.parse(systemSetting)
    store.commit('SET_MAINCOLOR', _mainColor)
    store.commit('SET_IFDARK', _ifDark)
    store.commit('SET_IFPAGETITLE', _ifPageTitle)
  }
  // 刷新自动登录
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch('refreshLogin', token)
  } else {
    store.commit('SET_TOKEN', '')
    store.commit('SET_AUTH', [])
    store.commit('SET_PERMISSION', { contentAuths: [], logicAuths: [] })
    store.commit('SET_LOGIN_MESSAGE', {
      type: 'success',
      text: '欢迎光临，赶快立即登录体验吧！',
    })
    router.replace('/login')
  }
  // 本地持久化存储
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const systemSetting = {
        _mainColor: store.state.mainColor,
        _ifDark: store.state.ifDark,
        _ifPageTitle: store.state.ifPageTitle,
      }
      localStorage.setItem('systemSetting', JSON.stringify(systemSetting))
      // token
      localStorage.setItem('token', store.state.token)
    }
  })
})
</script>

<style>
@import url('./styles/index.css');
</style>
