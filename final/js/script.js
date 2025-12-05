// JM, 12/04/25
// Final Project, WEB 238

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