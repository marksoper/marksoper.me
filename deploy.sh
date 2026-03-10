#!/bin/bash
set -e

# Load credentials from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Building site..."
npm run build

echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=marksoper-me

echo "Done! Site deployed to https://marksoper.me"
