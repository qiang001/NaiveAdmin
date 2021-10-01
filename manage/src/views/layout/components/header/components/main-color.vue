<template>
  <div class="ml-1">
    <n-dropdown
      :options="colors"
      :render-icon="renderDropdownIcon"
      placement="bottom-start"
      trigger="hover"
      :on-select="(key) => store.commit('SET_MAINCOLOR', key)"
    >
      <n-button size="small">主题切换</n-button>
    </n-dropdown>
  </div>
</template>

<script setup>
import { h } from 'vue'
import { NDropdown,NButton } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()
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
