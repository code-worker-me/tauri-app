<template>
  <div class="card">
    <h2>Buat Akun Baru</h2>
    <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          required
          autocomplete="username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          required
          autocomplete="new-password"
        />
      </div>
      <button type="submit" class="btn" id="btn-submit">Daftar</button>
    </form>
    <div class="text-switch">
      Sudah punya akun?
      <a @click="$router.push('/login')">Masuk sekarang</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { tauriAuthService } from "../services/tauriAuth.js";

const router = useRouter();

const username = ref("");
const password = ref("");
const errorMsg = ref("");

async function handleRegister() {
  errorMsg.value = "";
  try {
    await tauriAuthService.register(username.value, password.value);
    router.push("/login");
  } catch (err) {
    errorMsg.value = typeof err === "string" ? err : "Gagal mendaftarkan akun.";
  }
}
</script>
