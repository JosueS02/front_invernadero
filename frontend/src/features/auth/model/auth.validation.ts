import type { AuthFormErrors } from "./auth.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "El correo es obligatorio";
  if (!EMAIL_REGEX.test(email)) return "Ingresa un correo valido";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password.trim()) return "La contrasena es obligatoria";
  if (!PASSWORD_REGEX.test(password)) {
    return "Minimo 8 caracteres, un numero y un simbolo";
  }
  return undefined;
}

export function validateAuthForm(email: string, password: string): AuthFormErrors {
  return {
    email: validateEmail(email),
    password: validatePassword(password)
  };
}
