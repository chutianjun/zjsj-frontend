<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type {
  BidProjectRow,
  EarlyOpportunityModulePayload,
  GroupRankRow,
  MonthlyTrendModulePayload,
  ProjectSituationCard,
  ProvinceMapValue,
  RegionTableRow,
  TypeStatusRow,
  UnitRankRow,
} from './project-analysis-dashboard/types'
import {
  fetchBidProjectTable,
  fetchEarlyOpportunityModule,
  fetchEngineeringTypeStatus,
  fetchGuangdongGridUnits,
  fetchKeyProjectMonthlyTrend,
  fetchProjectAmountMonthlyTrend,
  fetchProjectCostBoard,
  fetchProjectCostGroupRank,
  fetchProjectCostUnitRank,
  fetchProjectSituationCards,
  fetchRegionMapAndTable,
} from './project-analysis-dashboard/api'
import ModuleProjectSituation from './project-analysis-dashboard/components/ModuleProjectSituation.vue'
import ModuleEarlyOpportunityAnalysis from './project-analysis-dashboard/components/ModuleEarlyOpportunityAnalysis.vue'
import ModuleKeyProjectsTrendDual from './project-analysis-dashboard/components/ModuleKeyProjectsTrendDual.vue'
import ModuleBidProjectTable from './project-analysis-dashboard/components/ModuleBidProjectTable.vue'
import ModuleRegionalSituation from './project-analysis-dashboard/components/ModuleRegionalSituation.vue'
import ModuleProjectCostAnalysisBoard from './project-analysis-dashboard/components/ModuleProjectCostAnalysisBoard.vue'
import ModuleCustomerBidProjectSituation from './project-analysis-dashboard/components/ModuleCustomerBidProjectSituation.vue'
import ModuleEngineeringTypeStatus from './project-analysis-dashboard/components/ModuleEngineeringTypeStatus.vue'
import ModuleGuangdongGridTable from './project-analysis-dashboard/components/ModuleGuangdongGridTable.vue'

const loading = ref(false)
const loadError = ref<string | null>(null)

const situationCards = ref<ProjectSituationCard[]>([])
const earlyOpportunity = ref<EarlyOpportunityModulePayload | null>(null)
const keyProjectTrend = ref<MonthlyTrendModulePayload | null>(null)
const amountTrend = ref<MonthlyTrendModulePayload | null>(null)
const bidRows = ref<BidProjectRow[]>([])
const regionProvinces = ref<ProvinceMapValue[]>([])
const regionRows = ref<RegionTableRow[]>([])
const costBoard = ref<Awaited<ReturnType<typeof fetchProjectCostBoard>> | null>(null)
const costUnitRows = ref<UnitRankRow[]>([])
const costGroupRows = ref<GroupRankRow[]>([])
const engTypeRows = ref<{ building: TypeStatusRow[]; infra: TypeStatusRow[] } | null>(null)
const gdGridRows = ref<UnitRankRow[]>([])
/** 重点项目双图共用的年份筛选 */
const trendYear = ref('2024')

async function reloadTrendCharts(year: string) {
  trendYear.value = year
  const [q, a] = await Promise.all([
    fetchKeyProjectMonthlyTrend(year),
    fetchProjectAmountMonthlyTrend(year),
  ])
  keyProjectTrend.value = q
  amountTrend.value = a
}

async function reloadCostBidSituation() {
  const [units, groups] = await Promise.all([
    fetchProjectCostUnitRank(),
    fetchProjectCostGroupRank(),
  ])
  costUnitRows.value = units
  costGroupRows.value = groups
}

async function loadAll() {
  loading.value = true
  loadError.value = null
  try {
    const [
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m9,
      m10,
      m11,
    ] = await Promise.all([
      fetchProjectSituationCards(),
      fetchEarlyOpportunityModule(),
      fetchKeyProjectMonthlyTrend(trendYear.value),
      fetchProjectAmountMonthlyTrend(trendYear.value),
      fetchBidProjectTable(),
      fetchRegionMapAndTable(),
      fetchProjectCostBoard(),
      fetchProjectCostUnitRank(),
      fetchProjectCostGroupRank(),
      fetchEngineeringTypeStatus(),
      fetchGuangdongGridUnits(),
    ])
    situationCards.value = m1
    earlyOpportunity.value = m2
    keyProjectTrend.value = m3
    amountTrend.value = m4
    bidRows.value = m5
    regionProvinces.value = m6.provinces
    regionRows.value = m6.rows
    costBoard.value = m7
    costUnitRows.value = m8
    costGroupRows.value = m9
    engTypeRows.value = m10
    gdGridRows.value = m11
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadAll()
})
</script>

<template>
  <div class="pa-page min-h-full pb-6">
    <div class="pa-shell">
      <header class="pa-header">
        <h1 class="m-0 text-lg font-bold text-[#262626]">项目信息分析看板</h1>
        <el-button type="primary" link :loading="loading" @click="loadAll">刷新</el-button>
      </header>

      <div class="pa-body pt-4">
      <el-alert v-if="loadError" type="error" :closable="false" :title="loadError" show-icon class="mb-4" />

      <div v-loading="loading" class="flex flex-col gap-4">
        <ModuleProjectSituation :cards="situationCards" @filter-change="() => loadAll()" />
        <ModuleEarlyOpportunityAnalysis v-if="earlyOpportunity" :data="earlyOpportunity" @filter-change="() => loadAll()" />
        <ModuleKeyProjectsTrendDual
          v-if="keyProjectTrend && amountTrend"
          :year="trendYear"
          :quantity-payload="keyProjectTrend"
          :amount-payload="amountTrend"
          @year-change="reloadTrendCharts"
        />
        <ModuleBidProjectTable :rows="bidRows" @filter-change="() => loadAll()" />
        <ModuleRegionalSituation :provinces="regionProvinces" :rows="regionRows" @filter-change="() => loadAll()" />
        <ModuleProjectCostAnalysisBoard
          v-if="costBoard"
          :summary="costBoard.summary"
          :brackets="costBoard.brackets"
          :customers="costBoard.customers"
          @filter-change="() => loadAll()"
        />
        <ModuleCustomerBidProjectSituation
          :unit-rows="costUnitRows"
          :group-rows="costGroupRows"
          @filter-change="() => reloadCostBidSituation()"
        />
        <ModuleEngineeringTypeStatus
          v-if="engTypeRows"
          :building="engTypeRows.building"
          :infra="engTypeRows.infra"
          @filter-change="() => loadAll()"
        />
        <ModuleGuangdongGridTable :rows="gdGridRows" @filter-change="() => loadAll()" />
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pa-page {
  min-height: calc(100vh - 60px);
  background: #f0f2f5;
}
.pa-shell {
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 20px;
}
.pa-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.pa-body {
  width: 100%;
}
</style>
