<script setup>
import { ref, watch } from 'vue'
import { useNotification, NCard, NGrid, NForm, NFormItemGi, NInput, NInputNumber, NSwitch, NButton } from 'naive-ui'
import { apiSetting, theme, version } from '../settings'
import api from '../api'

const notify = useNotification()

const darkTheme = ref(theme.value === 'dark')
watch(darkTheme, (v) => { theme.value = v ? 'dark' : 'light' })

const editing = ref(false)
const port = ref(apiSetting.value && apiSetting.value.port)
const secret = ref(apiSetting.value && apiSetting.value.secret)

async function save () {
  try {
    const ver = await api.version({ port: port.value, secret: secret.value })
    if (ver.version) {
      apiSetting.value = { port: port.value, secret: secret.value }
      version.value = ver
      editing.value = false
    } else {
      notify.error({
        content: 'Config error',
        meta: 'Check port & secret.',
        duration: 2500,
        keepAliveOnHover: true
      })
    }
  } catch(e) {
    console.error(e)
    notify.error({
        content: 'Config error',
        meta: 'Check port & secret.',
        duration: 2500,
        keepAliveOnHover: true
      })
  }
}
</script>

<template>
  <h2>Settings</h2>
  <div class="settings pg-content">
    <n-card title="Basic Settings">
      <n-form label-placement="left">
        <n-grid :cols="24" item-responsive>
          <n-form-item-gi label="Dark mode" span="24 500:12">
            <n-switch v-model:value="darkTheme" />
          </n-form-item-gi>
        </n-grid>
        <n-grid :cols="24" :x-gap="12" item-responsive>
          <n-form-item-gi label="External control: 127.0.0.1:" span="24 500:12 650:11 800:9 1000:6">
            <n-input-number v-model:value="port" placeholder="port" maxlength="5" :disabled="!editing" />
          </n-form-item-gi>
          <n-form-item-gi label="Secret" span="24 500:12">
            <n-input v-model:value="secret" placeholder="password" :disabled="!editing" />
          </n-form-item-gi>
          <n-form-item-gi span="2 800:1">
            <n-button v-if="!editing" @click="editing = true">Edit</n-button>
            <n-button v-if="editing" @click="save">Save</n-button>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
  </div>
</template>