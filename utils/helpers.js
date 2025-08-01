// 1. URL Validation Function
export const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)?([a-z0-9]+[\-\.])*([a-z0-9]+\.[a-z]{2,})([\/\w \.-]*)*\/?$/;
  return pattern.test(url);
};

// 2. Shortcode Generation (e.g., alphanumeric string of 6 characters)
export const generateShortcode = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortcode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortcode += characters[randomIndex];
  }
  return shortcode;
};

// 3. Function to Format Expiry Date (takes minutes as input)
export const formatExpiryDate = (minutes) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now.toLocaleString(); // Format the date for display, you can customize it as needed
};

// 4. Function to validate numeric validity input (positive integers only)
export const isValidValidity = (minutes) => {
  return Number.isInteger(minutes) && minutes > 0;
};

// 5. Error Message Generator (for user-friendly error display)
export const getErrorMessage = (errorType) => {
  switch (errorType) {
    case 'url':
      return 'Please provide a valid URL format.';
    case 'shortcode':
      return 'Shortcode is already taken. Please choose another one.';
    case 'validity':
      return 'Please enter a valid number for expiration time.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
