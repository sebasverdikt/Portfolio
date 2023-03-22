var $grid = $(".grid").isotope({
        itemSelector: ".grid-item",
        sortBy: "random",
        percentPosition: true,
        layoutMode: "packery",
        //filter: ".brand, .graph, .front",
        packery: {
            gutter: 0
        }
});
$grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
});  


$('.btn-filters').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
});
$(".btn-brand").click(function() { 
    $("#portfolio").removeClass().addClass("brands");
    $(".grid-item.brand").removeClass("weightless");
    $(".grid-item.graph").addClass("weightless");
    $(".grid-item.front").addClass("weightless");
});
$(".btn-graph").click(function() { 
    $("#portfolio").removeClass().addClass("graphs");
    $(".grid-item.brand").addClass("weightless");
    $(".grid-item.graph").removeClass("weightless");
    $(".grid-item.front").addClass("weightless");

});
$(".btn-front").click(function() { 
    $("#portfolio").removeClass().addClass("sites");
    $(".grid-item.brand").addClass("weightless");
    $(".grid-item.graph").addClass("weightless");
    $(".grid-item.front").removeClass("weightless");
});
$(".filters").on("click", "button", function() {
    $grid.isotope('layout');
});


window.onscroll = function() {
    stickyFilters()
};

var navFilters = document.getElementById("nav-filters"),
    back2top = document.getElementById("back2top"),
    sticky = navFilters.offsetTop;

function stickyFilters() {
    600 < window.pageYOffset ? (navFilters.classList.add("sticky"), back2top.classList.add("b2t-on"), document.body.style.paddingTop = "116px") : (navFilters.classList.remove("sticky"), back2top.classList.remove("b2t-on"), document.body.style.paddingTop = "0px")
};

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
};


$('.flick').on( 'click', function() {
    $(this).siblings('.offcanvas').children('.carousel').flickity({
        fullscreen: true,
        lazyLoad: true,
        imagesLoaded: true,
        prevNextButtons: false,
        wrapAround: true
    })
}); 
$('.btn-next').on( 'click', function() {
    $(this).parents('.grid-item').next().find('.carousel').flickity({
        fullscreen: true,
        lazyLoad: true,
        imagesLoaded: true,
        prevNextButtons: false,
        wrapAround: true
    })
}); 
$('.btn-prev').on( 'click', function() {
    $(this).parents('.grid-item').prev().find('.carousel').flickity({
        fullscreen: true,
        lazyLoad: true,
        imagesLoaded: true,
        prevNextButtons: false,
        wrapAround: true
    })
}); 
$(".carousel-cell-image").on( 'click', function(stopProp) {
    stopProp.stopPropagation();
    $(this).parents(".carousel").flickity("next")
});
$('.carousel-cell').on( 'click', function() {
    $(".offcanvas.show").offcanvas("hide");
});





$(document).keydown(function (e) {
    if (e.keyCode == 37) {
        $('.offcanvas.show .btn-prev').click()
        return false;
    }
    if (e.keyCode == 39) {
        $('.offcanvas.show .btn-next').click()
    } 
});



$( document ).ready(function() {
    $(".preloader").css("display", "none");
});

