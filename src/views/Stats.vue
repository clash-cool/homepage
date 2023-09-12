<script setup>
import { ref, computed } from 'vue'
import PageTitle from '../components/PageTitle.vue'
import { NGrid, NGi, NStatistic, NAutoComplete, NCard, NDataTable } from 'naive-ui'
import api from '../api'
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

const domain = ref('')
const options = computed(() => {
  const domains = ['google.com', 'www.netflix.com', 'twitter.com', 'www.iqiyi.com']
  return domain.value.length < 2 ? [] : domains.filter(d => d.includes(domain.value)).map(d => ({ label: d, value: d }))
})

const dnsResult = ref()

async function queryDns(value) {
  const { Answer } = await api.queryDns(value || domain.value, 'AAAA')
  const v4 = await api.queryDns(value || domain.value)
  dnsResult.value = { ...v4, Answer: [...v4.Answer || [], ...Answer?.filter(a => a.type !== 5) || [] ] }
  domain.value = ''
}

const columns = [
  { title: 'Data', key: 'data', ellipsis: { tooltip: true } },
  { title: 'Name', key: 'name', ellipsis: { tooltip: true } },
  { title: 'TTL', key: 'TTL', width: 50 },
  { title: 'Type', key: 'type', width: 60 }
]
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
    <div style="margin-top: 25px;">
      <n-auto-complete
        :input-props="{ autocomplete: 'disabled' }"
        blur-after-select
        clearable
        v-model:value="domain"
        placeholder="DNS查询[回车查询]"
        :options="options"
        @select="queryDns"
        @keyup.enter="() => queryDns()"
      />
      <div style="margin-top: 15px;"></div>
      <n-card v-if="dnsResult" :title="dnsResult.Question?.[0]?.Name + ' response from: ' + dnsResult.Server" size="small">
        <n-data-table
          :columns="columns"
          :data="dnsResult.Answer"
          :bordered="false"
          striped
        />
      </n-card>
    </div>
  </div>
</template>