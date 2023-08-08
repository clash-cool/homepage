import { ref } from 'vue'
import { fetchJson } from '@/api/common'

let shouldFetch = true
window.addEventListener('beforeunload', () => { shouldFetch = false })

export const logs = ref([])
async function getLogs() {
  const body =  await fetchJson('/logs', null, true)
  if (!body) return

  const decoder = new TextDecoder()
  await new Promise((resovle, reject) => {
    body.pipeTo(new WritableStream({
      write(chunk) {
        const lines = decoder.decode(chunk).split('\n')
        for (const line of lines) {
          if (line.trim()) {
            const log = { ...JSON.parse(line), ts: Date.now() }
            logs.value.push(log)
            if (logs.value.length > 500) logs.value.shift()  
          }
        }
      },
      close() { resovle() },
      abort(reason) { reject(reason) }
    }))  
  })
}

async function updateLogs() {
  shouldFetch = true
  while (shouldFetch) {
    await getLogs().catch(console.error)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

updateLogs()
