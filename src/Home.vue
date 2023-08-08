<script setup>
import { NLayout, NLayoutSider, NLayoutContent, NMenu } from 'naive-ui'

import { ref, h } from 'vue'
import { RouterLink } from 'vue-router'
import api from './api'
import { theme } from './settings'
import { routes } from './routes'

const version = ref(null)
api.version().then((v) => (version.value = v))

const switchChecked = ref(theme.value === 'dark')
const switchChange = (v) => {
  theme.value = v ? 'dark' : ''
}

const navOptions = routes.map(({ name, path }) => ({ label: name, key: path, path }))
const renderMenuLabel = (option) => {
  return h(
    RouterLink,
    { to: option.path },
    { default: () => option.label }
  )
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider style="text-align: center;">
      <a><img src="/logo.svg" class="logo" alt="Vite logo" /></a>
      <n-menu :options="navOptions" :render-label="renderMenuLabel" :root-indent="18" :value="$route.path"></n-menu>
      <div v-if="version" style="margin-top: 80px;">
        <div>Version: {{ version.version }}</div>
        <div v-if="version.premium" style="color: #4e8ec3;">premium</div>
      </div>
    </n-layout-sider>
    <n-layout-content>
      <router-view />
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
