(function($){

    class ImageScroller {
        constructor($parent){
            this.speed = 2;

            this.$parent = $parent.wrap('<div class="scroll-bg--wrapper"></div>');
            this.$container = $('<div class="scroll-bg">');
            this.$containerFront = $('<div class="scroll-bg--front">');
            this.$containerBack = $('<div class="scroll-bg--back">');

            this.currentIndex = -1;
        }

        init(){
            this.initListeners();

            this.$containerFront.insertBefore(this.$parent);

            var viewportHeight = $(window).height();

            this.$parent.children().height(viewportHeight);

            this.numPanes = this.$parent.children().length;

            this.$parent.parent().css('height', $(window).height() * this.numPanes / this.speed)
                .css('overflow', 'hidden');

            this.requestRender();
        }

        initListeners(){
            $(window).on('scroll.scrollImages', this.handleScroll.bind(this));
        }

        handleScroll(){
            this.requestRender();
        }

        requestRender(){
            requestAnimationFrame(this.handleAnimationFrame.bind(this));
        }

        setFrontImage(index){
            // Move old front image to correct position
            var $oldFront = this.$containerFront.children();
            if(this.currentIndex > 0){
                this.$parent.find('.pane-' + this.currentIndex)
                    .after($oldFront);
            }else{
                this.$parent.prepend($oldFront);
            }

            this.currentIndex = index;

            if(index === 0){
                this.$parent.css('margin-top', $(window).height() / this.speed);
            }else{
                this.$parent.css('margin-top', 0);
            }

            this.$parent.height($(window).height() * this.numPanes / this.speed + $(window).height() / this.speed);

            // Move new front image to front
            this.$parent.find('.pane-' + (index + 1))
                .appendTo(this.$containerFront);
        }

        handleAnimationFrame(){
            var viewportHeight = $(window).height();

            var scrollTop = $(window).scrollTop();

            var percentage = scrollTop / viewportHeight * this.speed;
            var index = Math.floor(percentage);

            var viewportPercentage = percentage - index;

            this.$containerFront.css('top', -viewportPercentage * viewportHeight);

            if(this.currentIndex !== index){
                this.setFrontImage(index);
            }
        }
    }

    // Only supports first item in jQuery collection
    $.fn.scrollImages = function(){
        var scroller = new ImageScroller(this.eq(0));
        scroller.init();

        return this;
    };
})(jQuery);
