<template>
  <div>
    <div class="p-1">
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
      :collapsed="collapsed"
      :inverted="inverted"
      :options="menu"
      :value="defaultMenu"
      :on-update:value="handleSelected"
      :expanded-keys="expandedKeys"
      :on-update:expanded-keys="handleExpanded"
    />
    <div class="p-1">
      <div
        class="invert-control d-flex a-center j-center p-2"
        :class="`${
          store.state.ifDark
            ? 'invert-control-dark'
            : inverted
            ? 'invert-control-mix'
            : 'invert-control-light'
        }`"
      >
        <n-space vertical>
          <n-switch
            v-model:value="inverted"
            :on-update:value="invertedChange"
            size="small"
          >
            <template #checked>
              <span style="font-size: 12px">点击换回浅色</span>
            </template>
            <template #unchecked>
              <span style="font-size: 12px">点击切为深色</span>
            </template>
          </n-switch>
          <n-switch v-model:value="ifHideIcon" size="small">
            <template #checked>
              <span style="font-size: 12px">点击显示图标</span>
            </template>
            <template #unchecked>
              <span style="font-size: 12px">点击隐藏图标</span>
            </template>
          </n-switch>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NMenu, NSwitch, NSpace, NAutoComplete } from 'naive-ui'

import { ref, computed, watch, inject } from 'vue'

// 注入公共数据
const store = inject('store')
const route = inject('route')

// 快捷搜索
const keyword = ref('')
const options = computed(() => {
  return fuzzyQuery(store.getters.getSearchOptions, keyword.value)
  function fuzzyQuery(list, keyWord) {
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
const inverted = inject('inverted')
const collapsed = inject('collapsed')
const ifHideIcon = ref(false)
const menu = computed(() => store.getters.getMenu(ifHideIcon.value))

// 拍平菜单
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

// 初始化菜单状态并配合当前路由实时选中、展开、修改网页标题
const defaultMenu = computed(() => route.meta.menuKey)
const expandedKeys = ref(route.meta.expandedKey.split(','))
watch(
  () => route.name,
  () => {
    document.title =
      route.meta.label + ' - 通用后台管理系统 Common Content Manage System'
    if (route.name != 'Redirect') {
      expandedKeys.value = route.meta.expandedKey.split(',')
    }
  },
  { immediate: true }
)

// 菜单展开
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

const emit = defineEmits(['navigateTo', 'invertedChange'])
// 菜单选中
const handleSelected = (key) => {
  emit('navigateTo', { name: key, ifCurrent: key == route.name })
}
// 通知外部改样式
const invertedChange = (val) => {
  emit('invertedChange', val)
}
</script>

<style scoped>
.invert-control {
  border-radius: 2px;
}
.invert-control-dark {
  background-color: #0e0e11;
}
.invert-control-mix {
  background-color: #ffffff0f;
}
.invert-control-light {
  background-color: #f7f7f9;
}
</style>
