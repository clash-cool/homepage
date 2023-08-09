import { fetchJson } from '@/api/common'

export default {
  version(opts) { return fetchJson('/version', opts) },
  rules() { return fetchJson('/rules') },
  connections() { return fetchJson('/connections') },
  proxies() { return fetchJson('/proxies') },
  proxyDelay(pxyName) { return fetchJson(`/proxies/${pxyName}/delay?timeout=30000&url=http://www.gstatic.com/generate_204`) },
  getConfigs() { return fetchJson('/configs') }
}