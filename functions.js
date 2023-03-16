var $grid = $(".grid").isotope({
        itemSelector: ".grid-item",
        sortBy: "random",
        percentPosition: true,
        layoutMode: "packery",
        filter: ".brand, .graph",
        packery: {
            gutter: 0
        }
});

$grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
  });  

function brandContainer() {
    document.getElementById("portfolio").classList.add("brands")
}

function otherContainer() {
    document.getElementById("portfolio").classList.remove("brands")
}

$(".filters").on("click", "button", function() {
    var a = $(this).attr("data-filter");
    $grid.isotope({
        filter: a
    })
});

for (var header = document.getElementById("filter-btns"), btns = header.getElementsByClassName("btn-filters"), i = 0; i < btns.length; i++) btns[i].addEventListener("click", function() {
    var a = document.getElementsByClassName("active");
    a[0].className = a[0].className.replace(" active", "");
    this.className += " active"
});

window.onscroll = function() {
    stickyFilters()
};

var navFilters = document.getElementById("nav-filters"),
    back2top = document.getElementById("back2top"),
    sticky = navFilters.offsetTop;

function stickyFilters() {
    600 < window.pageYOffset ? (navFilters.classList.add("sticky"), back2top.classList.add("b2t-on"), document.body.style.paddingTop = "116px") : (navFilters.classList.remove("sticky"), back2top.classList.remove("b2t-on"), document.body.style.paddingTop = "0px")
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
}

$(".carousel").flickity({
    fullscreen: !0,
    lazyLoad: 1,
    prevNextButtons: !1,
    wrapAround: !0
});

$(".carousel-cell").click(function() {
    $(".offcanvas").offcanvas("hide")
});

$(".carousel-cell-image").click(function(a) {
    a.stopPropagation();
    $(".carousel").flickity("next")
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

window.onload = function () {
    document.querySelector(".preloader").style.display = "none"
};

