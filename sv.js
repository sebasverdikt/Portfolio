var $grid = $(".grid").imagesLoaded(function() {
    $grid.isotope({
        itemSelector: ".grid-item",
        sortBy: "random",
        percentPosition: !0,
        layoutMode: "packery",
        initLayout: !0,
        filter: ".brand, .graph",
        packery: {
            gutter: 0,
            fitWidth: !0
        },
        getSortData: {
            sortBy: "random",
            name: function(a) {
                return $(a).text()
            }
        }
    })
});
$grid.imagesLoaded().progress(function() {
    $grid.isotope("layout")
});

function brandContainer() {
    document.getElementById("portfolio").classList.add("container-sm", "px-0")
}

function otherContainer() {
    document.getElementById("portfolio").classList.remove("container-sm", "px-0")
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
window.onload = function() {
    document.querySelector(".preloader").style.display = "none"
};