const themeSwitch = document.querySelector('.theme__light');
const iconSun = document.querySelector('.theme__icon-sun');
const iconMoon = document.querySelector('.theme__icon-moon');
const labelEl = document.querySelector('.theme__checkbox');
const bodyEl = document.querySelector('body');
const pointerLight = document.querySelector('#light');
const pointerDark = document.querySelector('#dark');
const borderEl = document.querySelector('.header');
const mobileMenu = document.querySelector('.menu-container');
const inputEl = document.querySelector('#search');
const nightInput = document.querySelector('[name="night-input"]')

const THEME_KEY = 'selected_theme';

const isNightTheme = localStorage.getItem(THEME_KEY) === 'true';

const applyTheme = (isNightTheme) => {

  if (isNightTheme) {
    themeSwitch.classList.add('theme__dark');
    labelEl.classList.add('theme__checkbox-night');
    iconMoon.classList.add('theme__icon-moon--dark');
    iconSun.classList.add('theme__icon-sun--dark');
    bodyEl.classList.add('night--theme');
    pointerLight.classList.add('switcher-pointer--light');
    pointerDark.classList.add('pointer--night');
    borderEl.classList.add('header--night');
    mobileMenu.classList.add('menu-container--dark');
    inputEl.classList.add('search-input--night');
    nightInput.classList.add('search-input--night')
  }
  
  else {
    themeSwitch.classList.remove('theme__dark');
    labelEl.classList.remove('theme__checkbox-night');
    iconMoon.classList.remove('theme__icon-moon--dark');
    iconSun.classList.remove('theme__icon-sun--dark');
    bodyEl.classList.remove('night--theme');
    pointerLight.classList.remove('switcher-pointer--light');
    pointerDark.classList.remove('pointer--night');
    borderEl.classList.remove('header--night');
    mobileMenu.classList.remove('menu-container--dark');
    inputEl.classList.remove('search-input--night');
    nightInput.classList.remove('search-input--night');
  }
}

const onClickSwitch = (e) => {
  if (e.target.nodeName === 'INPUT') {
    return;
  }
  
  const selectedTheme = !bodyEl.classList.contains('night--theme');
  localStorage.setItem(THEME_KEY, selectedTheme);
  applyTheme(selectedTheme);
}

applyTheme(isNightTheme);

labelEl.addEventListener('click', onClickSwitch);

export {applyTheme, onClickSwitch};

