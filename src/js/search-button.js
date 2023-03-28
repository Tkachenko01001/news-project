let inputBox = document.querySelector('.search-bar'),
  searchIcon = document.querySelector('.search-icon-mob'),
  closeIcon = document.querySelector('.close-icon');

searchIcon.addEventListener('click', e => {
  inputBox.classList.add('open');
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    inputBox.classList.remove('open');
  });
});
