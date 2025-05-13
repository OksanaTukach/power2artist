$(document).ready(function(){
    const width = $(window).width();
    // Высота главной страницы без header 


    if(width > 991) {
		$(".js-sidebar-menu--list").mCustomScrollbar();
		$(".js-main-item").mouseenter(function() {
			if ($(this).hasClass('no-active')) {

			} else {
				$(".js-main-item").removeClass('active');
				$(".js-main-item").removeClass('animate-show');
				$(this).removeClass('animate-show');
				$(this).removeClass('animate-hide');
				$(this).addClass('animate-show');
				setTimeout(function(){
					$(".js-main-item").removeClass('animate-show');
				},250)
				
				$(this).addClass('active');
			}
			
		});
	}
	else {
		$('body').on('click', '.js-main-item', function() {
			$(".js-main-item").removeClass('active');
			$(this).addClass('active');
		});
		$('body').on('click', '.js-main-item--close', function(event) {
			event.stopPropagation();
			$(this).closest('.active').removeClass('active');
		});
	}

})

