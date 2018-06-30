/**
 * Created by Nazmul on 3/1/2018.
 */

jQuery(document).ready(function($) {

    $('.trigger-form').on('click', function() {
        setTimeout(function() {
            $('#census-form-container').floatingScroll();
        }, 5000);
    });

    $('#inception-year').on('keyup', function() {
        $('.msg-inception-year').text('');
       var establishmentYear = $('#establishment-year').val();
       var inceptionYear = $(this).val();
        establishmentYear = parseInt(establishmentYear);
        inceptionYear = parseInt(inceptionYear);
       var status = false;
       if(!establishmentYear && inceptionYear){
           $('.msg-inception-year').text('Please provide establishment-year first');
           status = true;
       }
        if(!inceptionYear){
            status = false;
        }
       if(establishmentYear > inceptionYear){
            $('.msg-inception-year').text('This field must greater than or equal to establishment-year');
           status = true;
       }
        $('.btnSave').prop("disabled", status);
    });

    var amount_fields = $('#total-assets-amount, #current-capital-amount, #land_factory_buildings_value,' +
        '#yearly-turnover, #last-year-invested-capital, #foreign-res-investment, #last-year-production-raw-materials,' +
        '#last-year-salary-amount, #loan-last-year, #last-year-other-expenses-amount');

    amount_fields.closest('.form-group').append('<div class="in-words text-bold"></div>');

    amount_fields.on('keyup',function () {
        var this_item = $(this),
            this_val = this_item.val(),
            converted_amount = Math.round(this_val * 100000);
        console.log(Math.round(this_val * 100000));

        this_item.closest('.form-group').find('.in-words').text( inWords(converted_amount) );
    });

    $('#loan_received_2016_2017').closest('.input-group').append('<div class="in-words text-bold"></div>');

    $('#loan_received_2016_2017').on('keyup',function () {
        var this_item = $(this),
            this_val = this_item.val(),
            converted_amount = Math.round(this_val * 100000);
        console.log(Math.round(this_val * 100000));

        this_item.closest('.input-group').find('.in-words').text( inWords(converted_amount) );
    });


    /*var select2_control = $('.select');
    selectDropDown = select2_control.select2();
    selectDropDown.on('select2:select', function (e) {
        var event = new Event('change');
        e.target.dispatchEvent(event);
    });

    $('.select-size-xs').select2({
        containerCssClass: 'select-xs'
    });

    $('.select2-sm').select2({
        containerCssClass: 'select2-sm'
    });

    $('.select2-md').select2({
        containerCssClass: 'select2-md'
    });

    $('.select2-lg').select2({
        containerCssClass: 'select2-lg'
    });*/
    // Open the fields onFocus
    // THE ORDER IS IMPORTANT.
    /*function select2Focus() {
        $(this).closest('.select2').prev('select').select2('open');
    }

    select2_control.next('.select2').find('.select2-selection').one('focus', select2Focus).on('blur', function () {
        $(this).one('focus', select2Focus);
    });*/

});