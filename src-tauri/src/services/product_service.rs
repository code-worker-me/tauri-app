use crate::models::product::{Product, ProductPayload};
use crate::storage::db::AppState;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::params;
use tauri::State;

fn get_conn(
    state: &State<AppState>,
) -> Result<r2d2::PooledConnection<r2d2_sqlite::SqliteConnectionManager>, String> {
    state
        .db
        .get()
        .map_err(|_| "Gagal mengakses database.".to_string())
}

pub fn create_product(state: &State<AppState>, payload: ProductPayload) -> Result<Product, String> {
    if payload.name.trim().is_empty() {
        return Err("Nama produk tidak boleh kosong.".to_string());
    }

    // Cek koneksi database
    let conn = get_conn(state)?;

    let id = format!(
        "prd_{}",
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis()
    );

    conn.execute(
        "INSERT INTO products (id, name, price, stock) VALUES (?1, ?2, ?3, ?4)",
        params![id, payload.name, payload.price, payload.stock],
    )
    .map_err(|e| format!("Gagal menyimpan produk: {}", e))?;

    Ok(Product {
        id,
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
    })
}

pub fn get_all_products(state: &State<AppState>) -> Result<Vec<Product>, String> {
    // Cek koneksi database
    let conn = get_conn(state)?;

    let mut stmt = conn
        .prepare("SELECT id, name, price, stock FROM products")
        .map_err(|e| format!("Gagal mempersiapkan query: {}", e))?;

    let products = stmt
        .query_map([], |row| {
            Ok(Product {
                id: row.get(0)?,
                name: row.get(1)?,
                price: row.get(2)?,
                stock: row.get(3)?,
            })
        })
        .map_err(|e| format!("Gagal mengambil data: {}", e))?
        .filter_map(|r| r.ok())
        .collect();

    Ok(products)
}

pub fn update_product(
    state: &State<AppState>,
    id: String,
    payload: ProductPayload,
) -> Result<Product, String> {
    if payload.name.trim().is_empty() {
        return Err("Nama produk tidak boleh kosong.".to_string());
    }
    // cek koneksi database
    let conn = get_conn(state)?;

    let rows = conn
        .execute(
            "UPDATE products SET name = ?1, price = ?2, stock = ?3 WHERE id = ?4",
            params![payload.name, payload.price, payload.stock, id],
        )
        .map_err(|e| format!("Gagal mengupdate produk: {}", e))?;

    if rows == 0 {
        return Err("Produk tidak ditemukan.".to_string());
    }

    Ok(Product {
        id,
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
    })
}

pub fn delete_product(state: &State<AppState>, id: String) -> Result<(), String> {
    // cek koneksi database
    let conn = get_conn(state)?;

    let rows = conn
        .execute("DELETE FROM products WHERE id = ?1", params![id])
        .map_err(|e| format!("Gagal menghapus produk: {}", e))?;

    if rows == 0 {
        return Err("Produk tidak ditemukan.".to_string());
    }

    Ok(())
}
