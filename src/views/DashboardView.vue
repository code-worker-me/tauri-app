<template>
  <div class="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-6 space-y-4">

    <!-- Hero Card: Banner Stok & Harga (Sesuai Referensi) -->
    <div class="relative overflow-hidden bg-linear-to-r from-[#3e561c] to-[#4c6a23] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
      <h1 class="text-white text-xl font-bold">Dashboard</h1>
      <p class="font-light text-[16px]">Warung Ibu Herni</p>
    </div>

    <!-- Menu List (Sesuai Desain Referensi) -->
    <div class="space-y-2.5 pt-1">
      <!-- 1. Catat Penjualan -->
      <div
        @click="toast.info('Fitur Catat Penjualan siap dikembangkan.')"
        class="group flex items-center justify-between p-3.5 rounded-xl border border-[#b3ce98] bg-linear-to-r from-[#f8faf4] to-white hover:border-[#547926] hover:shadow-sm cursor-pointer transition duration-150"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xl shrink-0">
            🛢️
          </div>
          <span class="text-sm font-bold text-gray-800 group-hover:text-[#547926] transition">
            Catat Penjualan
          </span>
        </div>
        <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <!-- 3. Laporan Penjualan -->
      <!-- <div
        @click="toast.info('Fitur Laporan Penjualan siap dikembangkan.')"
        class="group flex items-center justify-between p-3.5 rounded-xl border border-[#b3ce98] bg-linear-to-r from-[#f8faf4] to-white hover:border-[#547926] hover:shadow-sm cursor-pointer transition duration-150"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200/60 flex items-center justify-center text-xl shrink-0">
            📊
          </div>
          <span class="text-sm font-bold text-gray-800 group-hover:text-[#547926] transition">
            Laporan Penjualan
          </span>
        </div>
        <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div> -->

      <!-- 4. Atur Stok & Harga (Navigasi ke Halaman Produk CRUD) -->
      <MenuCard
        id="btn-goto-products"
        title="Atur Stok & Harga"
        subtitle="Kelola stok dan harga tabung gas"
        icon="⚙️"
        @click="$router.push('/products')"
      />

      <!-- 5. Hak Data Pelanggan (dengan Badge Merah 'Baru') -->
      <!-- <div
        @click="toast.info('Informasi Hak Perlindungan Data Pelanggan.')"
        class="group flex items-center justify-between p-3.5 rounded-xl border border-[#b3ce98] bg-linear-to-r from-[#f8faf4] to-white hover:border-[#547926] hover:shadow-sm cursor-pointer transition duration-150"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-xl shrink-0">
            🔒
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-gray-800 group-hover:text-[#547926] transition">
              Hak Data Pelanggan
            </span>
            <span class="bg-[#d32729] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">
              Baru
            </span>
          </div>
        </div>
        <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div> -->

      <!-- 6. Profil Saya -->
      <!-- <div
        @click="toast.info(`Profil Merchant: ${auth.user?.username || 'Pangkalan Pertamina'}`)"
        class="group flex items-center justify-between p-3.5 rounded-xl border border-[#b3ce98] bg-linear-to-r from-[#f8faf4] to-white hover:border-[#547926] hover:shadow-sm cursor-pointer transition duration-150"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-xl shrink-0">
            👤
          </div>
          <span class="text-sm font-bold text-gray-800 group-hover:text-[#547926] transition">
            Profil Saya
          </span>
        </div>
        <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div> -->
    </div>

    <!-- Logout Action Footer -->
    <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
      <div class="text-xs text-gray-500">
        Versi Aplikasi: 1.0.0
      </div>
      <button
        id="btn-logout"
        @click="handleLogout"
        class="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import MenuCard from "../components/MenuCard.vue";
import { useAuthStore } from "../stores/auth.store.js";
import { tauriAuthService } from "../services/tauriAuth.js";
import { getAllProducts } from "../services/product.service.js";
import { useToast } from "../composables/useToast.js";

const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

const products = ref([]);

onMounted(async () => {
  try {
    products.value = await getAllProducts();
  } catch {
    // If native backend not running or empty, fallback gracefully
  }
});

async function handleLogout() {
  try {
    await tauriAuthService.logout();
    toast.info("Anda telah keluar dari akun.");
  } catch (err) {
    console.error("Gagal logout di sisi native:", err);
  } finally {
    auth.clearSession();
    router.push("/login");
  }
}
</script>
