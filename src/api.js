import { localStorageRef } from './util'

export const apiSetting = localStorageRef('clash.api.setting')

async function fetchJson(url, opts = {}) {
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
    return await res.json()
  } else {
    console.error('No api setting found')
  }
}

export default {
  version() { return fetchJson('/version') }
}