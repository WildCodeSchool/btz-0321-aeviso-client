function changeDateFormat(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth().toString().length < 2 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = (date.getHours() - 2).toString().length < 2 ? `0${date.getHours() - 2}` : date.getHours() - 2;
  const mn = date.getMinutes().toString().length < 2 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${day}/${month}/${year} - ${hour}h${mn}`;
}

export default changeDateFormat;
