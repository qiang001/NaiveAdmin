<template>
  <common-modal
    :showModal="resetPasswordModal"
    title="重置密码"
    cancelBtnText="取消"
    confirmBtnText="立即重置"
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
      <n-form-item label="新密码" path="password" rule-path="user.password">
        <n-input
          v-model:value="user.password"
          placeholder="输入新密码"
          type="password"
          show-password-on="mousedown"
        />
      </n-form-item>
      <n-form-item
        label="密码确认"
        path="passwordConfirm"
        rule-path="user.passwordConfirm"
      >
        <n-input
          :disabled="!user.password"
          v-model:value="user.passwordConfirm"
          placeholder="请再次输入密码"
          type="password"
          show-password-on="mousedown"
        />
      </n-form-item>
    </n-form>
  </common-modal>
</template>

<script setup lang="ts">
import { NInput, NForm, NFormItem } from 'naive-ui'
import CommonModal from '@/components/CommonModal.vue'
import { ref, inject, Ref } from 'vue'
// 注入状态数据以进行 UI渲染 UX交互
const resetPasswordModal = inject('resetPasswordModal') as Ref<boolean>
const confirmLoading = inject('resetLoading') as Ref<boolean>
import { IUserResetPassword } from '../interfaces/data'
const user = inject('resetUser') as IUserResetPassword
// 表单相关
const formRef = ref(null)
const rules = {
  user: {
    password: {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
    passwordConfirm: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur'],
      },
      {
        validator: (rule, value) => {
          return value ? value === formRef.value.model.password : true
        },
        message: '两次密码输入不一致',
        trigger: ['blur', 'input'],
      },
    ],
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

<style scoped></style>
