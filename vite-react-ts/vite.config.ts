import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // đổi port dev server
    open: true,       // mở browser khi chạy npm run dev
  },
  resolve: {
    alias: {    //Không dùng cái này cho nó lành
      '@': '/src',    // alias cho thư mục src => thay cho đường dẫn: dùng @/components/Button thay vì ../../components/Button
      '@components': '@/components',
      '@utils': '/src/utils'
    },
  }
})