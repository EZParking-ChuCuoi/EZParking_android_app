export const validateFileImage = file => {
  if (file !== null && file.size / 1000 > 1044) {
    return 'Image too large!';
  }
  return true;
};
