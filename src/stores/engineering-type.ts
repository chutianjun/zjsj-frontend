import { defineStore } from 'pinia'
import {
  fetchEngineeringTypeTree,
  type EngineeringTypeTreeNode,
} from '../api/engineering-type'

/** 默认缓存 24 小时（毫秒） */
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000
const STORAGE_KEY = 'cscec4:engineering-type-tree'

interface CachedPayload {
  tree: EngineeringTypeTreeNode[]
  loadedAt: number
  ttlMs: number
}

function readPersistedCache(): CachedPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as CachedPayload
    if (!Array.isArray(data.tree) || !data.loadedAt || !data.ttlMs) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    if (Date.now() - data.loadedAt >= data.ttlMs) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function writePersistedCache(payload: CachedPayload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // 配额满或隐私模式等：忽略，仍保留内存缓存
  }
}

function clearPersistedCache() {
  localStorage.removeItem(STORAGE_KEY)
}

function initialState() {
  const cached = readPersistedCache()
  return {
    tree: (cached?.tree ?? []) as EngineeringTypeTreeNode[],
    loadedAt: cached?.loadedAt ?? 0,
    ttlMs: cached?.ttlMs ?? DEFAULT_TTL_MS,
    loading: false,
    error: null as string | null,
  }
}

export const useEngineeringTypeStore = defineStore('engineeringType', {
  state: () => initialState(),

  getters: {
    isCacheValid(state): boolean {
      if (!state.tree.length || !state.loadedAt) return false
      return Date.now() - state.loadedAt < state.ttlMs
    },
  },

  actions: {
    async ensureTree(force = false): Promise<EngineeringTypeTreeNode[]> {
      if (!force && this.isCacheValid) {
        return this.tree
      }
      if (this.loading) {
        await new Promise<void>((resolve) => {
          const tick = () => {
            if (!this.loading) {
              resolve()
              return
            }
            setTimeout(tick, 50)
          }
          tick()
        })
        return this.tree
      }

      this.loading = true
      this.error = null
      try {
        const tree = await fetchEngineeringTypeTree()
        this.tree = tree
        this.loadedAt = Date.now()
        writePersistedCache({
          tree,
          loadedAt: this.loadedAt,
          ttlMs: this.ttlMs,
        })
        return tree
      } catch (e) {
        this.error = e instanceof Error ? e.message : '加载工程类型失败'
        throw e
      } finally {
        this.loading = false
      }
    },

    invalidate() {
      this.loadedAt = 0
      this.tree = []
      clearPersistedCache()
    },
  },
})
