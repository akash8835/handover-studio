#!/bin/sh
set -eu
npm run build
node scripts/test-design-ui.mjs
node scripts/push-api.mjs
npx wrangler deploy --config wrangler.json
