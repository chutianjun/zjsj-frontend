<template>
  <div>
    <template v-if="renderLocalIcon">
      <svg aria-hidden="true" :width="width || '1em'" :height="height || '1em'" v-bind="bindAttrs" @click="handleClick">
        <use :href="symbolId" fill="currentColor" />
      </svg>
    </template>
    <template v-else>
      <Icon
        v-if="icon"
        :icon="icon"
        :width="width"
        :height="height"
        v-bind="bindAttrs"
        @click="handleClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'

defineOptions({ name: 'SvgIcon' })

/**
 * 图标组件
 * - 支持 iconify 与本地 svg（`src/assets/svg-icon` 下文件名，无后缀）
 * - 同时传 `icon` 与 `local-icon` 时优先本地
 */
interface Props {
  icon?: string
  localIcon?: string
  width?: string
  height?: string
}

const props = defineProps<Props>()

const attrs = useAttrs()

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))

interface Emits {
  (e: 'click'): void
}

const emits = defineEmits<Emits>()

function handleClick() {
  emits('click')
}

const symbolId = computed(() => {
  const { VITE_ICON_LOCAL_PREFFIX: prefix } = import.meta.env
  const defaultLocalIcon = 'no-icon'
  const iconName = props.localIcon || defaultLocalIcon
  return `#${prefix}-${iconName}`
})

const renderLocalIcon = computed(() => props.localIcon || !props.icon)
</script>

<style scoped></style>
