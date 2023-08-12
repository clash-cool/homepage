import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    importToCDN({
      prodUrl: 'https://cdn.clash.cool/{name}@{version}/{path}',
      modules: [
        autoComplete('vue'),
        autoComplete('lodash'),
        {
          name: 'naive-ui',
          var: 'naive',
          path: 'dist/index.prod.js'
        }
      ]
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: __dirname + '/src' }
    ]
  },
  server: {
    port: 5174
  }
})
