$(function () {
    $('#cart-show').click(function (e) {
        $('#cart-loading-screen').toggle();
    });

    $('.closeWin').click(function (e) {
        window.close();
    });

    $('.openWinXS').click(function (e) {
        window.open("gridtesterXS.asp", "", "Width=575, height=575");
    });

    $('#btn-fluid').click(function (e) {
        $('#grid-example').removeClass("container-fluid").addClass("container");
        $('#btn-fluid').addClass("active");
        $('#btn-solid').removeClass("active");
    });
    $('#btn-solid').click(function (e) {
        $('#grid-example').removeClass("container").addClass("container-fluid");
        $('#btn-solid').addClass("active");
        $('#btn-fluid').removeClass("active");
    });

});


oWidthVW();
window.addEventListener('resize', oWidthVW);
function oWidthVW(){
  document.querySelector('.oWidthVW').innerText = document.documentElement.offsetWidth;
}

iWidthVW();
window.addEventListener('resize', iWidthVW);
function iWidthVW(){
  document.querySelector('.iWidthVW').innerText = window.innerWidth;
}


//const element = document.getElementById("col-12-x");
//let text = element.offsetWidth + "px";
//document.getElementById("col-12-p").innerHTML = text;


