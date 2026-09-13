#!/usr/bin/env bash
# Serve a build and capture against it, with the server's lifetime scoped to
# this script so nothing is left listening on the port afterwards.
#
# usage: run.sh <repo-dir> <dist-dir> <port> <out-dir> [extra capture args...]
set -euo pipefail

REPO="$1"; DIST="$2"; PORT="$3"; OUT="$4"; shift 4
HARNESS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "port $PORT is already in use -- refusing to serve a baseline that might not be ours" >&2
  exit 2
fi

cd "$REPO"
NEXT_DIST_DIR="$DIST" npx next start -p "$PORT" > "/tmp/parity-server-$PORT.log" 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; wait "$SERVER" 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  if [ "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/" || true)" = "200" ]; then
    break
  fi
  if ! kill -0 "$SERVER" 2>/dev/null; then
    echo "server died during startup:" >&2; cat "/tmp/parity-server-$PORT.log" >&2; exit 1
  fi
  sleep 1
done

node "$HARNESS/capture.mjs" --url "http://localhost:$PORT" --out "$OUT" "$@"
