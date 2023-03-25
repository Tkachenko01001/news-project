let inputBox = document.querySelector('.input-box'),
  searchIcon = document.querySelector('.search-icon'),
  closeIcon = document.querySelector('.close-icon');

searchIcon.addEventListener('click', () => {
  inputBox.classList.toggle('open');
});