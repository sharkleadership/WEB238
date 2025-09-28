// JM, 09/13/25

$(document).ready(function() {
    // WIP: Featured project carousel

    // const carousel = $('.project__carousel');
    // const slides = $('.project__carousel .slide');

    // // Create clones at the beginning and end to simulate infinite scroll
    // const firstEl = slides.get(0);
    // const firstClone = $(firstEl).clone();

    // const lastEl = slides.get(-1);
    // const lastClone = $(lastEl).clone();
    // carousel.append(firstClone);
    // carousel.prepend(lastClone);

    // let currSlide = 1;
    // let interval;
    // const time = 3000;

    // const startCarousel = () => {
    //     interval = setInterval(() => {
    //         nextSlide();
    //         console.log(currSlide);
    //     }, time);
    // };

    // const nextSlide = () => {
    //     const slides = $('.project__carousel .slide');
    //     if (currSlide >= slides.length - 1) return;
        
    //     currSlide++;

    //     const width = slides.first().width();
    //     carousel.animate({transform: `translateX(${-width * currSlide}px)`}, "swing");
    // };

    // slides.bind("transitionend", () => {
    //     // if ()
    // });

    // // Pause on hover
    // carousel.hover(
    //     () => {
    //         clearInterval(interval);
    //     },
    //     () => startCarousel()
    // );

    // startCarousel();

    // END

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