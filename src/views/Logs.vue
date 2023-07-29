<script setup>
import _ from 'lodash'
import { ref, onUpdated, nextTick } from 'vue'
import { logs } from '../api'

function formatTime(ts) {
  const date = new Date(ts)
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const dom = ref(null)
const scrollToEnd = _.throttle(() => {
  if (dom.value) {
    dom.value.scrollTop = dom.value.scrollHeight
  }
}, 100)
onUpdated(() => nextTick(scrollToEnd))

function getLogs() {
  return logs.value
}
</script>

<template>
  <h2>Logs</h2>
  <div class="console" ref="dom">
    <p v-for="{ ts, type, payload } of getLogs()" :class="type"><span>[{{ formatTime(ts) }}][{{ type }}]</span> {{ payload }}</p>
  </div>
</template>

<style lang="scss" scoped>
.console {
  height: 400px;
  overflow-y: scroll;

  p {
    margin: 5px 0;
  }

  .info {
    span {
      color: #4e8ec3;
    }
  }

  .warn {
    span {
      color: orange;
    }
  }

  .error {
    span {
      color: red;
    }
  }
}
</style>