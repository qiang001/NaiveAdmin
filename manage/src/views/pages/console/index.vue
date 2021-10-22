<template>
  <page-panel :title="'主控台'" @resize="handleResize">
    <div class="pt-2">
      <div class="d-flex a-center mb-2">
        <div class="ml-auto">
          <n-button type="primary" v-permission:logic.Console-1="checkStock">
            查询产品库存
          </n-button>
        </div>
      </div>
      <div>
        <div>
          <echarts-three></echarts-three>
        </div>
      </div>
      <div class="d-flex a-center">
        <div v-permission:content="'Console-1'" style="flex: 2" class="p-2">
          <div style="font-weight: bold">订单总数：101</div>
          <echarts-one></echarts-one>
        </div>
        <div v-permission:content="'Console-2'" style="flex: 1" class="p-2">
          <div style="font-weight: bold">客户总数：101</div>
          <echarts-two></echarts-two>
        </div>
      </div>
    </div>
  </page-panel>
</template>

<script setup lang="ts">
import PagePanel from '@/components/PagePanel.vue'
import EchartsOne from './components/echarts-one.vue'
import EchartsTwo from './components/echarts-two.vue'
import EchartsThree from './components/echarts-three.vue'
import { NButton } from 'naive-ui'
import { ref, provide } from 'vue'
const checkStock = () => {
  window.$message.success('库存为 666')
}
import {walden} from '@/assets/json/walden.js'

const ifSizeChange = ref(0)
provide('ifSizeChange', ifSizeChange)
provide('walden',walden)
const handleResize = ({ width }) => {
  ifSizeChange.value = width - 120 || 0
}
</script>

<style></style>
