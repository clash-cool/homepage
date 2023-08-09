<script setup>
import { ref } from 'vue'

import PageTitle from '../components/PageTitle.vue'
import api from '../api'

const rules = ref([])
api.rules().then((data) => { rules.value = data.rules })
</script>

<template>
  <page-title title="Rules" />
  <div class="rules pg-content">
    <table>
      <tbody>
        <tr v-for="r of rules"><td>{{ r.type }}</td><td>{{ r.payload }}</td><td>{{ r.proxy }}</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.rules {
  table {
    width: 100%;
    border-collapse: collapse;

    td {
      padding: 5px;
      text-align: center;
    }
  }
}
</style>