// refs ={
//     accoedionHeader: document.querySelector('.accordion-header'),
//     accordionContent: document.querySelector('.accordion-content')
// };
// let accordionHeader = document.querySelectorAll('.accordion-header'),
// accordionContent = document.querySelectorAll('.accordion-content');

document.querySelectorAll('.accordion-header').forEach((item) => {
    item.addEventListener('click', () => {
        const parent = item.nextElementSibling;

        parent.classList.toggle('accordion-header-open-content');
    })
})

// accordionHeader.addEventListener('click', e => {
//     accordionContent.classList.toggle('open-content');
// })
