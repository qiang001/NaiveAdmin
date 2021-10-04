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

<script setup>
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
import { useStore } from 'vuex'
const store = useStore()
// 本地持久化
onMounted(() => {
  const themeSetting = localStorage.getItem('themeSetting')
  if (themeSetting) {
    let { _mainColor, _ifDark } = JSON.parse(themeSetting)
    store.commit('SET_MAINCOLOR', _mainColor)
    store.commit('SET_IFDARK', _ifDark)
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const themeSetting = {
        _mainColor: store.state.mainColor,
        _ifDark: store.state.ifDark,
      }
      localStorage.setItem('themeSetting', JSON.stringify(themeSetting))
    }
  })
})
</script>

<style>
@import url('./styles/index.css');
</style>
