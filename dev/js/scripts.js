$(document).ready(function(){
	const width = $(window).width();
	const height = $(window).height();
	// Высота бокового меню для скрола 
	heightSidebar(); 
	heightMP();
	svg4everybody();

	// Перемещение элементов в мобильной версии из header в sidebar  
	let adminPanel = $('#panel').html();
	if (adminPanel) {
		$('.header, main').addClass('_admin')
	}
	if(width < 991){
		$('.js-header-lc').appendTo($('.js-sidebar-lc'))
		$('.js-header-btn').appendTo($('.js-sidebar-btn'))
		if (width < 601) {
			$('.js-header-menu ul').appendTo($('.js-mobile-maim-menu'))
		}
		$('body').on('click', '.js-open-more', function (e) {
			e.preventDefault();
			$(this).siblings('.js-list-more').addClass('open')
		})
		$('body').on('click', '.js-close-list-more', function (e) {
			e.preventDefault();
			$(this).closest('.js-list-more').removeClass('open')
		})
	
	}

	
	if (width < 991) {
		const reglamentDownload = $('.js-reglament-download')
		if (reglamentDownload.length) {
			reglamentDownload.appendTo('.js-reglament-download-mob')
		}
	}

	// Открытие мобильного меню 
	$('body').on('click', '.js-open-menu', function (){
		$(this).siblings('.sidebar-menu').find('.js-sidebar-menu--list').addClass('open')
		
	})
	$('body').on('click', '.js-close-sidebar-menuList ', function (){
		$(this).closest('.js-sidebar-menu--list').removeClass('open')
	})

	
	// ленивая загрузка картинок 
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		load_delay: 100
	});

	// для анимации формы на главной странице
	const heightForm = $('.js-main-form').height() / 2;
	const formContainer = $('.js-main-item-container');
	formContainer.css('--main-height-form', heightForm + 'px')


	$('body').on('click', '.js-open-reglamentMenu', function (){
		$(this).toggleClass('open').closest('.js-reglament-menu').toggleClass('open');

	})
	

	if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /rv:10.0/i.test(navigator.userAgent)) {

		//Добавить класс ie в боди
		document.body.className = "ie";
		//Перенаправить на другую страницу
		window.location = '/ie.html';

	}


	//Клик в не блока
	// $(document).mouseup(function (e){
	// 	var div = $(БЛОК);
	// 	if (!div.is(e.target)
	// 		&& div.has(e.target).length === 0) {
	// 		div.removeClass('open');
	// 	}
	// });

	// ajax загрузка
	$('body').on('click', '.ajax-form', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        var mainClass = $(this).attr('data-class');
        $.magnificPopup.open({
            type: 'ajax',
            items: {
                src: url,
            },
            overflowY: 'scroll',
            mainClass: mainClass,
            callbacks: {
                ajaxContentAdded: function ajaxContentAdded() {
                    if ($('.styler').length) {
                        $('.styler').styler();
                    }
                    $('body').on('click', '.js-check-gps' , function () {

                       let val = $(this).find('input').prop('checked');

                       if(val){
                           $('.js-check-gps__wrp').addClass('__disabled');
                       }
                       else{
                           $('.js-check-gps__wrp').removeClass('__disabled');
                       }


                    });

                }
            }
        });
    });
	$('label.disabled').closest('li').removeClass('selected')
	$('body').on('click', '.js-select-mult', function (){
		$('label.disabled').closest('li').removeClass('selected')
	})



	if($('.js-select2').length) {
		$('.js-select2').select2();
	}
	if($('.styler').length){
		$('.styler').styler();
	}
	// mCustomScrollbar поключение
	if($(".js-scroll-more-items").length){
		if(width < 991){
			$(".js-scroll-more-items").mCustomScrollbar();
		}
		if(width > 991){
			$(".js-sidebar-menu--list").mCustomScrollbar();
			$(".js-list-more").mCustomScrollbar();

		}
	}
	
	
	$(".js-sidebar-menu--list").mouseenter(function() {
		$(this).addClass('blur')
	});
	$(".js-sidebar-menu--list").mouseleave(function() {
		$(this).removeClass('blur')
	});

	// открытие мобильного меню 
	$('body').on('click', '.js-header-burger', function() {
		$(this).toggleClass('open');
		$(this).closest('.header').siblings('.sidebar').toggleClass('open');
		$(this).closest('body').toggleClass('no-scroll')
	});

	$('body').on('click', '.js-dropdown-btn', function(e) {
		e.preventDefault();
		$(this).closest('.js-dropdown').toggleClass('open');
		$(this).closest('.js-dropdown').siblings('.open').removeClass('open')
	
	});



	
	$('body').on('change', '.selectImg select', function () {
        selectLoadImages();
    })

	$('body').on('click', '.js-card-list__item .js-card-list__name', function () {
        $(this).closest('.js-card-list__item').toggleClass('active');
        $(this).siblings('.js-content').slideToggle(300);
    });
});


