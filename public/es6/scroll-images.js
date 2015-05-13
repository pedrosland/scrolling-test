(function($){


    class ImageScroller {
        constructor($parent, images){
            this.$parent = $parent;
            this.$container = $('<div class="scroll-bg">');
            this.images = images;

            this.initListeners();
            images.forEach(image => {
                this.addImage(image);
            });

            $parent.append(this.$container);
        }

        initListeners(){
            $(window).on('scroll.scrollImages', this.handleScroll.bind(this));
        }

        addImage(imageUrl){
            var image = new Image();
            $(image).one('load', this.imageLoaded.bind(this));
            image.src = imageUrl;
            this.$container.append(image);
        }

        imageLoaded(){
            var height = this.$container.children().get().reduce((counter, elem) => {
                return counter + parseInt($(elem).css('height'), 10);
            }, 0);
            console.log('imageLoaded height', height);
            this.$container.css('height', height);
            this.$parent.css('minHeight', height);
            this.requestRender();
        }

        handleScroll(e){
            this.lastScrollEvent = e;
            this.requestRender();
        }

        requestRender(){
            requestAnimationFrame(this.handleAnimationFrame.bind(this));
        }

        handleAnimationFrame(){
            this.$container.css('top', (-1 * this.$parent[0].scrollTop/10) + 'px');
        }
    }

    // Only supports first item in jQuery collection
    $.fn.scrollImages = function(images){
        new ImageScroller(this.eq(0), images);

        return this;
    };
})(jQuery);
