<script setup>
import { ref, onUnmounted, onUpdated, nextTick } from 'vue'

import PageTitle from '../components/PageTitle.vue'
import api from '../api'

const connections = ref({ downloadTotal: 0, downloadTotal: 0, connections: [] })

function duration(ts) {
  const dur = Date.now() - ts
  if (dur < 1000) return `0`
  if (dur < 60 * 1000) return `${Math.round(dur / 1000)}s`
  if (dur < 3600 * 1000) return `${(dur / 1000 / 60).toFixed(1)}m`
  return `${(dur / 1000 / 3600).toFixed(1)}h`
}

function size(sz) {
  if (sz < 1024) return `${sz}B`
  if (sz < 1024 * 1024) return `${(sz / 1024).toFixed(1)}KB`
  if (sz < 1024 * 1024 * 1024) return `${(sz / 1024 / 1024).toFixed(1)}MB`
  return `${(sz / 1024 / 1024 / 1024).toFixed(1)}GB`
}

const stats = new Map()
function speed({ id, upload, download }) {
  const old = stats.get(id)
  if (!old) {
    stats.set(id, { upload, download })
    return '-'
  } else {
    const up = upload - old.upload
    const down = download - old.download
    stats.set(id, { upload, download })
    return up > 32 || down > 32 ? `↓${size(down)}/s ↑${size(up)}/s` : '-'
  }
}

function convertConnections({ connections }) {
  return connections.map(({ id, upload, download, start, chains, rule, rulePayload, metadata: { network, type, sourceIP, destinationIP, destinationPort, host, dnsMode, processPath } }) => ({
    id,
    upload,
    download,
    duration: Date.parse(start),
    chain: chains[chains.length - 1],
    chains: chains.join(','),
    rule,
    rulePayload,
    network,
    type,
    sourceIP,
    target: host ? `${host}:${destinationPort}` : `${destinationIP}:${destinationPort}`,
    dnsMode,
    processPath
  })).sort((a, b) => b.duration - a.duration)
}

api.connections().then((data) => { if (data) connections.value = data })
const interval = setInterval(() => api.connections().then((data) => { if (data) connections.value = data }), 1000)
onUnmounted(() => clearInterval(interval))

const table = ref(null)
const height = ref(0)
onUpdated(() => nextTick(() => {
  if (table.value) height.value = table.value.clientHeight
}))
</script>

<template>
  <page-title title="Connections" />
  <div class="connections pg-content">
    <div>
      <table ref="table">
        <thead>
          <tr><th>Target</th><th>Speed</th></tr>
        </thead>
        <tbody>
          <tr v-for="c of convertConnections(connections)">
            <td class="left" style="max-width: 250px;">{{ c.target }}</td>
            <td style="max-width: 200px; min-width: 200px;">{{ speed(c) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="details" :style="{ height: height + 'px' }">
      <table>
        <thead>
          <tr><th>Download</th><th>Upload</th><th>Dur</th><th>Chain</th><th>Type</th><th>Rule</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="c of convertConnections(connections)">
            <td>{{ size(c.download) }}</td>
            <td>{{ size(c.upload) }}</td>
            <td>{{ duration(c.duration) }}</td>
            <td>{{ c.chain }}</td>
            <td>{{ c.type }}</td>
            <td>{{ c.rule }}</td>
            <td>{{ c.rulePayload }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.connections {
  overflow-x: hidden;
  display: flex;

  table {
    border-collapse: collapse;

    td {
      padding: 5px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.left {
        text-align: left;
      }
    }
  }

  .details {
    overflow-x: scroll;
    overflow-y: hidden;
  }
}
</style>