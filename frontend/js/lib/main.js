(function ($) {
    "user strict";
    // Preloader Js


    $(document).ready(function () {
        // counter
        $('.counter').countUp({
            'time': 2500,
            'delay': 10
        });
        //Menu Dropdown Icon Adding
        $('.menu li a').on('click', function (e) {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(300, "swing");
            } else {
                element.addClass('open');
                element.children('ul').slideDown(300, "swing");
                element.siblings('li').children('ul').slideUp(300, "swing");
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(300, "swing");
            }
        })
        $(".more-info").on("click",function (event){
            event.preventDefault();
            let hash = this.hash;
            $('html,body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        })
        // Scroll To Top

        //Header Bar
        $('.header-bar').on('click', function () {
            $(this).toggleClass('active');
            $('.overlay').toggleClass('active');
            $('.menu').toggleClass('active');
        })
        $('.overlay').on('click', function () {
            $(this).removeClass('active');
            $('.header-bar').removeClass('active');
            $('.menu').removeClass('active');
            $('.cart-sidebar-area').removeClass('active');
        })
        // Header Sticky Herevar prevScrollpos = window.pageYOffset;
        var scrollPosition = window.scrollY;
        if (scrollPosition >= 1) {
            $(".header-section").addClass('active');
        }




        $('.tab ul.tab-menu li').on('click', function (g) {
            var tab = $(this).closest('.tab'),
                index = $(this).closest('li').index();
            tab.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').hide(10);
            tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').fadeIn(10);
            g.preventDefault();
        });
        //The Password Show
        $('.pass-type').on('click', function (e) {
            var x = e.target.parentNode.parentNode.querySelector("input");
            if (x.type === "password") {
                x.type = "text";
                e.target.parentNode.querySelector("i").classList.add("icon-eye");
                e.target.parentNode.querySelector("i").classList.remove("icon-eye-close");
            } else {
                x.type = "password";
                e.target.parentNode.querySelector("i").classList.add("icon-eye-close");
                e.target.parentNode.querySelector("i").classList.remove("icon-eye");
            }
        });


        //******maybe remove below codes******
        // PoPuP
        $('.popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            disableOn: 300
        });
        $("body").each(function () {
            $(this).find(".img-pop").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        })
        //Faq
        $('.faq-wrapper .faq-title').on('click', function (e) {
            var element = $(this).parent('.faq-item');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('.faq-content').removeClass('open');
                element.find('.faq-content').slideUp(300, "swing");
            } else {
                element.addClass('open');
                element.children('.faq-content').slideDown(300, "swing");
                element.siblings('.faq-item').children('.faq-content').slideUp(300, "swing");
                element.siblings('.faq-item').removeClass('open');
                element.siblings('.faq-item').find('.faq-title').removeClass('open');
                element.siblings('.faq-item').find('.faq-content').slideUp(300, "swing");
            }
        });
        $('.cart-button, .side-sidebar-close-btn').on('click', function () {
            $(this).toggleClass('active');
            $('.overlay').toggleClass('active');
            $('.cart-sidebar-area').toggleClass('active');
        })
        $('.search-bar').on('click', function () {
            $('.search-form').toggleClass('active');
        })
        $('.remove-cart').on('click', function (e) {
            e.preventDefault();
            $(this).parent().parent().hide(300);
        });
        //Client Slider
        $('.client-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            loop: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            items: 1,
            autoHeight: true,
            responsive: {
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 3,
                },
            }
        })
        //Auction Slider One
        $('.auction-slider-1').owlCarousel({
            // loop:true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            autoHeight: true,
            margin: 30,
        });
        var owlOne = $('.auction-slider-1');
        owlOne.owlCarousel();
        // Go to the next item
        $('.electro-next').on('click', function () {
            owlOne.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.electro-prev').on('click', function () {
            owlOne.trigger('prev.owl.carousel', [300]);
        })
        //Auction Slider
        $('.auction-slider-2').owlCarousel({
            // loop:true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            autoHeight: true,
            margin: 30,
        });
        var owlTwo = $('.auction-slider-2');
        owlTwo.owlCarousel();
        // Go to the next item
        $('.art-next').on('click', function () {
            owlTwo.trigger('next.owl.carousel');
        })
        // Go to the next item
        $('.art-prev').on('click', function () {
            owlTwo.trigger('prev.owl.carousel');
        })
        //Browse Auction Slider
        $('.browse-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            autoHeight: true,
            responsive: {
                450: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 5,
                },
                1200: {
                    items: 6,
                },
            }
        });
        var owlThree = $('.browse-slider');
        owlThree.owlCarousel();
        // Go to the next item
        $('.bro-next').on('click', function () {
            owlThree.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.bro-prev').on('click', function () {
            owlThree.trigger('prev.owl.carousel', [300]);
        })
        //Browse Auction Slider
        $('.browse-slider-2').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            autoHeight: true,
            responsive: {
                500: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
            }
        });
        var owlBrowseTwo = $('.browse-slider-2');
        owlBrowseTwo.owlCarousel();
        // Go to the next item
        $('.bro-next').on('click', function () {
            owlBrowseTwo.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.bro-prev').on('click', function () {
            owlBrowseTwo.trigger('prev.owl.carousel', [300]);
        })
        //Browse Auction Slider
        $('.auction-slider-4').owlCarousel({
            // loop: true,
            nav: false,
            dots: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            autoHeight: true,
            margin: 30,
            responsive: {
                768: {
                    items: 2,
                },
                992: {
                    items: 1,
                },
            }
        });
        var owlFour = $('.auction-slider-4');
        owlFour.owlCarousel();
        // Go to the next item
        $('.real-next').on('click', function () {
            owlFour.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.real-prev').on('click', function () {
            owlFour.trigger('prev.owl.carousel', [300]);
        })
        $(function () {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 10000,
                values: [600, 7000],
                slide: function (event, ui) {
                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                }
            });
            $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
        });
        var sync1 = $("#sync1");
        var sync2 = $("#sync2");
        var thumbnailItemClass = '.owl-item';
        var slides = sync1.owlCarousel({
            startPosition: 12,
            items: 1,
            loop: true,
            margin: 0,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: false,
            scrollPerPage: true,
            autoplayHoverPause: false,
            nav: false,
            dots: false,
        }).on('changed.owl.carousel', syncPosition);

        function syncPosition(el) {
            $owl_slider = $(this).data('owl.carousel');
            var loop = $owl_slider.options.loop;

            if (loop) {
                var count = el.item.count - 1;
                var current = Math.round(el.item.index - (el.item.count / 2) - .5);
                if (current < 0) {
                    current = count;
                }
                if (current > count) {
                    current = 0;
                }
            } else {
                var current = el.item.index;
            }

            var owl_thumbnail = sync2.data('owl.carousel');
            var itemClass = "." + owl_thumbnail.options.itemClass;

            var thumbnailCurrentItem = sync2
                .find(itemClass)
                .removeClass("synced")
                .eq(current);
            thumbnailCurrentItem.addClass('synced');

            if (!thumbnailCurrentItem.hasClass('active')) {
                var duration = 500;
                sync2.trigger('to.owl.carousel', [current, duration, true]);
            }
        }

        var thumbs = sync2.owlCarousel({
            startPosition: 12,
            items: 2,
            loop: false,
            margin: 0,
            autoplay: false,
            nav: false,
            dots: false,
            responsive: {
                500: {
                    items: 3,
                },
                768: {
                    items: 4,
                },
                992: {
                    items: 5,
                },
                1200: {
                    items: 6,
                },
            },
            onInitialized: function (e) {
                var thumbnailCurrentItem = $(e.target).find(thumbnailItemClass).eq(this._current);
                thumbnailCurrentItem.addClass('synced');
            },
        })
            .on('click', thumbnailItemClass, function (e) {
                e.preventDefault();
                var duration = 500;
                var itemIndex = $(e.target).parents(thumbnailItemClass).index();
                sync1.trigger('to.owl.carousel', [itemIndex, duration, true]);
            }).on("changed.owl.carousel", function (el) {
                var number = el.item.index;
                $owl_slider = sync1.data('owl.carousel');
                $owl_slider.to(number, 500, true);
            });
        sync1.owlCarousel();
        // Go to the next item
        $('.det-next').on('click', function () {
            sync1.trigger('next.owl.carousel');
            sync2.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.det-prev').on('click', function () {
            sync1.trigger('prev.owl.carousel', [300]);
            sync2.trigger('prev.owl.carousel', [300]);
        })
    });
})(jQuery);
