<template>
  <page-panel :title="'排序'">
    <n-space vertical size="large">
      <n-alert title="列表排序 Sort" type="info">
        排序组件<br />
        可拖拽 - 基于 vuedraggable 实现
      </n-alert>
      <n-card title="定制化演示">
        <n-space vertical size="large">
          <n-space>
            <n-card embedded :style="`width:${width}px`">
              <n-scrollbar
                :style="`max-height: ${height}px`"
                style="background-color: var(--color-modal); border-radius: 4px"
              >
                <div class="p-1">
                  <sort :options="items" @change="onChange"></sort>
                </div>
              </n-scrollbar>
            </n-card>
            <n-space vertical>
              <n-space align="center">
                <div>外部容器宽度</div>
                <n-input-group>
                  <n-input-number
                    v-model:value="width"
                    :min="300"
                    :step="20"
                    :style="{ width: '40%' }"
                  />
                  <n-input-group-label>px</n-input-group-label>
                </n-input-group>
              </n-space>
              <n-space align="center">
                <div>内部最大高度</div>
                <n-input-group>
                  <n-input-number
                    v-model:value="height"
                    :min="300"
                    :step="20"
                    :style="{ width: '40%' }"
                  />
                  <n-input-group-label>px</n-input-group-label>
                </n-input-group>
              </n-space>
            </n-space>
          </n-space>
          <div>
            <div>结果：</div>
            <div>{{ sortedData }}</div>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </page-panel>
</template>

<script setup lang="ts">
import {
  NSpace,
  NAlert,
  NCard,
  NInputNumber,
  NInputGroup,
  NInputGroupLabel,
  NScrollbar,
} from 'naive-ui'
import PagePanel from '@/components/PagePanel.vue'
import Sort from '@/components/Sort.vue'
import { ref } from 'vue'
const width = ref(300)
const height = ref(300)
const items = ref<Array<{ label: string; value: string }>>([])
items.value = [
  {
    label: 'A',
    value: '1',
  },
  {
    label: 'B',
    value: '2',
  },
  {
    label: 'C',
    value: '3',
  },
  {
    label: 'D',
    value: '4',
  },
  {
    label: 'E',
    value: '5',
  },
  {
    label: 'F',
    value: '6',
  },
  {
    label: 'G',
    value: '7',
  },
]
const sortedData = ref<Array<{ label: string; image?: string }>>([])
const onChange = (data) => {
  sortedData.value = [...data]
}
</script>

<style scoped></style>
