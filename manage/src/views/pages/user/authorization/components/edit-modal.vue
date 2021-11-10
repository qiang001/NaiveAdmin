<template>
  <common-modal
    :showModal="editModal"
    :title="editModalType === 'edit' ? '编辑角色' : '添加新角色'"
    cancelBtnText="取消"
    :confirmBtnText="editModalType === 'edit' ? '确认保存' : '确认添加'"
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
        <div class="my-3">
          <n-collapse
            :default-expanded-names="contentPermission.map((item) => item.name)"
          >
            <n-collapse-item
              :title="item.title"
              :name="item.name"
              v-for="(item, index) in contentPermission"
              :key="item.page"
            >
              <div>
                <n-checkbox-group v-model:value="item.checkedAuths">
                  <n-space item-style="display: flex;">
                    <n-checkbox
                      :value="auth.key"
                      :label="auth.desc"
                      v-for="(auth, idx) in item.contentAuths"
                      :key="auth.key"
                    />
                  </n-space>
                </n-checkbox-group>
              </div>
            </n-collapse-item>
          </n-collapse>
        </div>
      </n-tab-pane>
      <n-tab-pane name="operation" tab="逻辑操作级权限">
        <div class="my-3">
          <n-collapse
            :default-expanded-names="logicPermission.map((item) => item.name)"
          >
            <n-collapse-item
              :title="item.title"
              :name="item.name"
              v-for="(item, index) in logicPermission"
              :key="item.page"
            >
              <div>
                <n-checkbox-group v-model:value="item.checkedAuths">
                  <n-space item-style="display: flex;">
                    <n-checkbox
                      :value="auth.key"
                      :label="auth.desc"
                      v-for="(auth, idx) in item.logicAuths"
                      :key="auth.key"
                    />
                  </n-space>
                </n-checkbox-group>
              </div>
            </n-collapse-item>
          </n-collapse>
        </div>
      </n-tab-pane>
    </n-tabs>
  </common-modal>
</template>

<script setup lang="ts">
import {
  NInput,
  NTree,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NCollapse,
  NCollapseItem,
  NCheckbox,
  NCheckboxGroup,
  NSpace,
} from 'naive-ui'
import CommonModal from '@/components/CommonModal.vue'
import { ref, inject, watch, unref, Ref } from 'vue'
// 注入状态数据以进行 UI渲染 UX交互
import { modalType } from '@/hooks/useModal'
const editModalType = inject('editModalType') as Ref<modalType>
const editModal = inject('editModal') as Ref<boolean>
const confirmLoading = inject('confirmLoading') as Ref<boolean>

import { IRoleListItem } from '../interfaces/data'
const role = inject('role') as IRoleListItem

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

// 前置说明：
// 1. checkedAuths/pageCheckedAuths - 严格的权限列表：有访问权限, 且权限树为【勾选状态】
// 2. authKeys/pageAuths - 非严格权限列表：有访问权限, 但权限树为【半勾选状态】

// 菜单权限树相关
import { useStore } from '@/hooks/useStore'
const store = useStore()
const menuAuthTree = ref([])
menuAuthTree.value = store.getters.getMenuAuthTree
const checkedKeys = ref([])
const hideAuthKeys = store.getters.getHideAuthKeys

const updateCheckedKeys = (keys) => {
  // 去除无效父节点 - 数据库数据滞后带来的影响
  // 先前为 checkedAuths, 但是由于业务开发新增或减少页面, 而数据库还是旧数据
  // 对于当前时间节点来说, 旧数据的某些父节点可能实际已经是【半勾选状态】(新增子页面)/【勾选状态】(删除子页面)了
  checkFatherValid(menuAuthTree.value)
  function checkFatherValid(arr) {
    arr.forEach((item) => {
      if (item.children) {
        checkFatherValid(item.children)
        if (item.children.every((c) => keys.includes(c.key))) {
          !keys.includes(item.key) && keys.push(item.key)
        } else {
          if (keys.includes(item.key)) {
            let index = keys.findIndex((k) => k === item.key)
            keys.splice(index, 1)
          }
        }
      }
    })
  }
  checkedKeys.value = keys
  // 隐藏节点若勾选 - 则对应的强相关节点必须强制勾选, 保存为 checkedAuths
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

const getPageAuthKeys = () => {
  let authKeys = unref(checkedKeys)
  addNodes(unref(menuAuthTree))
  return {
    pageAuths: authKeys,
    pageCheckedAuths: [...unref(checkedKeys)],
  }
  // 至少一个子节点选中后 - 对应的父节点虽然不是checked状态, 但是需要保存为 authKeys
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

// permission相关
import { permissionConfig } from '@/configuration'
const contentPermission = ref([])
contentPermission.value = permissionConfig
  .filter((item) => item.contentAuths && item.contentAuths.length > 0)
  .map((item) => {
    return {
      title: item.label,
      name: item.page,
      contentAuths: item.contentAuths.map((auth) => {
        return {
          ...auth,
          key: `${item.page}-${auth.key}`,
        }
      }),
      checkedAuths: [],
    }
  })
const logicPermission = ref([])
logicPermission.value = permissionConfig
  .filter((item) => item.logicAuths && item.logicAuths.length > 0)
  .map((item) => {
    return {
      title: item.label,
      name: item.page,
      logicAuths: item.logicAuths.map((auth) => {
        return {
          ...auth,
          key: `${item.page}-${auth.key}`,
        }
      }),
      checkedAuths: [],
    }
  })

// 数据重载
watch(editModal, (val) => {
  if (val) {
    updateCheckedKeys(role.pageCheckedAuths)
    contentPermission.value.forEach((item) => {
      item.checkedAuths = item.contentAuths
        .filter((auth) => role.contentAuths.includes(auth.key))
        .map((item) => item.key)
    })
    logicPermission.value.forEach((item) => {
      item.checkedAuths = item.logicAuths
        .filter((auth) => role.logicAuths.includes(auth.key))
        .map((item) => item.key)
    })
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
  const authKeys = getPageAuthKeys()
  const contentAuths = contentPermission.value.reduce((acc, cur) => {
    acc = [...acc, ...cur.checkedAuths]
    return acc
  }, [])
  const logicAuths = logicPermission.value.reduce((acc, cur) => {
    acc = [...acc, ...cur.checkedAuths]
    return acc
  }, [])
  emit('confirm', { ...authKeys, contentAuths, logicAuths })
}
</script>

<style scoped></style>
