<template>
  <div class="ml-1 d-flex a-center">
    <n-dropdown
      v-if="store.state.userInfo"
      :options="options"
      :render-icon="renderDropdownIcon"
      placement="bottom-start"
      trigger="click"
      :on-select="(key) => handleSelect(key)"
    >
      <n-button size="small" :text="true">
        <div class="d-flex a-center j-center">
          <div>
            <img
              src="@/assets/avatar.png"
              alt=""
              style="width: 32px"
              v-if="!store.state.ifDark"
            />
            <img
              src="@/assets/avatar-dark.png"
              alt=""
              style="width: 32px"
              v-else
            />
          </div>
          <div>{{ store.state.userInfo.name }}</div>
        </div>
      </n-button>
    </n-dropdown>
    <n-button size="tiny" type="primary" v-else @click="login">
      立即登录
    </n-button>
  </div>
</template>

<script setup>
import { NDropdown, NButton, NIcon } from 'naive-ui'
import { h, inject } from 'vue'
import { ExitToAppSharp as LogoutIcon } from '@vicons/material'
const store = inject('store')
const router = inject('router')
const options = [{ label: '退出系统', key: 'logout', icon: LogoutIcon }]

const renderDropdownIcon = (option) => {
  return h(NIcon, null, {
    default: () => h(option.icon),
  })
}

const handleSelect = (key) => {
  if (key == 'logout') {
    store.dispatch('logout')
  }
}
const login = () => {
  router.push('/login')
}
</script>

<style scoped></style>
