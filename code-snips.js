
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