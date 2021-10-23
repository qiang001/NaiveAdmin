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
        <div  id="framework">
          <echarts-three></echarts-three>
        </div>
      </div>
      <div class="d-flex a-center">
        <div v-permission:content="'Console-1'" style="flex: 2" class="py-2" id="order">
          <div style="font-weight: bold">订单总数：101</div>
          <echarts-one></echarts-one>
        </div>
        <div v-permission:content="'Console-2'" style="flex: 1" class="py-2"  id="customer">
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
import { ref, provide,onMounted } from 'vue'
const checkStock = () => {
  window.$message.success('库存为 666')
}

import {walden} from '@/assets/js/walden.js'
import {essos} from '@/assets/js/essos.js'

const ifSizeChange = ref(0)
provide('ifSizeChange', ifSizeChange)
provide('walden',walden)
provide('essos',essos)
const handleResize = ({ width }) => {
  ifSizeChange.value = width - 40 || 0
}

import { gsap } from "gsap"
onMounted(()=>{
  gsap.to('#framework', { duration: 0.8, y: 0, opacity: 1, delay: 0.8 })
  gsap.to('#order', { duration: 0.8, y: 0, opacity: 1, delay: 1.2 })
  gsap.to('#customer', { duration: 0.8, y: 0, opacity: 1, delay: 1.5 })
})
</script>

<style scoped>
#framework,#order,#customer{
  opacity: 0;
  transform:translateY(100px)
}
</style>
