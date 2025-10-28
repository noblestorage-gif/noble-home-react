import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // 'https://noblestorage.co.kr/' 에서 수정
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // 'terser' 에서 수정
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    proxy: {
      // '/api'로 시작하는 모든 요청을 실제 운영 서버로 전달합니다.
      '/api': {
        target: 'https://noblestorage.co.kr',
        changeOrigin: true,
      }
    }
  }
})
