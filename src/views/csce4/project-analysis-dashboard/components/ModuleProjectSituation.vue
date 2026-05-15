<script setup lang="ts">
import { ref } from 'vue'
import type { ProjectSituationCard } from '../types'
import {
  PROJECT_COST_OPTIONS,
  ENGINEERING_TYPE_OPTIONS,
  CUSTOMER_NATURE_OPTIONS,
} from '../constants'
import TrendYoyText from './TrendYoyText.vue'

defineProps<{
  cards: ProjectSituationCard[]
}>()

const emit = defineEmits<{
  filterChange: [payload: Record<string, unknown>]
}>()

const cost = ref('')
const engType = ref('')
const customer = ref('')
const dateRange = ref<[Date, Date] | null>(null)

function notify() {
  emit('filterChange', { cost: cost.value, engType: engType.value, customer: customer.value, dateRange: dateRange.value })
}
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <div class="head">
      <h2 class="title">项目情况</h2>
      <div class="filters">
        <el-select v-model="cost" placeholder="项目造价" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in PROJECT_COST_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="engType" placeholder="工程类型" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in ENGINEERING_TYPE_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="customer" placeholder="客户性质" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in CUSTOMER_NATURE_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="monthrange"
          range-separator="→"
          start-placeholder="开始"
          end-placeholder="结束"
          value-format="YYYY-MM"
          style="width: 220px"
          @change="notify"
        />
      </div>
    </div>
    <el-divider class="sep" />

    <div class="grid">
      <div v-for="(c, idx) in cards" :key="idx" class="cell" :class="c.variant">
        <div class="cell-top">
          <div class="icon-wrap" :class="c.variant">
            <svg-icon v-if="c.icon === 'target'" icon="mdi:bullseye-arrow" width="14" height="14" class="icon-fg" />
            <svg-icon v-else icon="mdi:gavel" width="14" height="14" class="icon-fg" />
          </div>
          <div class="cell-title">{{ c.title }}</div>
        </div>
        <div class="metrics-row">
          <div
            v-for="(m, mi) in c.metrics"
            :key="mi"
            class="metric-side"
            :class="{ 'metric-side--end': mi === 1 }"
          >
            <template v-if="c.variant === 'blue'">
              <span class="muted">{{ m.label }}:</span>
              <span class="strong">{{ m.valueText }}</span>
            </template>
            <template v-else>
              <span class="strong">{{ m.valueText }}</span>
              <TrendYoyText v-if="m.yoy" :percent="m.yoy.yoyPercent" />
            </template>
          </div>
        </div>
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
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}
.cell {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 22px;
  min-height: 120px;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
}
.cell-top {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cell:nth-child(3n) {
  border-right: none;
}
.cell:nth-child(n + 4) {
  border-bottom: none;
}
.icon-wrap {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-wrap.blue {
  background: #1677ff;
}
.icon-wrap.purple {
  background: #722ed1;
}
.icon-fg {
  display: block;
  color: #fff;
  line-height: 0;
}
.cell-title {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  line-height: 1.35;
}
.metrics-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  padding-left: 48px;
  font-size: 13px;
}
.metric-side {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  min-width: 0;
}
.metric-side--end {
  justify-content: flex-end;
  text-align: right;
}
.muted {
  color: #8c8c8c;
}
.strong {
  color: #262626;
  font-weight: 600;
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cell:nth-child(3n) {
    border-right: 1px solid #f0f0f0;
  }
  .cell:nth-child(2n) {
    border-right: none;
  }
  .cell:nth-child(n + 4) {
    border-bottom: 1px solid #f0f0f0;
  }
  .cell:nth-child(n + 5) {
    border-bottom: none;
  }
}
</style>
