const getDateHowLongFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  difference = difference / 1000;
  let hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  let minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;

  let message;

  if (hourDifference > 0) {
    message = `${hourDifference} hrs`;
  }
  if (minuteDifference > 0) {
    message = message
      ? `${message} ${minuteDifference} min`
      : `${minuteDifference} min`;
  }
  if (difference) {
    message = message
      ? `${message} ${Math.round(difference)} hrs`
      : `${Math.round(difference)} min`;
  }
  return message;
};

export default getDateHowLongFromNow;
