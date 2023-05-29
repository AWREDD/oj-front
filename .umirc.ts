import { defineConfig } from "umi";

export default defineConfig({
  npmClient: 'pnpm',
  fastRefresh: true,
  plugins: [
    '@umijs/plugins/dist/model'
  ],
  model: {}
});
