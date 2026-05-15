/** 项目全生命周期看板 — 11 路接口占位（进入页面时并行请求） */

import type {
  BidProjectRow,
  CostBracketRow,
  CustomerDonutSlice,
  EarlyOpportunityModulePayload,
  GroupRankRow,
  MonthlyTrendModulePayload,
  ProjectSituationCard,
  ProvinceMapValue,
  RegionTableRow,
  TypeStatusRow,
  UnitRankRow,
} from './types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchProjectSituationCards(): Promise<ProjectSituationCard[]> {
  await delay(80)
  return [
    {
      title: '拟招标项目',
      variant: 'blue',
      icon: 'target',
      metrics: [
        { label: '项目总数', valueText: '356个' },
        { label: '项目总造价', valueText: '1930亿元' },
      ],
    },
    {
      title: '广东省拟招标项目',
      variant: 'blue',
      icon: 'target',
      metrics: [
        { label: '项目总数', valueText: '356个' },
        { label: '项目总造价', valueText: '1930亿元' },
      ],
    },
    {
      title: '基建拟招标项目',
      variant: 'blue',
      icon: 'target',
      metrics: [
        { label: '项目总数', valueText: '356个' },
        { label: '项目总造价', valueText: '1930亿元' },
      ],
    },
    {
      title: '已招标项目',
      variant: 'purple',
      icon: 'gavel',
      metrics: [
        { label: '', valueText: '356个', yoy: { value: 356, yoyPercent: 12 } },
        { label: '', valueText: '1930亿元', yoy: { value: 1930, yoyPercent: -11 } },
      ],
    },
    {
      title: '广东省已招标项目',
      variant: 'purple',
      icon: 'gavel',
      metrics: [
        { label: '', valueText: '356个', yoy: { value: 356, yoyPercent: 12 } },
        { label: '', valueText: '1930亿元', yoy: { value: 1930, yoyPercent: -11 } },
      ],
    },
    {
      title: '基建已招标项目',
      variant: 'purple',
      icon: 'gavel',
      metrics: [
        { label: '', valueText: '356个', yoy: { value: 356, yoyPercent: 12 } },
        { label: '', valueText: '1930亿元', yoy: { value: 1930, yoyPercent: -11 } },
      ],
    },
  ]
}

function mockCustomerSlices(): CustomerDonutSlice[] {
  return [
    { name: '政府部门', value: 566 },
    { name: '国有企业', value: 200 },
    { name: '国有事业单位', value: 120 },
    { name: '民营企业', value: 90 },
    { name: '境内外资企业', value: 88 },
    { name: '境外外资企业', value: 56 },
    { name: '港澳台企业', value: 45 },
    { name: '军队', value: 40 },
    { name: '其他', value: 27 },
  ]
}

/** 前期商机分析（单模块单接口） */
export async function fetchEarlyOpportunityModule(): Promise<EarlyOpportunityModulePayload> {
  await delay(70)
  return {
    summary: {
      projectCount: 8846,
      projectCountYoy: 12,
      projectAmount: 8846,
      projectAmountYoy: -11,
    },
    phases: [
      { phase: '立项批复', count: 2000, countYoy: 12, costYi: 2000, costYoy: 12 },
      { phase: '土地手续', count: 3005, countYoy: -11, costYi: 3005, costYoy: -11 },
      { phase: '可研批复', count: 1001, countYoy: 12, costYi: 1001, costYoy: 12 },
      { phase: '投资备案', count: 2000, countYoy: 12, costYi: 840, costYoy: 12 },
      { phase: '土地获取', count: 3005, countYoy: -11, costYi: 840, costYoy: -11 },
    ],
    customers: mockCustomerSlices(),
  }
}

export async function fetchKeyProjectMonthlyTrend(year = '2024'): Promise<MonthlyTrendModulePayload> {
  await delay(90)
  const y = Number(year) || 2024
  const bump = (y % 5) * 3
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    current: 320 + ((i * 37) % 180) + bump,
    previous: 280 + ((i * 31) % 160),
    yoyPercent: -15 + ((i * 7 + y) % 35),
  }))
  return { months, headlineTotal: 1001 + (y % 3), overallYoyPercent: 12 }
}

