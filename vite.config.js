import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Normalize process.cwd() to canonical real path to avoid Windows junction/symlink mismatch in Vite & Rollup
const realCwd = fs.realpathSync(process.cwd());
if (process.cwd() !== realCwd) {
  process.chdir(realCwd);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
    watch: {
      ignored: ['**/*.pdf', '**/*.jpg', '**/*.png', '**/*.jpeg']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-xlsx': ['xlsx'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});
