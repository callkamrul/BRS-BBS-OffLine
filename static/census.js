/**
 * JavaScript for Census
 *
 * @since  1.0.0
 */

/**
 * Load Mauza/Mahalla based on Union/Ward.
 * Applicable for Enterprise  Mauza/Mahalla.
 * -------------------------------------------
 */
$("#ward-union-id").on('change', function () {

	$.get('/mauza_mahallah/getMauzaMahallahByUnionWard/' + $(this).val(), function (data) {
		// Success data
		var mauza_mahalla_field = $("#mahallah-id");

		mauza_mahalla_field.empty();
		mauza_mahalla_field.append("<option value=''></option>");
		$.each(data, function (index, subcatObj) {
			mauza_mahalla_field.append("<option value='" + subcatObj.id + "'>" + subcatObj.name + "</option>");
		});
	});

});


/**
 * Load District based on Division.
 * Applicable for Head Office Division.
 * -------------------------------------------
 */
$("#head-office-division").on('change', function () {
	$.ajax({
		dataType: 'json',
		type: "POST",
		url: "/district/getDistrictByDivisionId/" + $(this).val(),
		cache: false,
		success: function (response) {

			var district_field = $("#head-office-district");

			district_field.empty();
			district_field.append("<option value=''></option>");
			if (response != '') {
	            for (i in response) {
	                district_field.append("<option value='" + i + "'>" + response[i] + "</option>");
	            }
	        }

	    }
    });
});


/**
 * Load Thana/Upazila based on District.
 * Applicable for Head Office District.
 * -------------------------------------------
 */
$("#head-office-district").on('change', function () {

    $.get('/thanaupazilla/getThanaUpazillaByDistrict/' + $(this).val(), function (data) {
        // Success data
        var thana_upazila_field = $("#head-office-thana-upz");

        thana_upazila_field.empty();
        thana_upazila_field.append("<option value=''></option>");
        $.each(data, function (index, subcatObj) {
            thana_upazila_field.append("<option value='" + subcatObj.id + "'>" + subcatObj.name + "</option>");
        });
    });

});


/**
 * Load Union/Ward based on Thana/Upazila.
 * Applicable for Head Office Thana/Upazila.
 * -------------------------------------------
 */
$("#head-office-thana-upz").on('change', function () {

    $.get('/unionward/getUnionWardByThanaUpazilla/' + $(this).val(), function (data) {
        // Success data
        var union_ward_field = $("#head-office-ward-union");

        union_ward_field.empty();
        union_ward_field.append("<option value=''></option>");
        $.each(data, function (index, subcatObj) {
            union_ward_field.append("<option value='" + subcatObj.id + "'>" + subcatObj.name + "</option>");
        });
    });

});


/**
 * Load Mauza/Mahalla based on Union/Ward.
 * Applicable for Head Office Union/Ward.
 * -------------------------------------------
 */
$("#head-office-ward-union").on('change', function () {

    $.get('/mauza_mahallah/getMauzaMahallahByUnionWard/' + $(this).val(), function (data) {
        // Success data
        var mauza_mahalla_field = $("#head-office-mauza");

        mauza_mahalla_field.empty();
        mauza_mahalla_field.append("<option value=''></option>");
        $.each(data, function (index, subcatObj) {
            mauza_mahalla_field.append("<option value='" + subcatObj.id + "'>" + subcatObj.name + "</option>");
        });
    });

});

var __usefulFunc = function( trigger, checkVal, dependents ) {

	//dependents.prop('disabled', true);

	trigger.on('change', function() {
		var this_val = $(this).val();
		if( (this_val == checkVal) ) {
			dependents.removeAttr('disabled');
		} else {
			dependents.prop('disabled', true);
			dependents.val('').attr('value', '');
		}
	});

};

var closing_reason_trigger 	  = $("#closing-reason"),
	closing_reason_val        = 13,
	closing_reason_dependents = $("#closing-reason-other");

__usefulFunc( closing_reason_trigger, closing_reason_val, closing_reason_dependents );



