import { localStorageRef } from "./util"

export const apiSetting = localStorageRef('clash.api.setting')
export const theme = localStorageRef('ui.theme', '')