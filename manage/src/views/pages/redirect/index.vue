<template>
  <page-panel></page-panel>
</template>

<script setup>
// 神坑之有动画的路由这个页面必须如上 template 底下必须有且仅有一个根节点，注释都不能加
import PagePanel from '@/components/PagePanel.vue'
import { unref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { currentRoute, replace } = router
const { query } = unref(currentRoute)
const { targetPath, targetQuery } = query
const queryObject = {}
targetQuery
  .split('!@#$')
  .filter((q) => q)
  .forEach((q) => {
    let key = q.split('=')[0]
    let val = q.split('=')[1]
    queryObject[key] = val
  })
replace({ path: targetPath, query: queryObject })
</script>

<style scoped></style>
