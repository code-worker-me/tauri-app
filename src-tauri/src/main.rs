// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod models;
mod services;
mod storage;

use storage::db::AppState;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let state =
                AppState::init(app.handle()).expect("Gagal menginisialisasi SQLite database");
            app.manage(state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::auth::register,
            commands::auth::login,
            commands::auth::logout,
            commands::auth::get_session,
            commands::product::create_product,
            commands::product::get_all_products,
            commands::product::update_product,
            commands::product::delete_product,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
