/* function of zero adding */
/* (if number is less then 10, adding zero in front of it) */
function zero_first_format(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

/* function of receiving of current date */
function date() {
  var current_date = new Date();
  var day = zero_first_format(current_date.getDate());
  var month = zero_first_format(current_date.getMonth() + 1);
  var year = current_date.getFullYear();

  return day + '/' + month + '/' + year;
}

/* show current date with id "current_date" */
document.getElementById('current_date').innerHTML = date();

export {date, zero_first_format};