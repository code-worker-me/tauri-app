<template>
  <div class="card">
    <h2>Selamat Datang</h2>
    <p style="text-align: center; margin-bottom: 20px;">
      Halo, <strong>{{ auth.user?.username }}</strong>! Anda telah berhasil login.
    </p>
    <button @click="$router.push('/products')" class="btn" id="btn-goto-products">
      📦 Kelola Stok Produk
    </button>
    <button @click="handleLogout" class="btn btn-secondary" id="btn-logout">
      Logout
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store.js";
import { tauriAuthService } from "../services/tauriAuth.js";

const router = useRouter();
const auth = useAuthStore();

async function handleLogout() {
  try {
    await tauriAuthService.logout();
  } catch (err) {
    console.error("Gagal logout di sisi native:", err);
  } finally {
    auth.clearSession();
    router.push("/login");
  }
}
</script>
