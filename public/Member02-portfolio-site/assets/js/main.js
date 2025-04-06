/*=============== Active Link =============== */
const navlink = document.querySelectorAll('.nav__link');
const tabContent = document.querySelectorAll('.tab-content');
function activeLink() {
  navlink.forEach((a) => a.classList.remove('active-link'));
  tabContent.forEach((a) => a.classList.remove('active-tab'));
  this.classList.add('active-link');
  
  const targetId = this.getAttribute('data-target');
  document.getElementById(targetId).classList.add('active-tab');
}

navlink.forEach((a) => a.addEventListener('click', activeLink));

/*=============== Mixitup Filter =============== */
let mixerProjects = mixitup('.projects__container', {
  selectors: {
    target: '.project__item',
  },
  animation: {
    duration: 300,
  },
});

/* Active Work */
const linkWork = document.querySelectorAll('.category__btn');

function activeWork() {
  linkWork.forEach((a) => a.classList.remove('active-work'));
  this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*=============== Testimonials Swiper =============== */
var testiSwiper = new Swiper('.testimonial__container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  mousewheel: true,
  keyboard: true,
});

