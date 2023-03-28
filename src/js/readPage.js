const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    const isActive = parent.classList.contains('active');
    parent.classList.toggle('active');
    const content = parent.querySelector('.accordion-content');
    if (isActive) {
      content.style.maxHeight = 0;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
