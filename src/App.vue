<script setup>
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { theme } from './settings'

import Home from './Home.vue'
import './api/logs'
</script>

<template>
  <n-config-provider :theme="theme === 'dark' ? darkTheme : lightTheme">
    <home />
  </n-config-provider>
</template>
