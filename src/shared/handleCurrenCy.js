export const handleCurrenCy = currency => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return VND.format(currency);
};
