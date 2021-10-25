import { defineConfig, ConfigEnv,UserConfigExport} from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock';
// @ts-ignore
import path from 'path'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport =>{
  let prodMock = true;
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "components": path.resolve(__dirname, "src/components"),
        "styles": path.resolve(__dirname, "src/styles"),
        "plugins": path.resolve(__dirname, "src/plugins"),
        "views": path.resolve(__dirname, "src/views"),
        "layouts": path.resolve(__dirname, "src/layouts"),
        "utils": path.resolve(__dirname, "src/utils"),
        "apis": path.resolve(__dirname, "src/apis"),
        "dirs": path.resolve(__dirname, "src/directives"),
      },
    },
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      })
    ],
    server:{
      host: '0.0.0.0',
      port: 8866,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
