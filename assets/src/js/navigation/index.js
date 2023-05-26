/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function ($) {
	'use strict';

	$('.back-to-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" });
	});

	$(window).scroll(function() {
		// Header
		if ($(window).scrollTop() > 885){
			$('.site-header').addClass('active');
		} else {
			$('.site-header').removeClass('active');
		}
	
		// Icons
		if ($(window).scrollTop() > 885){
			$('.social-links').addClass('scrolled');
		} else {
			$('.social-links').removeClass('scrolled');
		}

	});
	
})(jQuery);
