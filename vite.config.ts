import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  devServer: {
    disableHostCheck: true
  },
  server: {
      host: "0.0.0.0",
      hmr: {
          host: 'localhost'
      }
  }
})