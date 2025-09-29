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

    $("<figure id='lightbox'></figure>")
    .hide()
    .appendTo('body');

    $(".project__carousel .project__card").click(
        function() {
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