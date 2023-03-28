
var carouselContainers = document.querySelectorAll('.offcanvas');
for ( var i=0; i < carouselContainers.length; i++ ) {
  var container = carouselContainers[i];
  initCarouselContainer( container );
}

function initCarouselContainer( container ) {
  var carousel = container.querySelector('.carousel');
  var flkty = new Flickity( carousel, {
    fullscreen: true,
    lazyLoad: true,
    imagesLoaded: true,
    prevNextButtons: false,
    wrapAround: true
  });  
}
var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Flickity = require('flickity');

Flickity.setJQuery( $ );

jQueryBridget( 'flickity', Flickity, $ );

/* --------------------------------------- */


$('.offcustom').first().addClass('first-off');
$('.offcustom').last().addClass('last-off');

$('.btn-next').on('click', () => { 
    if ($('.offcustom.show').hasClass('last-off')) {
        $('.offcustom.show').offcanvas('hide');
        $('.first-off').offcanvas('show');
    }
    else {
        $('.offcustom.show').offcanvas('hide').nextAll('.offcustom').first().offcanvas('show');
    }
});

$('.btn-prev').on('click', () => {
    if ($('.offcustom.show').hasClass('first-off')) {
        $('.offcustom.show').offcanvas('hide');
        $('.last-off').offcanvas('show')
    }
    else {
        $('.offcustom.show').offcanvas('hide').prevAll('.offcustom').first().offcanvas('show');
    }
});

$('.btn-clos').on('click', () => {
    $('.offcustom.show').offcanvas('hide');
    $('.off-btns').removeClass('on-btns');
});

$('.offcustom').on('show.bs.offcanvas', function () {
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

$('.btn-info').on('click', function(){
    $('.offcustom.show').children('.modal').modal('show');
})

$(".carousel-cell-image").on( 'click', function(stopProp) {
    stopProp.stopPropagation();
    $(this).parents(".carousel").flickity("next")
});
$('.carousel-cell').on( 'click', function() {
    $('.offcustom.show').offcanvas('hide');
    $('.off-btns').removeClass('on-btns');
});

/* --------------------------------------- */

/* var clickImgNext = document.querySelector('.carousel-cell-image');
    clickImgNext.addEventListener( 'click', function() {
    flkty.next();
});
 $(".carousel-cell-image").click(function(stopProp) {
    stopProp.stopPropagation();
    $(".carousel").flickity("next")
});
/* var clickOutHide = document.querySelector('.offcanvas');
    clickOutHide.addEventListener( 'click', function() {
    hide.bs.offcanvas();
}); 
$(".carousel-cell").click(function() {
    $(".offcanvas").offcanvas("hide")
}); */



//$(".filters").on("click", "button", function() {
//    var filterProjects = $(this).attr("data-filter");
//    $grid.isotope({
//        filter: filterProjects
//    })
//});

$('.flick').on( 'click', function() {
    if ($(".flick").hasClass(".stretched-link")) {
        $(this).siblings('.offcanvas').children('.carousel').flickity({
            fullscreen: true,
            lazyLoad: true,
            imagesLoaded: true,
            prevNextButtons: false,
            wrapAround: true
        })
    }
    if ($(".flick").is(":button")) {
        $(this).parent('.offcanvas').children('.carousel').flickity({
            fullscreen: true,
            lazyLoad: true,
            imagesLoaded: true,
            prevNextButtons: false,
            wrapAround: true
        })
    }
}); 