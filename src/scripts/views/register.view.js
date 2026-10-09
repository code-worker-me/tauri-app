import { tauriAuthService } from "../services/tauriAuth.js";
import { router } from "../router.js";
import registerTemplate from "../../templates/register.html?raw";

export function renderRegisterView(container) {
  container.innerHTML = registerTemplate;

  const form = container.querySelector("#register-form");
  const errorBox = container.querySelector("#register-error");
  const loginLink = container.querySelector("#go-login");

  loginLink.addEventListener("click", () => {
    router.navigate("login");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.style.display = "none";

    const username = form.username.value.trim();
    const password = form.password.value;

    try {
      await tauriAuthService.register(username, password);
      router.navigate("login");
    } catch (err) {
      errorBox.textContent = typeof err === "string" ? err : "Gagal mendaftarkan akun.";
      errorBox.style.display = "block";
    }
  });
}
