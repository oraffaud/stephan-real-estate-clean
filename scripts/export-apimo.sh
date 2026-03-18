#!/usr/bin/env bash
set -euo pipefail

: "${APIMO_PROVIDER:?Missing APIMO_PROVIDER}"
: "${APIMO_TOKEN:?Missing APIMO_TOKEN}"
: "${APIMO_AGENCY_ID:?Missing APIMO_AGENCY_ID}"

APIMO_BASE_URL="${APIMO_BASE_URL:-https://api.apimo.pro}"
OUT_DIR="${OUT_DIR:-public/data}"
OUT_FILE="${OUT_FILE:-$OUT_DIR/mandats.json}"

LIMIT="${LIMIT:-200}"
OFFSET_START="${OFFSET_START:-0}"
SLEEP_BETWEEN_REQ="${SLEEP_BETWEEN_REQ:-0.12}"

STATE_DIR="${STATE_DIR:-.apimo_state}"
TS_FILE="$STATE_DIR/last_timestamp.txt"

mkdir -p "$OUT_DIR" "$STATE_DIR"

AUTH="${APIMO_PROVIDER}:${APIMO_TOKEN}"

require() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1" >&2; exit 1; }; }
require curl
require jq

fetch_page() {
  local offset="$1"
  local timestamp="${2:-}"

  local url="${APIMO_BASE_URL}/agencies/${APIMO_AGENCY_ID}/properties?limit=${LIMIT}&offset=${offset}"
  if [[ -n "$timestamp" ]]; then
    url="${url}&timestamp=${timestamp}"
  fi

  curl -sS --fail \
    -u "$AUTH" \
    -H "Accept: application/json" \
    "$url"
}

normalize_items() {
  jq '{
    total: (.total_items // 0),
    timestamp: (.timestamp // null),
    items: (
      (.properties // [])
      | map({
          id: .id,
          reference: .reference,
          title: (.name // .reference),
          city: (.city.name // null),
          zipcode: (.city.zipcode // null),
          price: (.price.value // null),
          currency: (.price.currency // null),
          cover: (
            (.pictures // [])
            | sort_by(.rank // 999)
            | .[0].url // null
          ),
          agreement: (
            .agreement
            | if . == null then null else {
                type: (.type // null),
                reference: (.reference // null),
                start_at: (.start_at // null),
                end_at: (.end_at // null)
              } end
          )
      })
    )
  }'
}

LAST_TS=""
if [[ -f "$TS_FILE" ]]; then
  LAST_TS="$(tr -d '[:space:]' < "$TS_FILE" || true)"
fi

echo "APIMO export -> $OUT_FILE"
echo "Agency: $APIMO_AGENCY_ID | limit=$LIMIT | offset_start=$OFFSET_START | last_ts=${LAST_TS:-<none>}"

offset="$OFFSET_START"
all_items='[]'
new_ts=""

while :; do
  raw="$(fetch_page "$offset" "$LAST_TS")"
  page="$(printf '%s' "$raw" | normalize_items)"

  page_count="$(printf '%s' "$page" | jq '.items | length')"
  total="$(printf '%s' "$page" | jq -r '.total')"
  page_ts="$(printf '%s' "$page" | jq -r '.timestamp // empty')"

  if [[ -n "$page_ts" ]]; then
    new_ts="$page_ts"
  fi

  all_items="$(jq -c --argjson a "$all_items" --argjson b "$(printf '%s' "$page" | jq '.items')" '$a + $b' <<< 'null')"

  echo "Fetched offset=$offset count=$page_count (total=$total)"
  if [[ "$page_count" -lt "$LIMIT" ]]; then
    break
  fi

  offset=$((offset + LIMIT))
  sleep "$SLEEP_BETWEEN_REQ"
done

final_json="$(jq -n \
  --argjson items "$all_items" \
  --arg agency "$APIMO_AGENCY_ID" \
  --arg generated_at "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
  '{
    agency_id: $agency,
    generated_at: $generated_at,
    count: ($items | length),
    items: ($items | unique_by(.id) | sort_by(.id) | reverse)
  }'
)"

tmp="$(mktemp)"
printf '%s\n' "$final_json" > "$tmp"
mv "$tmp" "$OUT_FILE"

if [[ -n "$new_ts" ]]; then
  printf '%s\n' "$new_ts" > "$TS_FILE"
  echo "Saved new timestamp: $new_ts"
fi

echo "Done. Wrote: $OUT_FILE"
