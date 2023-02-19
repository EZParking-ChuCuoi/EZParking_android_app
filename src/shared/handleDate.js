export const formatNumber = number => {
  if (number.toString().length < 2) {
    return '0' + number;
  } else {
    return number;
  }
};

export const handleDate = date => {
  const d = new Date(date);
  return `${formatNumber(d.getHours())}:${formatNumber(
    d.getMinutes(),
  )} - ${formatNumber(d.getDay())}/${formatNumber(d.getMonth())}/${formatNumber(
    d.getFullYear(),
  )}`;
};
