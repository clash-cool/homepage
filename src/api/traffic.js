import { ref } from 'vue'
import { sleep } from '@async-util/common'
import { fetchJson } from '@/api/common'

let shouldFetch = true
window.addEventListener('beforeunload', () => { shouldFetch = false })

export const traffics = ref([])
export const totalUp = ref(0)
export const totalDown = ref(0)

async function updateTraffics() {
  shouldFetch = true
  while (shouldFetch) {
    try {
      const fp = await fetchJson('/traffic', null, true)
      for await (const traffic of fp.json()) {
        traffics.value.push(traffic)
        if (traffics.value.length > 600) traffics.value.shift()
        totalUp.value += traffic.up
        totalDown.value += traffic.down
      }  
    } catch (e) {
      console.error(e)
    }

    await sleep(1000)
  }
}

updateTraffics()