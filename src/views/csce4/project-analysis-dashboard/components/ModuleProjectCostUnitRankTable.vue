<script setup lang="ts">
import { ref } from 'vue'
import type { UnitRankRow } from '../types'
import { BID_PROJECT_OPTIONS, PROJECT_COST_OPTIONS, ENGINEERING_TYPE_OPTIONS, REGION_SELECT_OPTIONS } from '../constants'

defineProps<{
  rows: UnitRankRow[]
}>()

const emit = defineEmits<{ filterChange: [Record<string, unknown>] }>()

const bid = ref('')
const cost = ref('')
const eng = ref('')
const region = ref('')
const dateRange = ref<[string, string] | null>(null)
const page = ref(2)
const pageSize = ref(5)

function notify() {
  emit('filterChange', {
    bid: bid.value,
    cost: cost.value,
    eng: eng.value,
    region: region.value,
    dateRange: dateRange.value,
    page: page.value,
    pageSize: pageSize.value,
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

    <el-table
      :data="rows"
      class="pa-table"
      stripe
      :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
    >
      <el-table-column type="index" label="序号" width="56" align="center" />
      <el-table-column prop="unitName" label="单位名称" min-width="180" show-overflow-tooltip sortable />
      <el-table-column prop="groupName" label="单位集团名称" min-width="180" show-overflow-tooltip />
      <el-table-column prop="projectCount" label="项目个数" width="110" align="center" sortable />
      <el-table-column prop="amountYi" label="项目金额(亿元)" width="130" align="center" sortable />
      <el-table-column prop="trackedCount" label="跟踪项目数" width="120" align="center" sortable />
      <el-table-column prop="trackedAmountYi" label="跟踪项目金额(亿元)" width="160" align="center" sortable />
      <el-table-column prop="location" label="单位所在地" width="130" show-overflow-tooltip />
    </el-table>

    <div class="pager">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="440"
        :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, sizes, jumper"
        @current-change="notify"
        @size-change="notify"
      />
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
.pa-table {
  width: 100%;
}
.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}
</style>
