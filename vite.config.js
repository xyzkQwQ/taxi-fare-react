import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  const env = loadEnv(mode, '.')

  return {
    plugins: [react()],
    test: {
      environment: 'node',
      globals: true,
    },
    base: env.VITE_BASE_URL || '/',
  }
})

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: 'node',
//     globals: true,
//   },
//   base: env.VITE_BASE_URL || '/',
// })
