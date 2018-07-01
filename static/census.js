/**
 * JavaScript for Census
 *
 * @since  1.0.0
 */
/*
var __usefulFunc = function( trigger, checkVal, dependents, value_type ) {

    //dependents.prop('disabled', true);

    trigger.on('change', function() {
        var this_val = $(this).val();
        if( (this_val == checkVal) ) {
            dependents.removeAttr('disabled');
        } else {
            dependents.prop('disabled', true);
            if(value_type =='checkbox'){
                dependents.select2('open');
            }else{
                dependents.val('').attr('value', '');
            }


        }
    });

};*/

var closing_reason_trigger 	  = $("#closing-reason"),
    closing_reason_val        = 13,
    closing_reason_dependents = $("#closing-reason-other"),
    value_type = 'checkbox';


// __usefulFunc( closing_reason_trigger, closing_reason_val, closing_reason_dependents, value_type  );

//25.1 go to 25.3

//25.3 is no then go to 25.5

$("#is-export-product-services").on('change', function () {
    var is_export_product_services = $(this).val();
    if (is_export_product_services == 1) {

        $("#export_product_services1").removeAttr('disabled');
        $("#export_product_services_desc1").removeAttr('disabled');

        $("#export_product_services2").removeAttr('disabled');
        $("#export_product_services_desc2").removeAttr('disabled');

        $("#export_product_services3").removeAttr('disabled');
        $("#export_product_services_desc3").removeAttr('disabled');

    }else{
        $("#export_product_services1").val('');
        $("#export_product_services1").prop("disabled", true);

        $("#export_product_services_desc1").val('');
        $("#export_product_services_desc1").prop("disabled", true);

        $("#export_product_services2").val('');
        $("#export_product_services2").prop("disabled", true);

        $("#export_product_services_desc2").val('');
        $("#export_product_services_desc2").prop("disabled", true);

        $("#export_product_services3").val('');
        $("#export_product_services3").prop("disabled", true);

        $("#export_product_services_desc3").val('');
        $("#export_product_services_desc3").prop("disabled", true);

        $("#is-import").select2('open');
    }
});

//25.5 is no then go to 26
$("#is-import").on('change', function () {
    var is_import = $(this).val();
    if (is_import == 1) {

        $("#import-irc-code").removeAttr('disabled');

        $("#import_product_services1").removeAttr('disabled');
        $("#import_product_services_desc1").removeAttr('disabled');

        $("#import_product_services2").removeAttr('disabled');
        $("#import_product_services_desc2").removeAttr('disabled');

        $("#import_product_services3").removeAttr('disabled');
        $("#import_product_services_desc3").removeAttr('disabled');

    }else{

        $("#import-irc-code").val('');
        $("#import-irc-code").prop("disabled", true);

        $("#import_product_services1").val('');
        $("#import_product_services1").prop("disabled", true);

        $("#import_product_services_desc1").val('');
        $("#import_product_services_desc1").prop("disabled", true);

        $("#import_product_services2").val('');
        $("#import_product_services2").prop("disabled", true);

        $("#import_product_services_desc2").val('');
        $("#import_product_services_desc2").prop("disabled", true);

        $("#import_product_services3").val('');
        $("#import_product_services3").prop("disabled", true);

        $("#import_product_services_desc3").val('');
        $("#import_product_services_desc3").prop("disabled", true);

        //$("#total-assets-amount").val('').attr('value', '');
    }
});

var is_import = $("#has-foreign-res-investment").val();
if (is_import == 2) {
    $("#foreign-res-investment").val('');
    $("#foreign-res-investment").prop("disabled", true);
}

$("#has-foreign-res-investment").on('change', function () {
    var is_import = $(this).val();
    if (is_import == 1) {

        $("#foreign-res-investment").removeAttr('disabled');

    }else{

        $("#foreign-res-investment").val('');
        $("#foreign-res-investment").prop("disabled", true);
    }
});


/*var closing_reason_trigger 	  = $("#is-export"),
 closing_reason_val        = 2,
 closing_reason_dependents = $("#is-export-product-services"),
 value_type = 'checkbox';*/

//__usefulFunc( closing_reason_trigger, closing_reason_val, closing_reason_dependents, value_type );

var reason_of_close_code = $("#closing-reason").val();
if(reason_of_close_code == 13) {
    $("#closing-reason-other").removeAttr('disabled');
}

