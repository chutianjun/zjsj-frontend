import * as echarts from 'echarts'

let registered = false
let loadPromise: Promise<void> | null = null

const GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

/** 注册全国地图 GeoJSON，失败时由调用方降级展示 */
export function ensureChinaMapRegistered(): Promise<void> {
  if (registered) return Promise.resolve()
  loadPromise ??= (async () => {
    const res = await fetch(GEO_URL)
    if (!res.ok) throw new Error(`map fetch ${res.status}`)
    const json = (await res.json()) as Parameters<typeof echarts.registerMap>[1]
    echarts.registerMap('china', json)
    registered = true
  })()
    .catch((e) => {
      console.warn('[project-analysis-dashboard] china map:', e)
      throw e
    })
    .finally(() => {
      loadPromise = null
    })
  return loadPromise
}
