<template>
  <div
    class="d-flex a-center"
    :class="{
      'j-center': collapsed && store.state.layoutStyle === 'left-right',
    }"
  >
    <n-dropdown
      v-if="store.state.userInfo"
      :options="options"
      :render-icon="renderDropdownIcon"
      placement="bottom-start"
      trigger="click"
      :show-arrow="true"
      :on-select="(key) => handleSelect(key)"
    >
      <n-button
        size="small"
        :text="true"
        :text-color="
          (inverted && store.state.layoutStyle === 'left-right') ||
          store.state.layoutStyle === 'top-left-right-inverted'
            ? '#eeeeee'
            : undefined
        "
      >
        <div class="d-flex a-center j-center">
          <div class="d-flex a-center j-center">
            <img
              src="@/assets/avatar.svg"
              alt=""
              style="width: 24px; border-radius: 50%"
            />
          </div>
          <div
            class="ml-1"
            v-if="
              !collapsed ||
              ['top-left-right', 'top-left-right-inverted'].includes(
                store.state.layoutStyle
              )
            "
          >
            {{ store.state.userInfo.name }}
          </div>
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
import LogoutIcon from '@vicons/material/PowerSettingsNewRound'
import { Ref, inject, h } from 'vue'
const collapsed = inject('collapsed') as Ref<boolean>
const inverted = inject('inverted') as Ref<boolean>
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
