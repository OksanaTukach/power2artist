$(document).ready(function(){
    $('.js-gallery__main').slick({
		slidesToShow: 1,
		asNavFor: '.js-gallery__nav',
		easing: 'ease',
		speed: 1200,
		fade: true,
		infinite: false
	})

	let galleryNavLength = $('.auction-gallery__nav-slide').length;

	if( galleryNavLength > 1) {
		$('.js-gallery__nav').slick({
			slidesToShow: 3,
			arrows: false,
			asNavFor: '.js-gallery__main',
			focusOnSelect: true,
			easing: 'ease',
			speed: 1200,
			infinite: false
		})
	}

	

	$('.js-gallery__main').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			tPrev: 'Предыдущий', // Alt text on left arrow
			tNext: 'Следующий', // Alt text on right arrow
			tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
		}
	});
})