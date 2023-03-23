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


const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

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
  selectNavItem(target);
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
  selectNavItem(navItems[sectionIds.indexOf(selector)])
}

// scrolling opacity
// 콘텐츠 높이 800 가정했을 때
// 스크롤 높이 0 => opaciy 1 [800 - 0 = 800 = 100%] 
// 400 => 0.5 [800 - 400 = 400 = 0.5% ]
// 800 => 1 [800 - 800 = 0 = 0%]

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('wheel', ()=> {
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


// 1. 모든 섹션 요소들을 가지고 온다.
// 2. IntersectionObserver 를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

// const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

// const sections = sectionIds.map(id => document.querySelector(id));
// console.log(sections)
// const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
// console.log(navItems);

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // console.log(entry);
    // console.log(entry.target);
    // console.log(entry.target, entry.isIntersecting);
    
    if(!entry.isIntersecting && entry.intersectionRatio > 0) { // threshold: 0.3 의 뷰포트에서 사라진 것을 체크
      // console.log(entry.target, entry.isIntersecting);
      // console.log(entry.target);
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // console.log(index, entry.target.id);
      // console.log(entry.boundingClientRect);


      // 아래로 스크롤하면(요소는 위로 없어짐) 다음 인덱스를 보여주고
      // 즉, y 좌표가 - 마이너스라면 인덱스 +1
      // 위로 스크롤하면(요소는 아래로 없어짐) 이전 인덱스를 보여준다
      // 즉, y 좌표가 플러스라면 인덱스를 -1

      // 스크롤링이 아래로 되어서 페이지가 올라옴(즉, 뷰포트에서 사라지는 타켓요소의 y좌표가 마이너스)
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
      
    }


  })
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
})