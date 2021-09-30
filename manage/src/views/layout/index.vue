<template>
  <n-layout position="absolute">
    <Header></Header>
    <n-layout position="absolute" class="main" has-sider>
      <n-layout-sider
        bordered
        show-trigger="bar"
        collapse-mode="width"
        :collapsed-width="0"
        :width="sectionWidth"
        :inverted="outInverted"
        :native-scrollbar="false"
      >
        <Menu @invertedChange="invertedChange"></Menu>
        <resize-bar @widthChange="widthChange"></resize-bar>
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false">
        <n-layout-header class="handle-bar-wrapper" v-if="route.name!='Layout'">
          <handle-bar @refreshPage="refreshRoute"></handle-bar>
        </n-layout-header>
        <n-layout-content
          :native-scrollbar="false"
          embedded
          :content-style="`${route.name!='Layout'?'padding: 24px;':''}`"
        >
          <Page></Page>
        </n-layout-content>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { provide, readonly, unref } from 'vue'
import { initController } from './initController'
const { outInverted, invertedChange, widthSpan, sectionWidth, widthChange } =
  initController()

import Header from './components/header/index.vue'

import Menu from './components/menu.vue'

import ResizeBar from './components/resize-bar.vue'
provide('sectionWidth', readonly(sectionWidth))
provide('widthSpan', readonly(widthSpan))

import HandleBar from './components/handle-bar.vue'

import Page from './components/page.vue'

import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  useLoadingBar,
} from 'naive-ui'
import { useRouter,useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const loadingBar = useLoadingBar()
router.beforeEach((to, from, next) => {
  loadingBar.start()
  next()
})
router.afterEach((to, from, failure) => {
  failure ? loadingBar.error() : loadingBar.finish()
})
const refreshRoute = () => {
  router.push({
    name: 'Redirect',
    query: getTarget(),
  })
  function getTarget() {
    const { currentRoute } = router
    const { path, query } = unref(currentRoute)
    let obj = {
      targetPath: path,
      targetQuery: '',
    }
    let queryString = ''
    Object.keys(query).forEach((key) => {
      queryString += `!@#$${key}=${query[key]}`
    })
    if (queryString) {
      obj.targetQuery = queryString
    }
    return obj
  }
}
</script>

<style scoped>
.main {
  top: 64px !important;
}
.handle-bar-wrapper {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
