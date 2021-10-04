<template>
  <div class="ml-1">
    <n-dropdown
      :options="colors"
      :render-icon="renderDropdownIcon"
      placement="bottom-start"
      trigger="click"
      :on-select="(key) => store.commit('SET_MAINCOLOR', key)"
    >
      <n-button size="small" :text="true">主题切换</n-button>
    </n-dropdown>
  </div>
</template>

<script setup>
import { NDropdown,NButton } from 'naive-ui'
import { h ,inject} from 'vue'
const store = inject('store')
const colors = store.getters.getMainColors
const renderDropdownIcon = (option) => {
  return h(
    'div',
    {
      style: {
        backgroundColor: option.common.primaryColor,
        width: '16px',
        height: '16px',
        borderRadius: '2px',
      },
    },
    ''
  )
}
</script>

<style scoped></style>
