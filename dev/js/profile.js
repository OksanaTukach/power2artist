$(document).ready(function () {
	const width = $(window).width();
	const height = $(window).height();
    openLcCost()
	$('body').on('click', '.js-radio-cost', function() {
		openLcCost()
	});
	// Добавление и удаление социальных сетей
	var countSocialItem = 0;
	var maxSocialItem
    $('body').on('click', '.js-add-social', function() {
		maxSocialItem = $(this).attr('data-max')
		
		countSocialItem++;
		$(this).closest('.js-social-item').find('.styler').styler('destroy');
		var cloneBlock = $(this).closest('.js-social-item').clone();
		cloneBlock.find('input').val('');
		cloneBlock.find('.styler').styler();
		$(".js-social-item:last").after(cloneBlock);
		$(this).closest('.js-social-item').find('.styler').styler();
		selectLoadImages()
		if (countSocialItem == maxSocialItem) {
			$(this).addClass('hidden')
		}
        
    });
    $('body').on('click', '.js-remove-social', function() {
		countSocialItem--
		$(this).closest('.js-social-item').siblings('.js-social-item').find('.js-add-social.hidden').removeClass('hidden')
		$(this).closest('.js-social-item').remove()   
    });
	if (width <= 1180) {
		$('body').on('click', '.js-lc-tab > .lc-tab__head-el', function(e) {
			const parent = $(this).closest('.js-lc-tab ')
			const drop = parent.find('.js-menu-2lvl')
			if( drop.length) {
				e.preventDefault()
				parent.siblings('.js-lc-tab').find('.open').removeClass('open')
				drop.toggleClass('open')
			}

		});

		$(document).on('click', '.js-menu-2lvl', function () {
			let parent = $(this).closest('.js-lc-tab ')
			parent.siblings('.js-lc-tab').find('.open').removeClass('open')
			parent.find('.js-menu-2lvl').toggleClass('open')
		})
		$(document).mouseup(function (e){
			var div = $('.js-lc-tab');
			if (!div.is(e.target)
				&& div.has(e.target).length === 0) {
				div.siblings('.js-lc-tab').find('.open').removeClass('open')
				div.find('.js-menu-2lvl').removeClass('open')
			}
		});
	}

})
function openLcCost() {
	var bntOpenCost = $('.js-open-cost');
	var lcCost = $('.js-lc-cost')
	if (bntOpenCost.hasClass('checked')) {
		lcCost.show(500, "linear")
	} else {
		lcCost.hide(500, "linear")
	}
}
