export const handleCurrenCy = currency => {
  return currency.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
};
