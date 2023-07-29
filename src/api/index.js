import { ref, watch } from 'vue'

export const apiSetting = ref(JSON.parse(localStorage.getItem('clash.api.setting') || 'null'))
watch(apiSetting, (val) => { localStorage.setItem('clash.api.setting', JSON.stringify(val)) })

async function fetchJson(url, opts = {}) {
  url = `http://127.0.0.1:${apiSetting.port}${url}`

  const res = await fetch(url, {
    ...opts,
    headers: {
      ...opts.headers,
      'Authorization': apiSetting.secret && `Bearer ${apiSetting.secret}`,
      'Content-Type': 'application/json'
    } }
  )
  return await res.json()
}

export function version() {
  return fetchJson('/version')
}