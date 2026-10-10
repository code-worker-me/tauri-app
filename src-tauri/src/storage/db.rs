use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{AppHandle, Manager};

pub struct AppState {
    pub db: Pool<SqliteConnectionManager>,
    pub current_session_user_id: Mutex<Option<String>>,
}

impl AppState {
    pub fn init(app_handle: &AppHandle) -> Result<Self, Box<dyn std::error::Error>> {
        // Ambil path direktori data lokal spesifik aplikasi dari OS
        let app_dir: PathBuf = app_handle
            .path()
            .app_data_dir()
            .unwrap_or_else(|_| PathBuf::from("."));

        if !app_dir.exists() {
            fs::create_dir_all(&app_dir)?;
        }

        let db_path = app_dir.join("app_data.db");
        let manager = SqliteConnectionManager::file(db_path);
        let pool = Pool::new(manager)?;
        let conn = pool.get()?;

        // Inisialisasi tabel users dan products jika belum ada
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER NOT NULL DEFAULT 0
            );",
        )?;

        Ok(Self {
            db: pool,
            current_session_user_id: Mutex::new(None),
        })
    }
}
