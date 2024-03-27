import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsConfigPaths from 'vite-tsconfig-paths';

export function defineWeb(dir: string) {
  return defineConfig({
    plugins: [
      tsConfigPaths(),
      checker({
        typescript: true
      }),
      visualizer({
        filename: `${dir}/stats/analysis.html`
      })
    ],
    server: {
      strictPort: true
    },
    resolve: {
      alias: {
        lodash: 'lodash-es'
      }
    }
  });
}
