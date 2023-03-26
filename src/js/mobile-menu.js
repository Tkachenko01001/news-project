(() => {
  const mobileMenuRef = document.querySelector('.menu-container');
  const menuBtnRef = document.querySelector('.menu__button');
  const headerRef = document.querySelector('.header');
  const inputBox = document.querySelector('.search-bar');

  menuBtnRef.addEventListener('click', () => {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuRef.classList.toggle('menu-container--open');
    menuBtnRef.classList.toggle('menu__button--open');
    headerRef.classList.toggle('header--menu-open');
    inputBox.classList.toggle('search-bar--hidden');
    menuBtnRef.setAttribute('aria-expanded', !expanded);

    if (!expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Close the mobile menu on wider screens if the device orientation changes
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if (!e.matches) return;
      mobileMenuRef.classList.remove('menu-container--open');
      headerRef.classList.remove('header--menu-open');
      menuBtnRef.classList.remove('menu__button--open');
      menuBtnRef.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
})();
