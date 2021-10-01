<template>
  <common-modal
    :showModal="editModal"
    :title="ifEdit ? '编辑角色' : '添加新角色'"
    cancelBtnText="取消"
    :confirmBtnText="ifEdit ? '确认保存' : '确认添加'"
    :confirmLoading="confirmLoading"
    @cancel="cancel"
    @confirm="confirm"
  >
    <n-form
      label-placement="left"
      :label-width="80"
      :model="role"
      :rules="rules"
      ref="formRef"
    >
      <n-form-item label="角色名称" path="name" rule-path="role.name">
        <n-input v-model:value="role.name" placeholder="输入名称" />
      </n-form-item>
      <n-form-item label="描述" path="desc" rule-path="role.desc">
        <n-input v-model:value="role.desc" placeholder="输入描述" />
      </n-form-item>
    </n-form>
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
        <n-result
          status="403"
          title="还没做"
          description="不隐藏, 但是点击或触发后会提示"
        >
        </n-result>
      </n-tab-pane>
    </n-tabs>
  </common-modal>
</template>

<script setup>
import CommonModal from '@/components/CommonModal.vue'
import { ref, inject, watch, unref } from 'vue'
import {
  NInput,
  NTree,
  NTabs,
  NTabPane,
  NResult,
  NForm,
  NFormItem
} from 'naive-ui'

// 注入状态数据以进行 UI渲染 UX交互
const ifEdit = inject('ifEdit')
const editModal = inject('editModal')
const confirmLoading = inject('confirmLoading')
const role = inject('role')

// 表单相关
const formRef = ref(null)
const rules = {
  role: {
    name: {
      required: true,
      message: '请输入名称',
      trigger: ['input', 'blur'],
    },
    desc: {
      required: true,
      message: '请输入描述',
      trigger: ['input', 'blur'],
    },
  },
}
const validation = () => {
  return new Promise((res) => {
    formRef.value.validate((errors) => {
      if (!errors) {
        res(true)
      } else {
        console.log(errors)
        res(false)
      }
    })
  })
}

// 菜单权限树相关
const getMenuAuthTree = inject('getMenuAuthTree')
const menuAuthTree = ref(getMenuAuthTree)
const checkedKeys = ref([])

const hideAuthKeys = inject('getHideAuthKeys')

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

const getAuthKeys = () => {
  let authKeys = unref(checkedKeys)
  addNodes(unref(menuAuthTree))
  return {
    authKeys,
    checkedKeys: [...unref(checkedKeys)],
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
watch(editModal, (val) => {
  if (val) {
    updateCheckedKeys(role.tags)
  }
})

// 暴露事件
const emit = defineEmits(['cancel', 'confirm'])
const cancel = () => {
  emit('cancel')
}

const confirm = async () => {
  const ifValid = await validation()
  if (!ifValid) {
    return
  }
  const authKeys = getAuthKeys()
  emit('confirm', authKeys)
}
</script>

<style scoped>
.close-btn {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transform: rotate(0);
  transition: all 0.5s ease;
}
.close-btn:hover {
  background-color: var(--border-color);
  transform: rotate(180deg);
  transition: all 0.5s ease;
}
</style>
