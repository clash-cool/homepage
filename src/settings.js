import { ref } from 'vue'
import { localStorageRef } from './util'

export const version = ref(null)
export const apiSetting = localStorageRef('clash.api.setting')
export const theme = localStorageRef('ui.theme', '')
export const showSidebar = localStorageRef('ui.showSidebar', true)
export const speedtestUrl = localStorageRef('ui.speedtestUrl', '')