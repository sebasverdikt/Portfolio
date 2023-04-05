const grid = document.querySelector('.grid');
const gridItems = document.querySelectorAll('.grid-item');

const iso = new Isotope(grid, {
  itemSelector: '.grid-item',
  sortBy: 'random',
  percentPosition: true,
  layoutMode: 'packery',
  packery: {
    gutter: 0
  }
});

imagesLoaded(grid).on('progress', () => {
  iso.layout();
});

const filterButtons = document.querySelectorAll('.filters button');

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function() {
    const filterValue = this.getAttribute('data-filter');
    iso.arrange({
      filter: filterValue
    });
    document.querySelector('#portfolio').className = filterValue.substring(1) + 's';
    gridItems.forEach((item) => {
      item.classList.add('weightless');
    });
    const filteredItems = document.querySelectorAll(`.grid-item${filterValue}`);
    filteredItems.forEach((item) => {
      item.classList.remove('weightless');
    });
    iso.arrange();
    this.classList.add('active');
    const siblings = getSiblings(this);
    siblings.forEach((sibling) => {
      sibling.classList.remove('active');
    });
  });
}

function getSiblings(elem) {
  const siblings = [];
  let sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
  }
  return siblings;
}


/*--------------------------*/


window.addEventListener('scroll', stickyFilters);

const navFilters = document.getElementById("nav-filters");
const back2top = document.getElementById("back2top");
const sticky = navFilters.offsetTop;

function stickyFilters() {
    if (window.pageYOffset > 600) {
        navFilters.classList.add('sticky');
        back2top.classList.add('b2t-on');
        document.body.style.paddingTop = '116px';
    } else {
        navFilters.classList.remove('sticky');
        back2top.classList.remove('b2t-on');
        document.body.style.paddingTop = '0px';
    }
}

back2top.addEventListener('click', function() {
    window.scrollTo(0, 0);
});


/*--------------------------*/


const offcanvasElementList = document.querySelectorAll('.offcanvas');
const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl, {backdrop:false}));

const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const closBtn = document.querySelector('.btn-clos');
const infoBtn = document.querySelector('.btn-info');

const currentOffcanvasIndex = 0; 















/*--------------------------*/


document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        document.querySelector('.btn-prev').click();
        event.preventDefault();
    }
    if (event.key === 'ArrowRight') {
        document.querySelector('.btn-next').click();
        event.preventDefault();
    }
});


/*--------------------------*/


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.preloader').style.display = 'none';
});


document.cookie = "SameSite=Strict; Domain=.imagekit.io";