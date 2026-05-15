<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { MonthlyTrendModulePayload } from '../types'

const props = defineProps<{
  /** 数量走势 or 金额走势 */
  variant: 'count' | 'amount'
  payload: MonthlyTrendModulePayload
}>()

const elRef = ref<HTMLElement | null>(null)
let chart: ECharts | null = null

const months = computed(() => props.payload.months.map((m) => `${m.month}月`))

const leftAxisName = computed(() => (props.variant === 'count' ? '个' : '亿元'))

function buildOption(): echarts.EChartsOption {
  const m = props.payload.months
  return {
    color: ['#5B8FF9', '#5AD8A6', '#F6BD16'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['当前情况', '往期情况', '同比'],
      top: 8,
      left: 'center',
      itemWidth: 18,
      itemHeight: 10,
      textStyle: { fontSize: 12, color: '#595959' },
    },
    grid: { left: 48, right: 48, top: 88, bottom: 32, containLabel: true },
    xAxis: {
      type: 'category',
      data: months.value,
      axisTick: { alignWithLabel: true },
      axisLine: { lineStyle: { color: '#d9d9d9' } },
      axisLabel: { color: '#595959' },
    },
    yAxis: [
      {
        type: 'value',
        name: leftAxisName.value,
        nameTextStyle: { color: '#8c8c8c', padding: [0, 0, 0, -24] },
        splitLine: { lineStyle: { type: 'dashed', color: '#f0f0f0' } },
        axisLabel: { color: '#8c8c8c' },
      },
      {
        type: 'value',
        name: '%',
        position: 'right',
        splitLine: { show: false },
        axisLabel: {
          color: '#8c8c8c',
          formatter: (v: number) => `${v.toFixed(2)}%`,
        },
        min: -30,
        max: 40,
      },
    ],
    series: [
      {
        name: '当前情况',
        type: 'bar',
        barMaxWidth: 22,
        barGap: '0%',
        data: m.map((x) => x.current),
        itemStyle: { color: '#5B8FF9' },
        label: {
          show: props.variant === 'amount',
          position: 'top',
          color: '#595959',
          fontSize: 11,
        },
      },
      {
        name: '往期情况',
        type: 'bar',
        barMaxWidth: 22,
        data: m.map((x) => x.previous),
        itemStyle: { color: '#5AD8A6' },
        label: {
          show: props.variant === 'amount',
          position: 'top',
          color: '#595959',
          fontSize: 11,
        },
      },
      {
        name: '同比',
        type: 'line',
        yAxisIndex: 1,
        smooth: false,
        symbol: 'circle',
        symbolSize: 7,
        data: m.map((x) => x.yoyPercent),
        itemStyle: { color: '#F6BD16' },
        lineStyle: { color: '#F6BD16', width: 2 },
      },
    ],
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
  () => props.payload,
  () => render(),
  { deep: true },
)
</script>

<template>
  <div ref="elRef" class="combo-chart" />
</template>

<style scoped>
.combo-chart {
  width: 100%;
  height: 380px;
}
</style>
