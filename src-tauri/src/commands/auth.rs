use crate::models::user::{AuthResponse, LoginPayload};
use crate::services::auth_service;
use crate::storage::db::AppState;
use tauri::State;

#[tauri::command]
pub fn register(payload: LoginPayload, state: State<AppState>) -> Result<String, String> {
    auth_service::register_user(&state, payload)
}

#[tauri::command]
pub fn login(payload: LoginPayload, state: State<AppState>) -> Result<AuthResponse, String> {
    auth_service::login_user(&state, payload)
}

#[tauri::command]
pub fn logout(state: State<AppState>) -> Result<(), String> {
    auth_service::logout_user(&state)
}

#[tauri::command]
pub fn get_session(state: State<AppState>) -> Result<Option<AuthResponse>, String> {
    auth_service::get_active_session(&state)
}
