<template>
  <div class="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
    <!-- Header: Logo & Bantuan -->
    <div class="flex items-center justify-between mb-6">
      <MapLogo />
      <button
        type="button"
        @click="toast.info('Pusat Bantuan Pertamina Call Center 135')"
        class="text-[#d82d2d] hover:text-[#b01e1e] font-semibold text-sm flex items-center gap-1 transition"
      >
        <span>Bantuan</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke-width="2" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17h.01M12 14a2 2 0 10-2-2" />
        </svg>
      </button>
    </div>

    <!-- Title & Description -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Buat Akun Baru</h1>
      <p class="text-sm text-gray-500 mt-1 leading-normal">
        Daftarkan akun merchant untuk mengelola pangkalan dan stok LPG Pertamina.
      </p>
    </div>

    <!-- Register Form -->
    <form @submit.prevent="handleRegister" class="space-y-5">
      <div>
        <label for="username" class="block text-sm font-semibold text-gray-800 mb-1.5">
          Username atau Nomor Telepon <span class="text-red-500">*</span>
        </label>
        <input
          v-model="username"
          type="text"
          id="username"
          required
          autocomplete="username"
          placeholder="Masukkan Username atau Nomor Ponsel"
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547926] focus:border-[#547926] text-gray-800 placeholder-gray-400 bg-white transition text-sm shadow-xs"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-semibold text-gray-800 mb-1.5">
          Password / PIN <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            required
            autocomplete="new-password"
            placeholder="Masukkan minimal 6 karakter"
            class="w-full pl-4 pr-24 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547926] focus:border-[#547926] text-gray-800 placeholder-gray-400 bg-white transition text-sm shadow-xs"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold text-[#547926] border border-[#547926]/40 hover:bg-[#547926]/10 rounded-full transition"
          >
            {{ showPassword ? 'Sembunyikan' : 'Tampilkan' }}
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        id="btn-submit"
        class="w-full py-3.5 bg-[#547926] hover:bg-[#466520] active:bg-[#3c561b] text-white font-bold rounded-xl shadow-md transition duration-150 uppercase tracking-wider text-sm disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2"
      >
        <svg
          v-if="isLoading"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>{{ isLoading ? 'Mendaftarkan...' : 'DAFTAR' }}</span>
      </button>
    </form>

    <!-- Login Footer Link -->
    <div class="mt-6 text-center text-sm text-gray-600 border-t border-gray-100 pt-5">
      Sudah punya akun?
      <button
        type="button"
        @click="$router.push('/login')"
        class="text-[#547926] font-bold hover:underline ml-1 cursor-pointer"
      >
        Masuk sekarang
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MapLogo from "../components/MapLogo.vue";
import { tauriAuthService } from "../services/tauriAuth.js";
import { useToast } from "../composables/useToast.js";

const router = useRouter();
const toast = useToast();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

async function handleRegister() {
  isLoading.value = true;
  try {
    await tauriAuthService.register(username.value, password.value);
    toast.success("Akun berhasil dibuat! Silakan masuk.");
    router.push("/login");
  } catch (err) {
    const message = typeof err === "string" ? err : "Gagal mendaftarkan akun.";
    toast.error(message);
  } finally {
    isLoading.value = false;
  }
}
</script>
