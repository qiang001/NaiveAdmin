<template>
  <page-panel :title="'商品分类'">
    <div class="mt-2">
      {{ num }}
      <n-button @click="num++">点击+1</n-button>
    </div>
  </page-panel>
</template>

<script>
export default { name: 'GoodCategory' }
</script>

<script setup>
import PagePanel from '@/components/PagePanel.vue'
import { NButton } from 'naive-ui'
import { ref } from 'vue'
const num = ref(0)
</script>

<style></style>
