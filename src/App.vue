<script setup>
import { theme } from './settings'
import Home from './Home.vue'
</script>

<template>
  <nut-config-provider :theme="theme">
    <home />
  </nut-config-provider>
</template>
