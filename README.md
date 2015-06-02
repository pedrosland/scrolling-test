# Scrolling Images Test

The project was to create a web page from a PSD and a couple of images.

There should be several images that scroll and there should be some kind of
effect happening with these. The page should be responsive and work well on
mobile.

## Features

* Responsive navigation - 3 viewport sizes: desktop, wide tablet and mobile
* High DPI image support
* Sign up button - please click them both
* Scrolling effect where previous image "slides up" revealing the next image below.

## Running

You must already have bower and npm installed.

First, install dependencies with bower

    bower install

Run server

    npm run serve

To build

    npm run build

To build and watch for changes

    npm run watch

To check JS for issues

    npm run eslint

To compile a static version to dist

    npm run compile

## Comments

I've tested in the latest browsers: Chrome 42, Firefox 38 and IE 11.

In the interest of finishing this project, I have chosen to make some sacrifices that would not be made for a production site.

Due to work, time and "I can't face looking at another computer today" constraints I have struggled to find decent blocks of uninterrupted time to work on this.

I have chosen not to implement scrolling progress indicators or buttons. These should be easy to implement with some calculations and including `window.scrollTo()` in `handleAnimationFrame()`.

There is currently an issue in Firefox with the pane being set to a min-width. I suspect this is due to the "Wanted Badly" responsive image.

The scrolling animation isn't quite as smooth as I would have hoped. I was aiming to reduce the number of layers but I suspect that switching the parent element and changing the `margin-top` are bringing about the performance hit responsible for the "jank". I may decide to rewrite it to use 5 separate layers all absolutely positioned and see what the performance is like. On a desktop, the performance is usually great.

I'm not supporting older browsers at the moment. I could include fix for `requestAnimationFrame` with `setTimeout()`.

I don't have an iOS device to test but I am aware that older versions don't bother to implement the scroll event so I may have to use touch events for scrolling.

Implementing a resize method was probably a bad idea as it doesn't help things on mobile. I do need to handle orientation changes though.

The images would probably be sliced again for mobile so that Niomi is positioned in the center.

Finally, I did enjoy this project. Partly because it is more than 1 year since I last worked with the DOM and JS in this way.
