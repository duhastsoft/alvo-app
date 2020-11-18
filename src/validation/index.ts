type validationFunction = (v: string) => true | string;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const rules = {
  notEmpty: (v: string) => !!v.trim() || 'Campo requerido',
  minLength: (length: number) => (v: string) =>
    v.trim().length >= length || `Al menos ${length} caracteres`,
  email: (v: string) => emailRegex.test(v) || 'Correo no válido',
  passwordMatch: (password: string) => (v: string) =>
    password === v || 'Las contraseñas no coinciden',
};

export const validateField = (...fns: validationFunction[]) => (value: string): string => {
  const fn = fns.find((f) => f(value) !== true);
  if (!fn) return '';
  return fn(value) as string;
};
