class AuthState {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
  }

  setSession(userData) {
    this.user = userData;
    this.isAuthenticated = true;
  }

  clearSession() {
    this.user = null;
    this.isAuthenticated = false;
  }

  getUser() {
    return this.user;
  }

  checkAuth() {
    return this.isAuthenticated;
  }
}

export const authState = new AuthState();
