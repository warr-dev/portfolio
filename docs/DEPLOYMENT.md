# Production Deployment Guide (Hostinger Shared Hosting)

This guide documents the architecture, automated CI/CD pipeline, and manual fallback procedures for deploying the **Warren Dalawampu Portfolio** to Hostinger Shared Hosting / Cloud Hosting.

---

## 1. Architecture Overview (Symlink Strategy)

Hostinger serves files strictly from `public_html`. Under this standard architecture, the full project application resides in `{project}/` (e.g. `portfolio/`), and `public_html` is connected directly as a symbolic link pointing to `portfolio/public`:

```
/home/u102125202/domains/warrdev.site/
├── portfolio/                  # Complete portfolio application
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/                 # Built Vite assets, standard index.php, robots.txt
│   │   ├── build/
│   │   ├── storage/ -> ../storage/app/public
│   │   ├── index.php
│   │   └── .htaccess
│   ├── routes/
│   ├── storage/                # chmod 775
│   ├── vendor/
│   ├── artisan
│   └── .env                    # Production environment secrets
│
└── public_html -> portfolio/public # Symbolic link to portfolio public directory
```

### Connecting `public_html` via Symlink:
```bash
cd ~/domains/warrdev.site/

# 1. Backup or remove existing directory / stale link
rm -rf public_html

# 2. Create symbolic link: public_html -> portfolio/public
ln -s portfolio/public public_html

# 3. Verify the link:
ls -ld public_html
# Output: lrwxrwxrwx ... public_html -> portfolio/public
```

With this pattern, the application's default `public/index.php` and asset paths run unmodified with 100% native compatibility.

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
DB_DATABASE=/home/u102125202/domains/warrdev.site/portfolio/database/database.sqlite

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

Create the SQLite database file and set permissions:
```bash
touch /home/u102125202/domains/warrdev.site/portfolio/database/database.sqlite
chmod -R 775 /home/u102125202/domains/warrdev.site/portfolio/storage
chmod -R 775 /home/u102125202/domains/warrdev.site/portfolio/bootstrap/cache
```

### Step 4: Storage Symlink
Link the storage directory from `portfolio/`:
```bash
cd /home/u102125202/domains/warrdev.site/portfolio
php artisan storage:link
```
The link is created at `portfolio/public/storage`, which is automatically accessible through `public_html/storage` since `public_html` points directly to `portfolio/public`.

---

## 5. Troubleshooting & Maintenance

### Creating an Admin User
Run the interactive artisan command to create an administrative user:
```bash
ssh -p 65002 u102125202@151.106.124.61
cd ~/domains/warrdev.site/portfolio
/opt/alt/php83/usr/bin/php artisan make:user
```
Or run directly with flags non-interactively:
```bash
/opt/alt/php83/usr/bin/php artisan make:user --name="Alex" --email="alex@warrdev.site" --password="YourSecurePassword"
```

### Clearing & Re-caching Remotely
```bash
ssh -p 65002 u102125202@151.106.124.61
cd ~/domains/warrdev.site/portfolio
/opt/alt/php83/usr/bin/php artisan optimize:clear
/opt/alt/php83/usr/bin/php artisan config:cache
/opt/alt/php83/usr/bin/php artisan route:cache
/opt/alt/php83/usr/bin/php artisan view:cache
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
