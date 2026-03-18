#!/usr/bin/env bash
set -euo pipefail

echo "== Repo =="
git rev-parse --show-toplevel
echo

echo "== Git status =="
git status -sb
echo

echo "== Node / npm =="
node -v
npm -v
echo

echo "== Next version (dep) =="
node -e "const p=require('./package.json'); console.log('next:', (p.dependencies?.next||p.devDependencies?.next||'not found'));"
echo

echo "== App Router presence =="
if [ -d "src/app" ]; then
  echo "OK: src/app exists"
else
  echo "ERROR: src/app not found"
  exit 1
fi
echo

echo "== Existing API routes under src/app/api =="
if [ -d "src/app/api" ]; then
  find src/app/api -maxdepth 3 -type f -name "route.*" -print
else
  echo "No src/app/api directory yet"
fi
echo

echo "== Check Turbopack build health =="
npm run build >/dev/null
echo "OK: build succeeded"
echo

echo "== Check globals.css has no @import (Turbopack pitfall) =="
if grep -n "@import" src/app/globals.css; then
  echo "WARN: @import found in globals.css"
else
  echo "OK: no @import in src/app/globals.css"
fi
