"use strict";

$(document).ready(function () {
    // --- Инициализация стилизации полей input ---
    if ($('.styler').length) {
        $('.styler').styler({
            onFormStyled: function onFormStyled() {
                selectLoadImages();
            }
        });
    } // --- Инициализация вызова popup (ajax) ---


    $('.js-ajax-popup').magnificPopup({
        type: 'ajax',
        callbacks: {
            ajaxContentAdded: function ajaxContentAdded() {
                if ($('.styler').length) $('.styler').styler({
                    onFormStyled: function onFormStyled() {
                        selectLoadImages();
                        fileListcontroll();
                    }
                });
                datePicker();
                dateRange();
                datePickerCal();
                keyup_form();
                click_submit();
            }
        }
    }); // --- Инициализация вызова popup (inline) ---

    $('.js-inline-popup').magnificPopup({
        type: 'inline',
        callbacks: {
            beforeOpen: function beforeOpen() {
                // console.log('Start of popup initialization');
            }
        }
    });
    datePicker();
    dateRange();
    fileListcontroll();
    keyup_form();
    click_submit();
}); // ------ Event's listners ------
// --- Переключение режима отображения пароля (показать) ---

$(document).on('mousedown', '.password-control', function () {
    if ($(this).siblings('input').attr('type') == 'password') {
        $(this).addClass('view');
        $(this).siblings('input').attr('type', 'text');
    }
}); // --- Переключение иконки флага страны ---

$(document).on('change', '.input-country select', function () {
    var $thisSelected = $(this).find(':selected'),
        $thisMask = $(this).attr('data-value'),
        $thisBlock = $(this).closest('.input-country'),
        $thisPlaceholder = $thisSelected.attr('data-placeholder'),
        $thisImg = $thisSelected.attr('data-img'),
        $this = $thisBlock.find('input[data-mask]'),
        $thisHidden = $thisBlock.find('.input--hidden')

    $this.val('');
    $this.inputmask('remove');
    $thisSelected.hasClass('no-mask') ? $this.attr({
        'placeholder': '_______',
        'data-mask': '',
        'data-placeholder': ''
    }) : ($thisBlock.find('.jq-selectbox__select-text').css('background-image', 'url(' + $thisImg + ')'), $this.attr({
        'placeholder': $thisPlaceholder,
        'data-mask': $thisMask,
        'data-placeholder': $thisPlaceholder
    }), inputMask(), inputMaskRequired());

    $thisHidden.val('');
}); // --- Удаление файлов из списка ---

$(document).on('click', '.input-file-list span', function () {
    delete object[$(this).closest('p').attr('id')];
    $(this).closest('p').remove();
    fileQuantity(object);
}); // ------ Event's listners end ------
// ------ Function's ------
// --- Вывод текста ошибка ---

function popupForm_error($this, count) {
    if (count >= 1) {
        $this.closest('form').find('.fv__error').addClass('error');
        return false;
    } else {
        $this.closest('form').find('.fv__error').removeClass('error');
    }
} // --- Проверка ввода текстового поля ---


function required_input() {
    $(document).on('keyup', '.required--input input', function () {
        if ($(this).closest('div').hasClass('required--email')) {
            return false;
        } else {
            var input = $(this).val();

            if ($(this).attr('data-length')) {
                var inputLenght = $(this).attr('data-length') - 1;
            } else {
                var inputLenght = 3;
            }

            if (input.length > inputLenght) {
                $(this).closest('div').removeClass('error error-online').addClass('succes');
            } else {
                $(this).closest('div').removeClass('succes').addClass('error-online');
            }
        }
    });
} // --- Проверка ввода textarea ---


function required_textarea() {
    $(document).on('keyup', '.required--textarea textarea', function () {
        var textarea = $(this).val(),
            textareaLenght;

        if ($(this).attr('data-length')) {
            textareaLenght = $(this).attr('data-length') - 1;
        } else {
            textareaLenght = 3;
        }

        if (textarea.length > textareaLenght) {
            $(this).closest('div').removeClass('error error-online').addClass('succes');
        } else {
            $(this).closest('div').removeClass('succes').addClass('error-online');
        }
    });
} // --- Запрет ввода букв ---


