$(function(){
    $('.scroll-panes').scrollImages();

    // Hack since this is a demo. Makes links nicer.
    $('body').on('click', 'a', function(e){
        if($(this).attr('href') === '#'){
            e.preventDefault();
        }
    });

    var $navList = $('nav ul');
    $('.nav-icon').click(function(){
        $navList.toggle();
    });

    $('.sign-up').one('click', function(e){
        e.preventDefault();

        $(this)
            .addClass('sign-up--completed')
            .text('Thanks! You’ve signed up');
    });
});