$("#closing-reason").on('change', function () {
    var reason_of_close_code = $(this).val();
    if(reason_of_close_code == 13)
    {
        $("#closing-reason-other").removeAttr('disabled');
    }else{
        $("#closing-reason-other").val('');
        $("#closing-reason-other").prop("disabled", true);
    }
});


var has_membership = $("#has-membership").val();
if(has_membership == 1)
{
    $(".membership-auth").removeAttr('disabled');
    $("#membership-number").removeAttr('disabled');
}else{
    $(".membership-auth").prop("disabled", true);
    $("#membership-number").prop("disabled", true);
}

$("#has-membership").on('change', function () {
    var has_membership = $(this).val();
    if(has_membership == 1)
    {
        $(".membership-auth").removeAttr('disabled');
        $("#membership-number").removeAttr('disabled');
    }else{
        $(".membership-auth").prop("disabled", true);
        $("#membership-number").prop("disabled", true);
    }
});

var has_chamber_membership = $("#has-chamber-membership").val();
if(has_chamber_membership == 1)
{
    $("#chamber-name").removeAttr('disabled');
    $("#chamber-membership-number").removeAttr('disabled');
}else{
    $("#chamber-name").prop("disabled", true);
    $("#chamber-membership-number").prop("disabled", true);
}
$("#has-chamber-membership").on('change', function () {
    var has_chamber_membership = $(this).val();
    if(has_chamber_membership == 1)
    {
        $("#chamber-name").removeAttr('disabled');
        $("#chamber-membership-number").removeAttr('disabled');
    }else{
        $("#chamber-name").prop("disabled", true);
        $("#chamber-membership-number").prop("disabled", true);
    }
});


