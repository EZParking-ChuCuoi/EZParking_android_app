export const validateFileImage = file => {
  if (file !== null && file.size / 1000 > 1044) {
    return 'Image too large!';
  }
  return true;
};

export const validateLicensePlate = licensePlate => {
  return /^[0-9]{2}[A-Z]{1}[-]?[0-9A-Z]{4,5}$/.test(licensePlate);
};