export async function fetchProjectAmountMonthlyTrend(year = '2024'): Promise<MonthlyTrendModulePayload> {
  await delay(90)
  const y = Number(year) || 2024
  const bump = (y % 4) * 2
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    current: 350 + ((i * 41) % 220) + bump,
    previous: 300 + ((i * 29) % 200),
    yoyPercent: -12 + ((i * 5 + y) % 30),
  }))
  return { months, headlineTotal: 1930, overallYoyPercent: -11 }
}

export async function fetchBidProjectTable(): Promise<BidProjectRow[]> {
  await delay(60)
  return [
    {
      name: '交椅湾大道(机场东段)及航站六路市政道路工程（一期）',
      costYi: 100,
      groupName: '深圳市前海建设投资控股集团有限公司',
      region: '广东省广州市',
      bidDate: '2025.04.11',
      trackUnits: 2,
    },
    {
      name: '某某产业园区基础设施配套项目',
      costYi: 50,
      groupName: '山东高速集团有限公司',
      region: '山东省济南市',
      bidDate: '2025.03.22',
      trackUnits: 3,
    },
    {
      name: '城市轨道交通线路配套土建工程',
      costYi: 30,
      groupName: '中国中铁股份有限公司',
      region: '广东省深圳市',
      bidDate: '2025.02.18',
      trackUnits: 5,
    },
    {
      name: '片区综合开发项目（示范段）',
      costYi: 40,
      groupName: '中建某某工程局有限公司',
      region: '江苏省南京市',
      bidDate: '2025.01.05',
      trackUnits: 1,
    },
    {
      name: '河道综合整治与景观提升工程',
      costYi: 20,
      groupName: '某水利投资有限公司',
      region: '浙江省杭州市',
      bidDate: '2024.12.12',
      trackUnits: 3,
    },
  ]
}

export async function fetchRegionMapAndTable(): Promise<{
  provinces: ProvinceMapValue[]
  rows: RegionTableRow[]
}> {
  await delay(100)
  return {
    provinces: [
      { name: '广东省', value: 1930 },
      { name: '江苏省', value: 890 },
      { name: '山东省', value: 720 },
      { name: '浙江省', value: 650 },
      { name: '四川省', value: 480 },
      { name: '河南省', value: 410 },
      { name: '湖北省', value: 360 },
      { name: '湖南省', value: 300 },
    ],
    rows: [
      {
        region: '华南区域',
        count: 120,
        countYoy: 12,
        amount: 1930,
        amountYoy: -11,
        trackedCount: 100,
        trackedAmount: 1520,
      },
      {
        region: '华东区域',
        count: 110,
        countYoy: -5,
        amount: 1680,
        amountYoy: 8,
        trackedCount: 99,
        trackedAmount: 1401,
      },
      {
        region: '华北区域',
        count: 98,
        countYoy: 6,
        amount: 1200,
        amountYoy: 12,
        trackedCount: 88,
        trackedAmount: 980,
      },
      {
        region: '西南区域',
        count: 86,
        countYoy: -11,
        amount: 900,
        amountYoy: -3,
        trackedCount: 72,
        trackedAmount: 760,
      },
      {
        region: '西北区域',
        count: 64,
        countYoy: 4,
        amount: 520,
        amountYoy: 7,
        trackedCount: 55,
        trackedAmount: 430,
      },
    ],
  }
}

export async function fetchProjectCostBoard(): Promise<{
  summary: { projectCount: number; projectCountYoy: number; projectAmount: number; projectAmountYoy: number }
  brackets: CostBracketRow[]
  customers: CustomerDonutSlice[]
}> {
  await delay(85)
  return {
    summary: {
      projectCount: 8846,
      projectCountYoy: 12,
      projectAmount: 8846,
      projectAmountYoy: -11,
    },
    brackets: [
      { bracket: '20亿以上', count: 200, countYoy: 12, costYi: 2000, costYoy: 12 },
      { bracket: '10-20亿', count: 300, countYoy: -11, costYi: 3005, costYoy: -11 },
      { bracket: '5-10亿', count: 100, countYoy: 12, costYi: 1001, costYoy: 12 },
      { bracket: '1-5亿', count: 84, countYoy: 12, costYi: 840, costYoy: 12 },
      { bracket: '1亿以下', count: 84, countYoy: -11, costYi: 840, costYoy: -11 },
    ],
    customers: mockCustomerSlices(),
  }
}

