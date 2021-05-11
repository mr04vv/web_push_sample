import { build, BuildFailure, BuildResult } from 'esbuild';
const isDev = process.env.NODE_ENV === '"development"';

build({
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV as string },
  target: 'es2015',
  platform: 'browser',
  entryPoints: ['src/index.tsx'],
  outdir: 'build',
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  watch: {
    onRebuild(err: BuildFailure | null, result: BuildResult | null) {
      console.log(JSON.stringify(err?.errors));
      console.log(JSON.stringify(result?.warnings));
    },
  },
})
  .then(() => {
    console.log('===========================================');
    console.log(new Date().toLocaleString() + ': watching...');
  })
  .catch((err: Error) => console.log('Error:' + JSON.stringify(err)));
