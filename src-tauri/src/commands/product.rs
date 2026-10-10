use crate::models::product::{Product, ProductPayload};
use crate::services::product_service;
use crate::storage::db::AppState;
use tauri::State;

#[tauri::command]
pub fn create_product(payload: ProductPayload, state: State<AppState>) -> Result<Product, String> {
    product_service::create_product(&state, payload)
}

#[tauri::command]
pub fn get_all_products(state: State<AppState>) -> Result<Vec<Product>, String> {
    product_service::get_all_products(&state)
}

#[tauri::command]
pub fn update_product(
    id: String,
    payload: ProductPayload,
    state: State<AppState>,
) -> Result<Product, String> {
    product_service::update_product(&state, id, payload)
}

#[tauri::command]
pub fn delete_product(id: String, state: State<AppState>) -> Result<(), String> {
    product_service::delete_product(&state, id)
}
