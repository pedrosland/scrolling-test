(function($){

    class ImageScroller {
        constructor($parent){
            this.speed = 0.2;

            this.$parent = $parent;
            this.$container = $('<div class="scroll-bg">');
            this.$containerFront = $('<div class="scroll-bg--front">');
            this.$containerBack = $('<div class="scroll-bg--back">');

            this.currentIndex = -1;
        }

        init(){
            this.initListeners();

            this.$container.append(this.$containerBack, this.$containerFront);
            this.$parent.append(this.$container);

            var viewportHeight = $(window).height();

            this.$containerFront.css('height', viewportHeight);

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
            if(index > 0){
                this.$parent.find('.pane-' + this.currentIndex)
                    .after($oldFront);
            }else{
                this.$parent.prepend($oldFront);
            }

            this.currentIndex = index;

            // Move new front image to front
            this.$parent.find('.pane-' + (index + 1))
                .appendTo(this.$containerFront);
        }

        handleAnimationFrame(){
            // var viewportHeight = $(window).height();
            //
            // var factor = viewportHeight / this.images.length;
            // var index = Math.floor(this.$parent.parent()[0].scrollTop / factor);
            // console.log('viewportHeight: %s, index: %s, images: %s, scrollTop: %s, factor: %s, progress: %s', viewportHeight, index, this.images.length, this.$parent[0].scrollTop, factor, this.$parent.parent()[0].scrollTop / factor);
            //
            // if(this.currentIndex !== index){
            //     this.setFrontImage(index);
            // }
            //
            // this.$container.css('top', (-1 * this.$parent[0].scrollTop / this.speed) + 'px');
        }
    }

    // Only supports first item in jQuery collection
    $.fn.scrollImages = function(){
        var scroller = new ImageScroller(this.eq(0));
        scroller.init();

        return this;
    };
})(jQuery);
