const $grid = $(".grid").isotope({
        itemSelector: ".grid-item",
        sortBy: "random",
        percentPosition: true,
        layoutMode: "packery",
        //filter: ".brand, .graph, .front",
        packery: {
            gutter: 0
        }
});
$grid.imagesLoaded().progress(() => {
    $grid.isotope('layout');
  });

$('.btn-filters').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
});

$(".filters").on("click", "button", function() {
    const filterValue = $(this).data('filter');
    $grid.isotope({ filter: filterValue });
    $("#portfolio").removeClass().addClass(filterValue.substring(1) + 's');
    $(".grid-item").addClass('weightless');
    $(`.grid-item${filterValue}`).removeClass('weightless');
    $grid.isotope('arrange');
});


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

$('#back2top').on('click', function(){
    $(window).scrollTop(0);
});


/*--------------------------*/

$('.offcanvas').first().addClass('first-off');
$('.offcanvas').last().addClass('last-off');

$('.btn-next').on('click', () => { 
    if ($('.offcanvas.show').hasClass('last-off')) {
        $('.offcanvas.show').offcanvas('hide');
        $('.first-off').offcanvas('show');
    }
    else {
        $('.offcanvas.show').offcanvas('hide').nextAll('.offcanvas').first().offcanvas('show');
    }
});

$('.btn-prev').on('click', () => {
    if ($('.offcanvas.show').hasClass('first-off')) {
        $('.offcanvas.show').offcanvas('hide');
        $('.last-off').offcanvas('show')
    }
    else {
        $('.offcanvas.show').offcanvas('hide').prevAll('.offcanvas').first().offcanvas('show');
    }
});

$('.btn-clos').on('click', () => {
    $('.offcanvas.show').offcanvas('hide');
    $('.off-btns').removeClass('on-btns');
});

$('.offcanvas').on('show.bs.offcanvas', function () {
    var $offcanvas = $(this);
    var $carousel = $(this).find('.carousel').flickity({
      fullscreen: true,
      lazyLoad: 1,
      imagesLoaded: true,
      prevNextButtons: false,
      wrapAround: true
    });
    if ($offcanvas.hasClass('btns-dark')) {
        $('.off-btns').addClass('dark-btns');
      } else {
        $('.off-btns').removeClass('dark-btns');
      }
});

$('.flick').on('click', function() {
    $('.off-btns').addClass('on-btns')
})

$(".carousel-cell-image").on( 'click', function(stopProp) {
    stopProp.stopPropagation();
    $(this).parents(".carousel").flickity("next")
});
$('.carousel-cell').on( 'click', function() {
    $('.offcanvas.show').offcanvas('hide');
    $('.off-btns').removeClass('on-btns');
});
 

/*--------------------------*/


$(document).keydown(function (e) {
    if (e.keyCode == 37) {
        $('.offcanvas.show .btn-prev').click()
        return false;
    }
    if (e.keyCode == 39) {
        $('.offcanvas.show .btn-next').click()
    } 
});


/*--------------------------*/


$( document ).ready(function() {
    $(".preloader").css("display", "none");
});

