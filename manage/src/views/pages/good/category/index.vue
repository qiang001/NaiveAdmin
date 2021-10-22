<template>
  <page-panel :title="'商品分类'">
    <div class="mt-2">
      {{ num }}
      <n-button @click="num++">点击+1</n-button>
    </div>
  </page-panel>
</template>

<script lang="ts">
export default { name: 'GoodCategory' }
</script>

<script setup lang="ts">
import PagePanel from '@/components/PagePanel.vue'
import { NButton } from 'naive-ui'
import { ref,onMounted, onActivated} from 'vue'
const num = ref(0)
onMounted(()=>{
  window.$message.success('onMounted')
})
onActivated(()=>{
  window.$message.success('onActivated')
})
</script>

<style></style>
