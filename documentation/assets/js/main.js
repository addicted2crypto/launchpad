/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : Gameon
* Version  : 1.0
* Author   : Themeland
* Support  : hridoy1272@gmail.com
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Responsive Menu
3. Navigation

/*----------------------------------------------
1. Preloader
----------------------------------------------*/
(function ($) {
    'use strict';

    $(window).on('load', function() {
        $('#gameon-preloader').addClass('loaded');
    })

}(jQuery));

/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/
(function ($) {

    'use strict';

    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');
        navbar.clone().appendTo(menu);

        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');

        $('.menu .nav-item.dropdown').each(function() {
            let children = $(this).children('.nav-link');
            children.addClass('prevent');
        })
    }

    navResponsive();

    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {
        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })

    $('.menu .nav-item.dropdown').each(function() {
        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (e) {

        if($(this).hasClass('prevent')) {
            e.preventDefault();
        }

        var nav_link = $(this);

        nav_link.next().toggleClass('show');

        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
}(jQuery));

/*----------------------------------------------
3. Navigation
----------------------------------------------*/
(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var navbar   = $('.navbar');
    var toTop    = $('#scroll-to-top');

    $(document).ready(function() {
        if (position > 0) {
            navbar.addClass('navbar-sticky');
        }
        toTop.hide();
    })

    $(window).scroll(function () {

        navbar.removeAttr('data-aos');
        navbar.removeAttr('data-aos-delay');

        var scroll = $(window).scrollTop();

        if (!navbar.hasClass('relative')) {

            // Down
            if (scroll > position) {

                navbar.addClass('navbar-sticky');

                if(navbar.hasClass('navbar-fixed') || window.innerWidth <= 767) {
                    navbar.removeClass('hidden').addClass('visible');

                } else {

                    if ($(window).scrollTop() >= window.innerHeight) {
                        navbar.removeClass('visible').addClass('hidden');
                    }
                }                

                toTop.fadeOut('fast');

            // Up
            } else {

                if(!navbar.hasClass('navbar-no-fixed')) {
                    navbar.removeClass('hidden').addClass('visible');
                }

                // Top
                if ($(window).scrollTop() <= 100 && $('.navbar-holder').length == 0) {
                    navbar.removeClass('navbar-sticky');

                } else {                   

                    if(!navbar.hasClass('navbar-no-fixed')) {
                        navbar.addClass('visible');
                    }
                }

                if (position >= window.innerHeight && window.innerWidth >= 767) {
                    toTop.fadeIn('fast');

                } else {
                    toTop.fadeOut('fast');
                }
            }
            position = scroll;
        }
    })

	$('.nav-link').each(function() {

		if(this.hasAttribute('href')) {
			let href = $(this).attr('href');
			if (href.indexOf('/') == -1) {
				if (href.length > 1 && href.indexOf('#') != -1) {
					$(this).addClass('smooth-anchor');
				}
			}
		}

		let body = $('body');

		if(this.hasAttribute('href') && ! body.hasClass('home')) {
			let href = $(this).attr('href');
			if (href.indexOf('/') == -1) {
				if (href.length > 1 && href.indexOf('#') != -1) {
					$(this).removeClass('smooth-anchor');
					$(this).attr('href', '/'+href);
				}
			}
		}
	})

    $(document).on('click', '.smooth-anchor', function (e) {
        e.preventDefault();

        let href   = $(this).attr('href');
        let target = $.attr(this, 'href');

        if($(target).length > 0) {
        
            if (href.length > 1 && href.indexOf('#') != -1) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 500);
            }
        }
    })

    $('.dropdown-menu').each(function () {

        let dropdown = $(this);

        dropdown.hover(function () {
            dropdown.parent().find('.nav-link').first().addClass('active');

        }, function () {
            dropdown.parent().find('.nav-link').first().removeClass('active');
        })
    })

    if($('.navbar-holder').length > 0) {
        $('.navbar').addClass('navbar-sticky');
        $('.navbar-holder').css('min-height',$('.navbar-expand').outerHeight());
    }
}(jQuery));