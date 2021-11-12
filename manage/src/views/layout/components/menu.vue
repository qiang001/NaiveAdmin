<template>
  <n-element>
    <div class="quick-search" v-if="!collapsed">
      <n-auto-complete
        :options="options"
        v-model:value="keyword"
        placeholder="快捷搜索"
        clear-after-select
        blur-after-select
        clearable
        :on-select="handleSelected"
      />
    </div>
    <n-menu
      :root-indent="18"
      :indent="24"
      :collapsed-width="48"
      :collapsed="collapsed"
      :inverted="inverted"
      :options="menu"
      :value="defaultMenu"
      :on-update:value="handleSelected"
      :expanded-keys="expandedKeys"
      :on-update:expanded-keys="handleExpanded"
    />
  </n-element>
</template>

<script setup lang="ts">
import { NElement, NMenu, NAutoComplete, useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()
import { ref, computed, watch, inject, Ref } from 'vue'

import { useStore } from '@/hooks/useStore'
const store = useStore()

import { useRoute } from 'vue-router'
const route = useRoute()

// 快捷搜索
import { ISearchOption } from '@/authorization'
const keyword = ref('')
const options = computed(() => {
  return fuzzyQuery(store.getters.getSearchOptions, keyword.value)
  function fuzzyQuery(list: Array<ISearchOption>, keyWord: string) {
    if (!keyWord) {
      return []
    }
    keyWord = keyWord.replace(/\s*/g, '').toLowerCase()
    var arr = []
    for (var i = 0; i < list.length; i++) {
      if (
        list[i].label.match(keyWord) != null ||
        list[i].labelPinYin.match(keyWord) != null
      ) {
        arr.push(list[i])
      }
    }
    return arr
  }
})

// 渲染菜单
const inverted = inject('inverted') as Ref<boolean>
const collapsed = inject('collapsed') as Ref<boolean>
const ifHideIcon = inject('ifHideIcon') as Ref<boolean>
import { IMenuItem } from '@/authorization'
const menu = computed(() => store.getters.getMenu(ifHideIcon.value))

// 拍平菜单
const keyMap = computed(() => {
  let list = []
  return buildKeyMap(menu.value)
  function buildKeyMap(arr: Array<IMenuItem>) {
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

// 初始化菜单状态并配合当前路由实时选中、展开、修改网页标题
const defaultMenu = computed(() => route.meta.menuKey as string)
const expandedKeys = ref((route.meta.expandedKey as string).split(','))
watch(
  () => route.name,
  () => {
    document.title =
      route.meta.label + ' - 通用后台管理系统 Common Content Manage System'
    if (route.name != 'Redirect') {
      expandedKeys.value = (route.meta.expandedKey as string).split(',')
    }
  },
  { immediate: true }
)

// 菜单展开
const handleExpanded = (keys: string[]) => {
  let val = keys.reverse()[0]
  if (val) {
    let obj = keyMap.value.find((v) => v.key == val)
    expandedKeys.value = obj.expandedKey
      .split(',')
      .filter((v: string) => keys.some((k) => k == v))
  } else {
    expandedKeys.value = []
  }
}

const emit = defineEmits(['navigateTo'])
// 菜单选中
const handleSelected = (key: string) => {
  emit('navigateTo', {
    name: key,
    ifCurrent: key == route.name && Object.keys(route.query).length == 0,
  })
}

// vue3.2新特性 v-bind style 解决在框架主题限制下的自定义样式痛点
const activeBarColor = computed(() =>
  inverted.value ? 'transparent' : themeVars.value.primaryColor
)
</script>

<style scoped>
.quick-search {
  padding: 18px;
}
.n-menu {
  margin-top: -6px;
}
:deep(.n-menu .n-menu-item::before) {
  left: 0;
  right: 0;
  border-radius: 0;
  border-right: 3px solid transparent;
  transition: all 0.3s var(--bezier);
}
:deep(.n-menu .n-menu-item.n-menu-item--selected::before) {
  border-right: 3px solid v-bind(activeBarColor);
}
</style>
