#!/usr/bin/env bash
# Production Management CLI Helper
# Usage:
#   ./scripts/prod-manage.sh health
#   ./scripts/prod-manage.sh artisan config:cache
#   ./scripts/prod-manage.sh logs 50
#   ./scripts/prod-manage.sh maintenance down [secret]
#   ./scripts/prod-manage.sh maintenance up

set -euo pipefail

# Find script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load environment variables if available
if [[ -f "$PROJECT_ROOT/.env" ]]; then
    ENV_PROD_URL=$(grep -E '^PROD_URL=' "$PROJECT_ROOT/.env" | cut -d '=' -f2- | tr -d '"'\'' ' || true)
    ENV_KEY=$(grep -E '^MANAGE_API_KEY=' "$PROJECT_ROOT/.env" | cut -d '=' -f2- | tr -d '"'\'' ' || true)
fi

BASE_URL="${PROD_URL:-${ENV_PROD_URL:-https://warrdev.site}}"
API_KEY="${MANAGE_API_KEY:-${ENV_KEY:-}}"

if [[ -z "$API_KEY" ]]; then
    echo "Error: MANAGE_API_KEY is not set. Please set it in .env or as an environment variable." >&2
    exit 1
fi

ACTION="${1:-health}"

case "$ACTION" in
    health)
        echo "🔍 Checking production health at $BASE_URL/api/manage/health..."
        curl -s -f -H "Authorization: Bearer $API_KEY" \
             -H "Accept: application/json" \
             "$BASE_URL/api/manage/health" | jq . || curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/manage/health"
        echo ""
        ;;

    artisan)
        COMMAND="${2:-about}"
        echo "⚡ Executing artisan command [$COMMAND] on production..."
        curl -s -f -X POST \
             -H "Authorization: Bearer $API_KEY" \
             -H "Content-Type: application/json" \
             -H "Accept: application/json" \
             -d "{\"command\":\"$COMMAND\"}" \
             "$BASE_URL/api/manage/artisan" | jq . || curl -s -X POST -H "Authorization: Bearer $API_KEY" -H "Content-Type: application/json" -d "{\"command\":\"$COMMAND\"}" "$BASE_URL/api/manage/artisan"
        echo ""
        ;;

    logs)
        LINES="${2:-50}"
        echo "📋 Fetching last $LINES lines of production log..."
        curl -s -f -H "Authorization: Bearer $API_KEY" \
             -H "Accept: application/json" \
             "$BASE_URL/api/manage/logs?lines=$LINES" | jq -r .content 2>/dev/null || curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/manage/logs?lines=$LINES"
        echo ""
        ;;

    maintenance)
        MODE="${2:-down}"
        SECRET="${3:-}"
        PAYLOAD="{\"action\":\"$MODE\""
        if [[ -n "$SECRET" ]]; then
            PAYLOAD="$PAYLOAD,\"secret\":\"$SECRET\""
        fi
        PAYLOAD="$PAYLOAD}"

        echo "🚧 Toggling maintenance mode ($MODE)..."
        curl -s -f -X POST \
             -H "Authorization: Bearer $API_KEY" \
             -H "Content-Type: application/json" \
             -H "Accept: application/json" \
             -d "$PAYLOAD" \
             "$BASE_URL/api/manage/maintenance" | jq . || curl -s -X POST -H "Authorization: Bearer $API_KEY" -H "Content-Type: application/json" -d "$PAYLOAD" "$BASE_URL/api/manage/maintenance"
        echo ""
        ;;

    *)
        echo "Usage: $0 {health|artisan <cmd>|logs [lines]|maintenance <down|up> [secret]}" >&2
        exit 1
        ;;
esac
