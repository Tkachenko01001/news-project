let inputBox = document.querySelector('.search-bar'),
  searchIcon = document.querySelector('.search-icon'),
  closeIcon = document.querySelector('.close-icon');

searchIcon.addEventListener('click', () => {
  inputBox.classList.toggle('open');
});
