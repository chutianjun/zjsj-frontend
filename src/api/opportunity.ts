import { http } from './http'
import { type ApiResult, unwrapApiResult } from './types'

export interface OpportunityRow {
  id: number
  projectCode: string
  projectName: string
  projectCost: number
  province: string | null
  city: string | null
  source: string
  updatedAt: string
}

export interface OpportunityPage {
  items: OpportunityRow[]
  total: number
  page: number
  pageSize: number
}

export function fetchOpportunities(params?: {
  page?: number
  pageSize?: number
}): Promise<OpportunityPage> {
  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10
  return http
    .get<ApiResult<OpportunityPage>>('/opportunities', { params: { page, pageSize } })
    .then((r) => unwrapApiResult(r.data))
}
