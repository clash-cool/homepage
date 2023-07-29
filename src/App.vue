<script setup>
import { ref } from 'vue'
import api, { apiSetting } from './api'

const version = ref(null)
api.version().then((v) => (version.value = v))
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/logo.svg" class="logo" alt="Vite logo" />
    </a>
  </div>
  <div>
    {{ apiSetting }}
    {{  version }}
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
