<script setup lang="ts">
defineProps<{
  value: number | string
  yoyPercent: number
}>()
</script>

<template>
  <span class="slash-yoy" :class="yoyPercent >= 0 ? 'is-up' : 'is-down'">
    <span class="v">{{ value }}</span>
    <span class="sep">/</span>
    <span class="pct">{{ yoyPercent }}%</span>
    <svg class="tri" viewBox="0 0 10 8" aria-hidden="true">
      <polygon v-if="yoyPercent >= 0" points="5,0 10,8 0,8" />
      <polygon v-else points="5,8 10,0 0,0" />
    </svg>
  </span>
</template>

<style scoped>
.slash-yoy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 13px;
}
.sep {
  color: #8c8c8c;
}
.is-up .pct {
  color: #52c41a;
}
.is-down .pct {
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
