<template>
  <draggable
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="sortedData"
    v-bind="dragOptions"
    @start="setDrag(true)"
    @end="setDrag(false)"
    item-key="value"
  >
    <template #item="{ element: item, index }">
      <div class="d-flex a-center p">
        <div>{{ item.label }}</div>
        <div class="ml-auto">
          <n-space align="center">
            <n-button
              #icon
              size="tiny"
              secondary
              type="primary"
              :disabled="index === 0"
              @click="setTop(item)"
            >
              <n-icon><to-top-icon /></n-icon>
            </n-button>
            <n-button
              #icon
              size="tiny"
              secondary
              :disabled="index === sortedData.length - 1"
              @click="setBottom(item)"
            >
              <n-icon><to-bottom-icon /></n-icon>
            </n-button>
          </n-space>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { NButton, NIcon, NSpace } from 'naive-ui'
import draggable from 'vuedraggable/src/vuedraggable'
import ToTopIcon from '@vicons/fluent/ArrowUpload16Filled'
import ToBottomIcon from '@vicons/fluent/ArrowDownload16Filled'
import { ref, reactive, onMounted, watchEffect } from 'vue'
// 核心属性

interface IItem {
  label: string
  value: string
}
interface IProp {
  options: Array<IItem>
}

const props = withDefaults(defineProps<IProp>(), {
  options: undefined,
})

const sortedData = ref<Array<IItem>>([])
onMounted(() => (sortedData.value = props.options))
const setTop = (item) => {
  const index = sortedData.value.findIndex((i) => i.value === item.value)
  const [target] = sortedData.value.splice(index, 1)
  sortedData.value.unshift(target)
}

const setBottom = (item) => {
  const index = sortedData.value.findIndex((i) => i.value === item.value)
  const [target] = sortedData.value.splice(index, 1)
  sortedData.value.push(target)
}

watchEffect(() => emit('change', sortedData.value))

const emit = defineEmits(['change'])

// 拖动
const drag = ref(false)
const dragOptions = reactive({
  animation: 200,
  group: 'tabs',
  disabled: false,
  ghostClass: 'ghost',
})

const setDrag = (bool: boolean) => {
  drag.value = bool
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
</style>
