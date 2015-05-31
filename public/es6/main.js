$(function(){
    $('.scroll-panes').scrollImages();

    // Hack since this is a demo. Makes links nicer.
    $('a').click(function(e){
        if($(this).attr('href') === '#'){
            e.preventDefault();
        }
    });
});
