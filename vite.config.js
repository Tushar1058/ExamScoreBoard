import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ExamScoreBoard/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase-app': ['firebase/app'],
          'firebase-database': ['firebase/database']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});

