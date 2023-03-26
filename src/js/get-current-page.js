const menuRef = document.querySelector('.nav-menu');
const htmlFileName = location.pathname.match(/[^/]+\.html/i);
if (htmlFileName === null) {
  menuRef.children[0].firstElementChild.classList.add('nav-menu__link--active');
} else {
  switch (htmlFileName[0]) {
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
}
