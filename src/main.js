import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import { useAuthStore } from "./stores/auth.store.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Restore session dari Rust sebelum mount
const auth = useAuthStore();
auth.restoreSession().then((hasSession) => {
  if (hasSession) {
    router.replace("/dashboard");
  } else {
    router.replace("/login");
  }
  app.mount("#app");
});
