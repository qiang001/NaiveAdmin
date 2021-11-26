<template>
  <n-element style="border-right: 1px solid var(--divider-color)">
    <div v-for="item in options" :key="item.value">
      <div
        @click.stop="() => emit('update:modelValue', item.value)"
        class="p-1 d-flex a-center j-center menu-item"
        :class="{ actived: item.value === modelValue }"
      >
        {{ item.label }}
      </div>
    </div>
  </n-element>
</template>

<script setup lang="ts">
import { NElement } from 'naive-ui'
// 核心属性
interface IProp {
  options: Array<{
    label: string
    value: string
  }>
  modelValue: string
}
const props = withDefaults(defineProps<IProp>(), {
  options: undefined,
  active: undefined,
})

const emit = defineEmits(['update:modelValue'])
import { useStore } from '@/hooks/useStore'
import { computed } from 'vue'
const store = useStore()
const bgColor = computed(
  () => store.getters.getTheme.overrides.Menu.itemColorActive
)
const hoverColor = computed(() =>
  store.state.mainColor === 'yellow'
    ? store.getters.getTheme.overrides.common.primaryColor
    : store.getters.getTheme.overrides.Menu.itemTextColorHover
)
</script>

<style scoped>
.menu-item {
  border-right: 3px solid transparent;
  cursor: pointer;
  margin-right: -1px;
  transition: color 0.3s ease;
}
.menu-item:hover {
  color: v-bind(hoverColor);
  transition: color 0.3s ease;
}
.menu-item.actived {
  border-right: 3px solid v-bind(hoverColor);
  background-color: v-bind(bgColor);
  color: v-bind(hoverColor);
}
</style>
