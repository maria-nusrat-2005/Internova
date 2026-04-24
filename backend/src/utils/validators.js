/**
 * Validate registration input
 */
const validateRegister = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.push('Please provide a valid email');
  }

  if (!data.password) {
    errors.push('Password is required');
  } else if (data.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (data.role && !['student', 'company'].includes(data.role)) {
    errors.push('Role must be either student or company');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate login input
 */
const validateLogin = (data) => {
  const errors = [];

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateRegister, validateLogin };
