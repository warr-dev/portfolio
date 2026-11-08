# API & Inertia Reference

## 1. Public Endpoints

### `GET /`
- **Route Name**: `portfolio.index`
- **Controller**: `App\Http\Controllers\PortfolioController@index`
- **Description**: Renders the complete single-page portfolio layout with dynamic site settings, projects, experiences, and skills pre-fetched into Inertia props.

---

### `POST /contact`
- **Route Name**: `portfolio.contact`
- **Controller**: `App\Http\Controllers\PortfolioController@submitContact`
- **Description**: Validates and stores incoming recruiter and client inquiries.
- **Request Payload**:
  ```json
  {
    "name": "Jane Recruiter",
    "email": "jane@company.com",
    "subject": "Senior Backend Developer Role",
    "message": "We have an open position matching your high-concurrency Laravel and C++ experience."
  }
  ```

---

## 2. Admin Authentication & Protected Endpoints

### `GET /admin/login` & `POST /admin/login`
- **Route Names**: `admin.login`
- **Controller**: `App\Http\Controllers\Admin\AuthController`
- **Description**: Admin credentials challenge. Authenticates admin session using standard Laravel guards.

### `POST /admin/logout`
- **Route Name**: `admin.logout`
- **Description**: Terminates session and invalidates CSRF token.

---

### Protected Routes (`middleware('auth')`)

| Route Method | Path | Action | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin` | `DashboardController@index` | Overview metrics and 5 latest inquiries |
| `GET` | `/admin/settings` | `SettingsController@index` | Profile & CV upload editor |
| `POST` | `/admin/settings` | `SettingsController@update` | Persist site settings and upload new PDFs |
| `GET` | `/admin/projects` | `ProjectController@index` | List all projects |
| `POST` | `/admin/projects` | `ProjectController@store` | Create new showcased project |
| `PUT` | `/admin/projects/{project}` | `ProjectController@update` | Update existing project |
| `DELETE` | `/admin/projects/{project}` | `ProjectController@destroy` | Remove project |
| `GET` | `/admin/experience` | `ExperienceController@index` | List career milestones |
| `POST` | `/admin/experience` | `ExperienceController@store` | Add career entry |
| `PUT` | `/admin/experience/{experience}` | `ExperienceController@update` | Update career entry |
| `DELETE` | `/admin/experience/{experience}` | `ExperienceController@destroy` | Remove career entry |
| `GET` | `/admin/skills` | `SkillController@index` | List skill categories |
| `POST` | `/admin/skills` | `SkillController@store` | Create skill category |
| `PUT` | `/admin/skills/{skill}` | `SkillController@update` | Update skill category |
| `DELETE` | `/admin/skills/{skill}` | `SkillController@destroy` | Remove skill category |
| `GET` | `/admin/inbox` | `InboxController@index` | View recruiter inquiry messages |
| `POST` | `/admin/inbox/{message}/read` | `InboxController@markAsRead` | Mark inquiry as read |
| `DELETE` | `/admin/inbox/{message}` | `InboxController@destroy` | Delete inquiry |

---

## 3. Production Management API (`/api/manage/*`)

Protected by `manage.auth` middleware (`Authorization: Bearer <MANAGE_API_KEY>`) and rate-limited via `throttle:60,1`. Excluded from maintenance mode blocking.

### `GET /api/manage/health`
- **Controller**: `App\Http\Controllers\Api\ProductionManageController@health`
- **Description**: Returns system metrics, PHP/Laravel versions, database connectivity, and maintenance state.
- **Response `200 OK`**:
  ```json
  {
    "status": "ok",
    "php_version": "8.3.x",
    "laravel_version": "13.17.x",
    "app_env": "production",
    "maintenance_mode": false,
    "db_connected": true,
    "disk_free_mb": 45230,
    "cache_driver": "database"
  }
  ```

### `POST /api/manage/artisan`
- **Controller**: `App\Http\Controllers\Api\ProductionManageController@artisan`
- **Description**: Executes whitelisted artisan commands (`about`, `optimize:clear`, `config:cache`, `config:clear`, `route:cache`, `route:clear`, `view:cache`, `view:clear`, `migrate:status`, `storage:link`).
- **Request Payload**:
  ```json
  {
    "command": "config:cache"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "command": "config:cache",
    "output": "Configuration cache cleared successfully.\nConfiguration cached successfully.\n"
  }
  ```
- **Response `403 Forbidden`** (if command is not whitelisted):
  ```json
  {
    "error": "Command not allowed",
    "allowed_commands": ["about", "optimize:clear", "config:cache", "..."]
  }
  ```

### `GET /api/manage/logs`
- **Controller**: `App\Http\Controllers\Api\ProductionManageController@logs`
- **Description**: Tails recent lines of `storage/logs/laravel.log`. Query parameter `lines` defaults to 50 (max 500).
- **Query Params**: `?lines=50`
- **Response `200 OK`**:
  ```json
  {
    "lines": 50,
    "content": "[2026-11-08 14:00:00] production.ERROR: ..."
  }
  ```

### `POST /api/manage/maintenance`
- **Controller**: `App\Http\Controllers\Api\ProductionManageController@maintenance`
- **Description**: Toggles Laravel maintenance mode (`down` or `up`).
- **Request Payload (Down)**:
  ```json
  {
    "action": "down",
    "secret": "optional-bypass-token"
  }
  ```
- **Request Payload (Up)**:
  ```json
  {
    "action": "up"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "status": "ok",
    "maintenance_mode": false,
    "output": "Application is now live."
  }
  ```

