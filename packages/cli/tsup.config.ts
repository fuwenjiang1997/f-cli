import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  treeshake: true,
  splitting: false,
  sourcemap: false,
  shims: true, // 在构建esm/cjs时自动添加必要代码，如cjs中插入__dirname
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
