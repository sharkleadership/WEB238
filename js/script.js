// JM, 10/12/25

$(document).ready(function() {
    const container = $('.carousel__container');
    const carousel = $('.project__carousel');
    const slides = $('.project__carousel .slide');

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

    const getSlides = () => $('.project__carousel .slide');

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

    $("<figure id='lightbox'></figure>")
    .hide()
    .appendTo('body');

    $(".project__carousel .project__card").on('click',
        function() {
            clearInterval(interval)
            
            $('body, #wrapper').css({ "overflow-y": 'hidden'});

            const img = $(this).children('img');
            const caption = $(this).children('figcaption').children('p');

            $("<img>", { src: img.attr("src") })
            .appendTo('#lightbox');
            
            $("<figcaption class='lightbox__caption'></figcaption>")
            .hide()
            .appendTo("#lightbox");
            
            $("<p></p>")
            .text(caption.text())
            .hide()
            .appendTo('.lightbox__caption');
            
            $("#lightbox").fadeIn();
            $(".lightbox__caption").fadeIn('slow');
            $('.lightbox__caption > p').fadeIn('slow');
            
            $('#lightbox > img').animate({
                width: '100%'
            });
        }
    );

    $("#lightbox").on('click', function() {
        $(this).fadeOut();
        $(this).children().remove();
        startCarousel()
    });

    $(".other-projects .project__card:even").addClass('even');

    $(".other-projects .project__card").on({
        mouseenter: function() {
            $(this).addClass("gradient-blue");
            const description = $(this).children('figcaption').html();
            $("#other-projects__description").html(description);

            $("#other-projects__description").slideDown('fast');
        },
        mouseleave: function() {
            $(this).removeClass("gradient-blue");
            $("#other-projects__description").slideUp('fast');
        }
    });

    $(".tab-menu a").on({
        click: function(e) {
            e.preventDefault();
            $(".tab-content.current").fadeOut("slow", function() { 
                $(this).removeClass("current");
            });

            $(".tab-menu a.current").removeClass('current');
            $(this).addClass('current');

            $($(this).attr('href')).fadeIn("slow", function() {
                $(this).addClass("current");
            });
        },
        mouseenter: function() {
            $(this).addClass('gradient-blue active');
        },
        mouseleave: function() {
            $(this).removeClass('gradient-blue active');
        }
    });
});