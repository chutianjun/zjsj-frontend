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
        <div class="icon-wrap" :class="c.variant">
          <svg-icon v-if="c.icon === 'target'" icon="mdi:bullseye-arrow" width="18" height="18" class="icon-fg" />
          <svg-icon v-else icon="mdi:gavel" width="18" height="18" class="icon-fg" />
        </div>
        <div class="body">
          <div class="cell-title">{{ c.title }}</div>
          <div v-if="c.variant === 'blue'" class="metrics blue-metrics">
            <div class="blue-metric-row">
              <div v-for="(m, mi) in c.metrics" :key="mi" class="metric-cell">
                <span class="muted">{{ m.label }}:</span>
                <span class="strong">{{ m.valueText }}</span>
              </div>
            </div>
          </div>
          <div v-else class="metrics purple-metrics">
            <div v-for="(m, mi) in c.metrics" :key="mi" class="metric-row split">
              <span class="strong">{{ m.valueText }}</span>
              <TrendYoyText v-if="m.yoy" class="yoy-inline" :percent="m.yoy.yoyPercent" />
            </div>
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
  gap: 16px;
  padding: 20px 20px 22px;
  min-height: 120px;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
}
.cell:nth-child(3n) {
  border-right: none;
}
.cell:nth-child(n + 4) {
  border-bottom: none;
}
.icon-wrap {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
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
  color: #fff;
}
.body {
  flex: 1;
  min-width: 0;
}
.cell-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 12px;
  line-height: 1.35;
}
.metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.blue-metric-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  font-size: 13px;
  align-items: baseline;
}
.metric-cell {
  display: flex;
  gap: 4px;
  flex-wrap: nowrap;
  min-width: 0;
}
.muted {
  color: #8c8c8c;
}
.strong {
  color: #262626;
  font-weight: 600;
}
.purple-metrics .split {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.yoy-inline {
  flex-shrink: 0;
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
