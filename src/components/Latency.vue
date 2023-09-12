<script setup>
import { NEl } from 'naive-ui'

const props = defineProps({ latency: Number })
function getLatencyClass(latency) {
  if (latency <= 0) return 'slow'
  if (latency < 200) return 'very-fast'
  if (latency < 500) return 'fast'
  return 'slow'
}
</script>

<template>
<n-el :class="getLatencyClass(latency)">{{ latency > 0 ? latency : latency < 0 ? '⟳' : '-' }}</n-el>
</template>

<style scoped>
.very-fast {
  color: var(--success-color);
}
.fast {
  color: var(--warning-color);
}
.slow {
  color: var(--error-color);
}
</style>