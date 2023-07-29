import { ref } from 'vue'
import { localStorageRef } from './util'

export const apiSetting = localStorageRef('clash.api.setting')

async function fetchJson(url, opts = {}, stream = false) {
  if (apiSetting.value) {
    const { port, secret } = apiSetting.value
    url = `http://127.0.0.1:${port}${url}`

    const res = await fetch(url, {
      ...opts,
      headers: {
        ...opts.headers,
        'Authorization': secret && `Bearer ${secret}`,
        'Content-Type': 'application/json'
      } }
    )
    return stream ? await res.body : await res.json()
  } else {
    console.error('No api setting found')
  }
}

let shouldFetch = true
window.addEventListener('beforeunload', () => { shouldFetch = false })

export const logs = ref([])
async function getLogs() {
  const body =  await fetchJson('/logs', {}, true)
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

export default {
  version() { return fetchJson('/version') },
  rules() { return fetchJson('/rules') },
}