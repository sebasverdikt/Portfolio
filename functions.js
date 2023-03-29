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

let currentOffcanvasIndex = 0; 

function hasChildModal(currentOffcanvasIndex) {
    const currentOffcanvas = offcanvasList[currentOffcanvasIndex];
    const modalElement = currentOffcanvas._element.querySelector('.modal');
    return modalElement && modalElement.parentElement == currentOffcanvas._element;
}

nextBtn.addEventListener('click', () => {
    offcanvasList[currentOffcanvasIndex].hide();
    const nextOffcanvasIndex = (currentOffcanvasIndex + 1) % offcanvasList.length;
    offcanvasList[nextOffcanvasIndex].show();
    currentOffcanvasIndex = nextOffcanvasIndex;
    infoBtn.style.display = hasChildModal(currentOffcanvasIndex) ? 'block' : 'none';
});

prevBtn.addEventListener('click', () => {
    offcanvasList[currentOffcanvasIndex].hide();
    const prevOffcanvasIndex = (currentOffcanvasIndex - 1 + offcanvasList.length) % offcanvasList.length;
    offcanvasList[prevOffcanvasIndex].show();
    currentOffcanvasIndex = prevOffcanvasIndex;
    infoBtn.style.display = hasChildModal(currentOffcanvasIndex) ? 'block' : 'none';
});

closBtn.addEventListener('click', () => {
    offcanvasList.forEach(offcanvas => offcanvas.hide());
    document.querySelector('.off-btns').classList.remove('on-btns');
});

infoBtn.addEventListener('click', () => {
    const currentOffcanvas = offcanvasList[currentOffcanvasIndex];
    const modalElement = currentOffcanvas._element.querySelector('.modal');
    const modal = new bootstrap.Modal(modalElement, {backdrop:false});
    modal.show();
    modalElement.addEventListener('click', (event) => {
        modal.hide();
    });
});


/*--------------------------*/

function handleClick(event) {
  event.stopPropagation();
  flkty.next();
}

offcanvasList.forEach(function(offcanvas, index) {
  offcanvas._element.addEventListener('show.bs.offcanvas', function(event) {
    var offcanvasElement = event.currentTarget;
    var carouselElement = offcanvasElement.querySelector('.carousel');
    var flkty = new Flickity(carouselElement, {
      fullscreen: true,
      lazyLoad: 1,
      imagesLoaded: true,
      prevNextButtons: false,
      wrapAround: true
    });
    document.querySelector('.off-btns').classList.add('on-btns');
    if (offcanvasElement.classList.contains('btns-dark')) {
        document.querySelector('.off-btns').classList.add('dark-btns');
      }
    else {
        document.querySelector('.off-btns').classList.remove('dark-btns');
      }
    var carouselCellImages = carouselElement.querySelectorAll('.carousel-cell-image');
    carouselCellImages.forEach(function(carouselCellImage) {
      carouselCellImage.addEventListener('click', handleClick);
    });
    currentOffcanvasIndex = index; 
    infoBtn.style.display = hasChildModal(index) ? 'block' : 'none';
    var previousOffcanvasIndex = (index - 1 + offcanvasList.length) % offcanvasList.length;
    var previousOffcanvasElement = offcanvasList[previousOffcanvasIndex]._element;
    var previousCarouselElement = previousOffcanvasElement.querySelector('.carousel');
    var previousCarouselCellImages = previousCarouselElement.querySelectorAll('.carousel-cell-image');
    previousCarouselCellImages.forEach(function(previousCarouselCellImage) {
      previousCarouselCellImage.removeEventListener('click', handleClick);
    });
  });
});

document.querySelectorAll('.carousel-cell').forEach(function(cell) {
    cell.addEventListener('click', function() {
      offcanvasList.forEach(function(offcanvas) {
        offcanvas.hide();
      });
      document.querySelector('.off-btns').classList.remove('on-btns');
    });
  });


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

