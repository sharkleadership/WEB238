// JM, 12/04/25
// Final Project, WEB 238

// Carousel - User Interaction / Other
const container = $('.carousel__container');
const carousel = $('.carousel');
const slides = $('.carousel .slide');

// Create clones at the beginning and end to simulate infinite scroll
const firstEl = slides.get(0);
const firstClone = $(firstEl).clone().addClass('first-clone');

const lastEl = slides.get(-1);
const lastClone = $(lastEl).clone().addClass('last-clone');
carousel.append(firstClone);
carousel.prepend(lastClone);

let currSlide = 1;
let interval;
const time = 5000;

const getSlides = () => $('.carousel .slide');

const slideWidth = getSlides().first().width();

const animateCarousel = (duration = 400) => {
    carousel.animate(
        { myTransform: -slideWidth * currSlide },
        {
            easing: 'swing',
            step: function(now, fx) {
                $(this).css({transform: `translateX(${now}px)`});
            },
            duration
        }
    );
}
animateCarousel(0);

const startCarousel = () => {
    interval = setInterval(() => {
        nextSlide();
    }, time);
    $('.carousel__controls .progress-bar').addClass('is-animating');
};

const stopCarousel = () => {
    clearInterval(interval);
    $('.carousel__controls .progress-bar').removeClass('is-animating');
}

const previousSlide = () => {
    if (currSlide <= 0) return;
    
    currSlide--;

    animateCarousel();
    carousel.trigger('slideMove', [$(getSlides().get(currSlide))]);
};

const nextSlide = () => {
    if (currSlide >= getSlides().length - 1) return;
    
    currSlide++;

    animateCarousel();
    carousel.trigger('slideMove', [$(getSlides().get(currSlide))]);
};

carousel.on('slideMove', function(e, slide) {
    if (slide.hasClass('first-clone')) {
        currSlide = 1;
        animateCarousel(0);
    }

    if (slide.hasClass('last-clone')) {
        currSlide = getSlides().length - 2;
        animateCarousel(0);
    }
});

// Pause on hover
container.on({
    mouseenter: () => stopCarousel,
    mouseleave: () => startCarousel
});

$('.controls__previous-slide').on('click', () => previousSlide);
$('.controls__next-slide').on('click', () => nextSlide);

startCarousel();

// Translate Colophon - User Interaction

$("button.translate").click(function() {
    $(".untranslated, .translated").toggle();
});

// Colophon - User-initiated Animation
$(".colophon__open").click(function() {
    $(".colophon").toggle("slow", "swing", function() {
        $(this).attr("open", !$(this).attr("open"));
    });
});

$(".colophon__close").click(function() {
    $(".colophon").hide("slow", "swing", function() {
        $(this).attr("open", false);
    });
});