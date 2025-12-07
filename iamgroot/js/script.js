// JM, 12/06/25
// Final Project, WEB 238

// Hamburger Menu - User-initiated Animation

$('.dropdown-menu__hamburger').each(function() {
    $(this).on('click', function() {
        $(this).toggleClass('is-open');
        $(this).siblings('.dropdown-menu__menu').fadeToggle();
        $(this).siblings('.dropdown-menu__menu').toggleClass('is-open');
    });
});

// More posts - User Interaction
const postTemplate = $('#blog-post');
const postsSection = $('.blog-posts');
const morePostsButt = $('.more-posts');

const posts = [
    {
        title: 'I am Groot',
        author: 'Groot',
        snippet: 'I am Groot. I am groot. I am groot. I AM groot. I Am groot. I am GROOT. I am groot. I am groot. I am groot. I am groot. I am groot. I AM groot. I AM GROOT.'
    },
    {
        title: 'We are Groot',
        author: 'Groot',
        snippet: 'We are Groot. I am groot. WE are groot. I am groot. I am groot. I am GROOT. I AM groot. I am groot. I am groot. I am groot. I am groot. we are groot. WE ARE GROOT.'
    },
    {
        title: 'I am GROOT',
        author: 'Groot',
        snippet: 'I am GROOT. I am GROOT. I am groot. I AM Groot. I am groot. We are Groot. I am groot. I am groot. We are groot. I am groot. I am groot. I AM GROOT. I am groot.'
    },
    {
        title: 'I am Groot--I am Groot',
        author: 'Groot',
        snippet: 'I am Groot. We are Groot. I am Groot. I Am Groot. I AM Groot. I AM GROOT. I AM GROOT. WE ARE GROOT. WE ARE GROOT. I AM GROOT. i am groot.'
    },
    {
        title: 'We are Groot, Groot',
        author: 'Groot',
        snippet: 'We are Groot. We are Groot. We ARE Groot. I am Groot. I AM Groot. I AM Groot. i am groot. we are groot. "I am Groot," I am Groot..'
    },
    {
        title: 'I am Groot. We are Groot.',
        author: 'Groot',
        snippet: 'I am Groot? I am Groot. We are Groot. WE are Groot. we are groot. I am Groot. I Am Groot. We are Groot. WE are Groot.'
    },
    {
        title: 'I am Groot?',
        author: 'Groot',
        snippet: 'I am Groot? I am Groot? We are Groot? I am Groot. I am Groot. I AM Groot. We are GROOT. I Am Groot. We are Groot.'
    },
    {
        title: 'I am Groot. We ARE Groot.',
        author: 'Groot',
        snippet: 'We ARE Groot. I am Groot. I am Groot. We Are Groot. I am Groot. We are Groot. I AM Groot. I am Groot. I am Groooooot.'
    },
    {
        title: 'I am Groooot',
        author: 'Groot',
        snippet: 'I am Groooot. I am GROOT. I am Groot. We are Groot. We ARE Groot. I am Groot. I AM Groot. We Are GROOOOT.'
    },
    {
        title: 'We are Groot. I am Groot.',
        author: 'Groot',
        snippet: 'I am Groot. We are Groot. I am GROOT. We are Groot. I am Groot. I AM Groot. We ARE Groot. I am GROOOT.'
    }
];
let currPost = 0;

function addPosts(num) {
    if (posts.length === currPost) return;

    for (let i = 0; i < num; i++) {
        let postEl = postTemplate.contents().clone();
        const post = posts[currPost];
        if (!post) {
            morePostsButt.attr('disabled', true);
            return;
        }

        postEl.children('.title').text(post.title);
        postEl.children('.author').text(post.author);
        postEl.children('.snippet').text(post.snippet);

        postEl.insertBefore(morePostsButt);

        currPost++;
    }
}
addPosts(3);

morePostsButt.on('click', function() {
    addPosts(3);
});

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
    if (duration === 0) {
        carousel.css('transform', `translateX(${-slideWidth * currSlide}px)`);
        return;
    }
    
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
}

const stopCarousel = () => clearInterval(interval);


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

$('.controls__previous-slide').on('click', () => {
    previousSlide();
    stopCarousel();
    startCarousel();
});
$('.controls__next-slide').on('click', () => {
    nextSlide();
    stopCarousel();
    startCarousel();
});

startCarousel();

// Translate Colophon - User Interaction

$("button.translate").on('click', () => $(".untranslated, .translated").toggle());

// Colophon - User-initiated Animation
$(".colophon__open").on('click', function() {
    $(".colophon").toggle("slow", "swing", function() {
        $(this).attr("open", !$(this).attr("open"));
    });
});

$(".colophon__close").on('click', function() {
    $(".colophon").hide("slow", "swing", function() {
        $(this).attr("open", false);
    });
});