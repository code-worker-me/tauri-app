<template>
  <div class="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-7 space-y-5">
    <!-- Header: Kembali, Judul, Tambah -->
    <div class="flex items-center justify-between pb-4 border-b border-gray-100 flex-wrap gap-3">
      <div class="flex items-center gap-3">
        <button
          id="btn-back"
          @click="$router.push('/dashboard')"
          class="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition cursor-pointer border border-gray-200"
          title="Kembali ke Dashboard"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Atur Stok & Harga</span>
          </h1>
          <p class="text-xs text-gray-500 mt-0.5">Kelola katalog dan persediaan tabung LPG</p>
        </div>
      </div>

      <button
        id="btn-show-form"
        @click="showAddForm"
        class="bg-[#547926] hover:bg-[#43621d] active:bg-[#385117] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Tambah Produk</span>
      </button>
    </div>

    <!-- Form Tambah / Edit Produk (Collapsible Card) -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div v-if="formVisible" class="bg-[#f7faf4] border-2 border-[#b3ce98] rounded-xl p-5 shadow-inner">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
            <span>{{ isEditing ? "✏️ Edit Produk" : "📦 Tambah Produk Baru" }}</span>
          </h2>
          <button
            type="button"
            @click="resetForm"
            class="text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="handleSubmit" id="product-form" class="space-y-4">
          <div>
            <label for="product-name" class="block text-xs font-semibold text-gray-700 mb-1">
              Nama Produk <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              id="product-name"
              required
              placeholder="Contoh: LPG 3 Kg (Subsidi)"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547926] focus:border-[#547926] bg-white text-sm"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label for="product-price" class="block text-xs font-semibold text-gray-700 mb-1">
                Harga Jual (Rp) <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.price"
                type="number"
                id="product-price"
                min="0"
                step="any"
                required
                placeholder="19000"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547926] focus:border-[#547926] bg-white text-sm"
              />
            </div>
            <div>
              <label for="product-stock" class="block text-xs font-semibold text-gray-700 mb-1">
                Jumlah Stok (Tabung) <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="form.stock"
                type="number"
                id="product-stock"
                min="0"
                required
                placeholder="50"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547926] focus:border-[#547926] bg-white text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              id="btn-cancel"
              @click="resetForm"
              class="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-save"
              class="px-5 py-2 rounded-xl bg-[#547926] hover:bg-[#43621d] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              {{ isEditing ? "Simpan Perubahan" : "Simpan Produk" }}
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <!-- Tabel Daftar Produk -->
    <div class="overflow-hidden border border-gray-200/90 rounded-xl shadow-xs">
      <div class="overflow-x-auto">
        <table id="product-table" class="w-full text-left text-sm">
          <thead class="bg-[#f2f7ec] text-[#3f571b] text-xs uppercase font-extrabold tracking-wider border-b border-gray-200">
            <tr>
              <th scope="col" class="px-4 py-3.5">Nama Produk</th>
              <th scope="col" class="px-4 py-3.5">Harga</th>
              <th scope="col" class="px-4 py-3.5">Stok</th>
              <th scope="col" class="px-4 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-if="loading">
              <td colspan="4" class="px-4 py-8 text-center text-gray-400 text-xs">
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-4 w-4 text-[#547926]" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Memuat data produk...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="products.length === 0">
              <td colspan="4" class="px-4 py-10 text-center">
                <div class="flex flex-col items-center justify-center text-gray-400">
                  <span class="text-3xl mb-1">📭</span>
                  <span class="text-sm font-semibold text-gray-600">Belum ada produk</span>
                  <span class="text-xs text-gray-400 mt-0.5">Klik tombol Tambah Produk untuk menambahkan stok LPG.</span>
                </div>
              </td>
            </tr>
            <tr
              v-for="p in products"
              :key="p.id"
              class="hover:bg-[#f9faf6] transition duration-100"
            >
              <td class="px-4 py-3.5 font-bold text-gray-900">
                {{ p.name }}
              </td>
              <td class="px-4 py-3.5 text-gray-700 font-semibold">
                {{ formatRupiah(p.price) }}
              </td>
              <td class="px-4 py-3.5">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
                  :class="p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'"
                >
                  {{ p.stock }} Tabung
                </span>
              </td>
              <td class="px-4 py-3.5 text-right whitespace-nowrap">
                <div class="inline-flex items-center gap-1.5">
                  <button
                    @click="editProduct(p)"
                    class="p-1.5 text-gray-600 hover:text-[#547926] hover:bg-green-50 rounded-lg transition cursor-pointer"
                    title="Ubah Produk"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    @click="confirmDelete(p.id)"
                    class="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Hapus Produk"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";
import { useToast } from "../composables/useToast.js";

const router = useRouter();
const toast = useToast();

const products = ref([]);
const loading  = ref(true);

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

function resetForm() {
  form.value = { name: "", price: 0, stock: 0 };
  editingId.value = "";
  isEditing.value = false;
  formVisible.value = false;
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
}

async function loadProducts() {
  loading.value = true;
  try {
    products.value = await getAllProducts();
  } catch (err) {
    toast.error("Gagal memuat data produk.");
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  const payload = { ...form.value };
  try {
    if (isEditing.value) {
      await updateProduct(editingId.value, payload);
      toast.success("Produk berhasil diperbarui.");
    } else {
      await createProduct(payload);
      toast.success("Produk berhasil ditambahkan.");
    }
    resetForm();
    await loadProducts();
  } catch (err) {
    toast.error(typeof err === "string" ? err : "Terjadi kesalahan saat menyimpan produk.");
  }
}

async function confirmDelete(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  try {
    await deleteProduct(id);
    toast.success("Produk berhasil dihapus.");
    await loadProducts();
  } catch (err) {
    toast.error(typeof err === "string" ? err : "Gagal menghapus produk.");
  }
}

onMounted(loadProducts);
</script>
