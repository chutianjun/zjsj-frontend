<script setup lang="ts">
defineProps<{
  /** 同比百分比，正数显示绿色上行 */
  percent: number
  /** 为 true 时显示为「12」不带 %（与部分 UI 一致） */
  plainNumber?: boolean
}>()
</script>

<template>
  <span class="trend" :class="percent >= 0 ? 'is-up' : 'is-down'">
    <span class="label">同比</span>
    <span class="num">{{ plainNumber ? String(percent) : `${percent}%` }}</span>
    <svg class="tri" viewBox="0 0 10 8" aria-hidden="true">
      <polygon v-if="percent >= 0" points="5,0 10,8 0,8" />
      <polygon v-else points="5,8 10,0 0,0" />
    </svg>
  </span>
</template>

<style scoped>
.trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 1;
}
.label {
  color: #8c8c8c;
}
.num {
  font-weight: 600;
}
.is-up .num {
  color: #52c41a;
}
.is-down .num {
  color: #f5222d;
}
.tri {
  width: 8px;
  height: 7px;
  flex-shrink: 0;
}
.is-up .tri {
  fill: #52c41a;
}
.is-down .tri {
  fill: #f5222d;
}
</style>