$("#unit-type-code").on('change', function () {
	var unit_type_code = $(this).val();
	if(unit_type_code == 2)
	{
		$("#is-under-ent-group").removeAttr('disabled');
		$("#is-under-ent").prop("disabled", true);
		$("#is-under-ent-group-2").prop("disabled", true);
		$("#is-under-ent-group").select2('open');
	}
	else if(unit_type_code == 3)
	{
		$("#is-under-ent").removeAttr('disabled');
		$("#is-under-ent-group-2").removeAttr('disabled');
		$("#is-under-ent").select2('open');

		$("#is-under-ent-group").prop("disabled", true);
	}
	else
	{

		$("#is-under-ent-group").prop("disabled", true);
		$("#unit-mode-code").select2('open');
	}
});

$("#is-under-ent-group").on('change', function () {
	var is_under_ent_group = $(this).val();
	if(is_under_ent_group == 1)
	{
		$("#enterprise-group-id").removeAttr('disabled');
	}else{
		$("#enterprise-group-id").prop("disabled", true);
	}
});

$("#is-under-ent").on('change', function () {
	var is_under_ent = $(this).val();
	if(is_under_ent == 1)
	{
		$("#enterprise").removeAttr('disabled');
	}else{
		$("#enterprise").prop("disabled", true);
	}
});

$("#is-under-ent-group-2").on('change', function () {
	var is_under_ent_group_2 = $(this).val();
	if(is_under_ent_group_2 == 1)
	{
		$("#enterprise-group-id-2").removeAttr('disabled');
	}else{
		$("#enterprise-group-id-2").prop("disabled", true);
	}
});



$("#has-trade-license").on('select2:select', function () {
	var has_trade_license = $(this).val();
	if(has_trade_license == 2)
	{
		//select2
		$("#is-registered").focus();
		$("#is-registered").select2('open');
	}
	else if(has_trade_license == 3)
	{
		//select2
		$("#is-registered").focus();
		$("#is-registered").select2('open');
	}

});

$("#is-registered").on('select2:select', function () {
	var is_registered = $(this).val();
	if(is_registered == 2)
	{
		//select2
		$("#is-under-permission-auth").focus();
		$("#is-under-permission-auth").select2('open');
	}
});

$("#is-under-permission-auth").on('select2:select', function () {
	var is_under_permission_auth = $(this).val();
	if(is_under_permission_auth == 2)
	{
		//select2
		$("#has-environmental-control").focus();
		$("#has-environmental-control").select2('open');
	}
});

$("#has-environmental-control").on('select2:select', function () {
	var has_environmental_control = $(this).val();
	if(has_environmental_control == 2)
	{
		//select2
		$("#has-specialized-zone").focus();
		$("#has-specialized-zone").select2('open');
	}
});

$("#has-specialized-zone").on('select2:select', function () {
	var has_specialized_zone = $(this).val();
	if(has_specialized_zone == 2)
	{
		//select2
		$("#has-membership").focus();
		$("#has-membership").select2('open');
	}
});

$("#has-membership").on('select2:select', function () {
	var has_membership = $(this).val();
	if(has_membership == 2)
	{
		$("#has-chamber-membership").focus();
		$("#has-chamber-membership").select2('open');
	}
});

$("#has-chamber-membership").on('select2:select', function () {
	var has_chamber_membership = $(this).val();
	if(has_chamber_membership == 2)
	{
		$("#establishment-year").focus();
	}
});


$("#unit-current-status").on('select2:select', function () {
	var current_status_of_unit = $(this).val();
	if(current_status_of_unit == 1)
	{
		$("#main-economic-desc").focus();
	}
});

$("#is-import").on('select2:select', function () {
	var is_import = $(this).val();
	if(is_import == 2)
	{
		$("#current-capital-amount").focus();
	}
});

$("#has-foreign-res-investment").on('select2:select', function () {
	var has_foreign_res_investement = $(this).val();
	if(has_foreign_res_investement == 2)
	{
		$("#last-year-production-raw-materials").focus();
	}
});

$("#have-any-loan").on('select2:select', function () {
	var have_any_loan = $(this).val();
	if(have_any_loan == 2)
	{
		$("#have-accounting-account").focus();
		$("#have-accounting-account").select2('open');
	}
});

