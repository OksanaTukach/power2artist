$(document).ready(function(){
    selectMultiple();
        
});

function selectMultiple() {
    const selectMultiple = $('select.js-multiple-select')
    if (selectMultiple.length) {
        $('select.js-multiple-select').each(function(){
            let $thisItem = $(this); 
            $thisItem.multipleSelect({
                selectAll: false,
                displayTitle: false,
                onAfterCreate: function () {
                    $thisItem.closest('.js-select-mult').find('.js-selected-list').empty();
                    let $this = $thisItem;
                    let $thisval = $this.val();
                    $thisval.forEach(function (value) {
                        let elem = $this.find('option[value="' + value +'"]');
                        let elemTtext = elem.attr('data-text');
                        let elemVal = elem.attr('value');
                        let block = '<div class="selected-list--item js-close-selected" data-value="' + elemVal +'">'+ elemTtext + '<span></span>';
                        $this.closest('.js-select-mult').find('.js-selected-list').append(block);
                    }); 
                  }
            });
        });
       
        $('select.js-multiple-select').change(function(){
            $(this).closest('.js-select-mult').find('.js-selected-list').empty();
            let $this = $(this);
            let $thisval = $this.val();
            $thisval.forEach(function (value) {
                let elem = $this.find('option[value="' + value +'"]');
                let elemTtext = elem.attr('data-text');
                let elemVal = elem.attr('value');
                let block = '<div class="selected-list--item js-close-selected" data-value="' + elemVal +'">'+ elemTtext + '<span></span>';
                $this.closest('.js-select-mult').find('.js-selected-list').append(block);
            }); 
        })
    }
    $('body').on('click', '.js-close-selected', function(){
        let elemVal = $(this).closest('.selected-list--item').attr('data-value');
        let parent = $(this).closest('.row').find('select.js-multiple-select');
        let parentVal = parent.val();
        parentVal.forEach(function (elem) {
            if (elemVal == elem) {
                parentVal = parentVal.filter(function(item) {
                    return item !== elem
                })   
            }
          });
          $(this).closest('.row').find('select.js-multiple-select').val(parentVal);
          $(this).closest('.row').find('select.js-multiple-select').multipleSelect('refresh');
          $(this).closest('.selected-list--item').remove();
    });  


    let object = {};
    let $fileList = $('.js-doc-list');
    let i;
    let j = 0;
    $('input.js-add-document').on('change', function (e) {
        let $input = e.target;
        for (i = 0; i < $input.files.length; i++, j++) {
          $('<p id="' + j + '">' + $input.files[i].name + '<span></span></p>').appendTo($fileList);
          object[j] = $input.files[i];
        }
    
        fileQuantity(object);
      });
}

function addDocument(){
    $('input.js-add-document').change(function(){
        let docVal = $('input.js-add-document');
        for (var i = 0; i < docVal.get(0).files.length; ++i) {
            var name = docVal.files.name;
            alert("here is a file name: " + name);
          }



        

    })
}


        
