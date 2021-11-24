<template>
  <page-panel :title="'菜单'">
    <n-space vertical size="large">
      <n-alert title="简单菜单 SimpleMenu" type="info">
        基本的筛选功能
      </n-alert>
      <n-card title="定制化演示">
        <n-space size="large">
          <n-space vertical size="large">
            <n-space align="center">
              <div>宽度</div>
              <n-input-group>
                <n-input-number
                  v-model:value="width"
                  :min="140"
                  :step="20"
                  :style="{ width: '40%' }"
                />
                <n-input-group-label>px</n-input-group-label>
              </n-input-group>
            </n-space>
            <n-space vertical>
              <div>菜单数据</div>
              <n-dynamic-input
                v-model:value="menuOptions"
                :on-create="onCreate"
                #="{ value }"
              >
                <n-space align="center" size="large">
                  <n-input-group>
                    <n-input-group-label>lable</n-input-group-label>
                    <n-input v-model:value="value.label" type="text" />
                  </n-input-group>
                  <n-input-group>
                    <n-input-group-label>value</n-input-group-label>
                    <n-input v-model:value="value.value" type="text" />
                  </n-input-group>
                </n-space>
              </n-dynamic-input>
            </n-space>
          </n-space>

          <n-space size="large">
            <div>结果展示：</div>
            <n-element :style="`width:${width}px`">
              <simple-menu
                :options="menuOptions"
                v-model="status"
              ></simple-menu>
            </n-element>
          </n-space>
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
  NDynamicInput,
  NInput,
  NElement,
} from 'naive-ui'
import PagePanel from '@/components/PagePanel.vue'
import SimpleMenu from '@/components/SimpleMenu.vue'
import { ref } from 'vue'
const width = ref(140)
const menuOptions = ref<Array<{ label: string; value: string }>>([])
menuOptions.value = [
  { label: '待处理', value: 'pending' },
  { label: '已接单', value: 'processing' },
  { label: '送货中', value: 'shipping' },
  { label: '已完成', value: 'done' },
]
const status = ref('pending')
const onCreate = () => {
  return {
    label: 'label' + menuOptions.value.length,
    value: 'value' + menuOptions.value.length,
  }
}
</script>

<style></style>
