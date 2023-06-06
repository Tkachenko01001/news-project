import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#date-picker');
const dateInput = document.querySelector('.date-input');

const dateUp = document.querySelector('.date-up');
const dateDown = document.querySelector('.date-down');
const calendarSvg = document.querySelector('.date-svg-calendar');

let allCards = [];
let selectedDate;

const resetDatePicker = () => {
  datePicker.style.backgroundColor = '#F8F8F8';
  datePicker.style.color = '#4440F6';
  datePicker.style.border = '1px solid #4440F6';
  calendarSvg.style.color = '#4440F6';
  dateDown.style.display = 'block';
  dateDown.style.color = '#4440F6';
  dateUp.style.display = 'none';
  dateUp.style.color = '#4440F6';
};

const options = {
  dateFormat: 'd/m/Y',
  locale: 'en',
  onChange: function (selectedDates) {
    selectedDate = selectedDates[0];
    datePicker.style.backgroundColor = '#4440F6';
    datePicker.style.color = '#F8F8F8';
    datePicker.style.border = '#4440F6';
    dateDown.style.display = 'block';
    dateDown.style.color = '#F8F8F8';
    dateUp.style.display = 'none';

    filterCardsByDate(selectedDate);
  },
  onClose: function () {
    resetDatePicker();
    clearFlatpickr();
    filterCardsByDate(null);
  },
};

flatpickr(datePicker, options);

datePicker.addEventListener('click', changeSvg);

function changeSvg() {
  selectedDate = null;
  datePicker.selectedDates = [];
  dateDown.style.display = 'none';
  dateUp.style.display = 'block';
}

function clearFlatpickr() {
  selectedDate = null;
  datePicker.selectedDates = [];
}

function filterCardsByDate(selectedDate) {
  const dateString = selectedDate
    ? selectedDate
        .toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
        .split('.')
        .reverse()
        .join('-')
    : '';

  const galleryNewsRefs = document.querySelector('.galleryNews');
  const emptyQuerySection = document.querySelector('.js-empty-query');

  if (allCards.length === 0) {
    allCards = [...galleryNewsRefs.querySelectorAll('.card')];
  }

  const cardsByDate = selectedDate
    ? allCards.filter(
        (card) => card.querySelector('.card__date').textContent === dateString
      )
    : allCards;

  galleryNewsRefs.innerHTML = '';
  galleryNewsRefs.append(...cardsByDate);

  if (cardsByDate.length === 0) {
    emptyQuerySection.classList.remove('empty-query');
  } else {
    emptyQuerySection.classList.add('empty-query');
  }
}