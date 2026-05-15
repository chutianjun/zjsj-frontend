<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchOpportunities, type OpportunityRow } from '../api/opportunity'

const loading = ref(false)
const rows = ref<OpportunityRow[]>([])
const errorMessage = ref<string | null>(null)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)

async function load() {
  loading.value = true
  errorMessage.value = null
  try {
    const data = await fetchOpportunities({
      page: page.value,
      pageSize: pageSize.value,
    })
    rows.value = data.items
    total.value = data.total
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    loading.value = false
  }
}

function handleCurrentChange() {
  void load()
}

function handleSizeChange() {
  page.value = 1
  void load()
}

onMounted(() => {
  void load()
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>项目商机（演示列表）</span>
        <el-button type="primary" link :loading="loading" @click="load">刷新</el-button>
      </div>
    </template>

    <el-alert
      v-if="errorMessage"
      type="error"
      :closable="false"
      :title="errorMessage"
      show-icon
      style="margin-bottom: 12px"
    />

    <el-table v-loading="loading" :data="rows" stripe border style="width: 100%">
      <el-table-column prop="projectCode" label="项目编码" min-width="140" />
      <el-table-column prop="projectName" label="商机名称" min-width="220" show-overflow-tooltip />
      <el-table-column prop="projectCost" label="金额(万元)" width="120" />
      <el-table-column prop="province" label="省" width="100" />
      <el-table-column prop="city" label="市" width="100" />
      <el-table-column prop="source" label="来源" width="90" />
      <el-table-column prop="updatedAt" label="更新时间" min-width="170" />
    </el-table>

    <div class="pager-wrap">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pager-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
