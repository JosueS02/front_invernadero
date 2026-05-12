import { FormEvent, useState } from "react";
import type { AuthCredentials, AuthFormErrors } from "../model/auth.types";
import { validateAuthForm, validateEmail, validatePassword } from "../model/auth.validation";

interface AuthFormProps {
  submitLabel: string;
  onSuccess: (credentials: AuthCredentials) => void;
  bottomText: string;
  onBottomAction: () => void;
  bottomAriaLabel: string;
}

export function AuthForm({
  submitLabel,
  onSuccess,
  bottomText,
  onBottomAction,
  bottomAriaLabel
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});

  function handleEmailBlur() {
    setErrors((current) => ({ ...current, email: validateEmail(email) }));
  }

  function handlePasswordBlur() {
    setErrors((current) => ({ ...current, password: validatePassword(password) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAuthForm(email, password);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    onSuccess({ email: email.trim(), password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Correo:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        required
        autoComplete="email"
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) {
            setErrors((current) => ({ ...current, email: undefined }));
          }
        }}
        onBlur={handleEmailBlur}
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email ? (
        <p id="email-error" role="alert" className="field-error">
          {errors.email}
        </p>
      ) : null}

      <label htmlFor="password">Contrasena:</label>
      <div className="auth-password-row">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          required
          minLength={8}
          autoComplete="current-password"
          pattern="^(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$"
          title="Minimo 8 caracteres, un numero y un simbolo"
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors((current) => ({ ...current, password: undefined }));
            }
          }}
          onBlur={handlePasswordBlur}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setShowPassword((value) => !value)}
          aria-label={showPassword ? "Ocultar contrasena" : "Ver contrasena"}
          aria-pressed={showPassword}
        >
          {showPassword ? "Ocultar" : "Ver"}
        </button>
      </div>
      {errors.password ? (
        <p id="password-error" role="alert" className="field-error">
          {errors.password}
        </p>
      ) : null}

      <button type="submit" className="auth-primary-button">
        {submitLabel}
      </button>

      <button
        type="button"
        className="auth-bottom-link"
        onClick={onBottomAction}
        aria-label={bottomAriaLabel}
      >
        {bottomText}
      </button>
    </form>
  );
}
