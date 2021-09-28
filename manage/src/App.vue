<template>
  <n-config-provider
    :theme="store.getters.getTheme.theme"
    :theme-overrides="store.getters.getTheme.overrides"
    :locale="zhCN"
  >
    <!-- <n-theme-editor> -->
      <n-loading-bar-provider>
        <router-view></router-view>
      </n-loading-bar-provider>
    <!-- </n-theme-editor> -->
    <n-global-style />
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NGlobalStyle, NThemeEditor,NLoadingBarProvider, zhCN } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()

</script>

<style>
@import url('./styles/index.css');
</style>
