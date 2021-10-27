<template>
  <div
    id="echarts-two"
    :style="{
      width: `${ifSizeChange / 3 || '100%'}` + `${ifSizeChange ? 'px' : ''}`,
      height: '400px',
    }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, watch, inject, computed, Ref } from 'vue'
const ifSizeChange = inject('ifSizeChange') as Ref<number>
import { useStore } from '@/hooks/useStore'
const store = useStore()
const walden = inject('walden')
const essos = inject('essos')
const ifDark = computed(() => store.state.ifDark)
let myChart = null
let timer = null

const resizeChart = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    ifSizeChange.value &&
      myChart &&
      myChart.resize({ animation: { duration: 1200, easing: 'cubicInOut' } })
  }, 200)
}

watch(
  ifSizeChange,
  () => {
    resizeChart()
  },
  { immediate: true }
)

const initChart = () => {
  const chartDom = document.getElementById('echarts-two')
  if (myChart) {
    myChart.dispose()
  }
  myChart = !ifDark.value
    ? echarts.init(chartDom, 'essos')
    : echarts.init(chartDom, 'dark')
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [12, 20, 15, 8, 7, 11, 13],
        type: 'bar',
      },
    ],
  }
  if (ifDark.value) {
    ;(option as any).backgroundColor = '#17171b'
  }
  myChart.setOption(option)
}

watch(ifDark, () => {
  initChart()
})

onMounted(() => {
  echarts.use([GridComponent, BarChart, CanvasRenderer])
  echarts.registerTheme('walden', walden)
  echarts.registerTheme('essos', essos)
  initChart()
})
</script>

<style></style>
