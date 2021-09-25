<template>
  <n-config-provider
    :theme="store.getters.getTheme.theme"
    :theme-overrides="store.getters.getTheme.themeOverrides"
    :locale="zhCN"
  >
    <n-theme-editor>
      <router-view></router-view>
    </n-theme-editor>
    <n-global-style />
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NGlobalStyle, NThemeEditor, zhCN } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()
</script>

<style>
@import url('./styles/index.css');
</style>
