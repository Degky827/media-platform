import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use happy-dom to avoid jsdom ESM top-level-await issues in some environments
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['src/test/setup.tsx'],
  },
});
