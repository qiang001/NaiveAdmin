<template>
  <page-panel :title="'主控台'">
    <div class="pt-2">
      <div v-permission:content="'Console-1'">订单总数：101</div>
      <div v-permission:content="'Console-2'">客户总数：33</div>
      <div>
        <n-button type="primary" v-permission:logic.Console-1="checkStock">查询产品库存</n-button>
      </div>
    </div>
  </page-panel>
</template>

<script setup>
import PagePanel from '@/components/PagePanel.vue'
import { NButton } from 'naive-ui'
const checkStock = ()=>{
  $message.success('库存为 666')
}
</script>

<style></style>
