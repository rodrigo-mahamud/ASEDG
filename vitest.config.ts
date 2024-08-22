import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/typesHome.tsx'],
      env: process.env, // Usa las variables de entorno cargadas
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
      },
    },
  }
})
