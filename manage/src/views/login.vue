<template>
  <n-layout>
    <n-layout-content>
      <div class="wrapper-login d-flex a-center j-center">
        <n-card class="login-card">
          <div class="p-3 pt-2">
            <div class="d-flex a-center j-center mb-3">
              <img src="../assets/logo.png" alt="" style="width: 66px" />
            </div>
            <div class="d-flex a-center j-center mb-3">
              <div>
                <div style="font-size: 22px; text-align: center">
                  通用后台管理系统
                </div>
                <div
                  style="
                    text-align: center;
                    font-size: 12px;
                    font-family: PingFang SC, Segoe UI;
                  "
                >
                  Common Content Manage System
                </div>
              </div>
            </div>
            <div class="mb-2">
              <n-form
                :show-label="false"
                :model="account"
                :rules="rules"
                ref="formRef"
              >
                <n-form-item
                  label="用户名"
                  path="username"
                  rule-path="account.username"
                >
                  <n-input
                    v-model:value="account.username"
                    placeholder="输入用户名"
                    size="large"
                  >
                    <template #prefix>
                      <n-icon>
                        <username-icon />
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item
                  label="密码"
                  path="password"
                  rule-path="account.password"
                >
                  <n-input
                    v-model:value="account.password"
                    placeholder="输入密码"
                    size="large"
                    type="password"
                    show-password-on="mousedown"
                    @keyup.enter="login"
                  >
                    <template #prefix>
                      <n-icon>
                        <password-icon />
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
              </n-form>
            </div>
            <div class="d-flex a-center j-center">
              <n-button
                type="primary"
                size="large"
                style="width: 100%"
                @click="login"
                >立即登录
              </n-button>
            </div>
          </div>
        </n-card>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import {
  NLayout,
  NLayoutContent,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NIcon,
  useMessage,
} from 'naive-ui'
window.$message = useMessage()
import {
  AccountBoxSharp as UsernameIcon,
  LockSharp as PasswordIcon,
} from '@vicons/material'
import { useStore } from 'vuex'
const store = useStore()
import { ref, reactive, unref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
  if (['expired'].includes(route.query.token)) {
    $message.error(route.query.message)
  }
  if (['null','logout'].includes(route.query.token)) {
    $message.success(route.query.message)
  }
})

// 表单相关
const formRef = ref(null)
const account = reactive({
  username: 'admin@sccms.com',
  password: '123456',
})
const rules = {
  account: {
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

const login = async () => {
  const ifValid = await validation()
  if (!ifValid) {
    return
  }
  await store.dispatch('login', { ...unref(account) })
}
</script>

<style scoped>
.wrapper-login {
  width: 90%;
  min-width: 375px;
  max-width: 420px;
  margin: 100px auto;
}

@media only screen and (max-width: 400px) {
  .login-card {
    height: 100%;
  }
  .wrapper-login {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
}
</style>
