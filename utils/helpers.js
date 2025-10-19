// utils/helpers.js

// Utility for handling input changes easily
export const handleInputChange = (setter) => (name, value) => {
  setter((prev) => ({ ...prev, [name]: value }));
};

// Generate a random 6-character invitation code
export const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
