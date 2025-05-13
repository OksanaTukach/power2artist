$(window).on("load", function () {
	var time = $(".js-timer").attr("data-finish");
	console.log(time)
	timer(time);
});


var start;


function timer(f) {

	console.log("Функция - " + f);

	if (typeof f != 'undefined') {
		if (f.length != 0 && f) {
			var date = new Date(f.replace(/ /g, "T"));
			var f_time = Date.parse(date);


			// clearTimeout(start);
			function timer_go() {
				clearInterval(start);

				var n_time = Date.now();

				var diff = f_time - n_time;


				if (diff <= 0) return false;
				var left = diff % 1000;

				// console.log(diff % 1000 )

				//секунды
				diff = Math.floor(diff / 1000);
				var s = diff % 60;

				// console.log(s);
				if (s < 10) {
					$(".js-seconds_1").html(0);
					$(".js-seconds_2").html(s);
				} else {
					$(".js-seconds_1").html(Math.floor(s / 10));
					$(".js-seconds_2").html(s % 10);
				}
				//минуты
				diff = Math.floor(diff / 60);
				var m = diff % 60;
				if (m < 10) {
					$(".js-minutes_1").html(0);
					$(".js-minutes_2").html(m);
				} else {
					$(".js-minutes_1").html(Math.floor(m / 10));
					$(".js-minutes_2").html(m % 10);
				}
				//часы
				diff = Math.floor(diff / 60);
				var h = diff % 24;
				if (h < 10) {
					$(".js-hours_1").html(0);
					$(".js-hours_2").html(h);
				} else {
					$(".js-hours_1").html(Math.floor(h / 10));
					$(".js-hours_2").html(h % 10);
				}
				//дни
				var d = Math.floor(diff / 24);
				if (d < 10 && d != 0) {
					$(".js-days_1").html(0);
					$(".js-days_2").html(d);
				}
				else if (d == 0) {
					$('.js-timer_section').each(function () {
						if ($(this).attr('data-type') == 'days') {
							$(this).hide();
						}
					})
				}
				else {
					$(".js-days_1").html(Math.floor(d / 10));
					$(".js-days_2").html(d % 10);
				}
				start = setInterval(timer_go, left);
			}
			setTimeout(timer_go, 0);
		}
	}
}



