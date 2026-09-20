# Production Deployment Guide (Hostinger Shared Hosting)

This guide documents the architecture, automated CI/CD pipeline, and manual fallback procedures for deploying the **Warren Dalawampu Portfolio** to Hostinger Shared Hosting / Cloud Hosting.

---

## 1. Architecture Overview

Hostinger shared hosting exposes the document root at `public_html/`. Because Laravel places its public entrypoint in `public/` and requires backend framework directories (`app/`, `config/`, `bootstrap/`, `vendor/`, `storage/`) to reside securely outside the public web server, the deployment architecture separates the project into two side-by-side directories:

```
/home/u123456789/
├── portfolio_backend/          # Private backend directory (not web-accessible)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── storage/                # chmod 775
│   ├── vendor/
│   ├── artisan
│   └── .env                    # Production environment secrets
│
└── public_html/                # Web server DocumentRoot
    ├── assets/                 # Built Vite bundles (CSS / JS)
    ├── storage/ -> ../portfolio_backend/storage/app/public
    ├── index.php               # Custom production bootstrap (points to ../portfolio_backend)
    ├── .htaccess               # URL rewriting & security headers
    ├── robots.txt
    └── favicon.ico
```

### Production `public_html/index.php` Bootstrapper
```php
<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// 1. Check maintenance mode
if (file_exists($maintenance = __DIR__.'/../portfolio_backend/storage/framework/maintenance.php')) {
    require $maintenance;
}

// 2. Register autoloader
require __DIR__.'/../portfolio_backend/vendor/autoload.php';

// 3. Bootstrap application and enforce public path
$app = require_once __DIR__.'/../portfolio_backend/bootstrap/app.php';
$app->usePublicPath(__DIR__);

// 4. Handle HTTP request
$app->handleRequest(Request::capture());
```

---

## 2. GitHub Actions CI/CD Pipeline

The automated deployment pipeline runs on every push to `main` via [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) or manual trigger via `workflow_dispatch`.

### Pipeline Stages:
1. **Environment Setup**:
   - PHP 8.3 with required extensions (`mbstring`, `pdo_sqlite`, `pdo_mysql`, `intl`, `bcmath`, `fileinfo`).
   - Node.js 22 with cached `npm` dependencies.
2. **Build & Bundle**:
   - `composer install --no-dev --prefer-dist --optimize-autoloader`
   - `npm ci && npm run build` (Vite compiles Tailwind v4 + Inertia React bundles).
3. **Staging Preparation (`staging/`)**:
   - Packages private backend into `staging/portfolio_backend/`.
   - Packages public static assets and customized `index.php` into `staging/public_html/`.
4. **Remote Rsync & Deployment via SSH**:
   - Synchronizes `staging/portfolio_backend/` to remote `$TARGET/portfolio_backend/`.
   - Synchronizes `staging/public_html/` to remote `$TARGET/public_html/`.
5. **Post-Deployment Optimizations**:
   - Executes remote database migrations: `php artisan migrate --force`
   - Warms configuration, route, and view caches:
     ```bash
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     ```
6. **FTPS Fallback**:
   - If SSH secrets are not defined, gracefully deploys via FTPS (`SamKirkland/FTP-Deploy-Action`).

---

## 3. GitHub Secrets Configuration

To configure continuous deployment, add the following secrets in GitHub Repository Settings (`Settings` > `Secrets and variables` > `Actions` > `prod` environment or repository secrets):

| Secret Name | Description | Example / Default |
|-------------|-------------|-------------------|
| `HOSTINGER_SSH_HOST` | Hostinger SSH server IP or hostname | `195.35.x.x` or `ssh.example.com` |
| `HOSTINGER_SSH_PORT` | Hostinger SSH port | `65002` |
| `HOSTINGER_SSH_USER` | Hostinger SSH username | `u123456789` |
| `HOSTINGER_SSH_KEY` | Private SSH key (id_rsa or ed25519) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `HOSTINGER_TARGET_PATH` | Base directory path on server for target domain | `/home/u102125202/domains/warrdev.site/` (or `/home/u102125202/`) |
| `HOSTINGER_FTP_SERVER` | *(Fallback)* FTPS Server hostname | `ftp.example.com` |
| `HOSTINGER_FTP_USERNAME` | *(Fallback)* FTPS username | `u102125202` |
| `HOSTINGER_FTP_PASSWORD` | *(Fallback)* FTPS password | `********` |

> [!NOTE]
> On Hostinger multi-domain accounts, the web root for domains lives under `/home/uXXXX/domains/<yourdomain.com>/public_html`. Setting `HOSTINGER_TARGET_PATH` to `/home/uXXXX/domains/<yourdomain.com>/` automatically deploys backend assets to `.../domains/<yourdomain.com>/portfolio_backend` and web assets directly into `.../domains/<yourdomain.com>/public_html`.

---

## 4. Initial Hostinger Server Setup (One-Time)

### Step 1: Enable SSH in hPanel
1. Navigate to **hPanel** > **Advanced** > **SSH Access**.
2. Click **Enable SSH Access**. Note down the SSH Host, Port (`65002`), and Username.
3. Add your public SSH key (`~/.ssh/id_rsa.pub`) to **Public Keys**.

### Step 2: Configure PHP 8.3 CLI
In Hostinger hPanel > **Advanced** > **PHP Configuration**, ensure PHP Version is set to **PHP 8.3**.

### Step 3: Create `.env` on Hostinger
SSH into the server and create `/home/u123456789/portfolio_backend/.env`:

```ini
APP_NAME="Warren Dalawampu"
APP_ENV=production
APP_KEY=base64:GENERATE_KEY_HERE
APP_DEBUG=false
APP_URL=https://yourdomain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=sqlite
DB_DATABASE=/home/u123456789/portfolio_backend/database/database.sqlite

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

Create the SQLite database file and set permissions:
```bash
touch /home/u123456789/portfolio_backend/database/database.sqlite
chmod -R 775 /home/u123456789/portfolio_backend/storage
chmod -R 775 /home/u123456789/portfolio_backend/bootstrap/cache
```

### Step 4: Storage Symlink
Link the private storage directory to `public_html`:
```bash
cd /home/u123456789/portfolio_backend
php artisan storage:link
```
Or manually if needed:
```bash
ln -s /home/u123456789/portfolio_backend/storage/app/public /home/u123456789/public_html/storage
```

---

## 5. Troubleshooting & Maintenance

### Clearing & Re-caching Remotely
```bash
ssh -p 65002 u123456789@HOST
cd /home/u123456789/portfolio_backend
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Checking Error Logs
```bash
tail -n 50 /home/u123456789/portfolio_backend/storage/logs/laravel.log
```

### Fixing Permissions
```bash
find /home/u123456789/portfolio_backend/storage -type d -exec chmod 775 {} +
find /home/u123456789/portfolio_backend/storage -type f -exec chmod 664 {} +
find /home/u123456789/portfolio_backend/bootstrap/cache -type d -exec chmod 775 {} +
```
