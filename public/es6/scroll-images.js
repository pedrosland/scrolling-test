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

            // this.$parent.children().appendTo(this.$containerBack);

            // this.$container.append(this.$containerBack, this.$containerFront);
            // this.$parent.append(this.$container);
            this.$containerFront.insertBefore(this.$parent);

            var viewportHeight = $(window).height();

            this.$parent.css('margin-top', viewportHeight / 2);

            this.numPanes = this.$parent.children().length;

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

            // Move new front image to front
            this.$parent.find('.pane-' + (index + 1))
                .appendTo(this.$containerFront);
        }

        handleAnimationFrame(){
            var viewportHeight = $(window).height();

            var totalHeight = viewportHeight * this.numPanes;
            var percentage = $(window).scrollTop() / viewportHeight;
            var index = Math.floor(percentage);

            console.log('percentage %s, index %s', percentage, index);

            var viewportPercentage = percentage - index;

            console.log('viewportPercentage %s, viewportHeight %s', viewportPercentage, viewportHeight);

            this.$containerFront.css('top', - viewportPercentage * 2 * viewportHeight);

            console.log('final index %s', index);

            if(this.currentIndex !== index){
                this.setFrontImage(index);
            }

            //this.$container.css('top', (-1 * this.$parent[0].scrollTop / this.speed) + 'px');
        }
    }

    // Only supports first item in jQuery collection
    $.fn.scrollImages = function(){
        var scroller = new ImageScroller(this.eq(0));
        scroller.init();

        return this;
    };
})(jQuery);
