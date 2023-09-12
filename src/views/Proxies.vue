<script setup>
import { ref, h, onUnmounted } from 'vue'
import { NCard, NCollapse, NCollapseItem, NMenu, NButton } from 'naive-ui'
import { sleep } from '@async-util/common'

import PageTitle from '../components/PageTitle.vue'
import Latency from '../components/Latency.vue'
import api from '../api'

const mode = ref('')
const proxies = ref({})
const groups = ref([])

api.getConfigs().then(({ mode: m }) => mode.value = m)

let shouldRefresh = true
async function updateProxies() {
  while (shouldRefresh) {
    try {
      const data = await api.proxies()
      proxies.value = data.proxies
      const all = Object.values(data.proxies)
      groups.value = all.filter(p => p.all && p.now && (p.name !== 'GLOBAL' || mode.value === 'global'))
    } catch (e) {
      console.error(e)
    }
    
    await sleep(1000)
  }
}

updateProxies()
onUnmounted(() => shouldRefresh = false)
const delayMap = new Map()

function getLatency(g) {
  const testResult = delayMap.get(g.name)
  if (testResult && Date.now() - testResult.ts < 30000) {
    return testResult.delay
  }

  const [h] = g.history || []
  if (h) return h.delay

  if (g.now) return getLatency(proxies.value[g.now])
}

function genOptions(g) {
  return g.all.map(p => ({ label: p, key: p,
    extra: () => h(Latency, { latency: getLatency(proxies.value[p]), style: 'float: right;' }) 
  }))
}

async function refreshDelay(e, g) {
  e.stopPropagation()
  delayMap.set(g.name, { delay: -1, ts: Date.now() })
  groups.value = groups.value.slice()
  const { delay } = await api.proxyDelay(g.name)
  if (delay >= 0) delayMap.set(g.name, { delay, ts: Date.now() })
}
</script>

<template>
  <page-title title="Proxies" />
  <div class="pg-content">
    <n-card title="Proxy Groups">
      <n-collapse>
        <n-collapse-item v-for="g of groups" :key="g.name" :title="`${g.name} [${g.type}]`">
          <template #header-extra>
            <latency :latency="getLatency(g)" @click="(e) => refreshDelay(e, g)" />
          </template>
          <n-menu :options="genOptions(g)" :value="g.now"></n-menu>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>