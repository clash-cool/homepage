<script setup>
import _ from 'lodash'
import { ref, onMounted, onBeforeUpdate, onUpdated, nextTick } from 'vue'

import PageTitle from '../components/PageTitle.vue'
import { logs } from '../api/logs'

function numberFormat(number) {
  const str = number.toString()
  return str.length >= 2 ? str : '0' + str
}

function formatTime(ts) {
  const date = new Date(ts)
  return `${numberFormat(date.getHours())}:${numberFormat(date.getMinutes())}:${numberFormat(date.getSeconds())}`
}

const dom = ref(null)
let shouldScroll

onBeforeUpdate(() => {
  if (dom.value) shouldScroll = dom.value.scrollTop === 0 || dom.value.scrollHeight - dom.value.scrollTop <= dom.value.clientHeight + 10
})

onUpdated(() => nextTick(() => {
  if (dom.value && shouldScroll) dom.value.scrollTop = dom.value.scrollHeight
}))

onMounted(() => {
  dom.value.scrollTop = dom.value.scrollHeight
})
</script>

<template>
  <page-title title="Logs" />
  <div class="console pg-content" ref="dom">
    <p v-for="{ ts, type, payload } of logs" :class="type"><span>[{{ formatTime(ts) }}][{{ type }}]</span> {{ payload }}</p>
  </div>
</template>

<style lang="scss" scoped>
.console {
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