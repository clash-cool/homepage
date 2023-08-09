<script setup>
import PageTitle from '../components/PageTitle.vue'
import { NGrid, NGi, NStatistic } from 'naive-ui'
import { traffics, totalUp, totalDown } from '../api/traffic'

function formatTraffic(traffic) {
  if (traffic < 1024) return `${traffic} B`
  if (traffic < 1024 * 1024) return `${(traffic / 1024).toFixed(1)} KB`
  if (traffic < 1024 * 1024 * 1024) return `${(traffic / 1024 / 1024).toFixed(1)} MB`
  return `${(traffic / 1024 / 1024 / 1024).toFixed(2)} GB`
}

function getBw() {
  const last = traffics.value[traffics.value.length - 1]
  return last && `↓${formatTraffic(last.down)}/s ↑${formatTraffic(last.up)}/s`
}
</script>

<template>
  <page-title title="Stats" />
  <div class="pg-content">
    <n-grid :cols="4" item-responsive>
      <n-gi span="2 400:1">
        <n-statistic label="上传" :value="formatTraffic(totalUp)" />
      </n-gi>
      <n-gi span="2 400:1">
        <n-statistic label="下载" :value="formatTraffic(totalDown)" />
      </n-gi>
      <n-gi span="4 400:2">
        <n-statistic label="带宽" :value="getBw()" />
      </n-gi>
    </n-grid>
  </div>
</template>