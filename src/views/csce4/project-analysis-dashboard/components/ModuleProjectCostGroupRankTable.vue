<script setup lang="ts">
import { ref } from 'vue'
import type { GroupRankRow } from '../types'

defineProps<{
  rows: GroupRankRow[]
}>()

const page = ref(2)
const pageSize = ref(5)
</script>

<template>
  <el-card class="dash-card" shadow="never">
    <el-table
      :data="rows"
      class="pa-table"
      stripe
      :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
    >
      <el-table-column type="index" label="序号" width="56" align="center" />
      <el-table-column prop="groupName" label="单位集团名称" min-width="200" show-overflow-tooltip />
      <el-table-column prop="projectCount" label="项目个数" width="110" align="center" sortable />
      <el-table-column prop="amountYi" label="项目金额(亿元)" width="130" align="center" sortable />
      <el-table-column prop="trackedCount" label="跟踪项目数" width="120" align="center" sortable />
      <el-table-column prop="trackedAmountYi" label="跟踪项目金额(亿元)" width="160" align="center" sortable />
      <el-table-column prop="subsidiaryWithProject" label="下属企业个数(有项目)" width="180" align="center" sortable />
      <el-table-column prop="location" label="单位所在地" width="130" show-overflow-tooltip />
    </el-table>

    <div class="pager">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="440"
        :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, sizes, jumper"
      />
    </div>
  </el-card>
</template>

<style scoped>
.dash-card {
  border-radius: 4px;
  border: 1px solid #e8e8e8;
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
