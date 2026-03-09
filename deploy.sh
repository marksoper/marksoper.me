#!/bin/bash
set -e

echo "Building site..."
npm run build

echo "Deploying to Cloudflare Pages..."
# Option 1: Direct upload via Wrangler
npx wrangler pages deploy dist --project-name=marksoper-me

echo "Done! Site deployed to https://marksoper.me"
