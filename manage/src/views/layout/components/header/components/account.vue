<template>
  <div class="ml-2 d-flex a-center">
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
          <div class="d-flex a-center j-center">
            <img
              src="@/assets/avatar.svg"
              alt=""
              style="width: 24px; border-radius: 50%"
            />
          </div>
          <div class="ml-1">{{ store.state.userInfo.name }}</div>
        </div>
      </n-button>
    </n-dropdown>
    <n-button size="tiny" type="primary" v-else @click="login">
      立即登录
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { NDropdown, DropdownOption, NButton, NIcon } from 'naive-ui'
import LogoutIcon from '@vicons/material/ExitToAppSharp'
import { h } from 'vue'

import { useStore } from '@/hooks/useStore'
const store = useStore()

const options: Array<DropdownOption> = [
  { label: '退出系统', key: 'logout', icon: () => h(LogoutIcon) },
]

const renderDropdownIcon = (option: DropdownOption) => {
  return h(NIcon, null, {
    default: () => h(option.icon),
  })
}

const handleSelect = (key: string) => {
  if (key == 'logout') {
    store.dispatch('logout')
  }
}
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  router.push('/login')
}
</script>

<style scoped></style>
