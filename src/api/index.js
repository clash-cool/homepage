import { speedtestUrl } from '../settings'
import { fetchJson } from '@/api/common'

export default {
  version(opts) { return fetchJson('/version', opts) },
  rules() { return fetchJson('/rules') },
  connections() { return fetchJson('/connections') },
  proxies() { return fetchJson('/proxies') },
  proxyDelay(pxyName) { return fetchJson(`/proxies/${pxyName}/delay?timeout=30000&url=${speedtestUrl.value}`) },
  getConfigs() { return fetchJson('/configs') },
  queryDns(name, type = 'A') { return fetchJson(`/dns/query?name=${name}&type=${type}`) }
}