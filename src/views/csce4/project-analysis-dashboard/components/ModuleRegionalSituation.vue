<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { ProvinceMapValue, RegionTableRow } from '../types'
import { BID_PROJECT_OPTIONS, PROJECT_COST_OPTIONS, ENGINEERING_TYPE_OPTIONS, REGION_SELECT_OPTIONS } from '../constants'
import { ensureChinaMapRegistered } from '../utils/registerChinaMap'
import SlashYoY from './SlashYoY.vue'

const props = defineProps<{
  provinces: ProvinceMapValue[]
  rows: RegionTableRow[]
}>()

const emit = defineEmits<{ filterChange: [Record<string, unknown>] }>()

const bid = ref('')
const cost = ref('')
const eng = ref('')
const region = ref('')
const dateRange = ref<[string, string] | null>(null)

const mapEl = ref<HTMLElement | null>(null)
let chart: ECharts | null = null
const mapError = ref(false)

function notify() {
  emit('filterChange', {
    bid: bid.value,
    cost: cost.value,
    eng: eng.value,
    region: region.value,
    dateRange: dateRange.value,
  })
}

function buildMapOption(): echarts.EChartsOption {
  const max = Math.max(1, ...props.provinces.map((p) => p.value))
  return {
    tooltip: {
      trigger: 'item',
      formatter: (p: unknown) => {
        const x = p as { name?: string; value?: number }
        const v = x.value ?? 0
        return `${x.name ?? ''}<br/>项目：${v}`
      },
    },
    visualMap: {
      min: 0,
      max,
      text: [`${max}亿`, '1亿'],
      realtime: true,
      calculable: false,
      inRange: { color: ['#e6f7ff', '#0958d9'] },
      left: 12,
      bottom: 24,
      orient: 'vertical',
      textStyle: { fontSize: 11, color: '#595959' },
    },
    series: [
      {
        name: '区域造价',
        type: 'map',
        map: 'china',
        roam: false,
        emphasis: { label: { show: true, color: '#fff' }, itemStyle: { areaColor: '#1677ff' } },
        label: { show: true, fontSize: 10, color: '#fff' },
        data: props.provinces,
      },
    ],
  }
}

function resize() {
  chart?.resize()
}

async function initMap() {
  mapError.value = false
  try {
    await ensureChinaMapRegistered()
  } catch {
    mapError.value = true
    return
  }
  await nextTick()
  if (!mapEl.value) return
  if (!chart) chart = echarts.init(mapEl.value)
  chart.setOption(buildMapOption(), true)
}

onMounted(() => {
  void initMap()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  chart?.dispose()
  chart = null
})

watch(
  () => props.provinces,
  () => {
    if (chart && !mapError.value) chart.setOption(buildMapOption(), true)
  },
  { deep: true },
)
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <div class="head">
      <h2 class="title">区域情况</h2>
      <div class="filters">
        <el-select v-model="bid" placeholder="招标项目" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in BID_PROJECT_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="cost" placeholder="项目造价" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in PROJECT_COST_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="eng" placeholder="工程类型" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in ENGINEERING_TYPE_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="region" placeholder="省/市/区" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in REGION_SELECT_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="monthrange"
          range-separator="→"
          value-format="YYYY-MM"
          style="width: 220px"
          @change="notify"
        />
      </div>
    </div>
    <el-divider class="sep" />

    <div class="split">
      <div class="map-side">
        <div v-if="mapError" class="map-fallback">地图加载失败，请检查网络</div>
        <div v-show="!mapError" ref="mapEl" class="map-el" />
      </div>
      <div class="table-side">
        <div class="tbl-actions">
          <el-button type="primary" size="small">
            <svg-icon icon="mdi:view-grid-outline" width="16" height="16" class="mr-1" />
            区域配置
          </el-button>
        </div>
        <el-table
          :data="rows"
          class="pa-table"
          stripe
          :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
        >
          <el-table-column type="index" label="序号" width="56" align="center" />
          <el-table-column prop="region" label="区域" min-width="100" show-overflow-tooltip />
          <el-table-column label="项目个数/同比" min-width="140" align="center">
            <template #default="{ row }">
              <SlashYoY :value="row.count" :yoy-percent="row.countYoy" />
            </template>
          </el-table-column>
          <el-table-column label="项目金额/同比" min-width="140" align="center">
            <template #default="{ row }">
              <SlashYoY :value="row.amount" :yoy-percent="row.amountYoy" />
            </template>
          </el-table-column>
          <el-table-column prop="trackedCount" label="跟踪项目数" width="110" align="center" />
          <el-table-column prop="trackedAmount" label="跟踪项目金额" width="120" align="center" />
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.dash-card {
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #262626;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.sep {
  margin: 14px 0 16px;
  border-color: #f0f0f0;
}
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}
@media (max-width: 1100px) {
  .split {
    grid-template-columns: 1fr;
  }
}
.map-side {
  min-height: 420px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  position: relative;
}
.map-el {
  width: 100%;
  height: 420px;
}
.map-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 420px;
  color: #8c8c8c;
  font-size: 14px;
}
.table-side {
  min-width: 0;
}
.tbl-actions {
  margin-bottom: 10px;
}
.mr-1 {
  margin-right: 4px;
  vertical-align: middle;
}
.pa-table {
  width: 100%;
}
</style>
