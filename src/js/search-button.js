let inputBox = document.querySelector('.search-bar'),
  searchIcon = document.querySelector('.search-icon-mob'),
  closeIcon = document.querySelector('.close-icon');

searchIcon.addEventListener('click', () => {
  inputBox.classList.add('open');
});
