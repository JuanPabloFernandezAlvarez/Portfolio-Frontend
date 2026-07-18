export const validateUsername = (username) => {
  if (username.trim() === "") return "El nombre de usuario es obligatorio";
  if (username.length < 3) return "El nombre de usuario debe tener al menos 3 caracteres";
  return "";
};
export const validatePassword = (password) => {
  if (password.trim() === "") return "La contraseña está vacía";
  if (password.length < 6)
    return "La contraseña debe tener al menos 6 caracteres";
  if (!/[A-Z]/.test(password)) return "Debe tener al menos una letra mayúscula";
  if (!/[a-z]/.test(password)) return "Debe tener al menos una letra minúscula";
  if (!/\d/.test(password)) return "Debe tener al menos un número";
  return "";
};
