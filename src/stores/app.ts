import { defineStore } from 'pinia'

/** 预留：后续可放全局状态（用户信息、字典缓存等） */
export const useAppStore = defineStore('app', {
  state: () => ({
    title: 'CSCEC4',
  }),
})
