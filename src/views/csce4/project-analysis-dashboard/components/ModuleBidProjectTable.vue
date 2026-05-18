<script setup lang="ts">
import { ref } from 'vue'
import type { BidProjectRow } from '../types'
import { BID_PROJECT_OPTIONS, PROJECT_COST_OPTIONS, ENGINEERING_TYPE_OPTIONS, REGION_SELECT_OPTIONS } from '../constants'

defineProps<{
  rows: BidProjectRow[]
}>()

const emit = defineEmits<{ filterChange: [Record<string, unknown>] }>()

const bid = ref('')
const cost = ref('')
const eng = ref('')
const region = ref('')
const page = ref(2)
const pageSize = ref(5)

function notify() {
  emit('filterChange', { bid: bid.value, cost: cost.value, eng: eng.value, region: region.value, page: page.value, pageSize: pageSize.value })
}
</script>

<template>
  <el-card class="dash-card" shadow="never">
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
    </div>

    <el-table
      :data="rows"
      class="pa-table mt-3"
      stripe
      :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
    >
      <el-table-column type="index" label="序号" width="64" align="center" />
      <el-table-column prop="name" label="项目名称" min-width="220" show-overflow-tooltip />
      <el-table-column prop="costYi" label="造价(亿元)" width="110" align="center" />
      <el-table-column prop="groupName" label="单位集团名称" min-width="200" show-overflow-tooltip />
      <el-table-column prop="region" label="所在地区" width="130" show-overflow-tooltip />
      <el-table-column prop="bidDate" label="拟招标/招标时间" width="140" align="center" />
      <el-table-column prop="trackUnits" label="跟踪单位数" width="110" align="center" />
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
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.mt-3 {
  margin-top: 14px;
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
