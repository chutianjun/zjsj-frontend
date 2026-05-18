import { http } from './http'
import { type ApiResult, unwrapApiResult } from './types'

export interface EngineeringTypeTreeNode {
  dataNo: number
  dataName: string
  children: EngineeringTypeTreeNode[]
}

export function fetchEngineeringTypeTree(): Promise<EngineeringTypeTreeNode[]> {
  return http
    .get<ApiResult<EngineeringTypeTreeNode[]>>('/dictionaries/engineering-types/tree')
    .then((r) => unwrapApiResult(r.data))
}