$(window).resize(function () {

	let width = $(window).width();
	let height = $(window).height();
	heightMP();
	heightSidebar();
	if(width > 991){
		$(".js-sidebar-menu--list").mCustomScrollbar();
	}
	else{
	}

	if(width < 991){
		$('.js-header-lc').appendTo($('.js-sidebar-lc'))
		$('.js-header-btn').appendTo($('.js-sidebar-btn'))
		$('.header-lang').appendTo($('.header-top'))
		if (width < 601) {
			$('.js-header-menu ul').appendTo($('.js-mobile-maim-menu'))
		}
		
	}

});


function paralax(elem, vertical, horizontal) {

	if (elem.length) {
		var elementX = 0,
			elementY = 0,
			elementW = 0,
			elementH = 0,
			mouseX = 0,
			mouseY = 0;
		$(document).mousemove(function (e) {
			var position = elem.offset(),
				obj = elem;
			elementX = position.left;
			elementY = position.top;
			elementW = obj.width();
			elementH = obj.height();
			var halfW = elementW / 2;
			var halfH = elementH / 2;
			mouseX = (e.pageX - elementX - halfW) / halfW;
			mouseY = (e.pageY - elementY - halfH) / halfH;
			mouseX = Math.round(mouseX * 100) / 100;
			mouseY = Math.round(mouseY * 100) / 100;

			elem.css({
				"transform": "translateY(" + mouseY * vertical + "px)  translateX(" + mouseX * horizontal + "px) ",
				"-webkit-transform": "translateY(" + mouseY * vertical  + "px) translateX(" + mouseX * horizontal + "px) ",
				"-ms-transform": "translateY(" + mouseY * vertical/ + "px) translateX(" + mouseX * horizontal + "px) ",
				"-o-transform": "translateY(" + mouseY * vertical  + "px) translateX(" + mouseX * horizontal + "px) ",
				"-moz-transform": "translateY(" + mouseY * vertical + "px) translateX(" + mouseX * horizontal + "px) "
			});
		});
	}
}
function heightSidebar() {
	let width = $(window).width();
	let heightScreen = window.innerHeight;
	const heightHeader = $('.header').height();
	const heightSidebarLogo = $('.sidebar-logo').height();
	const heightSidebarLc = $('.sidebar-lc').height();
	const heightSidebarBtn = $('.sidebar-btn').height();
	const heightSidebarMainMenu = $('.sidebar-main-menu').height();
	const heightSidebarFooter = $('.sidebar-menu--footer').height();

	const heightsidebarTab = heightScreen - heightHeader;
	const heightsidebarDesk = heightScreen - heightSidebarFooter - heightSidebarLogo - 30;
	const sidebarMenu = $('.js-sidebar-menu--list');
	document.documentElement.style.setProperty('--screen-height', heightScreen + 'px');
	if(width > 991){
		sidebarMenu.css('--sidebar-height',heightsidebarDesk + 'px');
	}
	else{
		sidebarMenu.css('--sidebar-height',heightsidebarTab + 'px');
	}
}


// function selectLoadImages() {

//     var inputCountrySelect = $('.selectImg select');

//     if (inputCountrySelect.length) {
//         inputCountrySelect.each(function () {
//             $(this).find('option').each(function () {
//                 var inputCountryDiv = $(this).closest('.selectImg');
//                 var bg = $(this).attr('data-img');
//                 inputCountryDiv.find('.jq-selectbox__dropdown ul li').eq($(this).index()).css('background-image', "url(" + bg + ")");
//                 inputCountryDiv.find('.jq-selectbox__select-text').css('background-image', inputCountryDiv.find('.selected.sel').css('background-image'));
//             });
//         });
//     }
// }

function heightMP(){
	let heightScreen = window.innerHeight;
	let heightHeader = $('.header').height();
	let heightMP = heightScreen - heightHeader;
	document.documentElement.style.setProperty('--screen-heightMP', heightMP + 'px');
	setTimeout(function(){
		let heightHeader = $('.header').height();
		document.documentElement.style.setProperty('--header-height', heightHeader + 'px');
	},10)
}








AOS.init();
