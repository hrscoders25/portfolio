$(function () {
    "use strict";
    var scrollBox = $(".full-page > .overlay-container"),
    niceScrollOptions = {
        cursorwidth: "5px",
        cursorcolor: "#1894ff",
        cursorborder: 0,
        cursorborderradius: "0",
        cursoropacitymin: "1"
    };
    
    /** NiceScroll **/

    scrollBox.niceScroll(niceScrollOptions);
    function fixNiceScroll() {
        scrollBox.getNiceScroll().resize();
    }
    scrollBox.on('resize', function () {
        // fix position for the niceScroll
        fixNiceScroll();
    });

    /**  Loading **/
   /* $(window).on('load', function () {
        $(".loading").animate({
            "top": "-100%"
        }, "fast", function () {
            $(this).remove();
        });
    }); */

    /**  Mobile Menu **/
    $(".menu-toggle").on("click", function () {
        $("body").toggleClass('mobile-menu-active');
    });
    

    $(window).on('resize', function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
            var hash = window.location.hash,
            scrollTopOffset;
            if (hash) {
                scrollTopOffset = $(hash).offset().top;
                $('html, body').animate({
                    scrollTop: scrollTopOffset
                }, 0, function () {
                    window.location.hash = hash;
                });
            }
        }
        // fix position for the niceScroll
        fixNiceScroll();
    });

});
