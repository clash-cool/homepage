import { ref } from 'vue'
import { fetchJson } from '@/api/common'

export default {
  version() { return fetchJson('/version') },
  rules() { return fetchJson('/rules') },
  connections() { return fetchJson('/connections') },
}