/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ICON_LOCAL_PREFFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
