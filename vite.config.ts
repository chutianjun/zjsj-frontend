import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const localIconPrefix = env.VITE_ICON_LOCAL_PREFFIX || 'icon-local'

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg-icon')],
        symbolId: `${localIconPrefix}-[dir]-[name]`,
        inject: 'body-last',
        customDomId: '__SVG_ICON_LOCAL__',
      }),
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
