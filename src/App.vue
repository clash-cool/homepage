<script setup>
import { useRoute } from 'vue-router'
import { NConfigProvider, NNotificationProvider, darkTheme, lightTheme } from 'naive-ui'
import { apiSetting, theme } from './settings'

import Home from './Home.vue'
import './api/logs'
import './api/traffic'
import { watch } from 'vue'

const route = useRoute()
watch(() => route.query, ({ port, password }) => {
  if (port && password) {
    apiSetting.value = { port: port * 1, secret: password }
  }
})
</script>

<template>
  <n-config-provider :theme="theme === 'dark' ? darkTheme : lightTheme">
    <n-notification-provider>
      <home />
    </n-notification-provider>
  </n-config-provider>
</template>
