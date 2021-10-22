<template>
  <div
    id="echarts-three"
    :style="{
      width:
        `${ifSizeChange ? ifSizeChange + 80 : '100%'}` +
        `${ifSizeChange ? 'px' : ''}`,
      height: '400px',
    }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, watch, inject, computed,Ref } from 'vue'
const ifSizeChange = inject('ifSizeChange') as Ref<number>
import {useStore} from 'vuex'
import { storeKey } from '@/store'
const store = useStore(storeKey)
const walden = inject('walden')
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
  const chartDom = document.getElementById('echarts-three')
  if (myChart) {
    myChart.dispose()
  }
  myChart = !ifDark.value
    ? echarts.init(chartDom, 'walden')
    : echarts.init(chartDom, 'dark')
  const option = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['jQuery', 'Vue', 'Vanilla JavaScript', 'Angular', 'React'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'jQuery',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Vue',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Vanilla JavaScript',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Angular',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'React',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }
  if (ifDark.value) {
    (option as any).backgroundColor = '#17171b'
  }
  myChart.setOption(option)
}

watch(ifDark, () => {
  initChart()
})

onMounted(() => {
  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
  ])
  echarts.registerTheme('walden', walden)
  initChart()
})
</script>

<style></style>
