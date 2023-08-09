<script setup>
import { ref, h, onUnmounted } from 'vue'
import { NCard, NCollapse, NCollapseItem, NMenu, NButton } from 'naive-ui'

import Latency from '../components/Latency.vue'
import api from '../api'

const proxies = ref({})
const groups = ref([])

function updateProxies() {
  api.proxies().then(data => {
    proxies.value = data.proxies
    const all = Object.values(data.proxies)
    groups.value = all.filter(p => p.all && p.now)
  })
}

updateProxies()
const interval = setInterval(updateProxies, 1000)
onUnmounted(() => clearInterval(interval))

function getLatency(g) {
  const [h] = g.history || []
  if (h) return h.delay

  if (g.now) return getLatency(proxies.value[g.now])
}

function genOptions(g) {
  return g.all.map(p => ({ label: p, key: p,
    extra: () => h(Latency, { latency: getLatency(proxies.value[p]), style: 'float: right;' }) 
  }))
}

function refreshDelay(e) {
  e.stopPropagation()
}
</script>

<template>
  <h2>Proxies</h2>
  <div class="pg-content">
    <n-card title="Proxy Groups">
      <n-collapse>
        <n-collapse-item v-for="g of groups" :key="g.name" :title="`${g.name} [${g.type}]`">
          <template #header-extra>
            <latency :latency="getLatency(g)" @click="refreshDelay" />
          </template>
          <n-menu :options="genOptions(g)" :value="g.now"></n-menu>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>