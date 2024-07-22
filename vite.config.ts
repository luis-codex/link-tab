import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
      '@public': resolve(__dirname, 'public')
    }
  }
})
