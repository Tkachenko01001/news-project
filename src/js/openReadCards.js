document.querySelectorAll('.accordion-header').forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.nextElementSibling;

    parent.classList.toggle('accordion-header-open-content');

    if (parent.classList.contains('accordion-header-open-content')) {
      parent.style.maxHeight = parent.scrollHeight + 'px';
    } else {
      parent.style.maxHeight = 0;
    }
  });
});