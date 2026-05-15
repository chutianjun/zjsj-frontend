<script setup lang="ts">
import type { MonthlyTrendModulePayload } from '../types'
import { YEAR_OPTIONS } from '../constants'
import TrendYoyText from './TrendYoyText.vue'
import MonthlyComboTrendChart from './MonthlyComboTrendChart.vue'

defineProps<{
  year: string
  quantityPayload: MonthlyTrendModulePayload
  amountPayload: MonthlyTrendModulePayload
}>()

const emit = defineEmits<{
  yearChange: [year: string]
}>()
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <h2 class="module-title">重点项目</h2>
    <div class="year-row">
      <el-select
        :model-value="year"
        style="width: 110px"
        @update:model-value="(v: string | number) => emit('yearChange', String(v))"
      >
        <el-option v-for="y in YEAR_OPTIONS" :key="y.value" :label="y.label" :value="y.value" />
      </el-select>
    </div>

    <section class="chart-section">
      <div class="chart-head">
        <div class="chart-head-inner">
          <span class="chart-title">全年项目数量走势图</span>
          <div class="chart-meta">
            <span class="meta-t">项目总数：{{ quantityPayload.headlineTotal }}（个）</span>
            <TrendYoyText :percent="quantityPayload.overallYoyPercent" />
          </div>
        </div>
      </div>
      <MonthlyComboTrendChart variant="count" :payload="quantityPayload" />
    </section>

    <el-divider class="dash-sep" border-style="dashed" />

    <section class="chart-section">
      <div class="chart-head">
        <div class="chart-head-inner">
          <span class="chart-title">全年项目金额走势图</span>
          <div class="chart-meta">
            <span class="meta-t">项目总造价: {{ amountPayload.headlineTotal }}(亿元)</span>
            <TrendYoyText :percent="amountPayload.overallYoyPercent" />
          </div>
        </div>
      </div>
      <MonthlyComboTrendChart variant="amount" :payload="amountPayload" />
    </section>
  </el-card>
</template>

<style scoped>
.dash-card {
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}
.module-title {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: #262626;
}
.year-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 14px;
}
.chart-section {
  margin-top: 4px;
}
.chart-head {
  margin-bottom: 6px;
}
.chart-head-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px 28px;
}
.chart-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}
.chart-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  flex-shrink: 0;
}
.meta-t {
  color: #595959;
}
.dash-sep {
  margin: 8px 0 18px;
  border-color: #e8e8e8;
}
</style>
