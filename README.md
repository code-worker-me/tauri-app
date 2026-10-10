#### Command
menjalankan app developmen ``npm run tauri dev``

menjalankan app release ``npm run tauri build``

---

## Changelog

### [Backend] Fitur Manajemen Stock — 2026-10-10

#### Ditambahkan
- `models/product.rs` — Struct `Product` dan `ProductPayload`
- `services/product_service.rs` — Logika CRUD produk (create, read, update, delete) dengan helper `get_conn()`
- `commands/product.rs` — 4 Tauri commands: `create_product`, `get_all_products`, `update_product`, `delete_product`

#### Diubah
- `storage/db.rs` — Migrasi koneksi SQLite dari `Mutex<Connection>` ke `r2d2 Pool<SqliteConnectionManager>`, tambah tabel `products`
- `services/auth_service.rs` — Update akses database menggunakan `pool.get()` (menyesuaikan migrasi r2d2)
- `main.rs` — Daftarkan 4 command produk ke `invoke_handler`
- `Cargo.toml` — Tambah dependency `r2d2 = "0.8"` dan `r2d2_sqlite = "0.23"`, downgrade `rusqlite` ke `"0.30"` untuk kompatibilitas