jQuery(document).ready(function($) {

    $('.trigger-form').on('click', function() {
        setTimeout(function() {
            $('#census-form-container').floatingScroll();
        }, 5000);
    });

    // Convert number to words
    var amount_fields = $('#total-assets-amount, #current-capital-amount, #land-factory-buildings-value,' +
        '#yearly-turnover, #last-year-invested-capital, #foreign-res-investment, #last-year-production-raw-materials,' +
        '#last-year-salary-amount, #loan-last-year, #last-year-other-expenses-amount, #loan-received-2016-2017');

    amount_fields.closest('.form-group').append('<div class="in-words text-bold"></div>');

    amount_fields.on('keyup',function () {
        var this_item = $(this),
            this_val = this_item.val(),
            converted_amount = Math.round(this_val * 100000);

        if(this_val == '.'){
            this_item.val('0.');
        }
        if(this_val != '.'){
            this_item.closest('.form-group').find('.in-words').text( inWords(converted_amount) );
        }

    });

    // -------------------------------------------
    // Floating Scroll (v2.3.3)
    // @link https://github.com/Amphiluke/floating-scroll
    // -------------------------------------------
   // $('#census-form-container').floatingScroll();

    // -------------------------------------------
    // Enable Select2
    //
    // Open the fields onFocus to let the user enter
    // data easily.
    //
    // @link https://stackoverflow.com/a/20990013/1743124
    // -------------------------------------------
    /*var select2_control = $('.select2-control');

    // Initiate Select2
    // On 'Tab' select item @link https://stackoverflow.com/a/33958605/1743124
    select2_control.select2({
        placeholder: "Select",
        allowClear: true
    });

    // Mini (Limitless CSS)
    $('.select-size-xs').select2({
        containerCssClass: 'select-xs',
        placeholder: "Select",
        allowClear: true
    });

    $('.select2-sm').select2({
        containerCssClass: 'select2-sm',
        placeholder: "Select",
        allowClear: true
    });

    $('.select2-md').select2({
        containerCssClass: 'select2-md',
        placeholder: "Select",
        allowClear: true
    });

    $('.select2-lg').select2({
        containerCssClass: 'select2-lg',
        placeholder: "Select",
        allowClear: true
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


    var haveLoan = $("#have-any-loan").val();
    if (haveLoan == 2) {
        $("#loan-org-type").val('');
        $("#loan-org-type").prop("disabled", true);
        $("#loan-org-type").select2('destroy');

        $("#loan-last-year").val('');
        $("#loan-last-year").prop("disabled", true);
        $("#loan-received-2016-2017").val('');
        $("#loan-received-2016-2017").prop("disabled", true);
    }
    $("#have-any-loan").on('change', function () {
        var is_import = $(this).val();
        if (is_import == 1) {

            $("#loan-org-type").removeAttr('disabled');
            $("#loan-org-type").select2();

            $("#loan-org-type").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });

            $("#loan-last-year").removeAttr('disabled');
            $("#loan-received-2016-2017").removeAttr('disabled');

        }else{

            $("#loan-org-type").val('');
            $("#loan-org-type").prop("disabled", true);
            $("#loan-org-type").select2('destroy');

            $("#loan-last-year").val('');
            $("#loan-last-year").prop("disabled", true);
            $("#loan-received-2016-2017").val('');
            $("#loan-received-2016-2017").prop("disabled", true);
        }
    });

    var have_accounting = $("#have-accounting-account").val();
    if (have_accounting == 2) {

        $(".accounting_account_type_id").val('');
        $(".accounting_account_type_id").prop("disabled", true);
        $(".accounting_account_type_id").select2('destroy');

    }
    $("#have-accounting-account").on('change', function () {
        var have_accounting = $(this).val();
        if (have_accounting == 1) {

            $(".accounting_account_type_id").removeAttr('disabled');
            $(".accounting_account_type_id").select2();

            $(".accounting_account_type_id").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });

        } else {

            $(".accounting_account_type_id").val('');
            $(".accounting_account_type_id").prop("disabled", true);
            $(".accounting_account_type_id").select2('destroy');
        }
    });

    var unit_type_code = $("#unit-type-code").val();
    if(unit_type_code == 1)
    {

        //$("#enterprise-group-id").removeAttr('disabled');
        $("#is-under-ent").val('');
        $("#is-under-ent-group-2").val('');
        $("#is-under-ent").prop("disabled", true);
        $("#is-under-ent").select2('destroy');
        $("#is-under-ent-group-2").prop("disabled", true);
        $("#is-under-ent-group-2").select2('destroy');

        $("#enterprise-group-id-2").val('');
        $("#enterprise").val('');
        $("#enterprise").prop("disabled", true);
        $("#enterprise").select2('destroy');
        $("#enterprise-group-id-2").prop("disabled", true);


        $("#is-under-ent-group").removeAttr('disabled');
        $("#enterprise-group-id").removeAttr('disabled');
        $("#is-under-ent-group").select2();

        $("#is-under-ent-group").select2({
            containerCssClass: 'select2-sm',
            placeholder: "Select",
            allowClear: true
        });

    }
    else if(unit_type_code == 2)
    {
        $("#is-under-ent").removeAttr('disabled');
        $("#is-under-ent-group-2").removeAttr('disabled');
        $("#is-under-ent-group-2").select2();
        $("#is-under-ent").select2();

        $("#is-under-ent-group-2").select2({
            containerCssClass: 'select2-sm',
            placeholder: "Select",
            allowClear: true
        });
        $("#is-under-ent").select2({
            containerCssClass: 'select2-sm',
            placeholder: "Select",
            allowClear: true
        });

        $("#enterprise-group-id").val('');
        $("#is-under-ent-group").val('');
        $("#enterprise-group-id").prop("disabled", true);
        $("#is-under-ent-group").prop("disabled", true);
        $("#is-under-ent-group").select2('destroy');
    }
    $("#unit-type-code").on('change', function () {
        var unit_type_code = $(this).val();
        if(unit_type_code == 1)
        {

            //$("#enterprise-group-id").removeAttr('disabled');
            $("#is-under-ent").val('');
            $("#is-under-ent-group-2").val('');
            $("#is-under-ent").prop("disabled", true);
            $("#is-under-ent").select2('destroy');
            $("#is-under-ent-group-2").prop("disabled", true);
            $("#is-under-ent-group-2").select2('destroy');

            $("#enterprise-group-id-2").val('');
            $("#enterprise").val('');
            $("#enterprise").select2('destroy');
            $("#enterprise").prop("disabled", true);
            $("#enterprise-group-id-2").prop("disabled", true);


            $("#is-under-ent-group").removeAttr('disabled');
            $("#enterprise-group-id").removeAttr('disabled');
            $("#is-under-ent-group").select2();

            $("#is-under-ent-group").select2({
                containerCssClass: 'select2-sm',
                placeholder: "Select",
                allowClear: true
            });
            $("#is-under-ent-group").select2('open');

        }
        else if(unit_type_code == 2)
        {
            $("#is-under-ent").removeAttr('disabled');
            $("#is-under-ent-group-2").removeAttr('disabled');
            $("#is-under-ent-group-2").select2();
            $("#is-under-ent").select2();
            $("#enterprise").select2();

            $("#is-under-ent-group-2").select2({
                containerCssClass: 'select2-sm',
                placeholder: "Select",
                allowClear: true
            });
            $("#is-under-ent").select2({
                containerCssClass: 'select2-sm',
                placeholder: "Select",
                allowClear: true
            });
            $("#enterprise").select2({
                placeholder: "Select",
                allowClear: true
            });
            $("#is-under-ent").select2('open');

            $("#enterprise-group-id").val('');
            $("#is-under-ent-group").val('');
            $("#enterprise-group-id").prop("disabled", true);
            $("#is-under-ent-group").prop("disabled", true);
            $("#is-under-ent-group").select2('destroy');
        }
		/!*else
		 {

		 $("#is-under-ent-group").prop("disabled", true);
		 $("#unit-mode-code").select2('open');
		 }*!/
    });

    var is_under_ent = $("#is-under-ent").val();
    if(is_under_ent == 1)
    {
        $("#enterprise").removeAttr('disabled');
    }
    $("#is-under-ent").on('change', function () {
        var is_under_ent = $(this).val();
        if(is_under_ent == 1)
        {
            $("#enterprise").removeAttr('disabled');
        }else{
            $("#enterprise").prop("disabled", true);
            $("#enterprise").val('');
            $("#enterprise").select2();
            $("#is-under-ent-group-2").select2('open');
        }
    });

    var hasPermissionAuth = $("#is-under-permission-auth").val();
    if(hasPermissionAuth == 2)
    {
        $(".permission_auth").val('');
        $(".approval_registration").val('');
        $(".permission_auth").prop("disabled", true);
        $(".approval_registration").prop("disabled", true);
        $(".permission_auth").select2('destroy');
    }
    $("#is-under-permission-auth").on('change', function () {
        var hasPermissionAuth = $(this).val();
        if(hasPermissionAuth == 1)
        {
            $(".permission_auth").removeAttr('disabled');
            $(".approval_registration").removeAttr('disabled');
            $("#trade-license-authority").select2();

            $(".permission_auth").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });
        }
        else if(hasPermissionAuth == 2)
        {
            $(".permission_auth").val('');
            $(".approval_registration").val('');
            $(".permission_auth").prop("disabled", true);
            $(".approval_registration").prop("disabled", true);
            $(".permission_auth").select2('destroy');
        }
    });

    var hasEnvironmentControl = $("#has-environmental-control").val();
    if(hasEnvironmentControl == 2)
    {
        $("#pollution-control-measure-id").val('');
        $("#pollution-control-measure-id").prop("disabled", true);
        $("#pollution-control-measure-id").select2('destroy');
    }
    $("#has-environmental-control").on('change', function () {
        var hasEnvironmentControl = $(this).val();
        if(hasEnvironmentControl == 1)
        {
            $("#pollution-control-measure-id").removeAttr('disabled');
            $("#pollution-control-measure-id").select2();

            $("#pollution-control-measure-id").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });
        }
        else if(hasEnvironmentControl == 2)
        {
            $("#pollution-control-measure-id").val('');
            $("#pollution-control-measure-id").prop("disabled", true);
            $("#pollution-control-measure-id").select2('destroy');
        }
    });

    var hasSpecializedZone = $("#has-specialized-zone").val();
    if(hasSpecializedZone == 2)
    {
        $("#specialty-code-id").val('');
        $("#specialty-code-id").prop("disabled", true);
        $("#specialty-code-id").select2('destroy');
    }
    $("#has-specialized-zone").on('change', function () {
        var hasSpecializedZone = $(this).val();
        if(hasSpecializedZone == 1)
        {
            $("#specialty-code-id").removeAttr('disabled');
            $("#specialty-code-id").select2();

            $("#specialty-code-id").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });
        }
        else if(hasSpecializedZone == 2)
        {
            $("#specialty-code-id").val('');
            $("#specialty-code-id").prop("disabled", true);
            $("#specialty-code-id").select2('destroy');
        }
    });


    var unitCurrentStatus = $("#unit-current-status").val();
    if(unitCurrentStatus == 1)
    {
        $("#reopen-month").val('');
        $("#reopen-year").val('');
        $("#perma-close-year").val('');
        $("#closing-reason").val('');
        $("#reopen-month").prop("disabled", true);
        $("#reopen-year").prop("disabled", true);
        $("#perma-close-year").prop("disabled", true);
        $("#closing-reason").prop("disabled", true);
        $("#reopen-month").select2('destroy');
        $("#closing-reason").select2('destroy');
    } else {
        $("#reopen-month").removeAttr('disabled')
        $("#reopen-year").removeAttr('disabled')
        $("#perma-close-year").removeAttr('disabled')
        $("#closing-reason").removeAttr('disabled');
        $("#reopen-month").select2();
        $("#closing-reason").select2();

        $("#reopen-month").select2({
            containerCssClass: 'select2-md',
            placeholder: "Select",
            allowClear: true
        });
        $("#closing-reason").select2({
            containerCssClass: 'select2-md',
            placeholder: "Select",
            allowClear: true
        });
    }
    $("#unit-current-status").on('change', function () {
        var unitCurrentStatus = $(this).val();

        if(unitCurrentStatus == 1)
        {
            $("#reopen-month").val('');
            $("#reopen-year").val('');
            $("#perma-close-year").val('');
            $("#closing-reason").val('');
            $("#reopen-month").prop("disabled", true);
            $("#reopen-year").prop("disabled", true);
            $("#perma-close-year").prop("disabled", true);
            $("#closing-reason").prop("disabled", true);
            $("#reopen-month").select2('destroy');
            $("#closing-reason").select2('destroy');
        } else {
            $("#reopen-month").removeAttr('disabled')
            $("#reopen-year").removeAttr('disabled')
            $("#perma-close-year").removeAttr('disabled')
            $("#closing-reason").removeAttr('disabled');
            $("#reopen-month").select2();
            $("#closing-reason").select2();

            $("#reopen-month").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });
            $("#closing-reason").select2({
                containerCssClass: 'select2-md',
                placeholder: "Select",
                allowClear: true
            });
        }
    });

    var isRegisterd = $("#is-registered").val();
    if(isRegisterd == 2)
    {
        $("#registration-no1").val('').prop("disabled", true);
        $("#registration-no2").val('').prop("disabled", true);
        $("#registration-no3").val('').prop("disabled", true);
        $("#reg-org-code1").val('').prop("disabled", true).select2('destroy');
        $("#reg-org-code2").val('').prop("disabled", true).select2('destroy');
        $("#reg-org-code3").val('').prop("disabled", true).select2('destroy');
    }
    $("#is-registered").on('change', function () {
        var isRegisterd = $(this).val();

        if(isRegisterd == 1)
        {
            $("#registration-no1").removeAttr('disabled');
            $("#registration-no2").removeAttr('disabled');
            $("#registration-no3").removeAttr('disabled');


            $("#reg-org-code1").removeAttr('disabled').select2();
            $("#reg-org-code2").removeAttr('disabled').select2();
            $("#reg-org-code3").removeAttr('disabled').select2();

            $("#reg-org-code1").select2({
                placeholder: "Select",
                allowClear: true
            });
            $("#reg-org-code2").select2({
                placeholder: "Select",
                allowClear: true
            });
            $("#reg-org-code3").select2({
                placeholder: "Select",
                allowClear: true
            });
        } else {

            $("#registration-no1").val('').prop("disabled", true);
            $("#registration-no2").val('').prop("disabled", true);
            $("#registration-no3").val('').prop("disabled", true);
            $("#reg-org-code1").val('').prop("disabled", true).select2('destroy');
            $("#reg-org-code2").val('').prop("disabled", true).select2('destroy');
            $("#reg-org-code3").val('').prop("disabled", true).select2('destroy');
        }
    });*/
   /* var hasTradeLicense = $("#has-trade-license").val();
    if(hasTradeLicense == 2)
    {
        $("#trade-license-authority").val('');
        $("#trade-license-number").val('');
        $("#trade-license-authority").prop("disabled", true);
        $("#trade-license-number").prop("disabled", true);
        $("#trade-license-authority");
    }
    $("#has-trade-license").on('change', function () {
        var hasTradeLicense = $(this).val();
        if(hasTradeLicense == 1)
        {
            $("#trade-license-authority").removeAttr('disabled');
            $("#trade-license-number").removeAttr('disabled');

        }
        else if(hasTradeLicense == 2)
        {
            $("#trade-license-authority").val('').prop("disabled", true);
            $("#trade-license-number").val('').prop("disabled", true);
        }
    });*/

    // For edit mode
    var ownership = $("#legal-ownership-code").val();
    //var ownership = document. getElementById("legal-ownership-code"). value;
    console.log(ownership)
    if(ownership == '5' || ownership == '6' || ownership == '7'){

		$("#has-trade-license").val('').prop("disabled", true);
		$("#trade-license-authority").val('').prop("disabled", true);
		$("#head-gender-code").val('').prop("disabled", true);
		$("#head-education-code").val('').prop("disabled", true);

		$("#head-unit-age").val('').prop("disabled", true);
        $("#trade-license-number").val('').prop("disabled", true);
        $("#male-owner").val('').prop("disabled", true);
        $("#female-owner").val('').prop("disabled", true);
        $("#male-unpaid-worker").val('').prop("disabled", true);
        $("#female-unpaid-worker").val('').prop("disabled", true);

    } else if(ownership == 1) {

		$("#has-trade-license").val('').prop("disabled", true);
		$("#trade-license-authority").val('').prop("disabled", true);
		$("#trade-license-number").val('').prop("disabled", true);
    }

    $("#legal-ownership-code").on('change', function () {
        var ownership = $(this).val();
        if(ownership == 5 || ownership == 6 || ownership == 7){

            $("#type-of-ownership").val('1');
            $("#has-trade-license").val('').prop("disabled", true);
			$("#trade-license-authority").val('').prop("disabled", true);
			$("#head-gender-code").val('').prop("disabled", true);
			$("#head-education-code").val('').prop("disabled", true);

            $("#head-unit-age").val('').prop("disabled", true);
            $("#trade-license-number").val('').prop("disabled", true);
            $("#male-owner").val('').prop("disabled", true);
            $("#female-owner").val('').prop("disabled", true);
            $("#male-unpaid-worker").val('').prop("disabled", true);
            $("#female-unpaid-worker").val('').prop("disabled", true);

        } else if(ownership == 1) {
            $("#type-of-ownership").val('');
            $("#head-unit-age").removeAttr('disabled');
            $("#trade-license-number").removeAttr('disabled');
            $("#male-owner").removeAttr('disabled');
            $("#female-owner").removeAttr('disabled');
            $("#male-unpaid-worker").removeAttr('disabled');
            $("#female-unpaid-worker").removeAttr('disabled');

            $("#head-gender-code").removeAttr('disabled');
            $("#head-education-code").removeAttr('disabled');
			$("#has-trade-license").val('').prop("disabled", true);
			$("#trade-license-authority").val('').prop("disabled", true);
            $("#trade-license-number").val('').prop("disabled", true);
        }
        else {
            $("#head-unit-age").removeAttr('disabled');
            $("#trade-license-number").removeAttr('disabled');
            $("#male-owner").removeAttr('disabled');
            $("#female-owner").removeAttr('disabled');
            $("#male-unpaid-worker").removeAttr('disabled');
            $("#female-unpaid-worker").removeAttr('disabled');
            $("#has-trade-license").removeAttr('disabled')
            $("#trade-license-authority").removeAttr('disabled');

            $("#head-gender-code").removeAttr('disabled');
            $("#head-education-code").removeAttr('disabled');

            $("#type-of-ownership").val('');
        }
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
            provider_nid: {
                exactlengths: [10, 13, 17]
            },
            collector_nid: {
                exactlengths: [10, 13, 17]
            },
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
			/*total_assets_amount:number_rules_set,
			 total_assets_amount:decimal_point_rules_set,*/
            //yearly_turnover:number_rules_set,
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
            //last_year_invested_capital:number_rules_set,
            //foreign_res_investment:number_rules_set,
            //last_year_prod_raw_materials:number_rules_set,
            //last_year_salary_amount:number_rules_set,
            //last_year_other_expenses_sum:number_rules_set,
            //loan_last_year:number_rules_set,
            //loan_received_2016_2017:number_rules_set,
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
