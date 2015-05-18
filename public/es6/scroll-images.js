(function($){

    class ImageScroller {
        constructor($parent, images){
            this.speed = 0.2;

            this.$parent = $parent;
            this.$container = $('<div class="scroll-bg">');
            this.$containerFront = $('<div class="scroll-bg--front">');
            this.$containerBack = $('<div class="scroll-bg--back">');

            this.$imageFront = $('<img>').appendTo(this.$containerFront);
            this.$imageBack = $('<img>').appendTo(this.$containerBack);

            this.images = images;
            this.currentIndex = -1;
        }

        init(){
            this.initListeners();
            // this.images.forEach(image => {
            //     this.addImage(image);
            // });

            this.$container.append(this.$containerBack, this.$containerFront);
            this.$parent.append(this.$container);

            var viewportHeight = $(window).height();

            this.$containerFront.css('height', viewportHeight);

            this.requestRender();
        }

        initListeners(){
            $(window).on('scroll.scrollImages', this.handleScroll.bind(this));
        }

        addImage(imageUrl, front){
            var image = new Image();
            //$(image).one('load', this.imageLoaded.bind(this));
            image.src = imageUrl;

            if(front){
                return this.$containerFront.append(image);
            }

            return this.$containerBack.append(image);
        }

        imageLoaded(){
            // var height = this.$container.find('img').get().reduce((counter, elem) => {
            //     return counter + parseInt($(elem).css('height'), 10);
            // }, 0);



            // this.$container.css('height', height);
            // this.$parent.css('minHeight', height - height * this.speed);
            this.requestRender();
        }

        handleScroll(){
            this.requestRender();
        }

        requestRender(){
            requestAnimationFrame(this.handleAnimationFrame.bind(this));
        }

        setFrontImage(index){
            this.currentIndex = index;
            var url = this.images[index];
            this.$imageFront.prop('src', url);
        }

        handleAnimationFrame(){
            var viewportHeight = $(window).height();

            var factor = viewportHeight / this.images.length;
            var index = Math.floor(this.$parent.parent()[0].scrollTop / factor);
            console.log('viewportHeight: %s, index: %s, images: %s, scrollTop: %s, factor: %s', viewportHeight, index, this.images.length, this.$parent[0].scrollTop, factor);

            if(this.currentIndex !== index){
                this.setFrontImage(index);
            }

            this.$container.css('top', (-1 * this.$parent[0].scrollTop / this.speed) + 'px');
        }
    }

    // Only supports first item in jQuery collection
    $.fn.scrollImages = function(images){
        var scroller = new ImageScroller(this.eq(0), images);
        scroller.init();

        return this;
    };
})(jQuery);
