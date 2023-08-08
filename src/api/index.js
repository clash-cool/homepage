import { fetchJson } from '@/api/common'

export default {
  version(opts) { return fetchJson('/version', opts) },
  rules() { return fetchJson('/rules') },
  connections() { return fetchJson('/connections') },
}