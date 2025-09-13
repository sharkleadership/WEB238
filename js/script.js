// JM, 09/13/25

$(document).ready(function() {
    // WIP: Featured project carousel

    // const slides = $('.project__carousel li');

    // const firstEl = slides.get(0);
    // const firstClone = $(firstEl).clone();

    // const lastEl = slides.get(-1);
    // const lastClone = $(lastEl).clone();
    // $('.project__carousel').append(firstClone);
    // $('.project__carousel').prepend(lastClone);

    // END


    $(".other-projects .project__card:even").addClass('even');

    $(".other-projects .project__card").hover(function() {
        $(this).addClass("gradient-blue");
        const description = $(this).children('figcaption').html();
        $("#other-projects__description").html(description);

        $("#other-projects__description").slideDown('fast');
    },
    function() {
        $(this).removeClass("gradient-blue");
        $("#other-projects__description").slideUp('fast');
    });
});