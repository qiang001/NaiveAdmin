<template>
  <div>
    <n-menu
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
        :class="`${store.state.ifDark ? 'invert-control-dark' : (inverted?'invert-control-mix':'invert-control-light')}`"
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
const emit = defineEmits(['invertedChange'])

// 基本 Naive UI
import { NMenu, NSwitch, NSpace } from 'naive-ui'

// 基本 Vue API
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 渲染菜单
const inverted = ref(false)
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

// 初始化菜单状态并配合当前路由实时选中、展开
const defaultMenu = computed(() => route.meta.menuKey)
const expandedKeys = ref(route.meta.expandedKey.split(','))
watch(
  () => route.name,
  () => {
    expandedKeys.value = route.meta.expandedKey.split(',')
  }
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

// 菜单选中
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
// 通知外部改样式
const invertedChange = (val) => {
  inverted.value = val
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
