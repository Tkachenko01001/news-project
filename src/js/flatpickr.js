import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimeValue = document.querySelector('#datetime-picker');

const options = {
  disableMobile: 'true',
  dateFormat: 'd/m/Y',
  defaultDate: new Date(),
  confirmIcon: "<i></i>", 
  confirmText: 'OK', 
};

flatpickr('#datetime-picker', options);
