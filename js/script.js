// JM, 09/28/25

$(document).ready(function() {
    // WIP: Featured project carousel

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
    };

    const previousSlide = () => {
        if (currSlide <= 0) return;
        
        // console.log(currSlide);
        currSlide--;

        animateCarousel();
        carousel.trigger('slideMove', [$(getSlides().get(currSlide))]);
    };
    
    const nextSlide = () => {
        if (currSlide >= getSlides().length - 1) return;
        
        // console.log(currSlide);
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
    container.hover(
        () => clearInterval(interval),
        () => startCarousel()
    );

    $('.controls__previous-slide').click(previousSlide);
    $('.controls__next-slide').click(nextSlide);

    startCarousel();

    $("<figure id='lightbox'></figure>")
    .hide()
    .appendTo('body');

    $(".project__carousel .project__card").click(
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

    $("#lightbox").click(function() {
        $(this).fadeOut();
        $(this).children().remove();
        startCarousel()
    });

    $(".other-projects .project__card:even").addClass('even');

    $(".other-projects .project__card").hover(
        function() {
            $(this).addClass("gradient-blue");
            const description = $(this).children('figcaption').html();
            $("#other-projects__description").html(description);

            $("#other-projects__description").slideDown('fast');
        },
        function() {
            $(this).removeClass("gradient-blue");
            $("#other-projects__description").slideUp('fast');
        }
    );
});