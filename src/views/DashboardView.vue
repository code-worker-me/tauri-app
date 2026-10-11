<template>
  <div class="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-6 space-y-4">
    <!-- Header: Logo & User Info -->
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <MapLogo />
      <div class="text-right">
        <div class="text-sm font-black text-gray-800 uppercase tracking-tight">
          {{ auth.user?.username || 'PANGKALAN' }}
        </div>
        <div class="text-xs text-gray-500 font-medium">
          Merchant Pertamina
        </div>
      </div>
    </div>

    <!-- Hero Card: Banner Stok & Harga (Sesuai Referensi) -->
    <div class="relative overflow-hidden bg-linear-to-r from-[#3e561c] to-[#4c6a23] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
      <!-- Background subtle overlay decoration -->
      <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>

      <!-- Left Stat: Stok -->
      <div class="flex items-center gap-3 z-10">
        <div class="w-10 h-10 rounded-xl bg-[#587a28] border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
          <svg class="w-6 h-6 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
            <!-- Cylinder icon -->
            <path d="M12 2C8.686 2 6 3.343 6 5v14c0 1.657 2.686 3 6 3s6-1.343 6-3V5c0-1.657-2.686-3-6-3zm0 2c2.761 0 4 1.01 4 1.5S14.761 7 12 7 8 5.99 8 5.5 9.239 4 12 4z"/>
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-medium text-green-200/90 leading-tight">Stok</div>
          <div class="text-lg font-extrabold tracking-tight text-white leading-tight mt-0.5">
            {{ totalStock }} Tabung
          </div>
        </div>
      </div>

      <!-- Right Stat: Harga LPG -->
      <div class="flex items-center gap-3 z-10 text-right">
        <div class="w-10 h-10 rounded-xl bg-[#587a28] border border-white/20 flex items-center justify-center shrink-0 shadow-inner order-last">
          <svg class="w-6 h-6 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-1h-1a1 1 0 01-1-1v-3a1 1 0 011-1h3v-1H9V9h2V8h2v1h1a1 1 0 011 1v3a1 1 0 01-1 1h-3v1h4v1.5z"/>
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-medium text-green-200/90 leading-tight">Harga LPG 3 Kg</div>
          <div class="text-lg font-extrabold tracking-tight text-white leading-tight mt-0.5">
            {{ mainPriceFormatted }}
          </div>
        </div>
      </div>
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

      <!-- 2. Daftarkan Pelanggan -->
      <div
        @click="toast.info('Fitur Daftarkan Pelanggan siap dikembangkan.')"
        class="group flex items-center justify-between p-3.5 rounded-xl border border-[#b3ce98] bg-linear-to-r from-[#f8faf4] to-white hover:border-[#547926] hover:shadow-sm cursor-pointer transition duration-150"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-xl shrink-0">
            📋
          </div>
          <span class="text-sm font-bold text-gray-800 group-hover:text-[#547926] transition">
            Daftarkan Pelanggan
          </span>
        </div>
        <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <!-- 3. Laporan Penjualan -->
      <div
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
      </div>

      <!-- 4. Atur Stok & Harga (Navigasi ke Halaman Produk CRUD) -->
      <div
        id="btn-goto-products"
        @click="$router.push('/products')"
        class="group flex items-center justify-between p-3.5 rounded-xl border-2 border-[#547926]/60 bg-linear-to-r from-[#eef6e4] to-white hover:border-[#547926] hover:shadow-md cursor-pointer transition duration-150"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-xl shrink-0">
            ⚙️
          </div>
          <div>
            <span class="text-sm font-bold text-gray-900 group-hover:text-[#547926] transition block">
              Atur Stok & Harga
            </span>
            <span class="text-[11px] text-[#547926] font-medium">
              Kelola stok dan harga tabung gas
            </span>
          </div>
        </div>
        <div class="w-6 h-6 rounded-md bg-[#547926] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <!-- 5. Hak Data Pelanggan (dengan Badge Merah 'Baru') -->
      <div
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
      </div>

      <!-- 6. Profil Saya -->
      <div
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
      </div>
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
import MapLogo from "../components/MapLogo.vue";
import { useAuthStore } from "../stores/auth.store.js";
import { tauriAuthService } from "../services/tauriAuth.js";
import { getAllProducts } from "../services/product.service.js";
import { useToast } from "../composables/useToast.js";

const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

const products = ref([]);
const totalStock = computed(() => {
  if (!products.value.length) return "68";
  return products.value.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
});

const mainPriceFormatted = computed(() => {
  if (!products.value.length) return "Rp19.000";
  const first = products.value[0];
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(first.price || 19000);
});

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
