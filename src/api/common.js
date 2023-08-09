import { apiSetting } from '@/settings'

export async function fetchJson(url, opts, stream = false) {
  if (apiSetting.value || (opts && opts.secret && opts.port)) {
    const { port, secret } = opts || apiSetting.value
    url = `http://127.0.0.1:${port}${url}`

    const res = await fetch(url, {
      ...opts,
      headers: {
        'Authorization': secret && `Bearer ${secret}`,
        'Content-Type': 'application/json'
      } }
    )
    return stream ? await res.body : await res.json()
  } else {
    console.error('No api setting found')
  }
}

export async function fetchStream(url, handler, opts) {
  const body =  await fetchJson(url, opts, true)
  if (!body) return

  const decoder = new TextDecoder()
  await new Promise((resovle, reject) => {
    body.pipeTo(new WritableStream({
      write(chunk) {
        const lines = decoder.decode(chunk).split('\n')
        for (const line of lines) {
          if (line.trim()) {
            const json = { ...JSON.parse(line.trim()), ts: Date.now() }
            handler(json)
          }
        }
      },
      close() { resovle() },
      abort(reason) { reject(reason) }
    }))  
  })
}