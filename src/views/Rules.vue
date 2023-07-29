<script setup>
import { ref } from 'vue'
import api from '../api'

const rules = ref([])
api.rules().then((data) => { rules.value = data.rules })
</script>

<template>
  <h2>Rules</h2>
  <div class="rules">
    <table>
      <tbody>
        <tr v-for="r of rules"><td>{{ r.type }}</td><td>{{ r.payload }}</td><td>{{ r.proxy }}</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.rules {
  height: 400px;
  overflow-y: scroll;

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