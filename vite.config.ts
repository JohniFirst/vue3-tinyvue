import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TinyVueSingleResolver } from '@opentiny/unplugin-tiny-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue3-tinyvue',
  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
    Components({
      resolvers: [TinyVueSingleResolver],
    }),
    AutoImport({
      resolvers: [TinyVueSingleResolver],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5274,
    open: true
  },
  build: {
    // outDir: 'dist', // 输出目录
    assetsDir: 'static', // 静态资源目录
    sourcemap: false, // 生产环境关闭sourcemap
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    },
    emptyOutDir: true
  },
})
