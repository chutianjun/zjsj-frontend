/** 仪表盘筛选项常量（后续可对接字典接口） */

export const BID_PROJECT_OPTIONS = [
  { label: '拟招标项目', value: 'pre_bid' },
  { label: '已招标项目', value: 'bid' },
  { label: '招标项目', value: 'all_bid' },
]

export const PROJECT_COST_OPTIONS = [
  { label: '项目造价', value: '' },
  { label: '1亿以下', value: 'lt_1' },
  { label: '1-5亿', value: '1_5' },
  { label: '5-10亿', value: '5_10' },
  { label: '10-20亿', value: '10_20' },
  { label: '20亿以上', value: 'gt_20' },
]

export const ENGINEERING_TYPE_OPTIONS = [
  { label: '工程类型', value: '' },
  { label: '房建', value: 'building' },
  { label: '基建', value: 'infra' },
  { label: '专业工程', value: 'specialty' },
]

export const CUSTOMER_NATURE_OPTIONS = [
  { label: '客户性质', value: '' },
  { label: '政府部门', value: 'gov' },
  { label: '国有企业', value: 'soe' },
  { label: '民营企业', value: 'private' },
]

export const WHETHER_PRE_BID_OPTIONS = [
  { label: '是否拟招标', value: '' },
  { label: '是', value: 'yes' },
  { label: '否', value: 'no' },
]

export const REGION_SELECT_OPTIONS = [
  { label: '省/市/区', value: '' },
  { label: '广东省', value: 'gd' },
  { label: '江苏省', value: 'js' },
  { label: '山东省', value: 'sd' },
  { label: '浙江省', value: 'zj' },
]

/** 项目造价分析 — 饼图上方分段 */
export const COST_BRACKET_SEGMENTS = ['全部', '20亿以上', '10-20亿', '5-10亿', '1-5亿', '1亿以下'] as const

export const YEAR_OPTIONS = [2022, 2023, 2024, 2025, 2026].map((y) => ({
  label: `${y}年`,
  value: String(y),
}))

export const CUSTOMER_TYPE_LEGEND = [
  { name: '政府部门', color: '#5B8FF9' },
  { name: '国有企业', color: '#9270CA' },
  { name: '国有事业单位', color: '#61A5F9' },
  { name: '民营企业', color: '#F6909D' },
  { name: '境内外资企业', color: '#5AD8A6' },
  { name: '境外外资企业', color: '#F6BD16' },
  { name: '港澳台企业', color: '#6FD3A3' },
  { name: '军队', color: '#3D5A80' },
  { name: '其他', color: '#C4C4C4' },
] as const
