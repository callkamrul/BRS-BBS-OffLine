/**
 * Created by Nazmul on 3/1/2018.
 */

jQuery(document).ready(function($) {

    $('.trigger-form').on('click', function() {
        setTimeout(function() {
            $('#census-form-container').floatingScroll();
        }, 5000);
    });



    /*setTimeout(function(){
        document.getElementById('hideMe').className = 'waa';
    }, 5000);*/

    /*$('#inception-year').on('keyup', function() {
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
    });*/

    var amount_fields = $('#total-assets-amount, #current-capital-amount, #land_factory_buildings_value,' +
        '#yearly-turnover, #last-year-invested-capital, #foreign-res-investment, #last-year-production-raw-materials,' +
        '#last-year-salary-amount, #loan-last-year, #last-year-other-expenses-amount');

    amount_fields.closest('.form-group').append('<div class="in-words text-bold"></div>');

    amount_fields.on('keyup',function () {
        var this_item = $(this),
            this_val = this_item.val(),
            converted_amount = Math.round(this_val * 100000);

        this_item.closest('.form-group').find('.in-words').text( inWords(converted_amount) );
    });

    $('#loan_received_2016_2017').closest('.input-group').append('<div class="in-words text-bold"></div>');

    $('#loan_received_2016_2017').on('keyup',function () {
        var this_item = $(this),
            this_val = this_item.val(),
            converted_amount = Math.round(this_val * 100000);

        this_item.closest('.input-group').find('.in-words').text( inWords(converted_amount) );
    });

    // Prevent string input to number field
    amount_fields.keypress(function(event){
        var ew = event.which;
        if(48 <= ew && ew <= 57)
            return true;
        return false;
    });

    $('#loan_received_2016_2017').keypress(function(event){
        var ew = event.which;
        if(48 <= ew && ew <= 57)
            return true;
        return false;
    });


    // -------------------------------------------
    // Initiate jQuery Validation
    // -------------------------------------------
    var census_form = $('#census-form');

    // Validation for open 'year' field.
    var year_rules_set = {
        number: true,
        minlength: 4,
        maxlength: 4
    };
    var year_rules_message = 'It&rsquo;s not a valid year';

    var number_rules_set = {
        number: true
    }
    var decimal_point_rules_set = {
        three_decimal_places: true
    }
    var number_rules_message = 'It&rsquo;s not a valid amount';

    census_form.validate({
        ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
        errorClass: 'validation-error-label text-danger small',
        successClass: 'validation-valid-label',
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
            $(element).closest('.form-group').addClass('has-error');
            $(element).closest('.inner-panel-for-accordion').addClass('has-error');
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
            $(element).closest('.form-group').removeClass('has-error');
            $(element).closest('.inner-panel-for-accordion').removeClass('has-error');
        },

        onkeyup: function( element, event ) {
            $(element).valid();
        },

        // Different components require proper error label placement
        errorPlacement: function(error, element) {

            // Styled checkboxes, radios, bootstrap switch
            if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
                if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                    error.appendTo( element.parent().parent().parent().parent() );
                }
                else {
                    error.appendTo( element.parent().parent().parent().parent().parent() );
                }
            }

            // Unstyled checkboxes, radios
            else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                error.appendTo( element.parent().parent().parent() );
            }

            // Input with icons and Select2
            else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
                error.appendTo( element.parent() );
            }

            // Inline checkboxes, radios
            else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                error.appendTo( element.parent().parent() );
            }

            // Input group, styled file input
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo( element.parent().parent() );
            }

            else {
                error.insertAfter(element);
            }
        },
        rules: {
            product_description2: {
                maxlength: 300
            },
            product_description1: {
                maxlength: 300
            },
            product_description3: {
                maxlength: 300
            },
            product_description4: {
                maxlength: 300
            },
            product_description5: {
                maxlength: 300
            },
            product_description6: {
                maxlength: 300
            },
            service_description1: {
                maxlength: 300
            },
            service_description2: {
                maxlength: 300
            },
            service_description3: {
                maxlength: 300
            },
            service_description4: {
                maxlength: 300
            },
            service_description5: {
                maxlength: 300
            },
            service_description6: {
                maxlength: 300
            },
            name_of_unit: {
                maxlength: 255
            },
            name_of_mahallah: {
                maxlength: 255
            },
            name_of_house: {
                maxlength: 255
            },
            no_name_of_road: {
                maxlength: 255
            },
            floor_level: {
                maxlength: 100
            },
            holiding_no: {
                maxlength: 100
            },
            phone: {
                maxlength: 60
            },
            fax: {
                maxlength: 60
            },
            email: {
                maxlength: 150
            },
            website: {
                maxlength: 150
            },
            main_economic_act_desc: {
                maxlength: 1000
            },
            minor_economic_act_desc1: {
                maxlength: 300
            },
            minor_economic_act_desc2: {
                maxlength: 300
            },
            minor_economic_act_desc3: {
                maxlength: 300
            },
            supporting_economic_act_desc1: {
                maxlength: 300
            },
            supporting_economic_act_desc2: {
                maxlength: 300
            },
            export_product_services_desc1: {
                maxlength: 500
            },
            export_product_services_desc2: {
                maxlength: 500
            },
            export_product_services_desc3: {
                maxlength: 500
            },
            collector_name: {
                maxlength: 255
            },
            supervisor_name: {
                maxlength: 255
            },
            supervising_officer_name: {
                maxlength: 255
            },
            provider_name: {
                maxlength: 255
            },
            /*provider_nid: {
                exactlengths: [10, 13, 17]
            },
            collector_nid: {
                exactlengths: [10, 13, 17]
            },*/
            serial_no_unit: {
                minlength: 3,
                number: true
            },
            head_of_unit_age: {
                accepted_age: [15, 99] // http://stackoverflow.com/a/40872784/1743124
            },
            year_of_inception: {
                greaterOrEqual: '#establishment-year',
                number: true,
                minlength: 4,
                maxlength: 4
            },
            year_of_establishment: year_rules_set,
            //year_of_inception: year_rules_set,
            tmp_closed_reopen_year: year_rules_set,
            tmp_permanently_close_year: year_rules_set,
            //current_capital_amount: number_rules_set,
            current_capital_amount:{
                number: true,
                three_decimal_places: true,
                lessThanOrEqual: '#total-assets-amount',
                sumOfTwoFieldlessThanOther: '#land-factory-buildings-value',
            },
            total_assets_amount:{
                number: true,
                three_decimal_places: true,
            },
            land_factory_buildings_value:{
                number: true,
                three_decimal_places: true,
                lessThan: '#total-assets-amount',
                sumOfTwoFieldlessThanOther: '#current-capital-amount',
            },
            yearly_turnover:{
                number: true,
                three_decimal_places: true,
            },
            last_year_salary_amount:{
                number: true,
                three_decimal_places: true,
            },
            foreign_res_investment:{
                number: true,
                three_decimal_places: true,
            },
            last_year_invested_capital:{
                number: true,
                three_decimal_places: true,
            },
            last_year_prod_raw_materials:{
                number: true,
                three_decimal_places: true,
            },
            last_year_other_expenses_sum:{
                number: true,
                three_decimal_places: true,
            },
            loan_last_year:{
                number: true,
                three_decimal_places: true,
            },
            loan_received_2016_2017:{
                number: true,
                three_decimal_places: true,
                lessThanOrEqual: '#loan-last-year'
            },
            male_owner:number_rules_set,
            female_owner:number_rules_set,
            male_unpaid_worker:number_rules_set,
            female_unpaid_worker:number_rules_set,
            male_fulltime_worker:number_rules_set,
            female_fulltime_worker:number_rules_set,
            male_pertime_worker:number_rules_set,
            female_pertime_worker:number_rules_set,
            male_casual_worker:number_rules_set,
            female_casual_worker:number_rules_set,
            male_seasonal_worker:number_rules_set,
            female_seasonal_worker:number_rules_set,
            // male_foreign_worker:number_rules_set,
            male_foreign_worker:{
                number: true,
                isForeignWorkersLessThanOrEqual: '#male-owner,#male-unpaid-worker,#male-fulltime-worker,#male-parttime-worker,#male-casual-worker,#male-seasonal-worker'
            },

            female_foreign_worker:{
                number: true,
                isForeignWorkersLessThanOrEqual: '#female-owner,#female-unpaid-worker,#female-fulltime-worker,#female-parttime-worker,#female-casual-worker,#female-seasonal-worker'
            },
            //female_foreign_worker:number_rules_set,
            //trade_license_number:number_rules_set
        },
        messages: {
            serial_no_unit: {
                minlength: 'Minimum 3 digit is required',
                number: '3 digit are numbers only'
            },
            year_of_establishment: year_rules_message,
            //year_of_inception: year_rules_message,
            year_of_inception: {
                number: 'It&rsquo;s not a valid year',
                minlength: 'It&rsquo;s not a valid year',
                maxlength: 'It&rsquo;s not a valid year',
                greaterOrEqual: 'This field must greater than or equal to establishment-year',
            },
            tmp_closed_reopen_year: year_rules_message,
            tmp_permanently_close_year: year_rules_message,
            //current_capital_amount:number_rules_message,
            //total_assets_amount:number_rules_message,
            current_capital_amount: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message,
                lessThan: 'This amount must be less than total asset amount in Question-26',
                sumOfTwoFieldlessThanOther: 'Sum of current-capital-amount and total amount of land, factory-buildings must be equal or less than total assets amount',
            },
            total_assets_amount: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            yearly_turnover: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            last_year_invested_capital: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            foreign_res_investment: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            land_factory_buildings_value: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message,
                lessThan: 'This amount must be less than total asset amount in Question-26',
                sumOfTwoFieldlessThanOther: 'Sum of current-capital-amount and total amount of land, factory-buildings must be equal or less than total assets amount',
            },
            //yearly_turnover:number_rules_message,
            //last_year_invested_capital:number_rules_message,
            //foreign_res_investment:number_rules_message,
            //last_year_prod_raw_materials:number_rules_message,
            last_year_prod_raw_materials: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            last_year_salary_amount: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            last_year_other_expenses_sum: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            loan_last_year: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message
            },
            loan_received_2016_2017: {
                three_decimal_places: 'You must include three decimal places',
                number: number_rules_message,
                lessThanOrEqual: 'This amount must be less than or equal to total loan in Question-33.2'
            },
            //last_year_salary_amount:number_rules_message,
            //last_year_other_expenses_sum:number_rules_message,
            //loan_last_year:number_rules_message,
            //loan_received_2016_2017:number_rules_message,
            male_owner:number_rules_message,
            female_owner:number_rules_message,
            male_unpaid_worker:number_rules_message,
            female_unpaid_worker:number_rules_message,
            male_fulltime_worker:number_rules_message,
            female_fulltime_worker:number_rules_message,
            male_pertime_worker:number_rules_message,
            female_pertime_worker:number_rules_message,
            male_casual_worker:number_rules_message,
            female_casual_worker:number_rules_message,
            male_seasonal_worker:number_rules_message,
            female_seasonal_worker:number_rules_message,
            //male_foreign_worker:number_rules_message,

            male_foreign_worker: {
                number: number_rules_message,
                isForeignWorkersLessThanOrEqual: 'This number must be less than or equal to total male employee in Question-35'
            },

            female_foreign_worker: {
                number: number_rules_message,
                isForeignWorkersLessThanOrEqual: 'This number must be less than or equal to total female employee in Question-35'
            },

            //female_foreign_worker:number_rules_message,
            //trade_license_number:number_rules_message
        }
    });

    // override jquery validate plugin defaults
    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });


    /**
     * Custom method for jQuery Validation for NID
     * To verify exact length of characters - 17 and 23 accepted
     *
     * http://stackoverflow.com/a/40872784/1743124
     */
    jQuery.validator.addMethod("exactlengths", function(value, element, params) {
        return this.optional(element) || (value.length == params[0] || value.length == params[1] || value.length == params[2]);
    }, jQuery.validator.format("Only {0} or {1} or {2} characters are accepted"));

    /**
     * Custom method for jQuery Validation.
     * To verify age between {1} and {2}.
     * http://stackoverflow.com/a/40872784/1743124
     */
    jQuery.validator.addMethod( 'accepted_age', function(value, element, params) {
        return this.optional(element) || (value >= params[0] && value <= params[1]);
    }, jQuery.validator.format('Age between {0} and {1} is accepted') );

    jQuery.validator.addMethod("three_decimal_places", function (value, element) {
        //return this.optional(element) || /^\d+(\.\d{0,3})?$/i.test(value);
        return this.optional(element) || /^\d{0,11}(\.\d{0,3})?$/i.test(value);
    }, "You must include three decimal places");

    $.validator.addMethod("greaterOrEqual", function (value, element, param) {
        var $min = $(param);
        min = parseFloat($min.val());
        if(!min && !value){
            return true;
        }
        if(!value){
            return true;
        }
        return parseFloat(value) >= parseFloat($min.val());
    }, "This field must be greater than other");

    $.validator.addMethod("lessThan", function (value, element, param) {
        var $max = $(param);
        var max = parseFloat($max.val());
        if(!max && !value){
            return true;
        }
        if(!value){
            return true;
        }
        return parseFloat(value) < max;
    }, "This field must be less than other");

    $.validator.addMethod("lessThanOrEqual", function (value, element, param) {
        var $max = $(param);
        var max = parseFloat($max.val());
        if(!max && !value){
            return true;
        }
        if(!value){
            return true;
        }
        return parseFloat(value) <= max;
    }, "This field must be less than or equal to other");

    $.validator.addMethod("sumOfTwoFieldlessThanOther", function (value, element, param) {
        var $max = $(param);
        var a = parseFloat($max.val());
        var b = parseFloat(value);
        if(!a) a = 0;
        if(!b) b = 0;
        var sum = a+b
        if(!value){
            return true;
        }
        return parseFloat(sum) <= parseFloat($('#total-assets-amount').val());
    }, "Sum of current-capital-amount and total amount of land, factory-buildings must be equal or less than total assets amount");


    $.validator.addMethod("isForeignWorkersLessThanOrEqual", function (value, element, param) {
        if(!value){
            return true;
        }
        var paramArr = param.split(",");
        var totalEmployee = 0;
        for (i = 0; i < paramArr.length; i++) {
            var n = $(paramArr[i]).val();
            if(n){
                totalEmployee += parseFloat(n);
            }
        }
        return parseFloat(value) <= totalEmployee;
    }, "This field must be less than or equal to other");


});