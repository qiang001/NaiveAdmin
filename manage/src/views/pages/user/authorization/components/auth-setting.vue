<template>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card :style="`max-width: 600px;`">
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
          <n-result
            status="404"
            title="还没做"
            description="应该是隐藏相关信息"
          >
          </n-result>
        </n-tab-pane>
        <n-tab-pane name="operation" tab="(按钮)操作级权限">
          <n-result
            status="403"
            title="还没做"
            description="不隐藏, 但是点击或触发后会提示"
          >
          </n-result>
        </n-tab-pane>
      </n-tabs>
      <template #action>
        <div class="d-flex a-center j-center pt-auto">
          <n-space>
            <n-button @click="cancel" size="small">取消</n-button>
            <n-button @click="save" type="primary" size="small"
              >保存当前设置</n-button
            >
          </n-space>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import {
  NTree,
  NButton,
  NTabs,
  NTabPane,
  NResult,
  NModal,
  NCard,
  NSpace,
} from 'naive-ui'

// 页面核心数据
const showModal = inject('authSettingModal')
const getMenuAuthTree = inject('getMenuAuthTree')
const menuAuthTree = ref(getMenuAuthTree)
const checkedKeys = ref([])

// 临时数据
const hideAuthKeys = inject('getHideAuthKeys')

// 核心方法
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
  return {
    authKeys,
    checkedKeys:Array.from(checkedKeys.value)
  }

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

// 数据重载
watch(showModal, (val) => {
  if (val) {
    updateCheckedKeys([])
  }
})

// 暴露事件
const emit = defineEmits(['cancel', 'save'])
const cancel = () => {
  emit('cancel')
}

const save = () => {
  const authKeys = saveAuthKeys()
  emit('save', authKeys)
}
</script>

<style scoped></style>
