'use strict';


const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  // console.log(window.scrollY);
  // console.log('navbarHeight : ', navbarHeight);

  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }

})


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (evt) => {
  // console.log(evt.target);
  const target = evt.target;
  const link = target.dataset.link;
  
  if(link == null) return;
  // console.log(link);
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
})

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
})

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: 'smooth',
  })
}

// scrolling opacity
// 콘텐츠 높이 800 가정했을 때
// 스크롤 높이 0 => opaciy 1 [800 - 0 = 800 = 100%] 
// 400 => 0.5 [800 - 400 = 400 = 0.5% ]
// 800 => 1 [800 - 800 = 0 = 0%]

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
  // console.log(homeHeight, window.scrollY);

  // console.log(1 - window.scrollY / homeHeight);
  // 1 - (0 / 800) = 1
  // 1 - (400 / 800) = 0.5
  // 1 - (800 / 800) = 0
  
  home.style.opacity = 1 - window.scrollY / homeHeight;

})


const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
})

arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
})



const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');


workBtnContainer.addEventListener('click', (e) => {
  
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  
  // console.log(filter);
  if(filter == null || target.matches('.selected')) return;

  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach( project => {
    
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
  
    })
    projectContainer.classList.remove('anim-out')
  }, 300)


})

const navberToggleBtn = document.querySelector('.navbar__toggle-btn');

navberToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open')
})


