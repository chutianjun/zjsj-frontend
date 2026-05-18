<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useEngineeringTypeStore } from '../../../../stores/engineering-type'

const props = withDefaults(
  defineProps<{
    modelValue?: number[]
    placeholder?: string
    width?: string
    /** 是否允许选择任意层级（默认 true，便于按大类筛选） */
    checkStrictly?: boolean
  }>(),
  {
    modelValue: () => [],
    placeholder: '工程类型',
    width: '220px',
    checkStrictly: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
  change: [value: number[], leafDataNo: number | undefined]
}>()

const store = useEngineeringTypeStore()
const inner = ref<number[]>([...props.modelValue])
const loadFailed = ref(false)

const options = computed(() => store.tree)

watch(
  () => props.modelValue,
  (v) => {
    inner.value = [...(v ?? [])]
  },
)

onMounted(async () => {
  try {
    await store.ensureTree()
  } catch {
    loadFailed.value = true
  }
})

function onChange(val: number[] | number | undefined) {
  const path = Array.isArray(val) ? val : val != null ? [val] : []
  inner.value = path
  const leaf = path.length ? path[path.length - 1] : undefined
  emit('update:modelValue', path)
  emit('change', path, leaf)
}
</script>

<template>
  <el-cascader
    v-model="inner"
    :options="options"
    :props="{
      value: 'dataNo',
      label: 'dataName',
      children: 'children',
      checkStrictly: checkStrictly,
      emitPath: true,
    }"
    :placeholder="placeholder"
    :style="{ width }"
    clearable
    filterable
    :loading="store.loading"
    :disabled="loadFailed && !options.length"
    @change="onChange"
  />
</template>
