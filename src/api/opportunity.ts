import { http } from './http'

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

export function fetchOpportunities(): Promise<OpportunityRow[]> {
  return http.get<OpportunityRow[]>('/opportunities').then((r) => r.data)
}
