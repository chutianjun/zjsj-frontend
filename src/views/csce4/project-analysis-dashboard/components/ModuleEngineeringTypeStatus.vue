<script setup lang="ts">
import { ref } from 'vue'
import type { TypeStatusRow } from '../types'
import { BID_PROJECT_OPTIONS, PROJECT_COST_OPTIONS, ENGINEERING_TYPE_OPTIONS, REGION_SELECT_OPTIONS } from '../constants'
import SlashYoY from './SlashYoY.vue'

defineProps<{
  building: TypeStatusRow[]
  infra: TypeStatusRow[]
}>()

const emit = defineEmits<{ filterChange: [Record<string, unknown>] }>()

const bid = ref('')
const cost = ref('')
const eng = ref('')
const region = ref('')
const dateRange = ref<[string, string] | null>(null)

function notify() {
  emit('filterChange', {
    bid: bid.value,
    cost: cost.value,
    eng: eng.value,
    region: region.value,
    dateRange: dateRange.value,
  })
}
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <div class="head">
      <h2 class="title">工程类型情况</h2>
      <div class="filters">
        <el-select v-model="bid" placeholder="是否拟招标" clearable style="width: 132px" @change="notify">
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
      <div class="col">
        <el-table
          :data="building"
          class="pa-table"
          stripe
          :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
        >
          <el-table-column type="index" label="序号" width="52" />
          <el-table-column prop="name" label="房建二级类别" min-width="120" show-overflow-tooltip />
          <el-table-column label="项目个数/同比" min-width="130" align="center">
            <template #default="{ row }">
              <SlashYoY :value="row.count" :yoy-percent="row.countYoy" />
            </template>
          </el-table-column>
          <el-table-column label="项目金额(亿元)/同比" min-width="160" align="center">
            <template #default="{ row }">
              <SlashYoY :value="row.amountYi" :yoy-percent="row.amountYoy" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="vline" />
      <div class="col">
        <el-table
          :data="infra"
          class="pa-table"
          stripe
          :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
        >
          <el-table-column type="index" label="序号" width="52" />
          <el-table-column prop="name" label="基建二级类别" min-width="120" show-overflow-tooltip />
          <el-table-column label="项目个数/同比" min-width="130" align="center">
            <template #default="{ row }">
              <SlashYoY :value="row.count" :yoy-percent="row.countYoy" />
            </template>
          </el-table-column>
          <el-table-column label="项目金额(亿元)/同比" min-width="160" align="center">
            <template #default="{ row }">
              <SlashYoY :value="row.amountYi" :yoy-percent="row.amountYoy" />
            </template>
          </el-table-column>
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
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  align-items: stretch;
}
.vline {
  width: 1px;
  background: #f0f0f0;
  margin: 0 8px;
}
.col {
  min-width: 0;
}
.pa-table {
  width: 100%;
}
@media (max-width: 1100px) {
  .split {
    grid-template-columns: 1fr;
  }
  .vline {
    display: none;
  }
}
</style>