function num_inset() {
    $(document).on("change keyup input click", '.num--inset input', function () {
        if (this.value.match(/[^0-9.^+]/g)) {
            this.value = this.value.replace(/[^0-9.,]/g, '').replace(',', '.');
        }
    });
} // --- Проверка ввода пароля (первый шаг) ---


var firstPasswordSucces = 0,
    firstPasswordValue = 0,
    secondPasswordSucces = 0,
    secondPasswordValue = 0;

function first_password() {
    $(document).on("change keyup input click", '.password-first input', function () {
        var mainBlock = $(this).closest('.required--password'),
            innerBlock = $(this).closest('div'),
            secondPassword = mainBlock.find('.password-second'); // minlength = $(this).attr('minlength'),
        // maxlength = $(this).attr('maxlength');

        if (secondPasswordValue > 0) {
            if (this.value.length >= 4 && this.value.length <= 8 && this.value === secondPasswordValue) {
                firstPasswordSucces = true;
                secondPasswordSucces = true;
                mainBlock.removeClass('error error-online').addClass('succes');
                secondPassword.removeClass('error error-online not-equally').addClass('succes');
                innerBlock.removeClass('error error-online not-equally').addClass('succes');
            } else if (this.value.length >= 4 && this.value.length <= 8 && this.value !== secondPasswordValue) {
                firstPasswordSucces = false;
                innerBlock.removeClass('succes error error-online').addClass('not-equally');
                mainBlock.removeClass('succes').addClass('error-online');
            } else if (this.value.length < 4 || this.value.length > 8) {
                firstPasswordSucces = false;
                innerBlock.removeClass('succes error not-equally').addClass('error-online');
                mainBlock.removeClass('succes').addClass('error-online');
            } else {
            }
        } else {
            if (this.value.length >= 4 && this.value.length <= 8) {
                firstPasswordSucces = true;
                innerBlock.removeClass('error error-online').addClass('succes');
                secondPassword.addClass('show');
                mainBlock.removeClass('succes').addClass('error-online');
            } else {
                firstPasswordSucces = false;
                innerBlock.removeClass('succes').addClass('error-online');
                secondPassword.removeClass('show');
                mainBlock.removeClass('succes').addClass('error-online');
            }
        }

        firstPasswordValue = this.value;
    });
} // --- Проверка ввода пароля (второй шаг) ---


function second_password() {
    $(document).on("change keyup input click", '.password-second input', function () {
        var mainBlock = $(this).closest('.required--password'),
            innerBlock = $(this).closest('div');

        if (this.value.length >= 4 && this.value.length <= 8 && this.value === firstPasswordValue) {
            secondPasswordSucces = true;
            firstPasswordSucces = true;
            mainBlock.find('.password-first').removeClass('error error-online not-equally').addClass('succes');
            innerBlock.removeClass('error error-online not-equally').addClass('succes');
            mainBlock.removeClass('error error-online').addClass('succes');
        } else if (this.value.length >= 4 && this.value.length <= 8 && this.value !== firstPasswordValue) {
            secondPasswordSucces = false;
            innerBlock.removeClass('succes error error-online').addClass('not-equally');
            mainBlock.removeClass('error succes').addClass('error-online');
        } else if (this.value.length < 4 || this.value.length > 8) {
            secondPasswordSucces = false;
            innerBlock.removeClass('error succes not-equally').addClass('error-online');
            mainBlock.removeClass('succes').addClass('error-online');
        } else {
        }

        secondPasswordValue = this.value;
    });
} // --- Инит маски (если поле НЕ является обязательным) ---


function inputMask() {
    $('.input--mask input[data-mask]').each(function () {
        var $this = $(this);
        var $thisHidden = $this.closest('.input--mask').find('.input--hidden');
        var $thisMask = $(this).attr('data-mask');
        var $thisPlaceholder = $(this).attr('data-placeholder');

        if ($thisPlaceholder == '' || !$thisPlaceholder) {
            $this.inputmask("" + $thisMask + "", {
                clearMaskOnLostFocus: true,
                "clearIncomplete": true,
                onincomplete: function oncomplete() {
                    $thisHidden.val('')
                },
            });
        } else {
            if ($this.closest('.input--mask').hasClass('date')) {
                $this.inputmask($thisMask);
                return;
            }

            $this.inputmask("" + $thisMask + "", {
                clearMaskOnLostFocus: true,
                "clearIncomplete": true,
                placeholder: "" + $thisPlaceholder + "",
                onincomplete: function oncomplete() {
                    $thisHidden.val('')
                },
            });
        }
    });
} // --- Инит маски (если поле является обязательным) ---


