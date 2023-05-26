(function ($) {
	'use strict';
	jQuery(document).ready(function(){
		$('.music__slider-inner').slick({
			autoplay: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			adaptiveHeight: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						dots: true,
					}
				}
			]
		  });
	});
})(jQuery);