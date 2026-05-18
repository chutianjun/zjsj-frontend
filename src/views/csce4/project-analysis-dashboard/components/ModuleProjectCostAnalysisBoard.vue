<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CostBracketRow, CustomerDonutSlice } from '../types'
import { BID_PROJECT_OPTIONS, PROJECT_COST_OPTIONS, ENGINEERING_TYPE_OPTIONS, REGION_SELECT_OPTIONS, COST_BRACKET_SEGMENTS } from '../constants'
import TrendYoyText from './TrendYoyText.vue'
import DonutCustomerChart from './DonutCustomerChart.vue'

const props = defineProps<{
  summary: {
    projectCount: number
    projectCountYoy: number
    projectAmount: number
    projectAmountYoy: number
  }
  brackets: CostBracketRow[]
  customers: CustomerDonutSlice[]
}>()

const emit = defineEmits<{ filterChange: [Record<string, unknown>] }>()

const bid = ref('')
const cost = ref('')
const eng = ref('')
const region = ref('')
const dateRange = ref<[string, string] | null>(null)
const phasePage = ref(1)
const segment = ref<(typeof COST_BRACKET_SEGMENTS)[number]>('全部')

const donutSlices = computed(() => {
  if (segment.value === '全部') return props.customers
  const idx = COST_BRACKET_SEGMENTS.indexOf(segment.value)
  const k = 0.82 + (idx % 6) * 0.03
  return props.customers.map((c) => ({ ...c, value: Math.max(1, Math.round(c.value * k)) }))
})

function notify() {
  emit('filterChange', {
    bid: bid.value,
    cost: cost.value,
    eng: eng.value,
    region: region.value,
    dateRange: dateRange.value,
    segment: segment.value,
  })
}
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <div class="head">
      <h2 class="title">项目造价分析</h2>
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

    <div class="body-grid">
      <div class="left-col">
        <div class="summary-row">
          <div class="sum-card">
            <div class="sum-label">项目数量</div>
            <div class="sum-main">
              <span class="sum-num">{{ summary.projectCount.toLocaleString() }}</span>
              <TrendYoyText :percent="summary.projectCountYoy" plain-number />
            </div>
          </div>
          <div class="sum-card">
            <div class="sum-label">项目金额</div>
            <div class="sum-main">
              <span class="sum-num">{{ summary.projectAmount.toLocaleString() }}</span>
              <TrendYoyText :percent="summary.projectAmountYoy" plain-number />
            </div>
          </div>
        </div>

        <el-table
          :data="brackets"
          class="pa-table"
          stripe
          :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
        >
          <el-table-column prop="bracket" label="项目金额" min-width="100" />
          <el-table-column prop="count" label="数量" width="90" align="center" />
          <el-table-column label="同比" width="100" align="center">
            <template #default="{ row }">
              <TrendYoyText :percent="row.countYoy" />
            </template>
          </el-table-column>
          <el-table-column prop="costYi" label="项目造价(亿元)" width="130" align="center" />
          <el-table-column label="同比" width="100" align="center">
            <template #default="{ row }">
              <TrendYoyText :percent="row.costYoy" />
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination v-model:current-page="phasePage" layout="prev, pager, next" :total="50" :page-size="5" small />
        </div>
      </div>
      <div class="right-col">
        <el-radio-group v-model="segment" size="small" class="seg" @change="notify">
          <el-radio-button v-for="s in COST_BRACKET_SEGMENTS" :key="s" :value="s">{{ s }}</el-radio-button>
        </el-radio-group>
        <DonutCustomerChart :slices="donutSlices" />
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
  margin: 14px 0 18px;
  border-color: #f0f0f0;
}
.body-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}
.left-col,
.right-col {
  flex: 1 1 0;
  min-width: min(100%, 520px);
}
.summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}
.sum-card {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 12px 14px;
}
.sum-label {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 8px;
}
.sum-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.sum-num {
  font-size: 22px;
  font-weight: 700;
  color: #262626;
}
.pa-table {
  width: 100%;
}
.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
.seg {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}
</style>
