const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user
 * @param {string} id - User ID
 * @param {string} role - User role (student/company)
 * @returns {string} JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

module.exports = generateToken;
