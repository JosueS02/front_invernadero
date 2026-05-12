import type { UserSession } from "./greenhouse.types";

const SESSION_EMAIL_KEY = "frontreact.session.email";
const SESSION_USER_ID_KEY = "frontreact.session.userId";
const SESSION_USER_ROLE_KEY = "frontreact.session.role";
const DEFAULT_EMAIL = "usuario@invernadero.local";
const DEFAULT_USER_ID = "";
const DEFAULT_USER_ROLE = "USER";

export function saveUserSession(user: { id: string; email: string }): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_USER_ID_KEY, user.id.trim());
  window.localStorage.setItem(SESSION_EMAIL_KEY, user.email.trim());
}

export function saveSessionEmail(email: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_EMAIL_KEY, email.trim());
}

export function clearSessionEmail(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_USER_ID_KEY);
  window.localStorage.removeItem(SESSION_EMAIL_KEY);
  window.localStorage.removeItem(SESSION_USER_ROLE_KEY);
}

export function getUserSession(): UserSession {
  if (typeof window === "undefined") {
    return { id: DEFAULT_USER_ID, email: DEFAULT_EMAIL };
  }

  const id = window.localStorage.getItem(SESSION_USER_ID_KEY)?.trim();
  const email = window.localStorage.getItem(SESSION_EMAIL_KEY)?.trim();
  return {
    id: id || DEFAULT_USER_ID,
    email: email || DEFAULT_EMAIL
  };
}

export function getSessionRole(): string {
  if (typeof window === "undefined") {
    return DEFAULT_USER_ROLE;
  }
  return window.localStorage.getItem(SESSION_USER_ROLE_KEY)?.trim() || DEFAULT_USER_ROLE;
}
