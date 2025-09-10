// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from "rollup-plugin-visualizer"
// import path from "path"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    replaceConsole(),
    replaceConsolePlugin('warm'),
    bannerPlugin(),
    visualizer({ open: true }), // tự động mở biểu đồ sau khi build
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Vite PWA",
        short_name: "VitePWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,       // đổi port dev server
    open: true,       // mở browser khi chạy npm run dev
    proxy: {
      "/api": "http://localhost:3001", // chuyển mọi request /api sang backend
    },
  },
  resolve: {
    alias: {    //Không dùng cái này cho nó lành
      '@': '/src',    // alias cho thư mục src => thay cho đường dẫn: dùng @/components/Button thay vì ../../components/Button
      '@components': '@/components',
      '@utils': '/src/utils'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  base: './', // thêm dòng này để asset dùng relative path
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  optimizeDeps: {
    include: ["lodash", "dayjs"], // ép Vite pre-bundle sớm các lib hay dùng.
    exclude: ["big-lib-you-dont-need"]  // loại bỏ khỏi pre-bundle (chỉ load khi cần).
  },
  // // Dùng libary mode để build thư viện
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "src/index.ts"),
  //     name: "MyLib",
  //     fileName: (format) => `my-lib.${format}.js`,
  //   },
  //   rollupOptions: {
  //     external: ["react", "react-dom"], // không bundle react
  //     output: {
  //       globals: {
  //         react: "React",
  //         "react-dom": "ReactDOM",
  //       },
  //     },
  //   },
  // }
  // // Khi build sẽ có: my-lib.es.js, my-lib.umd.js, style.css là thư viện có thể install: npm install ../vite-react-ts/dist ==> rồi sử dụng: import { Button } from "my-lib";
  // // xuất bản thành NPM package: npm login \n& npm publish --access public
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