export async function fetchProjectCostUnitRank(): Promise<UnitRankRow[]> {
  await delay(55)
  return [
    {
      unitName: '中国五冶集团有限公司',
      groupName: '中国五矿集团有限公司',
      projectCount: 50,
      amountYi: 50,
      trackedCount: 10,
      trackedAmountYi: 10,
      location: '广东省广州市',
    },
    {
      unitName: '中国十九冶集团有限公司',
      groupName: '中国五矿集团有限公司',
      projectCount: 40,
      amountYi: 40,
      trackedCount: 10,
      trackedAmountYi: 10,
      location: '广东省广州市',
    },
    {
      unitName: '中冶建工集团有限公司',
      groupName: '中国五矿集团有限公司',
      projectCount: 30,
      amountYi: 30,
      trackedCount: 10,
      trackedAmountYi: 10,
      location: '广东省广州市',
    },
    {
      unitName: '中国二十冶集团有限公司',
      groupName: '中国冶金科工集团有限公司',
      projectCount: 20,
      amountYi: 20,
      trackedCount: 10,
      trackedAmountYi: 10,
      location: '广东省广州市',
    },
    {
      unitName: '上海宝冶集团有限公司',
      groupName: '中国五矿集团有限公司',
      projectCount: 10,
      amountYi: 10,
      trackedCount: 10,
      trackedAmountYi: 10,
      location: '广东省广州市',
    },
  ]
}

export async function fetchProjectCostGroupRank(): Promise<GroupRankRow[]> {
  await delay(55)
  return [
    {
      groupName: '中国五矿集团有限公司',
      projectCount: 50,
      amountYi: 50,
      trackedCount: 10,
      trackedAmountYi: 10,
      subsidiaryWithProject: 100,
      location: '广东省广州市',
    },
    {
      groupName: '陕西建工控股集团有限公司',
      projectCount: 40,
      amountYi: 40,
      trackedCount: 10,
      trackedAmountYi: 10,
      subsidiaryWithProject: 50,
      location: '广东省广州市',
    },
    {
      groupName: '中国冶金科工集团有限公司',
      projectCount: 30,
      amountYi: 30,
      trackedCount: 10,
      trackedAmountYi: 10,
      subsidiaryWithProject: 20,
      location: '广东省广州市',
    },
    {
      groupName: '中国铁道建筑集团有限公司',
      projectCount: 20,
      amountYi: 20,
      trackedCount: 10,
      trackedAmountYi: 10,
      subsidiaryWithProject: 10,
      location: '广东省广州市',
    },
    {
      groupName: '中国建筑集团有限公司',
      projectCount: 10,
      amountYi: 10,
      trackedCount: 10,
      trackedAmountYi: 10,
      subsidiaryWithProject: 10,
      location: '广东省广州市',
    },
  ]
}

export async function fetchEngineeringTypeStatus(): Promise<{
  building: TypeStatusRow[]
  infra: TypeStatusRow[]
}> {
  await delay(65)
  const building: TypeStatusRow[] = [
    { name: '住宅', count: 120, countYoy: 12, amountYi: 120, amountYoy: 12 },
    { name: '工业厂房', count: 98, countYoy: -11, amountYi: 96, amountYoy: -11 },
    { name: '商业综合体', count: 76, countYoy: 12, amountYi: 88, amountYoy: 12 },
    { name: '医疗卫生', count: 54, countYoy: -11, amountYi: 60, amountYoy: -11 },
    { name: '教育科研', count: 42, countYoy: 6, amountYi: 48, amountYoy: 8 },
  ]
  const infra: TypeStatusRow[] = [
    { name: '轨道交通', count: 110, countYoy: 12, amountYi: 200, amountYoy: 12 },
    { name: '市政', count: 95, countYoy: -11, amountYi: 130, amountYoy: -11 },
    { name: '公路', count: 82, countYoy: 8, amountYi: 115, amountYoy: 9 },
    { name: '水利水电', count: 70, countYoy: -5, amountYi: 98, amountYoy: 4 },
    { name: '生态环保', count: 58, countYoy: 11, amountYi: 72, amountYoy: 7 },
  ]
  return { building, infra }
}

export async function fetchGuangdongGridUnits(): Promise<UnitRankRow[]> {
  await delay(50)
  return fetchProjectCostUnitRank()
}
