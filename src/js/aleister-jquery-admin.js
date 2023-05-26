(function ($) {
	"use strict";

	$(document).on("click", '.social-icon', function () {
		$(this).toggleClass('active');
		$(this).parents('.item-container').find('.item-icon-wrap').toggleClass('active');
		$(this).parents('.item-container').find('.item-link-wrap').toggleClass('active');
	});

	$(document).click(function(e) {
		if (!e.target.classList.contains('social-icon') && !e.target.classList.contains('components-text-control__input') && !e.target.classList.contains('components-select-control__input')) {
			$('.social-icon').removeClass('active');
			$('.item-icon-wrap').removeClass('active');
			$('.item-link-wrap').removeClass('active');
		}
	});

})(jQuery);