function inputMaskRequired() {
    $('.input--mask--required input[data-mask]').each(function () {

        var $this = $(this),
            $thisDiv = $(this).closest('.input--mask--required'),
            $thisHidden = $thisDiv.find('.input--hidden'),
            $thisMask = $(this).attr('data-mask'),
            $thisPlaceholder = $(this).attr('data-placeholder');

        if ($thisPlaceholder == '' || !$thisPlaceholder) {
            $this.inputmask("" + $thisMask + "", {
                clearMaskOnLostFocus: true,
                "clearIncomplete": true,
                oncomplete: function oncomplete() {
                    $thisDiv.removeClass('error error-online').addClass('succes');
                },
                oncleared: function oncleared() {
                    $thisDiv.removeClass('succes').addClass('error-online');
                    $thisHidden.val('')
                },
                onincomplete: function oncomplete() {
                    $thisDiv.removeClass('succes').addClass('error-online');
                    $thisHidden.val('')
                },
                onKeyValidation: function onKeyValidation(key, result) {
                }
            });
        } else {

            if ($this.closest('.input--mask').hasClass('date')) {
                $this.inputmask($thisMask);
                return;
            }

            $this.inputmask("" + $thisMask + "", {

                placeholder: "" + $thisPlaceholder + "",
                clearMaskOnLostFocus: true,
                "clearIncomplete": true,
                oncomplete: function oncomplete() {
                    $thisDiv.removeClass('error error-online').addClass('succes');
                },
                oncleared: function oncleared() {
                    $thisDiv.removeClass('succes').addClass('error-online');
                    $thisHidden.val('')
                },
                onincomplete: function oncomplete() {
                    $thisDiv.removeClass('succes').addClass('error-online');
                    $thisHidden.val('')
                },
                onKeyValidation: function onKeyValidation(key, result) {
                }
            });
        }
    });
} // --- Проверка ввода необязательного поля с маской ---


function maskInputControl() {
    $('.mask-input-control input').each(function () {
        var $this = $(this),
            $thisDiv = $(this).closest('.mask-input-control'),
            $thisMask = $(this).attr('data-mask'),
            $thisPlaceholder = $(this).attr('data-placeholder');

        if ($thisPlaceholder == '' || !$thisPlaceholder) {
            $this.inputmask("" + $thisMask + "", {
                oncomplete: function oncomplete() {
                    $thisDiv.removeClass('error error-online').addClass('succes');
                },
                oncleared: function oncleared() {
                    $thisDiv.removeClass('error error-online succes');
                },
                onincomplete: function oncomplete() {
                    if ($(this).val() !== "") $thisDiv.removeClass('succes').addClass('error-online'); else return;
                },
                onKeyValidation: function onKeyValidation(key, result) {
                }
            });
        } else {
            if ($thisDiv.hasClass('date')) {
                $this.inputmask($thisMask);
                return;
            }

            $this.inputmask("" + $thisMask + "", {
                placeholder: "" + $thisPlaceholder + "",
                oncomplete: function oncomplete() {
                    $thisDiv.removeClass('error error-online').addClass('succes');
                },
                oncleared: function oncleared() {
                    $thisDiv.removeClass('error error-online succes');
                },
                onincomplete: function oncomplete() {
                    if ($(this).val() !== "") $thisDiv.removeClass('succes').addClass('error-online'); else return;
                },
                onKeyValidation: function onKeyValidation(key, result) {
                }
            });
        }
    });
} // --- Проверка datepicker при вводе данных ---


function required_date() {
    $(document).on('change', '.input--mask--required.required--date input', function () {
        var thisDateBlock = $(this).closest('.required--date');

        if ($(this).val() != '') {
            thisDateBlock.removeClass('error error-online').addClass('succes');

        } else {
            thisDateBlock.remove('succes').addClass('error-online');
        }
    });
} // ---- Проверка ввода поля емайл ---


