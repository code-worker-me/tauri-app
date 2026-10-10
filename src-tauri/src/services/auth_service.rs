use bcrypt::{hash, verify, DEFAULT_COST};
use rusqlite::params;
use crate::models::user::{AuthResponse, LoginPayload, User, UserPublic};
use crate::storage::db::AppState;
use tauri::State;

pub fn register_user(
    state: &State<AppState>,
    payload: LoginPayload,
) -> Result<String, String> {
    let username = payload.username.trim();
    if username.is_empty() || payload.password.trim().is_empty() {
        return Err("Username dan password tidak boleh kosong.".to_string());
    }

    let conn = state.db.lock().map_err(|_| "Gagal mengakses database.".to_string())?;

    // Cek apakah username sudah ada
    let exists: bool = conn
        .query_row(
            "SELECT 1 FROM users WHERE username = ?1",
            params![username],
            |_| Ok(true),
        )
        .unwrap_or(false);

    if exists {
        return Err("Username sudah terdaftar.".to_string());
    }

    let hashed = hash(payload.password, DEFAULT_COST)
        .map_err(|_| "Gagal melakukan hashing password.".to_string())?;

    let user_id = format!("usr_{}", std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis());

    conn.execute(
        "INSERT INTO users (id, username, password_hash) VALUES (?1, ?2, ?3)",
        params![user_id, username, hashed],
    )
    .map_err(|e| format!("Gagal menyimpan data user: {}", e))?;

    Ok("Registrasi berhasil.".to_string())
}

pub fn login_user(
    state: &State<AppState>,
    payload: LoginPayload,
) -> Result<AuthResponse, String> {
    let conn = state.db.lock().map_err(|_| "Gagal mengakses database.".to_string())?;

    let user = conn
        .query_row(
            "SELECT id, username, password_hash FROM users WHERE username = ?1",
            params![payload.username],
            |row| {
                Ok(User {
                    id: row.get(0)?,
                    username: row.get(1)?,
                    password_hash: row.get(2)?,
                })
            },
        )
        .map_err(|_| "Username atau password salah.".to_string())?;

    let is_valid = verify(&payload.password, &user.password_hash)
        .map_err(|_| "Verifikasi kredensial gagal.".to_string())?;

    if !is_valid {
        return Err("Username atau password salah.".to_string());
    }

    // Catat session user ID yang aktif
    let mut session = state.current_session_user_id.lock()
        .map_err(|_| "Gagal mencatat session.".to_string())?;
    *session = Some(user.id.clone());

    Ok(AuthResponse {
        user: UserPublic {
            id: user.id.clone(),
            username: user.username.clone(),
        },
        token: format!("mock_token_for_{}", user.username),
    })
}

pub fn logout_user(state: &State<AppState>) -> Result<(), String> {
    let mut session = state.current_session_user_id.lock()
        .map_err(|_| "Gagal mengakses session.".to_string())?;
    *session = None;
    Ok(())
}

pub fn get_active_session(state: &State<AppState>) -> Result<Option<AuthResponse>, String> {
    let session = state.current_session_user_id.lock()
        .map_err(|_| "Gagal membaca session.".to_string())?;

    let user_id = match &*session {
        Some(id) => id.clone(),
        None => return Ok(None),
    };

    let conn = state.db.lock().map_err(|_| "Gagal mengakses database.".to_string())?;

    let user = conn
        .query_row(
            "SELECT id, username FROM users WHERE id = ?1",
            params![user_id],
            |row| {
                Ok(UserPublic {
                    id: row.get(0)?,
                    username: row.get(1)?,
                })
            },
        )
        .map_err(|_| "User session tidak valid.".to_string())?;

    Ok(Some(AuthResponse {
        user: user.clone(),
        token: format!("mock_token_for_{}", user.username),
    }))
}
