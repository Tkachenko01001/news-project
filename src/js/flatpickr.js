import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimeValue = document.querySelector('#datetime-picker');

const options = {
  disableMobile: 'true',
  dateFormat: 'd/m/Y',
  defaultDate: new Date(),
  // minuteIncrement: 1,
  // onClose(selectedDates) {
  //   console.log(selectedDates[0]);
  // },
};

flatpickr('#datetime-picker', options);
