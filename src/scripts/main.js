import { router } from "./router.js";
import { authState } from "./state/authState.js";
import { tauriAuthService } from "./services/tauriAuth.js";

window.addEventListener("DOMContentLoaded", async () => {
  const appContainer = document.getElementById("app");
  router.init(appContainer);

  // Periksa apakah sesi sebelumnya masih aktif di sisi native Rust
  try {
    const session = await tauriAuthService.getSession();
    if (session && session.user) {
      authState.setSession(session.user);
      router.navigate("dashboard");
      return;
    }
  } catch {
    // Sesi tidak ditemukan atau kedaluwarsa
  }

  router.navigate("login");
});
