const elements = {
  themeSwitch: document.querySelector('.theme__light'),
  iconSun: document.querySelector('.theme__icon-sun'),
  iconMoon: document.querySelector('.theme__icon-moon'),
  labelEl: document.querySelector('.theme__checkbox'),
  bodyEl: document.querySelector('body'),
  pointerLight: document.querySelector('#light'),
  pointerDark: document.querySelector('#dark'),
  borderEl: document.querySelector('.header'),
  mobileMenu: document.querySelector('.menu-container'),
  inputEl: document.querySelector('#search'),
  nightInput: document.querySelector('[name="night-input"]'),
  dateInput: document.querySelector('.date-picker'),
};

const THEME_KEY = 'selected_theme';
const isNightTheme = localStorage.getItem(THEME_KEY) === 'true';

const applyTheme = (isNightTheme) => {
  const {
    themeSwitch,
    iconSun,
    iconMoon,
    labelEl,
    bodyEl,
    pointerLight,
    pointerDark,
    borderEl,
    mobileMenu,
    inputEl,
    nightInput,
    dateInput,
  } = elements;

  if (isNightTheme) {
    themeSwitch?.classList.add('theme__dark');
    labelEl?.classList.add('theme__checkbox-night');
    iconMoon?.classList.add('theme__icon-moon--dark');
    iconSun?.classList.add('theme__icon-sun--dark');
    bodyEl?.classList.add('night--theme');
    pointerLight?.classList.add('switcher-pointer--light');
    pointerDark?.classList.add('pointer--night');
    borderEl?.classList.add('header--night');
    mobileMenu?.classList.add('menu-container--dark');
    inputEl?.classList.add('search-input--night');
    nightInput?.classList.add('search-input--night');
    if (dateInput) {
      dateInput.classList.toggle('date-picker--night', isNightTheme);
    }
  } else {
    themeSwitch?.classList.remove('theme__dark');
    labelEl?.classList.remove('theme__checkbox-night');
    iconMoon?.classList.remove('theme__icon-moon--dark');
    iconSun?.classList.remove('theme__icon-sun--dark');
    bodyEl?.classList.remove('night--theme');
    pointerLight?.classList.remove('switcher-pointer--light');
    pointerDark?.classList.remove('pointer--night');
    borderEl?.classList.remove('header--night');
    mobileMenu?.classList.remove('menu-container--dark');
    inputEl?.classList.remove('search-input--night');
    nightInput?.classList.remove('search-input--night');
    dateInput?.classList.remove('date-picker--night');
  }
};

const onClickSwitch = (e) => {
  if (e.target.nodeName === 'INPUT') {
    return;
  }

  const { bodyEl } = elements;
  const selectedTheme = !bodyEl?.classList.contains('night--theme');
  localStorage.setItem(THEME_KEY, selectedTheme);
  applyTheme(selectedTheme);
};

applyTheme(isNightTheme);

elements.labelEl?.addEventListener('click', onClickSwitch);


