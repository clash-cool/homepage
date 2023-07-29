<script setup>
import _ from 'lodash'
import { ref, onBeforeUpdate, onUpdated, nextTick } from 'vue'
import { logs } from '../api'

function formatTime(ts) {
  const date = new Date(ts)
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const dom = ref(null)
let shouldScroll

onBeforeUpdate(() => {
  if (dom.value) shouldScroll = dom.value.scrollHeight - dom.value.scrollTop <= dom.value.clientHeight + 10
})

onUpdated(() => nextTick(() => {
  if (dom.value && shouldScroll) dom.value.scrollTop = dom.value.scrollHeight
}))
</script>

<template>
  <h2>Logs</h2>
  <div class="console" ref="dom">
    <p v-for="{ ts, type, payload } of logs" :class="type"><span>[{{ formatTime(ts) }}][{{ type }}]</span> {{ payload }}</p>
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