$("#have-accounting-account").on('select2:select', function () {
	var have_any_loan = $(this).val();
	if(have_any_loan == 2)
	{
		$("#male-owner").focus();
	}
});





/**
 * Set Cookie
 *
 * @param {string} cookieName  Name of the Cookie.
 * @param {mixed} cookieValue  Value to be stored in Cookie.
 * @param {integer} expiryDays Days in number.
 * -------------------------------------------
 */
function setCookie(cookieName, cookieValue, expiryDays) {

	var d = new Date();
	d.setTime( d.getTime() + (expiryDays*24*60*60*1000) );
	var expires = 'expires='+ d.toUTCString();

	document.cookie = cookieName +'='+ cookieValue +';'+ expires +';path=/';

}


/**
 * Get Cookie
 *
 * @param  {string} cookieName Name of the Cookie.
 * @return {mixed}             Content of the Cookie.
 * -------------------------------------------
 */
function getCookie(cookieName) {

	var name      	  = cookieName + '=',
		decodedCookie = decodeURIComponent(document.cookie),
		ca            = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";

}


/**
 * Check whether the cookie exists or not.
 * @param  {string}  cookieName Name of the Cookie.
 * @return {Boolean}            True if exists, false otherwise.
 * -------------------------------------------
 */
function hasCookie(cookieName) {
    var cookie = getCookie(cookieName);

    return (cookie != "") ? true : false;
}


