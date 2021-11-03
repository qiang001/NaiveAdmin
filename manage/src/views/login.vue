<template>
  <n-layout>
    <n-layout-content>
      <div class="d-flex">
        <n-element id="login-left" class="login-left d-flex a-center j-center">
          <canvas style="position: absolute"></canvas>
        </n-element>
        <div class="login-right d-flex a-center j-center">
          <div class="login-card">
            <div class="p-3">
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
                      id="username"
                      v-model:value="account.username"
                      placeholder="输入用户名"
                      size="large"
                      clearable
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
                      id="password"
                      v-model:value="account.password"
                      placeholder="输入密码"
                      size="large"
                      clearable
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
                  id="login-btn"
                  type="primary"
                  size="large"
                  style="width: 100%"
                  @click="login"
                  :loading="loading"
                  :disabled="loading"
                  >立即登录
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutContent,
  NElement,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NIcon,
  useMessage,
} from 'naive-ui'
window.$message = useMessage()

import UsernameIcon from '@vicons/antd/UserOutlined'
import PasswordIcon from '@vicons/antd/LockOutlined'

import { ref, reactive, unref, onMounted, onBeforeUnmount } from 'vue'

import { useStore } from '@/hooks/useStore'
const store = useStore()

import { gsap } from 'gsap'

import { useGravityBall } from '@/hooks/useGravityBall'
import { useResizeContainer } from '@/hooks/useResizeContainer'
const { width, height } = useResizeContainer('login-left')
const ifUnload = ref(false)
onMounted(() => {
  if (store.state.loginPageMessage.type == 'error') {
    window.$message.error(store.state.loginPageMessage.text)
  }
  if (store.state.loginPageMessage.type == 'success') {
    window.$message.success(store.state.loginPageMessage.text)
  }
  gsap.to('#username', { duration: 0.3, x: 0, opacity: 1, delay: 0.3 })
  gsap.to('#password', { duration: 0.5, x: 0, opacity: 1, delay: 0.35 })
  gsap.to('#login-btn', { duration: 0.8, x: 0, opacity: 1, delay: 0.45 })

  useGravityBall(
    width,
    height,
    store.getters.getMainColors.map((color) => color.common.primaryColor),
    ifUnload
  )
})

onBeforeUnmount(() => {
  ifUnload.value = true
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

const loading = ref(false)

const login = async () => {
  const ifValid = await validation()
  if (!ifValid) {
    return
  }
  loading.value = true
  await store.dispatch('login', { ...unref(account) })
  loading.value = false
}
</script>

<style scoped>
.login-left {
  flex: 2;
  background-color: var(--divider-color);
  min-height: 100vh;
  transition: flex 1.2s ease;
}

.login-right {
  flex: 1;
  flex-shrink: 0;
  min-width: 400px;
  min-height: 100vh;
  box-sizing: border-box;
}

#username,
#password,
#login-btn {
  opacity: 0;
  transform: translateX(120px);
}

@media only screen and (max-width: 800px) {
  .login-left {
    flex: 0;
  }
  .login-right {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
  .login-card {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
