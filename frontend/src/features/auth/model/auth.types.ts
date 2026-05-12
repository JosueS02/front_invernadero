export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
}

export interface AuthFormState {
  values: AuthCredentials;
  errors: AuthFormErrors;
  isSubmitting: boolean;
  submitEnabled: boolean;
}
