import { ref, watch } from 'vue'

export function localStorageRef(name, defaultValue) {
  const value = ref(JSON.parse(localStorage.getItem(name) || 'null') || defaultValue)
  watch(value, (val) => { localStorage.setItem(name, JSON.stringify(val)) })
  return value
}