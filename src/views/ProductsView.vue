<template>
  <div class="products-page">
    <div class="products-header">
      <h2>Manajemen Stok</h2>
      <button @click="showAddForm" class="btn btn-add" id="btn-show-form">
        + Tambah Produk
      </button>
    </div>

    <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
    <div v-if="successMsg" class="success-message">{{ successMsg }}</div>

    <!-- Form tambah / edit -->
    <div v-if="formVisible" class="card form-card">
      <h3>{{ isEditing ? "Edit Produk" : "Tambah Produk" }}</h3>
      <form @submit.prevent="handleSubmit" id="product-form">
        <div class="form-group">
          <label for="product-name">Nama Produk</label>
          <input v-model="form.name" type="text" id="product-name" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="product-price">Harga (Rp)</label>
            <input
              v-model.number="form.price"
              type="number"
              id="product-price"
              min="0"
              step="any"
              required
            />
          </div>
          <div class="form-group">
            <label for="product-stock">Stok</label>
            <input
              v-model.number="form.stock"
              type="number"
              id="product-stock"
              min="0"
              required
            />
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn" id="btn-save">Simpan</button>
          <button type="button" @click="resetForm" class="btn btn-secondary" id="btn-cancel">
            Batal
          </button>
        </div>
      </form>
    </div>

    <!-- Tabel produk -->
    <div class="card table-card">
      <table id="product-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" style="text-align:center; color:#999;">Memuat data...</td>
          </tr>
          <tr v-else-if="products.length === 0">
            <td colspan="4" style="text-align:center; color:#999;">Belum ada produk.</td>
          </tr>
          <tr v-for="p in products" :key="p.id">
            <td>{{ p.name }}</td>
            <td>{{ formatRupiah(p.price) }}</td>
            <td>{{ p.stock }}</td>
            <td class="action-cell">
              <button @click="editProduct(p)" class="btn-icon" title="Edit">✏️</button>
              <button @click="confirmDelete(p.id)" class="btn-icon btn-icon-danger" title="Hapus">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="$router.push('/dashboard')" class="btn btn-secondary btn-back" id="btn-back">
      ← Kembali ke Dashboard
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

const products = ref([]);
const loading  = ref(true);
const errorMsg = ref("");
const successMsg = ref("");

const formVisible = ref(false);
const isEditing   = ref(false);
const editingId   = ref("");

const form = ref({ name: "", price: 0, stock: 0 });

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function showSuccess(msg) {
  successMsg.value = msg;
  errorMsg.value = "";
  setTimeout(() => (successMsg.value = ""), 3000);
}

function showError(msg) {
  errorMsg.value = msg;
  successMsg.value = "";
}

function resetForm() {
  form.value = { name: "", price: 0, stock: 0 };
  editingId.value = "";
  isEditing.value = false;
  formVisible.value = false;
  errorMsg.value = "";
}

function showAddForm() {
  resetForm();
  formVisible.value = true;
}

function editProduct(p) {
  editingId.value   = p.id;
  form.value.name   = p.name;
  form.value.price  = p.price;
  form.value.stock  = p.stock;
  isEditing.value   = true;
  formVisible.value = true;
  errorMsg.value    = "";
}

async function loadProducts() {
  loading.value = true;
  try {
    products.value = await getAllProducts();
  } catch {
    showError("Gagal memuat data produk.");
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  errorMsg.value = "";
  const payload = { ...form.value };
  try {
    if (isEditing.value) {
      await updateProduct(editingId.value, payload);
      showSuccess("Produk berhasil diperbarui.");
    } else {
      await createProduct(payload);
      showSuccess("Produk berhasil ditambahkan.");
    }
    resetForm();
    await loadProducts();
  } catch (err) {
    showError(typeof err === "string" ? err : "Terjadi kesalahan.");
  }
}

async function confirmDelete(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  try {
    await deleteProduct(id);
    showSuccess("Produk berhasil dihapus.");
    await loadProducts();
  } catch (err) {
    showError(typeof err === "string" ? err : "Gagal menghapus produk.");
  }
}

onMounted(loadProducts);
</script>
