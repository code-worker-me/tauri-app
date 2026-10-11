import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { tauriAuthService } from "../services/tauriAuth.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const isAuthenticated = computed(() => user.value !== null);

  function setSession(userData) {
    user.value = userData;
  }

  function clearSession() {
    user.value = null;
  }

  async function restoreSession() {
    try {
      const session = await tauriAuthService.getSession();
      if (session && session.user) {
        setSession(session.user);
        return true;
      }
    } catch {
      // Sesi tidak ditemukan
    }
    return false;
  }

  return { user, isAuthenticated, setSession, clearSession, restoreSession };
});
