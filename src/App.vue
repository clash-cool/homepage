<script setup>
import { NConfigProvider, NNotificationProvider, darkTheme, lightTheme } from 'naive-ui'
import { theme } from './settings'

import Home from './Home.vue'
import './api/logs'
</script>

<template>
  <n-config-provider :theme="theme === 'dark' ? darkTheme : lightTheme">
    <n-notification-provider>
      <home />
    </n-notification-provider>
  </n-config-provider>
</template>
