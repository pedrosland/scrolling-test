(function($){

    class ImageScroller {
        constructor($parent){
            this.speed = 2;

            this.$parent = $parent.wrap('<div class="scroll-bg--wrapper"></div>');
            this.$container = $('<div class="scroll-bg">');
            this.$containerFront = $('<div class="scroll-bg--front">');
            this.$containerBack = $('<div class="scroll-bg--back">');

            this.$spacer = $('<div class="scroll-bg--spacer"></div>');

            this.currentIndex = -1;
        }

        init(){
            this.initListeners();

            // this.$parent.children().appendTo(this.$containerBack);

            // this.$container.append(this.$containerBack, this.$containerFront);
            // this.$parent.append(this.$container);
            this.$containerFront.insertBefore(this.$parent);

            var viewportHeight = $(window).height();

            this.$parent.children().height(viewportHeight);

            //this.$spacer.height(viewportHeight / this.speed);
            // this.$parent.css('margin-top', $(window).height() / this.speed);

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
            //this.$parent.css('margin-top', $(window).height() / this.speed - ($(window).height() / this.speed * index));

            this.$parent.height($(window).height() * this.numPanes / this.speed + $(window).height() / this.speed);

            //this.$spacer.insertBefore('.pane-' + (index + 1));

            // Move new front image to front
            this.$parent.find('.pane-' + (index + 1))
                .appendTo(this.$containerFront);
        }

        handleAnimationFrame(){
            var viewportHeight = $(window).height();

            var scrollTop = $(window).scrollTop();

            // scrollTop -= parseInt(this.$parent.css('margin-top'));

            var percentage = scrollTop / viewportHeight * this.speed;
            var index = Math.floor(percentage);

            console.log('index %s, percentage %s, panes %s', index, percentage, this.numPanes);

            //this.$parent.css('margin-top', $(window).height() / this.speed * index);

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
