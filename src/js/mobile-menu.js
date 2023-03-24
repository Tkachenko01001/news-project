(() => {
  const mobileMenuRef = document.querySelector('.menu-container');
  const menuBtnRef = document.querySelector('.menu__button');

  menuBtnRef.addEventListener('click', () => {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuRef.classList.toggle('menu-container--open');
    menuBtnRef.classList.toggle('menu__button--open');
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    const scrollLockMethod = !expanded
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);

    // Close the mobile menu on wider screens if the device orientation changes
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if (!e.matches) return;
      mobileMenuRef.classList.remove('menu-container--open');
      menuBtnRef.setAttribute('aria-expanded', false);
      bodyScrollLock.enableBodyScroll(document.body);
    });
  });
})();
