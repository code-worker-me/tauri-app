import { tauriAuthService } from "../services/tauriAuth.js";
import { authState } from "../state/authState.js";
import { router } from "../router.js";
import loginTemplate from "../../templates/login.html?raw";

export function renderLoginView(container) {
  container.innerHTML = loginTemplate;

  const form = container.querySelector("#login-form");
  const errorBox = container.querySelector("#login-error");
  const registerLink = container.querySelector("#go-register");

  registerLink.addEventListener("click", () => {
    router.navigate("register");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.style.display = "none";

    const username = form.username.value.trim();
    const password = form.password.value;

    try {
      const response = await tauriAuthService.login(username, password);
      authState.setSession(response.user);
      router.navigate("dashboard");
    } catch (err) {
      errorBox.textContent = typeof err === "string" ? err : "Kredensial tidak valid.";
      errorBox.style.display = "block";
    }
  });
}
