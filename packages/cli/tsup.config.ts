import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  minify: false,
  clean: true,
  format: ['cjs'],
  outDir: 'dist',
  outExtension() {
    return {
      js: '.js'
    }
  }
})
