<script setup>
import { LayoutSidebarLeftCollapse, LayoutSidebarLeftExpand } from '@vicons/tabler'
import { NPageHeader, NIcon } from 'naive-ui'
import { defineProps } from 'vue'

import { showSidebar } from '../settings'

defineProps({
  title: { type: String, default: '' }
})

function toggle() {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <n-page-header @back="toggle">
    <template #back>
      <n-icon :component="showSidebar ? LayoutSidebarLeftCollapse : LayoutSidebarLeftExpand" style="margin-left: 10px;" />
    </template>
    <template #title>
      <h2>{{ title }}</h2>
    </template>
  </n-page-header>
</template>