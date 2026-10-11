import { authState } from "./state/authState.js";
import { renderLoginView } from "./views/login.view.js";
import { renderRegisterView } from "./views/register.view.js";
import { renderDashboardView } from "./views/dashboard.view.js";
import { renderProductsView } from "./views/products.view.js";

class Router {
  constructor() {
    this.container = null;
    this.currentRoute = null;
  }

  init(containerElement) {
    this.container = containerElement;
  }

  navigate(route) {
    if (!this.container) return;

    // Route protection guard
    if ((route === "dashboard" || route === "products") && !authState.checkAuth()) {
      route = "login";
    } else if ((route === "login" || route === "register") && authState.checkAuth()) {
      route = "dashboard";
    }

    this.currentRoute = route;
    this.container.innerHTML = "";

    switch (route) {
      case "register":
        renderRegisterView(this.container);
        break;
      case "dashboard":
        renderDashboardView(this.container);
        break;
      case "products":                          // ← tambah
        renderProductsView(this.container);     // ← tambah
        break;
      case "login":
      default:
        renderLoginView(this.container);
        break;
    }
  }
}

export const router = new Router();
