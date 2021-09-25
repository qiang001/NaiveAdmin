<template>
  <n-menu
    :options="menu"
    :value="defaultMenu"
    :on-update:value="handleSelected"
    :expanded-keys="expandedKeys"
    :on-update:expanded-keys="handleExpanded"
  />
</template>

<script setup>
import { NMenu } from 'naive-ui'
import { ref, computed, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const defaultMenu = computed(() => route.meta.menuKey)
const expandedKeys = ref(route.meta.expandedKey.split(','))
watch(
  () => route.name,
  () => {
    expandedKeys.value = route.meta.expandedKey.split(',')
  }
)

import { useStore } from 'vuex'
const store = useStore()
const menu = computed(() => store.getters.getMenu)
const keyMap = computed(() => {
  let list = []
  return buildKeyMap(menu.value)
  function buildKeyMap(arr) {
    arr.forEach((item) => {
      let { key, expandedKey, children } = item
      list = [...list, { key, expandedKey }]
      if (children) {
        buildKeyMap(children)
      }
    })
    return list
  }
})

const handleExpanded = (keys) => {
  let val = keys.reverse()[0]
  if (val) {
    let obj = keyMap.value.find((v) => v.key == val)
    expandedKeys.value = obj.expandedKey
      .split(',')
      .filter((v) => keys.some((k) => k == v))
  } else {
    expandedKeys.value = []
  }
}

const router = useRouter()
const handleSelected = (key) => {
  try {
    router.push({
      name: key,
    })
  } catch (error) {
    router.push({
      name: '404',
    })
  }
}
</script>

<style scoped>
.main {
  top: 64px !important;
}
</style>