function required_email() {
    $(document).on('keyup', '.required--email input', function () {
        var email = $(this).val(),
            emailDiv = $(this).closest('div');

        if (email.length >= 0 && (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1) {
            emailDiv.removeClass('succes').addClass('error-online');
        } else if (email == '') {
            emailDiv.removeClass('error error-online').addClass('succes');
        } else {
            emailDiv.removeClass('error error-online').addClass('succes');
        }
    });
} // --- Проверка ввода поля емайл ---


function emailInputControl() {
    $('.email-input-control input').keyup(function () {
        var email = $(this).val(),
            emailDiv = $(this).closest('div');

        if (email.length > 0 && (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1 && !$(this).closest('div').hasClass('error-online')) {
            emailDiv.addClass('error-online required--email').append('<span class="email-input-error-text">Неверный email!</span>');
        } else if (email.length > 0 && (email.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1 && $(this).closest('div').hasClass('error-online')) return; else if (email.length === 0) {
            emailDiv.removeClass('error-online error required--email succes');
            emailDiv.find('.email-input-error-text').remove();
        } else {
            emailDiv.removeClass('error-online error required--email').addClass('succes');
            emailDiv.find('.email-input-error-text').remove();
        }
    });
} // --- Проверка изминения радио баттона ---


function radioChange() {
    $(document).on('change', '.radio--required :radio', function () {
        var radiolDiv = $(this).closest('.radio--required');
        radiolDiv.removeClass('error').addClass('succes');
    });
} // --- Проверка изминения селекта ---


function selectChange() {
    $(document).on('change', '.required--select select', function () {
        var val = $(this).val(),
            selectDiv = $(this).closest('.required--select');

        if (typeof val == 'object') {
            let lengthVal = val.length;
            if (val == 0) {
                selectDiv.removeClass('succes').addClass('error');
                return false;
            } else {
                selectDiv.removeClass('error').addClass('succes');
            }

        } else {
            if (val === 'Not selected') {
                selectDiv.removeClass('succes').addClass('error');
                return false;
            } else {
                selectDiv.removeClass('error').addClass('succes');
            }
        }
    });
}

function selectChangeMuliple() {
    $(document).on('change', '.required--select--multiple', function () {
        let sels = $(this).siblings('.js-selected-list').find('.selected-list--item');
        if (!sels.length) {
            $(this).removeClass('succes').addClass('error');
        } else {
            $(this).removeClass('error').addClass('succes');
        }
    })
}


// --- Проверка изминения одного чекбокса ---


function checkChange() {
    $(document).on('change', '.required--check :checkbox', function () {
        var val = $(this).prop('checked'),
            checkDiv = $(this).closest('.required--check');

        if (val) {
            checkDiv.removeClass('error').addClass('succes');
            $(this).closest('label').siblings().find(':checkbox').prop('checked', false);
        } else {
            checkDiv.removeClass('succes').addClass('error');
        }

        checkDiv.find('.styler').trigger('refresh');
    });
} // --- Проверка изминения множественного чебокса ---


function checkMoreChange() {
    $(document).on('change', '.check-more :checkbox', function () {
        var val = $(this).prop('checked'),
            checkDiv = $(this).closest('.check-more');

        if (val) {
            checkDiv.removeClass('error').addClass('succes');
        } else if (!$('.check-more :checked').length) {
            checkDiv.removeClass('succes').addClass('error');
        }
    });
} // --- Проверка изминения input file ---


function fileChange() {
    $(document).on('change', '.required--file input[type="file"]', function () {

        var val = $(this).val(),
            fileDiv = $(this).closest('.required--file');

        if (val === "") {
            fileDiv.removeClass('succes').addClass('error');
        } else {
            fileDiv.removeClass('error').addClass('succes');
        }
    });
} // --- Проверка изминения input file multiple ---


function fileChangeMultiple() {
    $(document).on('change', '.required--file--multiple input[type="file"]', function () {
        var fileDiv = $(this).closest('.required--file--multiple'),
            val = fileDiv.find('.input-file-list p').length,
            max = fileDiv.attr('data-max');
        if (val > max || val == 0) {
            fileDiv.removeClass('succes').addClass('error');
        } else {
            fileDiv.removeClass('error').addClass('succes');
        }
    });
} // --- Датапикер ---


function datePicker() {
    $('.date-picker').each(function () {
        var $this = $(this);
        var dataLang = $(this).attr('data-lang');
        var dayNames, dayNamesShort, dayNamesMin, monthNames, monthNamesShort;
        var img = $(this).attr('data-src');
        var template = $(this).attr('data-template');
        $.getJSON("./temp/data.json", function (data) {
            if (dataLang == 'ru') {
                var lang = data.ru;
            }

            if (dataLang == 'en') {
                var lang = data.en;
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
                changeMonth: true,
                changeYear: true,
                yearRange: '1980:c+1',
                minDate: new Date(1980, 10 - 1, 25),
                showOn: "button",
                dateFormat: template,
                buttonImage: img,
                buttonImageOnly: true,
                dayNames: dayNames,
                dayNamesShort: dayNamesShort,
                monthNames: monthNames,
                dayNamesMin: dayNamesMin,
                monthNamesShort: monthNamesShort,
                showOtherMonths: true,
                afterShow: function afterShow(inst) {
                    $('.ui-datepicker-title select').styler();
                },
            }).click(function () {
                $(this).datepicker('show');
            });
        });
    });
} // --- Пользовательское событие для для datepicker ---


$(function () {
    if ($('.date-picker').length) {
        $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;

        $.datepicker._updateDatepicker = function (inst) {
            $.datepicker._updateDatepicker_original(inst);

            var afterShow = this._get(inst, 'afterShow');

            if (afterShow) afterShow.apply(inst.input ? inst.input[0] : null);
        };
    }
});

function dateRange() {

    $('.date_range').each(function () {
        var $this = $(this);
        var dataLang = $(this).attr('data-lang');
        var dayNames, dayNamesShort, dayNamesMin, monthNames, monthNamesShort;
        var img = $(this).attr('data-src');
        var template = $(this).attr('data-template');
        $.getJSON("./temp/data.json", function (data) {
            if (dataLang == 'ru') {
                var lang = data.ru;
            }

            if (dataLang == 'en') {
                var lang = data.en;
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
                range: 'period',
                firstDay: 1,
                changeMonth: true,
                changeYear: true,
                yearRange: '1980:c+1',
                minDate: new Date(1980, 10 - 1, 25),
                showOn: "button",
                dateFormat: template,
                buttonImage: img,
                buttonImageOnly: true,
                dayNames: dayNames,
                dayNamesShort: dayNamesShort,
                monthNames: monthNames,
                dayNamesMin: dayNamesMin,
                monthNamesShort: monthNamesShort,
                showOtherMonths: true,
                onSelect: function (dateText, inst, extensionRange) {
                    // extensionRange - объект расширения
                    $('#' + inst.id).val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
                },
                afterShow: function afterShow(inst) {
                    $('.ui-datepicker-title select').styler();
                }
            }).click(function () {
                $(this).datepicker('show');
            });
        });
    });
}

// --- Загрузка иконок стран в select ---
function selectLoadImages() {
    let inputCountrySelect = $('.input-country select');
    if (inputCountrySelect.length) {

        inputCountrySelect.each(function () {
            $(this).find('option').each(function () {
                let inputCountryDiv = $(this).closest('.input-country');
                inputCountryDiv.find('.jq-selectbox__dropdown ul li').eq($(this).index()).css('background-image', `url(" ${$(this).attr('data-img')} ")`);
                inputCountryDiv.find('.jq-selectbox__select-text').css('background-image', inputCountryDiv.find('.selected.sel').css('background-image'));
            })
        })
    }
} // --- Удаление выбранных файлов из input-file ---


var $inputFile = $('.required--file--multiple input[type="file"]'),
    $fileList = $('.input-file-list'),
    $input,
    object = {},
    i,
    j = 0;

function fileListcontroll() {
    $inputFile.styler({
        fileBrowse: '',
        filePlaceholder: '',
        fileNumber: ''
    });
    $inputFile.on('change', function (e) {
        $input = e.target;

        for (i = 0; i < $input.files.length; i++, j++) {
            // console.log($input.files[i].name.length)

            $('<p id="' + j + '"><span class="name" title="' + $input.files[i].name + '">' + $input.files[i].name + '</span><span></span></p>').appendTo($fileList);

            // if($input.files[i].name.length > 30) {
            //   var nameFile = $input.files[i].name.substr(0, 30) + '...';
            //   $('<p id="' + j + '">' + nameFile + '<span></span><span class="full-name">' + $input.files[i].name + '</span></p>').appendTo($fileList);
            // } else {
            //   $('<p id="' + j + '">' + $input.files[i].name + '<span></span></p>').appendTo($fileList);
            // }

            object[j] = $input.files[i];
        }

        fileQuantity(object);
    });
} // Сбор номера телефона код + номер
// Select


$(document).on('change', 'select.js-value', function () {
    var block = $(this).closest('.js-phone'),
        select = block.find('select'),
        input = block.find('.input--main'),
        result = block.find('.input--hidden');
    var $thisSelected = $(this).find(':selected'),
        $thisPlaceholder = $thisSelected.attr('data-placeholder'),
        $thisMask = $thisSelected.attr('data-value'),
        $thisBlock = $(this).closest('.js-phone'),
        $thisInput = $thisBlock.find('input[data-mask]');
    $thisInput.val('');
    $(this).closest('.input--mask--required').removeClass('succes').addClass('error-online');
    $thisInput.inputmask('remove');

    if ($thisSelected.hasClass('no-mask')) {
        block.removeClass('input--mask--required error error-online');

        if ($thisBlock.hasClass('required')) {
            block.addClass('required--input');
        }

        $thisInput.attr({
            'placeholder': '_______',
            'data-mask': '',
            'data-placeholder': ''
        });
    } else {
        block.removeClass('required--input');

        if ($thisBlock.hasClass('required')) {
            block.addClass('input--mask--required');
        } else {
            block.addClass('input--mask');
        }

        $thisInput.attr({
            'placeholder': $thisPlaceholder,
            'data-mask': $thisMask,
            'data-placeholder': $thisPlaceholder
        });
        inputMask();
        inputMaskRequired();
    }
    result.val('');
    // var resultVal = select.val() + ' ' + input.val();
    // var resultValRepl = resultVal.replace(/[^+()\d\-\s]/g, '');
    // result.val(resultValRepl);
    // console.log(result.val())
    // ($thisSelected.hasClass('no-mask')) ? (
    // 	block.removeClass('input--mask--required error error-online').addClass('required--input'),
    // 	$thisInput.attr({
    // 		'placeholder': '_______',
    // 		'data-mask': '',
    // 		'data-placeholder': ''
    // 	})
    // ) : (
    // 		block.removeClass('required--input').addClass('input--mask--required'),
    // 		$thisInput.attr({
    // 			'placeholder': $thisPlaceholder,
    // 			'data-mask': $thisMask,
    // 			'data-placeholder': $thisPlaceholder
    // 		}),
    // 		inputMask(),
    // 		inputMaskRequired()
    // 	)
}); // Input

$(document).on('input', 'input.js-value', function () {
    var block = $(this).closest('.js-phone'),
        select = block.find('select'),
        input = block.find('.input--main'),
        result = block.find('.input--hidden');
    var resultVal = select.val() + ' ' + input.val();
    var resultValRepl = resultVal.replace(/[^+()\d\-\s]/g, '');
    result.val(resultValRepl.trim());
}); // --- Подсчет количества выбранных файлов ---

function fileQuantity(object) {
    var length = $('.input-file-list p').length;

    if (Object.keys(object).length > $('.required--file--multiple').attr('data-max') || Object.keys(object).length == 0) {
        $('.required--file--multiple').removeClass('succes').addClass('error');
    } else {
        $('.required--file--multiple').removeClass('error').addClass('succes');
    }
} // --- Функция сабмита ---


function click_submit() {
    $('body').on('click', '.required--sbmt', function (e) {
        var $this = $(this),
            $thisForm = $this.closest('form'),
            Errorcount = 0; // --- Проверка полей с паролем

        var passwordRequired = $thisForm.find('.required--password'),
            passwordFirst = passwordRequired.find('.password-first'),
            passwordSecond = passwordRequired.find('.password-second');

        if (passwordRequired.length) {
            if (passwordFirst.hasClass('succes') && passwordSecond.hasClass('succes')) {
                passwordRequired.removeClass('error').addClass('succes');
            } else {
                passwordRequired.removeClass('succes error-online').addClass('error');
                Errorcount++;
            }
        } // --- Проверка инпутов на пустоту ---


        var inputRequired = $thisForm.find('.required--input input');

        if (inputRequired.length) {
            inputRequired.each(function () {
                var inputValue = $(this).val();
                var $this = $(this);

                if (inputValue == '') {
                    $this.closest('div').removeClass('succes').addClass('error');
                    Errorcount++;
                } else if (!inputValue == '' && $this.closest('div').hasClass('error') && !$this.closest('div').hasClass('error-online')) {
                    $this.closest('div').removeClass('error').addClass('succes');
                }
            });
        } // --- Проверка textarea на пустоту ---


        var inputTextarea = $thisForm.find('.required--textarea textarea');

        if (inputTextarea.length) {
            inputTextarea.each(function () {
                var inputValue = $(this).val();
                var $this = $(this);

                if (inputValue == '') {
                    $this.closest('div').removeClass('succes').addClass('error');
                    Errorcount++;
                } else if (!inputValue == '' && $this.closest('div').hasClass('error') && !$this.closest('div').hasClass('error-online')) {
                    $this.closest('div').removeClass('error').addClass('succes');
                }
            });
        } // --- Проверка маски  ---


        var maskReq = $thisForm.find('.input--mask--required');
        maskReq.each(function () {
            var val = $(this).find('input').val();
            if (!val == '' && !$(this).hasClass('error') && !$(this).hasClass('error-online')) {
                $(this).addClass('succes')
            } else if (!$(this).hasClass('succes')) {
                $(this).removeClass('succes').addClass('error');
                $(this).find('.input--hidden').val('')
                Errorcount++;

                // console.log($(this).find('.input--hidden').val())
            }
        }); // --- Проверка маски  ---

        var maskReqTemp = $thisForm.find('.mask-input-control');
        maskReqTemp.each(function () {
            if ($(this).hasClass('error') || $(this).hasClass('error-online')) {
                Errorcount++;
            }
        }); // --- Проверка поля с email ---

        var emailtRequired = $thisForm.find('.required--email input');

        if (emailtRequired.length) {
            emailtRequired.each(function () {
                var inputValue = $(this).val();
                var $this = $(this);

                if (inputValue.length >= 0 && (inputValue.match(/.+?\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1) {
                    $this.closest('div').removeClass('succes').addClass('error');
                    Errorcount++;
                } else if (inputValue == '') {
                    $this.closest('div').removeClass('succes').addClass('error');
                    Errorcount++;
                } else if (!inputValue == '' && $this.closest('div').hasClass('error') && !$this.closest('div').hasClass('error-online')) {
                    $this.closest('div').removeClass('error').addClass('succes');
                }
            });
        } // --- Проверка одиночного чекбокса ---


        var checkRequired = $thisForm.find('.required--check');

        if (checkRequired.length) {
            var checked = 0;
            checkRequired.each(function () {
                $(this).find(':checkbox').each(function () {
                    if ($(this).prop('checked')) {
                        checked++;
                    }
                });

                if (checked > 0) {
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                    Errorcount++;
                }
            });
        } // --- Проверка нескольких чекбоксов ---


        var checkMore = $thisForm.find('.check-more');

        if (checkMore.length) {
            var _checked = 0;
            checkMore.each(function () {
                $(this).find(':checkbox').each(function () {
                    if ($(this).prop('checked')) {
                        _checked++;
                    }
                });

                if (_checked != 0) {
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                    Errorcount++;
                }
            });
        } // --- Проверка радиобатона ---


        var radioReq = $thisForm.find('.radio--required');

        if (radioReq.length) {
            var _checked2 = 0;
            radioReq.each(function () {
                $(this).find(':radio').each(function () {
                    if ($(this).prop('checked')) {
                        _checked2++;
                    }
                });

                if (_checked2 > 0) {
                    $(this).removeClass('error error-online').addClass('succes');
                } else {
                    $(this).removeClass('succes').addClass('error');
                    Errorcount++;
                }
            });
        } // --- Проверка селекта (одиночный) ---


        var selectReq = $thisForm.find('.required--select');

        if (selectReq.length) {
            selectReq.each(function () {
                let select = $(this).find('select');
                let selectAttr = select.attr('multiple');
                let selectVal = select.val();
                var sel = $(this).find('select :selected');

                if (selectAttr == 'multiple') {
                    if (!selectVal.length) {
                        $(this).removeClass('succes').addClass('error');
                        Errorcount++;
                    } else {
                        $(this).removeClass('error').addClass('succes');
                    }
                } else {
                    if (sel.val() === 'Not selected') {
                        sel.closest('.required--select').removeClass('succes').addClass('error');
                        Errorcount++;
                    } else {
                        sel.closest('.required--select').removeClass('error').addClass('succes');
                    }
                }

            });
        } // --- Проверка селекта (multiple) ---


        var selectReqMultiple = $thisForm.find('.required--select--multiple');

        if (selectReqMultiple.length) {
            selectReqMultiple.each(function () {
                var sels = $(this).siblings('.js-selected-list').find('.selected-list--item');


                if (sels.length == '') {
                    $(this).removeClass('succes').addClass('error');
                    Errorcount++;
                } else {
                    $(this).removeClass('error').addClass('succes');
                }
            });
        }


        // --- Проверка файла (одниночный) ---


        var fileReq = $thisForm.find('.required--file');

        if (fileReq.length) {
            fileReq.each(function () {
                var file = $(this).find('input');

                if (file.val() == '') {
                    file.closest('.required--file').removeClass('succes').addClass('error');
                    Errorcount++;
                } else {
                    file.closest('.required--file').removeClass('error').addClass('succes');
                }
            });
        } // --- Проверка файла (multiple) ---


        var fileReqMultiple = $thisForm.find('.required--file--multiple'),
            maxLength = fileReqMultiple.attr('data-max');

        if (fileReqMultiple.length) {
            fileReqMultiple.each(function () {
                var files = $(this).find('.input-file-list p');

                if (files.length == '' || files.length > maxLength) {
                    fileReqMultiple.removeClass('succes').addClass('error');
                    Errorcount++;
                } else {
                    fileReqMultiple.removeClass('error').addClass('succes');
                }
            });
        } // --- Проверка date-picker ---


        var dataPicker = $thisForm.find('.required--date');
        dataPicker.each(function () {
            var val = $(this).find('input').val(),
                $thisDate = $(this).closest('.required--date');
            if (val == '') {
                $thisDate.removeClass('succes').addClass('error');
                Errorcount++;
            } else if (!val == '' && $thisDate.hasClass('error') && !$thisDate.hasClass('error-online')) {
                $thisDate.removeClass('error error-online').addClass('succes');
            }
        }); // --- Вывод ошибки вверху ---

        popupForm_error($this, Errorcount);
        // console.log(Errorcount); // --- Отпралять или нет ---

        if (Errorcount > 0) {
            if ($(this).closest('form').length) {
                //Если до верха
                // let pos = $(this).closest('form').find('.error').offset().top
                //Если до инпута
                var pos = $(this).closest('form').find('.error').offset().top;
                $([document.documentElement, document.body]).animate({
                    scrollTop: pos - 100
                }, 1000);
                return false;
            }

            return false;
        } else {// alert('Отправлено')
            // $thisForm.submit();
        }
    });
} // --- Функция общая функция для keyUp ---


function keyup_form() {
    num_inset();
    required_email();
    required_input();
    required_textarea();
    required_date();
    first_password();
    second_password();
    inputMask();
    inputMaskRequired();
    maskInputControl();
    radioChange();
    selectChange();
    selectChangeMuliple()
    checkChange();
    checkMoreChange();
    fileChange();
    emailInputControl();
} // ------ Function's end ------
