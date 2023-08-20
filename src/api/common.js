import fetchParser from '@async-util/fetch'
import { apiSetting } from '@/settings'

export async function fetchJson(url, opts, stream = false) {
  if (apiSetting.value || (opts && opts.secret && opts.port)) {
    const { port, secret } = opts || apiSetting.value
    url = `http://127.0.0.1:${port}${url}`

    const fetchFn = stream ? fetchParser : fetch

    const res = await fetchFn(url, {
      ...opts,
      headers: {
        'Authorization': secret && `Bearer ${secret}`,
        'Content-Type': 'application/json'
      } }
    )
    return stream ? res : await res.json()
  } else {
    console.error('No api setting found')
  }
}
