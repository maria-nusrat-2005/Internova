export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidObjectId = (id) => {
  return /^[a-fA-F0-9]{24}$/.test(id);
};