/** 与后端 `com.cscec4.common.ApiResult` 对齐 */
export interface ApiResult<T> {
  code: number
  msg: string
  data: T
}

/** 与后端 `ApiResult.CODE_SUCCESS` 一致 */
export const API_CODE_SUCCESS = 200

export function unwrapApiResult<T>(body: ApiResult<T>): T {
  if (body.code !== API_CODE_SUCCESS) {
    throw new Error(body.msg?.trim() || `请求失败（code: ${body.code}）`)
  }
  return body.data
}
