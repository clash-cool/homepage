<script setup>
import { ref } from 'vue'
import api from './api'
import { theme } from './settings'
import { routes } from './routes'

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
      <a><img src="/logo.svg" class="logo" alt="Vite logo" /></a>
      <ul class="links">
        <li v-for="page of routes" :class="{ active: page.path === $route.path }">
          <a :href="`#${page.path}`">{{page.name}}</a>
        </li>
      </ul>
      <div v-if="version" style="margin-top: 80px;">
        <div>Version: {{ version.version }}</div>
        <div v-if="version.premium" style="color: #4e8ec3;">premium</div>
      </div>
      <nut-cell title="Dark mode">
        <template v-slot:link>
          <nut-switch v-model="switchChecked" @change="switchChange" />
        </template>
      </nut-cell>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  gap: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  max-width: 960px;
  margin: 0 auto;

  .nav {
    width: 140px;
    text-align: center;
  }

  .content {
    flex-grow: 1;
    min-height: 450px;
  }
}
.links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    border-radius: 10px;
    padding: 0.5em 0;

    a {
      color: #4e8ec3;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    &.active {
      background-color: #4e8ec3;
      a {
        color: #eee;
      }
    }
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
