import { defineConfig } from 'orval';

export default defineConfig({
  main: {
    input: 'apps/shared/src/swagger/index.yaml',
    output: {
      target: 'apps/frontend/src/api/generated',
      schemas: 'apps/frontend/src/api/generated/model',
      mock: true,
      prettier: true,
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: 'apps/frontend/src/api/baseApiRequest.ts',
          name: 'baseApiRequest',
        },
      },
    },
  },
});
