import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#date-picker');
const dateInput = document.querySelector('.date-input');

const dateUp = document.querySelector('.date-up');
const dateDown = document.querySelector('.date-down');
const calendarSvg = document.querySelector('.date-svg-calendar');

let selectedDate;

const options = {
  dateFormat: 'd/m/Y',
  locale: 'en',
  onChange: function (selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    datePicker.style.backgroundColor = '#4440F6';
    datePicker.style.color = '#F8F8F8';
    datePicker.style.border = '#4440F6';
    dateDown.style.display = 'block';
    dateDown.style.color = '#F8F8F8';
    dateUp.style.display = 'none';
  },
};
flatpickr(datePicker, options);

datePicker.addEventListener('click', changeSvg);

function changeSvg() {
  datePicker.style.backgroundColor = '#4440F6';
  datePicker.style.color = '#F8F8F8';
  calendarSvg.style.color = '#F8F8F8';
  datePicker.style.border = '#4440F6';
  dateDown.style.display = 'none';
  dateUp.style.display = 'block';
  dateUp.style.color = '#F8F8F8';
}
function clearFlatpickr() {
  datePicker.clear();
}
