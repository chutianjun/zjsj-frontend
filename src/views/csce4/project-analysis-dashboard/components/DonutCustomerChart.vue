<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { CustomerDonutSlice } from '../types'
import { CUSTOMER_TYPE_LEGEND } from '../constants'

const props = withDefaults(
  defineProps<{
    slices: CustomerDonutSlice[]
    centerTitle?: string
    /** 中间第二行主数字后的单位，如「人」 */
    centerUnit?: string
  }>(),
  {
    centerTitle: '客户数量',
    centerUnit: '人',
  },
)

const elRef = ref<HTMLElement | null>(null)
let chart: ECharts | null = null

const colorMap = Object.fromEntries(CUSTOMER_TYPE_LEGEND.map((x) => [x.name, x.color])) as Record<string, string>

const total = computed(() => props.slices.reduce((s, x) => s + x.value, 0))

function buildOption(): echarts.EChartsOption {
  return {
    color: props.slices.map((d) => colorMap[d.name] ?? '#999'),
    tooltip: {
      trigger: 'item',
      formatter: (p: unknown) => {
        const x = p as { name: string; value: number; percent: number }
        return `${x.name}<br/>${x.value} (${Number(x.percent).toFixed(1)}%)`
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['44%', '70%'],
        center: ['42%', '50%'],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        data: props.slices.map((d) => ({
          name: d.name,
          value: d.value,
        })),
      },
    ],
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: '2%',
      top: 'middle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 12, color: '#595959' },
    },
  }
}

function resize() {
  chart?.resize()
}

function render() {
  if (!elRef.value) return
  if (!chart) chart = echarts.init(elRef.value)
  chart.setOption(buildOption(), true)
}

onMounted(() => {
  render()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  chart?.dispose()
  chart = null
})

watch(
  () => [props.slices, props.centerTitle, props.centerUnit, total.value],
  () => render(),
  { deep: true },
)
</script>

<template>
  <div class="donut-wrap">
    <div ref="elRef" class="donut-root" />
    <div class="donut-center">
      <div class="donut-center-title">{{ centerTitle }}</div>
      <div class="donut-center-val">{{ total.toLocaleString() }} {{ centerUnit }}</div>
    </div>
  </div>
</template>

<style scoped>
.donut-wrap {
  position: relative;
  width: 100%;
  height: 320px;
  min-height: 280px;
}
.donut-root {
  position: absolute;
  inset: 0;
}
.donut-center {
  pointer-events: none;
  position: absolute;
  /* 与 series.center ['42%','50%'] 对齐，保证环内文字居中 */
  left: 42%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.donut-center-title {
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 6px;
}
.donut-center-val {
  font-size: 20px;
  font-weight: 700;
  color: #262626;
}
</style>
