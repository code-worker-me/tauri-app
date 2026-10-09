import { invoke } from "@tauri-apps/api/core";

export const tauriAuthService = {
  async login(username, password) {
    return await invoke("login", {
      payload: { username, password },
    });
  },

  async register(username, password) {
    return await invoke("register", {
      payload: { username, password },
    });
  },

  async logout() {
    return await invoke("logout");
  },

  async getSession() {
    return await invoke("get_session");
  },
};
