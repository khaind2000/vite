import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    replaceConsole(),
    replaceConsolePlugin('warm'),
    bannerPlugin()
  ],
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

function replaceConsole(): import('vite').Plugin {
  return {
    name: 'replace-console',
    enforce: 'pre',              // chạy sớm
    transform(code: string, id: string) {
      if (id.endsWith('.ts') || id.endsWith('.tsx') || id.endsWith('.js') || id.endsWith('.jsx')) {
        return code.replace(/console\.log/g, 'console.debug');
      }
      return code;
    },
  };
}

function replaceConsolePlugin(method: string = 'error'): import('vite').Plugin {
  return {
    name: 'replace-console-plus',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (/\.(t|j)sx?$/.test(id)) {
        return code.replace(/console\.log/g, `console.${method}`)
      }
      return code
    },
  }
}

function bannerPlugin(): import('vite').Plugin {
  const banner = `
/*!
 * 🚀 Project: Vite + React + TS
 * 📦 Build time: ${new Date().toLocaleString()}
 */
`;

  return {
    name: 'banner',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          file.code = banner + file.code
        }
      }
    },
  };
}

// function bannerConsolePlugin(): import('vite').Plugin {
//   return {
//     name: 'banner-plugin',
//     apply: 'serve', // chỉ chạy khi dev (serve), có thể bỏ để chạy cả build
//     buildStart() {
//       console.log('==============================')
//       console.log('🚀 Project đang chạy với Vite + React + TS')
//       console.log('==============================')
//     },
//   }
// }