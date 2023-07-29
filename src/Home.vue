<script setup>
import { ref } from 'vue'
import api from './api'
import { theme } from './settings'

const version = ref(null)
api.version().then((v) => (version.value = v))

const switchChecked = ref(theme.value === 'dark')
const switchChange = (v) => {
  theme.value = v ? 'dark' : ''
}
</script>

<template>
  <div class="container">
    <div class="nav">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/logo.svg" class="logo" alt="Vite logo" />
      </a>
      <nut-cell-group>
        <nut-cell title="Home" to="/" />
        <nut-cell title="About" to="/about" />
        <nut-cell title="Api" to="/api" />
        <nut-cell title="Setting" to="/setting" />
      </nut-cell-group>
      <div v-if="version">
        <div>{{ version.version }}</div>
        <div v-if="version.premium" style="color: #4e8ec3;">premium</div>
      </div>
    </div>
    <div class="content">
      <nut-cell title="切换暗黑">
        <template v-slot:link>
          <nut-switch v-model="switchChecked" @change="switchChange" />
        </template>
      </nut-cell>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  max-width: 768px;
  margin: 0 auto;

  .nav {
    width: 180px;
    text-align: center;
  }

  .content {
    flex-grow: 1;
  }
}
.logo {
  height: 6em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
