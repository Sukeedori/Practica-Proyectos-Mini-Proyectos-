document.querySelector('.menu-btn').addEventListener('click', ()=> {
  document.querySelector('.nav-menu').classList.toggle('show');
});

ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-lolis', {delay:100});
ScrollReveal().reveal('.bom', {delay:100});
ScrollReveal().reveal('.bom2', {delay:100});
