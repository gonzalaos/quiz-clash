echo "window._env_ = { BACKEND_EXTERNAL_URL: '$BACKEND_EXTERNAL_URL' }" > "/usr/share/nginx/html/env-config.js"

exec nginx -g 'daemon off;'