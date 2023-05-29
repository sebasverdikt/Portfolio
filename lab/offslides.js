const offSlides = document.querySelectorAll('.offslide')

const offBtns = document.querySelector('.off-btns')
const closBtn = offBtns.querySelector('.btn-clos')
const nextBtn = offBtns.querySelector('.btn-next')
const prevBtn = offBtns.querySelector('.btn-prev')

const flickLinks = document.querySelectorAll('.flick');




flickLinks.forEach((flickLink) => {
    flickLink.addEventListener('click', function() {
        const slideId = this.getAttribute('data-os-target');
        const activeSlide = document.querySelector(slideId);
        const activeCarousel = activeSlide.querySelector('.carousel');
        const bgColor = window.getComputedStyle(this.querySelector('div')).backgroundColor;
        activeSlide.classList.add('active');
        if (!activeCarousel.classList.contains('flickity-enabled')) {
            var flkty = new Flickity(activeCarousel, {
                setGallerySize: false,
                prevNextButtons: false,
                percentPosition: true
            });
        }
        activeSlide.style.backgroundColor = bgColor;
        activeSlide.style.transform = 'translateY(-100%)';
        activeSlide.style.visibility = 'visible';
        setTimeout(() => {
            activeSlide.style.transition = 'transform .3s ease-out';
            activeSlide.style.transform = 'translateY(0%)';
        }, 10);
        offBtns.classList.add('on-btns')
    });
});

offBtns.addEventListener('click', (event) => {
    const activeSlide = document.querySelector('.active');
    const nextSlide = activeSlide.nextElementSibling || activeSlide.parentElement.firstElementChild;
    const nextCarousel = nextSlide.querySelector('.carousel')
    const prevSlide = activeSlide.previousElementSibling || activeSlide.parentElement.lastElementChild;
    const prevCarousel = prevSlide.querySelector('.carousel')
    const nextFlickBg = document.querySelector(`a.flick[data-os-target="#${nextSlide.id}"]`) || document.querySelector(`a.flick[data-os-target="#${offSlides[0].id}"]`);
    const prevFlickBg = document.querySelector(`a.flick[data-os-target="#${prevSlide.id}"]`) || document.querySelector(`a.flick[data-os-target="#${offSlides[offSlides.length - 1].id}"]`);
    const nextBgColor = window.getComputedStyle(nextFlickBg.querySelector('div')).backgroundColor;
    const prevBgColor = window.getComputedStyle(prevFlickBg.querySelector('div')).backgroundColor;
    switch (event.target) {
        case closBtn:
            activeSlide.style.transition = 'transform .3s ease-out';
            activeSlide.style.transform = 'translateY(100%)';
            offBtns.classList.remove('on-btns');
            setTimeout(() => {
                activeSlide.style = ''
                activeSlide.classList.remove('active')
            }, 300);
            break
        case nextBtn:
            if (!nextCarousel.classList.contains('flickity-enabled')) {
                var flkty = new Flickity(nextCarousel, {
                    setGallerySize: false,
                    prevNextButtons: false,
                    percentPosition: true
                });
            }
            activeSlide.style.transition = 'transform .3s ease-in';
            activeSlide.style.transform = 'translateX(-100%)';
            nextSlide.style.transform = 'translateX(100%)';
            nextSlide.style.backgroundColor = nextBgColor;
            setTimeout(() => {
                nextSlide.style.visibility = 'visible';
                nextSlide.style.transition = 'transform .3s ease-out';
                nextSlide.style.transform = 'translateX(0%)';
                activeSlide.classList.remove('active');
                nextSlide.classList.add('active');
            }, 10);
            setTimeout(() => {
                offSlides.forEach(slide => {
                    if (!slide.classList.contains('active')) {
                        slide.removeAttribute('style');
                    }
                });
                offBtns.querySelectorAll('button').forEach((button) => {
                    button.disabled = false;
                });
            }, 300);
            offBtns.querySelectorAll('button').forEach((button) => {
                button.disabled = true;
            });            
            break
        case prevBtn:
            if (!prevCarousel.classList.contains('flickity-enabled')) {
                var flkty = new Flickity(prevCarousel, {
                    setGallerySize: false,
                    prevNextButtons: false,
                    percentPosition: true
                });
            }
            activeSlide.style.transition = 'transform .3s ease-in';
            activeSlide.style.transform = 'translateX(100%)';
            prevSlide.style.transform = 'translateX(-100%)';
            prevSlide.style.backgroundColor = prevBgColor;
            setTimeout(() => {
                prevSlide.style.visibility = 'visible';
                prevSlide.style.transition = 'transform .3s ease-out';
                prevSlide.style.transform = 'translateX(0%)';
                activeSlide.classList.remove('active');
                prevSlide.classList.add('active');
            }, 10);
            setTimeout(() => {
                offSlides.forEach(slide => {
                    if (!slide.classList.contains('active')) {
                        slide.removeAttribute('style');
                    }
                });
                offBtns.querySelectorAll('button').forEach((button) => {
                    button.disabled = false;
                });
            }, 300);
            offBtns.querySelectorAll('button').forEach((button) => {
                button.disabled = true;
            });            
            break
        case infoBtn:
    }
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
    if (event.key === 'Escape') {
        document.querySelector('.btn-clos').click();
        event.preventDefault();
    }
});