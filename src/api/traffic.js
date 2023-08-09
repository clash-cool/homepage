import { ref } from 'vue'
import { fetchStream } from '@/api/common'

let shouldFetch = true
window.addEventListener('beforeunload', () => { shouldFetch = false })

export const traffics = ref([])
export const totalUp = ref(0)
export const totalDown = ref(0)

async function updateTraffics() {
  shouldFetch = true
  while (shouldFetch) {
    await fetchStream('/traffic', (traffic) => {
      traffics.value.push(traffic)
      if (traffics.value.length > 600) traffics.value.shift()
      totalUp.value += traffic.up
      totalDown.value += traffic.down
    }).catch(console.error)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

updateTraffics()