export const routes = [
  { name: 'Stats', path: '/', component: () => import('./views/Stats.vue') },
  { name: 'Proxies', path: '/proxies', component: () => import('./views/Proxies.vue') },
  { name: 'Logs', path: '/logs', component: () => import('./views/Logs.vue') },
  { name: 'Rules', path: '/rules', component: () => import('./views/Rules.vue') },
  { name: 'Connections', path: '/connections', component: () => import('./views/Connections.vue') },
  { name: 'Settings', path: '/settings', component: () => import('./views/Settings.vue') }
]
