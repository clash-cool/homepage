import { ref } from 'vue'
import { sleep } from '@async-util/common'

import { fetchJson } from '@/api/common'

let shouldFetch = true
window.addEventListener('beforeunload', () => { shouldFetch = false })

export const logs = ref([])
async function getLogs() {
  const fp =  await fetchJson('/logs', null, true)
  for await (const log of fp.json()) {
    log.ts = Date.now()
    logs.value.push(log)
  }
}

async function updateLogs() {
  shouldFetch = true
  while (shouldFetch) {
    await getLogs().catch(console.error)
    await sleep(1000)
  }
}

updateLogs()
