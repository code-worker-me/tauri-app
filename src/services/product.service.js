import { invoke } from "@tauri-apps/api/core";

export async function getAllProducts() {
  return await invoke("get_all_products");
}

export async function createProduct(payload) {
  return await invoke("create_product", { payload });
}

export async function updateProduct(id, payload) {
  return await invoke("update_product", { id, payload });
}

export async function deleteProduct(id) {
  return await invoke("delete_product", { id });
}