jQuery(document).ready(function($) {

	// -------------------------------------------
	// Floating Scroll (v2.3.3)
	// @link https://github.com/Amphiluke/floating-scroll
	// -------------------------------------------
	$('#census-form-container').floatingScroll();


	// -------------------------------------------
	// Enable Select2
	//
	// Open the fields onFocus to let the user enter
	// data easily.
	//
	// @link https://stackoverflow.com/a/20990013/1743124
	// -------------------------------------------
	var select2_control = $('.select');

	// Initiate Select2
	// On 'Tab' select item @link https://stackoverflow.com/a/33958605/1743124
	select2_control.select2();

	// Mini (Limitless CSS)
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
	});

	// Open the fields onFocus
	// THE ORDER IS IMPORTANT.
	function select2Focus() {
	    $(this).closest('.select2').prev('select').select2('open');
	}

	select2_control.next('.select2').find('.select2-selection').one('focus', select2Focus).on('blur', function () {
	    $(this).one('focus', select2Focus);
	});


	// -------------------------------------------
	// Tooltips
	// Bootstrap tooltips
	// -------------------------------------------
	$('[data-toggle="tooltip"]').tooltip();


	// -------------------------------------------
	// Remember choice
	// Using cookie (see above)
	// -------------------------------------------

	// Census Year
	var census_year_field = $('#census-year');

	if( hasCookie('census_year') ) {
		census_year_field.val(getCookie('census_year')).trigger('change');
	}

	census_year_field.on('change', function() {
		var this_item_val = $(this).val();

		if( hasCookie('census_year') && getCookie('census_year') == this_item_val ) {
			// do nothing
		} else {
			setCookie('census_year', this_item_val, 10); // remember for 10 days
		}
	});

	// Ward/Union
	var union_ward_field = $('#ward-union-id');

	if( hasCookie('ward_union') ) {
		union_ward_field.val(getCookie('ward_union')).trigger('change');
	}

	union_ward_field.on('change', function() {
		var this_item_val = $(this).val();

		if( hasCookie('ward_union') && getCookie('ward_union') == this_item_val ) {
			// do nothing
		} else {
			setCookie('ward_union', this_item_val, 10); // remember for 10 days
		}
	});

	// Mauza
	var mauza_field = $('#mahallah-id');

	if( hasCookie('mauza') ) {
		mauza_field.val(getCookie('mauza')).trigger('change');
	}

	mauza_field.on('change', function() {
		var this_item_val = $(this).val();

		if( hasCookie('mauza') && getCookie('mauza') == this_item_val ) {
			// do nothing
		} else {
			setCookie('mauza', this_item_val, 10); // remember for 10 days
		}
	});


	// -------------------------------------------
	// Force Uppercase
	// Works with .input-uppercase class only.
	// -------------------------------------------
	$('.input-uppercase').on('keyup change', function() {
		this.value = this.value.toLocaleUpperCase();
	});


	// -------------------------------------------
	// Copy Data from Previous related fields.
	// -------------------------------------------
	$('#copy-address-data').on('click', function() {
		$('#head-office-name').val( $('#unit-name').val() );
		$('#head-office-mahallah').val( $('#mahallah-name').val() );
		$('#head-office-house').val( $('#house-name').val() );
		$('#head-office-road').val( $('#road').val() );
		$('#head-office-floor-level').val( $('#floor-level').val() );
		$('#head-office-holding-number').val( $('#holding-number').val() );
		$('#head-office-phone').val( $('#phone').val() );
		$('#head-office-fax').val( $('#fax').val() );
		$('#head-office-email').val( $('#email').val() );
		$('#head-office-website').val( $('#website').val() );

		$('#head-office-division').val( $('#division-id').val() ).trigger('change');
		$('#head-office-district').val( $('#district-id').val() ).trigger('change');
		$('#head-office-thana-upz').val( $('#thana-upz-id').val() ).trigger('change');
		$('#head-office-ward-union').val( $('#ward-union-id').val() ).trigger('change');
		$('#head-office-mauza').val( $('#mahallah-id').val() ).trigger('change');
		$('#head-office-rmo-code').val( $('#rmo-code').val() ).trigger('change');
	});

	// -------------------------------------------
	// Dynamic Repeater
	// -------------------------------------------







    

	// -------------------------------------------
	// Initiate jQuery Validation
	// -------------------------------------------
	var census_form = $('#census-form, #census-edit-form');

	// Validation for open 'year' field.
	// var year_rules_set = {
	// 	number: true,
	// 	minlength: 4,
	// 	maxlength: 4
	// };
	// var year_rules_message = 'It&rsquo;s not a valid year';

	// var number_rules_set = {
	// 	number: true
	// }
	// 	var number_rules_message = 'It&rsquo;s not a valid amount';

	// census_form.validate({
    //     ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
    //     errorClass: 'validation-error-label text-danger small',
    //     successClass: 'validation-valid-label',
    //     highlight: function(element, errorClass) {
    //         $(element).removeClass(errorClass);
    //         $(element).closest('.form-group').addClass('has-error');
    //         $(element).closest('.inner-panel-for-accordion').addClass('has-error');
    //     },
    //     unhighlight: function(element, errorClass) {
    //         $(element).removeClass(errorClass);
    //         $(element).closest('.form-group').removeClass('has-error');
    //         $(element).closest('.inner-panel-for-accordion').removeClass('has-error');
    //     },

    //     onkeyup: function( element, event ) {
    //         $(element).valid();
    //     },

    //     // Different components require proper error label placement
    //     errorPlacement: function(error, element) {

    //         // Styled checkboxes, radios, bootstrap switch
    //         if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
    //             if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
    //                 error.appendTo( element.parent().parent().parent().parent() );
    //             }
    //              else {
    //                 error.appendTo( element.parent().parent().parent().parent().parent() );
    //             }
    //         }

    //         // Unstyled checkboxes, radios
    //         else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
    //             error.appendTo( element.parent().parent().parent() );
    //         }

    //         // Input with icons and Select2
    //         else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
    //             error.appendTo( element.parent() );
    //         }

    //         // Inline checkboxes, radios
    //         else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
    //             error.appendTo( element.parent().parent() );
    //         }

    //         // Input group, styled file input
    //         else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
    //             error.appendTo( element.parent().parent() );
    //         }

    //         else {
    //             error.insertAfter(element);
    //         }
    //     },
    //     rules: {
    //     	provider_nid: {
    //     		exactlengths: [17, 23]
    //     	},
    //     	serial_no_unit: {
    //     		minlength: 3,
	// 			number: true
    //     	},
    //     	head_of_unit_age: {
    //     		accepted_age: [15, 99] // http://stackoverflow.com/a/40872784/1743124
    //     	},
    //     	year_of_establishment: year_rules_set,
    //     	year_of_inception: year_rules_set,
    //     	tmp_closed_reopen_year: year_rules_set,
    //     	tmp_permanently_close_year: year_rules_set,
	// 		current_capital_amount: number_rules_set,
	// 		total_assets_amount:number_rules_set,
	// 		yearly_turnover:number_rules_set,
	// 		last_year_invested_capital:number_rules_set,
	// 		foreign_res_investment:number_rules_set,
	// 		last_year_prod_raw_materials:number_rules_set,
	// 		last_year_salary_amount:number_rules_set,
	// 		last_year_other_expenses_sum:number_rules_set,
	// 		loan_last_year:number_rules_set,
	// 		loan_received_2016_2017:number_rules_set,
	// 		male_owner:number_rules_set,
	// 		female_owner:number_rules_set,
	// 		male_unpaid_worker:number_rules_set,
	// 		female_unpaid_worker:number_rules_set,
	// 		male_fulltime_worker:number_rules_set,
	// 		female_fulltime_worker:number_rules_set,
	// 		male_pertime_worker:number_rules_set,
	// 		female_pertime_worker:number_rules_set,
	// 		male_casual_worker:number_rules_set,
	// 		female_casual_worker:number_rules_set,
	// 		male_seasonal_worker:number_rules_set,
	// 		female_seasonal_worker:number_rules_set,
	// 		male_foreign_worker:number_rules_set,
	// 		female_foreign_worker:number_rules_set,
	// 		trade_license_number:number_rules_set
    //     },
    //     messages: {
    //     	serial_no_unit: {
    //     		minlength: 'Minimum 3 digit is required',
	// 			number: '3 digit are numbers only'
    //     	},
    //     	year_of_establishment: year_rules_message,
    //     	year_of_inception: year_rules_message,
    //     	tmp_closed_reopen_year: year_rules_message,
    //     	tmp_permanently_close_year: year_rules_message,
	// 		current_capital_amount:number_rules_message,
	// 		total_assets_amount:number_rules_message,
	// 		yearly_turnover:number_rules_message,
	// 		last_year_invested_capital:number_rules_message,
	// 		foreign_res_investment:number_rules_message,
	// 		last_year_prod_raw_materials:number_rules_message,
	// 		last_year_salary_amount:number_rules_message,
	// 		last_year_other_expenses_sum:number_rules_message,
	// 		loan_last_year:number_rules_message,
	// 		loan_received_2016_2017:number_rules_message,
	// 		male_owner:number_rules_message,
	// 		female_owner:number_rules_message,
	// 		male_unpaid_worker:number_rules_message,
	// 		female_unpaid_worker:number_rules_message,
	// 		male_fulltime_worker:number_rules_message,
	// 		female_fulltime_worker:number_rules_message,
	// 		male_pertime_worker:number_rules_message,
	// 		female_pertime_worker:number_rules_message,
	// 		male_casual_worker:number_rules_message,
	// 		female_casual_worker:number_rules_message,
	// 		male_seasonal_worker:number_rules_message,
	// 		female_seasonal_worker:number_rules_message,
	// 		male_foreign_worker:number_rules_message,
	// 		female_foreign_worker:number_rules_message,
	// 		trade_license_number:number_rules_message
    //     }
    // });

    // // override jquery validate plugin defaults
    // $.validator.setDefaults({
    //     highlight: function(element) {
    //         $(element).closest('.form-group').addClass('has-error');
    //     },
    //     unhighlight: function(element) {
    //         $(element).closest('.form-group').removeClass('has-error');
    //     }
    // });


    /**
     * Custom method for jQuery Validation for NID
     * To verify exact length of characters - 17 and 23 accepted
     *
     * http://stackoverflow.com/a/40872784/1743124
     */
    // jQuery.validator.addMethod("exactlengths", function(value, element, params) {
    //     return this.optional(element) || (value.length == params[0] || value.length == params[1]);
    // }, jQuery.validator.format("Only {0} or {1} characters are accepted"));

    /**
     * Custom method for jQuery Validation.
     * To verify age between {1} and {2}.
     * http://stackoverflow.com/a/40872784/1743124
     */
    // jQuery.validator.addMethod( 'accepted_age', function(value, element, params) {
    //     return this.optional(element) || (value >= params[0] && value <= params[1]);
    // }, jQuery.validator.format('Age between {0} and {1} is accepted') );

});
