<template>
  <div></div>
</template>

<script setup>
// 神坑之有动画的路由这个页面必须如上 template 不能少 div 也不能加注释
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
