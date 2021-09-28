<template>
  <n-card title="权限设置" style="margin-bottom: 16px; margin-top: 16px">
    <template #header-extra>
      <n-button @click="saveAuthKeys" type="primary" size="small"
        >保存当前设置</n-button
      >
    </template>
    <n-tabs type="line">
      <n-tab-pane name="menu" tab="菜单页面级权限">
        <div>
          <n-tree
            block-line
            cascade
            checkable
            :data="menuAuthTree"
            :checked-keys="checkedKeys"
            @update:checked-keys="updateCheckedKeys"
          />
        </div>
      </n-tab-pane>
      <n-tab-pane name="content" tab="内容显示级权限">
        <n-result status="404" title="还没做" description="应该是隐藏相关信息">
        </n-result>
      </n-tab-pane>
      <n-tab-pane name="operation" tab="(按钮)操作级权限">
        <n-result status="403" title="还没做" description="不隐藏, 但是点击或触发后会提示">
        </n-result>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
const emit = defineEmits(['changeAuthKeys'])
import { NTree, NButton, NCard, NTabs, NTabPane, NResult } from 'naive-ui'
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
const menuAuthTree = ref(store.getters.getMenuAuthTree)
const hideAuthKeys = store.getters.getHideAuthKeys
const checkedKeys = ref([])

const updateCheckedKeys = (keys) => {
  checkedKeys.value = keys
  let relatedKeys = []
  keys.forEach((k) => {
    let hide = hideAuthKeys.find((hk) => k == hk.name)
    if (hide && !relatedKeys.includes(hide.belongsTo)) {
      relatedKeys = [...relatedKeys, hide.belongsTo]
    }
  })
  relatedKeys.forEach((key) => {
    if (!checkedKeys.value.includes(key)) {
      checkedKeys.value = [...keys, key]
    }
  })

  banNode(menuAuthTree.value)
  function banNode(arr) {
    arr.forEach((item) => {
      item.disabled = relatedKeys.includes(item.key)
      if (item.children) {
        banNode(item.children)
      }
    })
  }
}

const saveAuthKeys = () => {
  let authKeys = Array.from(checkedKeys.value)
  addNodes(Array.from(menuAuthTree.value))
  emit('changeAuthKeys', authKeys)

  function addNodes(children) {
    children.forEach((child) => {
      if (authKeys.includes(child.key)) {
        child.expandedKey.split(',').forEach((node) => {
          if (node && !authKeys.includes(node)) {
            authKeys = [...authKeys, node]
          }
        })
      }
      if (child.children) {
        addNodes(child.children)
      }
    })
  }
}
</script>

<style scoped></style>
