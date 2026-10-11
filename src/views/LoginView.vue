<template>
  <div class="card">
    <h2>Masuk ke Akun</h2>
    <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
    <form @submit.prevent="handleLogin">
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
          autocomplete="current-password"
        />
      </div>
      <button type="submit" class="btn" id="btn-submit">Login</button>
    </form>
    <div class="text-switch">
      Belum punya akun?
      <a @click="$router.push('/register')">Daftar sekarang</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { tauriAuthService } from "../services/tauriAuth.js";
import { useAuthStore } from "../stores/auth.store.js";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const errorMsg = ref("");

async function handleLogin() {
  errorMsg.value = "";
  try {
    const response = await tauriAuthService.login(username.value, password.value);
    auth.setSession(response.user);
    router.push("/dashboard");
  } catch (err) {
    errorMsg.value = typeof err === "string" ? err : "Kredensial tidak valid.";
  }
}
</script>
