const grid = document.querySelector('.grid')
const gridItems = document.querySelectorAll('.grid-item')

const iso = new Isotope(grid, {
  itemSelector: '.grid-item',
  sortBy: 'random',
  percentPosition: true,
  layoutMode: 'packery',
  packery: {
    gutter: 0
  }
})

imagesLoaded(grid).on('progress', () => {
  iso.layout()
})


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


/* ------------------------------ */


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


/* ------------------------------ */


const offcanvasElementList = document.querySelectorAll('.offcanvas')
const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl, {backdrop:false}))
const { Offcanvas, Modal } = bootstrap;

const offBtns = document.querySelector('.off-btns')
const closBtn = offBtns.querySelector('.btn-clos')
const nextBtn = offBtns.querySelector('.btn-next')
const prevBtn = offBtns.querySelector('.btn-prev')
const infoBtn = offBtns.querySelector('.btn-info')

let activeOffcanvasId;

document.addEventListener('show.bs.offcanvas', function (event) {  
  const offcanvasId = event.target.id
  activeOffcanvasId = offcanvasId  
  offBtns.classList.add('on-btns')
  const oncanvas = document.querySelector(`#${activeOffcanvasId}`)
  if (oncanvas.classList.contains('btns-dark')) {
    offBtns.classList.add('dark-btns')
  } else {
    offBtns.classList.remove('dark-btns')
  }
  if (!oncanvas.querySelector('.modal')) {
    infoBtn.style.display = "none"
  } else {
    infoBtn.style.display = ""
  }
})

document.addEventListener('show.bs.offcanvas', function () {
  const oncanvas = document.querySelector(`#${activeOffcanvasId}`)
  const shownCarousel = oncanvas.querySelector('.carousel')
  if (!shownCarousel.classList.contains('flickity-enabled')) {
    var flkty = new Flickity(shownCarousel,{
        fullscreen: true,
        lazyLoad: true,
        imagesLoaded: true,
        prevNextButtons: false,
        wrapAround: true
    })
    const cellImages = shownCarousel.querySelectorAll('.carousel-cell-image')
    cellImages.forEach((cellImage) => {
      cellImage.addEventListener('load', function () {
        const loadingDiv = this.parentNode.querySelector('.spinner-border')
        loadingDiv.style.display = 'none'
      })
      cellImage.addEventListener('click', function (event) {
        event.stopPropagation()
        flkty.next()
      })
    })

    const cellBGs = shownCarousel.querySelectorAll('.carousel-cell')
    const loadingDivs = []
    cellBGs.forEach((cellBG, index) => {
      cellBG.addEventListener('click', function () {
        const activeOffcanvas = Offcanvas.getInstance(oncanvas)
        activeOffcanvas.hide();
      })

      const loadingDiv = document.createElement('div')
      loadingDiv.classList = 'spinner-border position-absolute'
      cellBG.appendChild(loadingDiv)
      loadingDivs[index] = loadingDiv
    })    
  }
})

offBtns.addEventListener('click', (event) => {
  const oncanvas = document.querySelector(`#${activeOffcanvasId}`)
  const activeOffcanvas = bootstrap.Offcanvas.getInstance(oncanvas)
  const currentIndex = offcanvasList.findIndex(offcanvas => offcanvas._element.id === activeOffcanvasId)
    if (event.target === closBtn) {
    activeOffcanvas.hide()
  } else if (event.target === nextBtn) {    
    const nextIndex = (currentIndex + 1) % offcanvasList.length
    const nextOffcanvas = offcanvasList[nextIndex]
    activeOffcanvas.hide()
    nextOffcanvas.show()
    activeOffcanvasId = nextOffcanvas._element.id
  } else if (event.target === prevBtn) {
    const prevIndex = (currentIndex - 1) % offcanvasList.length
    const prevOffcanvas = offcanvasList[prevIndex]
    activeOffcanvas.hide()
    prevOffcanvas.show()
    activeOffcanvasId = prevOffcanvas._element.id
  } else if (event.target === infoBtn) {
    var offModal = new bootstrap.Modal(oncanvas.querySelector('.modal'))
    offModal.show()    
  }
})

document.addEventListener('click', function (event) {
  const modal = event.target.closest('.modal')
  if (modal && modal.classList.contains('show')) {
    const offModal = bootstrap.Modal.getInstance(modal)
    offModal.hide()
  }
})

document.addEventListener('hide.bs.offcanvas', function () {
  offBtns.classList.remove('on-btns')
})


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




/* ------------------------------------- */

document.cookie = "SameSite=Strict; Domain=.imagekit.io";
