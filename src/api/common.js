import { apiSetting } from '@/settings'

export async function fetchJson(url, opts = {}, stream = false) {
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