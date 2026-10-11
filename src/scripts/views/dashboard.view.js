import { tauriAuthService } from "../services/tauriAuth.js";
import { authState } from "../state/authState.js";
import { router } from "../router.js";
import dashboardTemplate from "../../templates/dashboard.html?raw";

export function renderDashboardView(container) {
  container.innerHTML = dashboardTemplate;

  const user = authState.getUser();
  const userNameElement = container.querySelector("#user-display-name");
  if (user && user.username) {
    userNameElement.textContent = user.username;
  }

  const gotoProductsBtn = container.querySelector("#btn-goto-products");
  gotoProductsBtn.addEventListener("click", () => {
    router.navigate("products");
  });

  const logoutBtn = container.querySelector("#btn-logout");
  logoutBtn.addEventListener("click", async () => {
    try {
      await tauriAuthService.logout();
    } catch (err) {
      console.error("Gagal logout di sisi native:", err);
    } finally {
      authState.clearSession();
      router.navigate("login");
    }
  });
}
