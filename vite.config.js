import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const isProd = command === 'build';
  const config = {
    mode: isProd ? 'production' : '',
    server: {
      port: 8080,
    },
  };

  if (!isProd || mode === 'demo') {
    config.root = `${process.cwd()}/demo`;
    config.build = {
      outDir: `${process.cwd()}/dist`,
      emptyOutDir: true,
    };
    config.plugins = [vue()];
  }

  if (mode === 'lib') {
    config.build = {
      outDir: 'lib',
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry: path.resolve(__dirname, 'src/progressbar.js'),
        name: 'VueNextProgressbar',
        formats: ['es', 'cjs', 'umd'],
      },
    };
  }

  return defineConfig(config);
};
