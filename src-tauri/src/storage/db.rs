use rusqlite::{params, Connection};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{AppHandle, Manager};

pub struct AppState {
    pub db: Mutex<Connection>,
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
        let conn = Connection::open(db_path)?;

        // Inisialisasi tabel users jika belum ada
        conn.execute(
            "CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            )",
            [],
        )?;

        // tabel produc
        conn.execute(
            "CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER NOT NULL DEFAULT 0
        )",
            [],
        )?;

        Ok(Self {
            db: Mutex::new(conn),
            current_session_user_id: Mutex::new(None),
        })
    }
}
