const menuRef = document.querySelector('.nav-menu');
console.log('Current page is', location.pathname.match(/[^/]+\.html/i)[0]);
switch (location.pathname.match(/[^/]+\.html/i)[0]) {
  case 'index.html':
    menuRef.children[0].firstElementChild.classList.add(
      'nav-menu__link--active'
    );
    break;
  case 'favorite.html':
    menuRef.children[1].firstElementChild.classList.add(
      'nav-menu__link--active'
    );
    break;
  case 'read.html':
    menuRef.children[2].firstElementChild.classList.add(
      'nav-menu__link--active'
    );
    break;
  default:
    menuRef.children[0].firstElementChild.classList.add(
      'nav-menu__link--active'
    );
    break;
}
