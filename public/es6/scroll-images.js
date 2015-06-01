(function($){

    class ImageScroller {
        constructor($parent, headerHeight){
            this.speed = 2;
            this.headerHeight = headerHeight;

            this.$parent = $parent.wrap('<div class="scroll-bg--wrapper"></div>');
            this.$wrapper = this.$parent.parent();
            this.$container = $('<div class="scroll-bg">');
            this.$containerFront = $('<div class="scroll-bg--front">');
            this.$containerBack = $('<div class="scroll-bg--back">');

            this.currentIndex = -1;
        }

        init(){
            this.initListeners();

            this.$containerFront.insertBefore(this.$parent);

            this.numPanes = this.$parent.children().length;

            this.setSizes();

            this.requestRender();
        }

        setSizes(){
            var viewportHeight = $(window).height();

            this.$wrapper.find('.pane').height(viewportHeight - this.headerHeight);

            this.$wrapper.css('height', viewportHeight * (this.numPanes + 1) / this.speed);
        }

        initListeners(){
            $(window)
                .on('scroll.scrollImages', this.handleScroll.bind(this))
                .on('resize.scrollImages', this.handleResize.bind(this));
        }

        handleScroll(){
            this.requestRender();
        }

        handleResize(){
            this.setSizes();
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

            // calculate offset for back from top allowing for speed
            this.$parent.css('margin-top', -(index - 1) * $(window).height() / this.speed);

            var viewportHeight = $(window).height() - this.headerHeight;

            this.$parent.height(viewportHeight * this.numPanes / this.speed + viewportHeight / this.speed);

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

            this.$containerFront.css('top', -viewportPercentage * (viewportHeight - this.headerHeight));

            if(this.currentIndex !== index){
                this.setFrontImage(index);
            }
        }
    }

    // Only supports first item in jQuery collection
    $.fn.scrollImages = function(headerHeight){
        var scroller = new ImageScroller(this.eq(0), headerHeight);
        scroller.init();

        return this;
    };
})(jQuery);
