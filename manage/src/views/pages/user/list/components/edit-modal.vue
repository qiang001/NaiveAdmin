<template>
  <common-modal
    :showModal="editModal"
    :title="ifEdit ? '编辑用户' : '添加新用户'"
    cancelBtnText="取消"
    :confirmBtnText="ifEdit ? '确认保存' : '确认添加'"
    :confirmLoading="confirmLoading"
    @cancel="cancel"
    @confirm="confirm"
  >
    <n-form
      label-placement="left"
      :label-width="80"
      :model="user"
      :rules="rules"
      ref="formRef"
    >
      <n-form-item label="昵称" path="name" rule-path="user.name">
        <n-input v-model:value="user.name" placeholder="输入名称" />
      </n-form-item>
      <n-form-item label="用户名" path="username" rule-path="user.username">
        <n-input v-model:value="user.username" placeholder="输入用户名" />
      </n-form-item>
      <n-form-item
        label="密码"
        path="password"
        rule-path="user.password"
        v-if="!ifEdit"
      >
        <n-input
          v-model:value="user.password"
          placeholder="输入密码"
          type="password"
          show-password-on="mousedown"
        />
      </n-form-item>
      <n-form-item label="权限设置" path="roles" rule-path="user.roles">
        <n-select
          placeholder="设置角色"
          :options="roleOptions"
          v-model:value="user.roles"
          multiple
          clearable
        />
      </n-form-item>
      <n-form-item label="当前状态">
        <n-switch v-model:value="user.ifActive">
          <template #checked>已激活</template>
          <template #unchecked>已离职</template>
        </n-switch>
      </n-form-item>
    </n-form>
  </common-modal>
</template>

<script setup lang="ts">
import {
  NInput,
  NForm,
  NFormItem,
  NSelect,
  SelectOption,
  NSwitch,
} from 'naive-ui'
import CommonModal from '@/components/CommonModal.vue'
import { ref, inject, Ref } from 'vue'
// 注入状态数据以进行 UI渲染 UX交互
const ifEdit = inject('ifEdit') as Ref<boolean>
const editModal = inject('editModal') as Ref<boolean>
const confirmLoading = inject('confirmLoading') as Ref<boolean>
import { IEditUser } from '../interfaces/data'
const user = inject('user') as IEditUser
const roleOptions = inject('roleOptions') as Array<SelectOption>
// 表单相关
const formRef = ref(null)
const rules: any = {
  user: {
    name: {
      required: true,
      message: '请输入名称',
      trigger: ['input', 'blur'],
    },
    username: {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur'],
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
    roles: {
      type: 'array',
      required: true,
      trigger: ['blur', 'change'],
      message: '请至少设置一种角色',
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
  emit('confirm')
}
</script>

<style scoped>
:deep(.n-base-selection .n-base-selection-tags) {
  padding: 3px 26px 0 3px;
}
:deep(.n-base-selection-tag-wrapper) {
  padding: 0 3px 3px 0;
}
</style>
