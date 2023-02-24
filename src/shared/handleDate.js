import moment from 'moment';

export const formatNumber = number => {
  if (number.toString().length < 2) {
    return '0' + number;
  } else {
    return number;
  }
};
export const formatTimeApi = time => {
  return time.toString().slice(0, 5);
};
export const handleDate = date => {
  const d = new Date(date);
  return `${formatNumber(d.getHours())}:${formatNumber(
    d.getMinutes(),
  )} - ${formatNumber(d.getDate())}/${formatNumber(
    d.getMonth() + 1,
  )}/${formatNumber(d.getFullYear())}`;
};

export const datePostToApi = timestamp => {
  let date = new Date(timestamp);

  let year = formatNumber(date.getFullYear());
  let month = formatNumber(date.getMonth() + 1);
  let day = formatNumber(date.getDate());
  let hours = formatNumber(date.getHours());
  let minutes = formatNumber(date.getMinutes());
  let seconds = formatNumber(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const dateFormatMoment = timestamp => {
  return moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
};
