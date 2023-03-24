export const divEl = document.querySelector('.theme');
export const themeSwitch = document.querySelector('.theme__light');
export const iconSun = document.querySelector('.theme__icon-sun');
export const iconMoon = document.querySelector('.theme__icon-moon');
export const labelEl = document.querySelector('.theme__checkbox');
export const bodyEl = document.querySelector('body');
export const pointerLight = document.querySelector('#light');
export const pointerDark = document.querySelector('#dark');

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
  }
  
  else {
    themeSwitch.classList.remove('theme__dark');
    labelEl.classList.remove('theme__checkbox-night');
    iconMoon.classList.remove('theme__icon-moon--dark');
    iconSun.classList.remove('theme__icon-sun--dark');
    bodyEl.classList.remove('night--theme');
    pointerLight.classList.remove('switcher-pointer--light');
    pointerDark.classList.remove('pointer--night');
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