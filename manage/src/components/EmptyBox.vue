<template>
  <div class="p-3">
    <div v-if="!showFile">
      <img
        src="../assets/images/empty-box.svg"
        alt=""
        style="width: 66px"
        v-if="!ifDark"
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
        v-if="!ifDark"
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
import { toRefs, computed } from 'vue'

// 核心属性
interface IProp {
  showFile?: boolean
}
const props = withDefaults(defineProps<IProp>(), {
  showFile: false,
})

const { showFile } = toRefs(props)

// 组件私有逻辑
import { useStore } from '@/hooks/useStore'
const store = useStore()
const ifDark = computed(() => store.state.ifDark)
</script>

<style scoped>
.no-data {
  color: var(--text-color-disabled);
}
</style>
