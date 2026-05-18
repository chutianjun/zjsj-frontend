<script setup lang="ts">
import { ref } from 'vue'
import type { EarlyOpportunityModulePayload } from '../types'
import {
  PROJECT_COST_OPTIONS,
  ENGINEERING_TYPE_OPTIONS,
  BID_PROJECT_OPTIONS,
} from '../constants'
import TrendYoyText from './TrendYoyText.vue'
import DonutCustomerChart from './DonutCustomerChart.vue'

defineProps<{
  data: EarlyOpportunityModulePayload
}>()

const emit = defineEmits<{ filterChange: [Record<string, unknown>] }>()

const preBid = ref('')
const cost = ref('')
const eng = ref('')
const dateRange = ref<[string, string] | null>(null)
const phasePage = ref(1)

function notify() {
  emit('filterChange', {
    preBid: preBid.value,
    cost: cost.value,
    eng: eng.value,
    dateRange: dateRange.value,
  })
}
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <div class="head">
      <h2 class="title">前期商机分析</h2>
      <div class="filters">
        <el-select v-model="preBid" placeholder="是否拟招标" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in BID_PROJECT_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="cost" placeholder="项目造价" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in PROJECT_COST_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="eng" placeholder="工程类型" clearable style="width: 132px" @change="notify">
          <el-option v-for="o in ENGINEERING_TYPE_OPTIONS" :key="String(o.value)" :label="o.label" :value="o.value" />
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

    <div class="body-grid">
      <div class="left-col">
        <div class="summary-row">
          <div class="sum-card">
            <div class="sum-label">项目数量</div>
            <div class="sum-main">
              <span class="sum-num">{{ data.summary.projectCount.toLocaleString() }}</span>
              <TrendYoyText class="sum-yoy" :percent="data.summary.projectCountYoy" plain-number />
            </div>
          </div>
          <div class="sum-card">
            <div class="sum-label">项目金额</div>
            <div class="sum-main">
              <span class="sum-num">{{ data.summary.projectAmount.toLocaleString() }}</span>
              <TrendYoyText class="sum-yoy" :percent="data.summary.projectAmountYoy" plain-number />
            </div>
          </div>
        </div>

        <el-table
          :data="data.phases"
          class="pa-table"
          stripe
          :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
        >
          <el-table-column prop="phase" label="项目阶段" min-width="120" />
          <el-table-column label="数量" width="100" align="center">
            <template #default="{ row }">
              <span>{{ row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column label="同比" width="100" align="center">
            <template #default="{ row }">
              <TrendYoyText :percent="row.countYoy" />
            </template>
          </el-table-column>
          <el-table-column label="项目造价(亿元)" width="130" align="center" prop="costYi" />
          <el-table-column label="同比" width="100" align="center">
            <template #default="{ row }">
              <TrendYoyText :percent="row.costYoy" />
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination
            v-model:current-page="phasePage"
            layout="prev, pager, next"
            :total="50"
            :page-size="5"
            size="small"
          />
        </div>
      </div>
      <div class="right-col">
        <DonutCustomerChart :slices="data.customers" />
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
.sum-yoy {
  flex-shrink: 0;
}
.pa-table {
  width: 100%;
}
.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
