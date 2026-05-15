export interface YoYValue {
  value: number
  /** 正数为同比上行 */
  yoyPercent: number
}

export interface ProjectSituationCard {
  title: string
  variant: 'blue' | 'purple'
  icon: 'target' | 'gavel'
  metrics: Array<{
    label: string
    valueText: string
    yoy?: YoYValue
  }>
}

export interface PhaseTableRow {
  phase: string
  count: number
  countYoy: number
  costYi: number
  costYoy: number
}

export interface CustomerDonutSlice {
  name: string
  value: number
}

export interface MonthlyTrendPoint {
  month: number
  current: number
  previous: number
  yoyPercent: number
}

/** 重点项目 / 金额走势 图表接口 */
export interface MonthlyTrendModulePayload {
  months: MonthlyTrendPoint[]
  /** 年度汇总展示用 */
  headlineTotal: number
  /** 整体同比 */
  overallYoyPercent: number
}

export interface EarlyOpportunityModulePayload {
  summary: {
    projectCount: number
    projectCountYoy: number
    projectAmount: number
    projectAmountYoy: number
  }
  phases: PhaseTableRow[]
  customers: CustomerDonutSlice[]
}

export interface BidProjectRow {
  name: string
  costYi: number
  groupName: string
  region: string
  bidDate: string
  trackUnits: number
}

export interface RegionTableRow {
  region: string
  count: number
  countYoy: number
  amount: number
  amountYoy: number
  trackedCount: number
  trackedAmount: number
}

export interface ProvinceMapValue {
  name: string
  value: number
}

export interface CostBracketRow {
  bracket: string
  count: number
  countYoy: number
  costYi: number
  costYoy: number
}

export interface UnitRankRow {
  unitName: string
  groupName: string
  projectCount: number
  amountYi: number
  trackedCount: number
  trackedAmountYi: number
  location: string
}

export interface GroupRankRow {
  groupName: string
  projectCount: number
  amountYi: number
  trackedCount: number
  trackedAmountYi: number
  subsidiaryWithProject: number
  location: string
}

export interface TypeStatusRow {
  name: string
  count: number
  countYoy: number
  amountYi: number
  amountYoy: number
}
