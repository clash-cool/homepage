import Stats from './views/Stats.vue'
import Proxies from './views/Proxies.vue'
import Logs from './views/Logs.vue'
import Rules from './views/Rules.vue'
import Connections from './views/Connections.vue'
import Settings from './views/Settings.vue'

export const routes = [
  { name: 'Stats', path: '/', component: Stats },
  { name: 'Proxies', path: '/proxies', component: Proxies },
  { name: 'Logs', path: '/logs', component: Logs },
  { name: 'Rules', path: '/rules', component: Rules },
  { name: 'Connections', path: '/connections', component: Connections },
  { name: 'Settings', path: '/settings', component: Settings }
]
