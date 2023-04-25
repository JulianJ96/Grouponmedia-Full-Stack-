import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from 'rollup-plugin-commonjs'; // <-- import rollup-plugin-commonjs

export default defineConfig({
  plugins: [
    vue(),
    commonjs(), // <-- add commonjs to the plugins array
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    cjsInterop: true
  }
});





