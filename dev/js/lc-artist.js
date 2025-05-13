$(document).ready(function(){
	datePickerCal();
	
})


function datePickerCal() {
	var dates = ["10-04-2021","12-05-2021","13-06-2021"];
	const datepicker = $('.js-datepicker')
	if (datepicker.length) {
		datepicker.each(function () {
			let $this = $(this);
			let dataLang = $(this).attr('data-lang');
			let dayNames, dayNamesShort, dayNamesMin, monthNames, monthNamesShort;
			let template = $(this).attr('data-template');

			$.getJSON("./temp/data.json", function (data) {

				let lang = null;

				if (dataLang == 'ru') {
					lang = data.ru;
				}
				if (dataLang == 'en') {
					lang = data.en;
				}

				for (var item in lang) {
					if (lang[item].dayNames) {
						dayNames = lang[item].dayNames;
					}
					if (lang[item].dayNamesShort) {
						dayNamesShort = lang[item].dayNamesShort;
					}
					if (lang[item].dayNamesMin) {
						dayNamesMin = lang[item].dayNamesMin;
					}
					if (lang[item].monthNames) {
						monthNames = lang[item].monthNames;
					}
					if (lang[item].monthNamesShort) {
						monthNamesShort = lang[item].monthNamesShort;
					}
				}
			}).done(function () {
				$this.datepicker({
					firstDay: 1,
					yearRange: '1980:c+1',
					minDate: new Date(1980, 10 - 1, 25),
					dateFormat: template,
					dayNames: dayNames,
					dayNamesShort: dayNamesShort,
					monthNames: monthNames,
					dayNamesMin: dayNamesMin,
					monthNamesShort: monthNamesShort,
					currentText: "Now",
					onSelect: function (dateText, value) {
						console.log(dateText)
						console.log(value)
					},
					beforeShowDay: function( date ) {
						var formattedDate = $.datepicker.formatDate('dd-mm-yy', date);
						if(dates.indexOf(formattedDate) === -1){
							return [true, '', ''];
						}
						else{
							return [true, 'highlight', dates];
						}
					}
				})
			})
		});
	}
}
