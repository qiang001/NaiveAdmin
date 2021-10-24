<template>
  <div class="p-3">
    <div v-if="!showFile">
      <img
        src="../assets/images/empty-box.svg"
        alt=""
        style="width: 66px"
        v-if="!store.state.ifDark"
      />
      <img
        src="../assets/images/empty-box-dark.svg"
        alt=""
        style="width: 66px"
        v-else
      />
      <div class="d-flex a-center j-center">
        <n-element class="no-data"> 暂无数据 </n-element>
      </div>
    </div>
    <div v-else>
      <img
        src="../assets/images/empty-box-file.svg"
        alt=""
        style="width: 99px"
        v-if="!store.state.ifDark"
      />
      <img
        src="../assets/images/empty-box-file-dark.svg"
        alt=""
        style="width: 99px"
        v-else
      />
      <div class="d-flex a-center j-center">
        <n-element class="no-data"> 暂无数据 </n-element>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NElement } from 'naive-ui'
import { toRefs } from 'vue'
import { useStore } from '@/hooks/useStore'
const store = useStore()
const props = defineProps({
  showFile: {
    type: Boolean,
    default: false,
  },
})
const { showFile } = toRefs(props)
</script>

<style scoped>
.no-data {
  color: var(--text-color-disabled);
}
</style>
