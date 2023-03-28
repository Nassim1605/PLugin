
if(pcv_var_arguments.pcv_type == 'weight') {

    //-------------------------------
    // Variable for single dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
        jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#input_qty").on('input',function (event) {
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {
        var qtyRequired = document.getElementById('input_qty').value;
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback(var_id,qtyRequired);
    }
    function final_ajax_callback(variable_id, total_value) {
        

        var measurement_type = jQuery('#measurement_type').val();
        var weight_input_unit = jQuery('#weight_input_units').val();
        var weight_output_unit = jQuery('#weight_output_units').val(); 
    
        inputval = total_value;

        var condition = 'variabe_simple_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_simple_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {

                var price_form = pcv_var_arguments.vcurr_pos;
                var op_price = "";
                if(price_form == 'left') {

                    if(measurement_type=='weight') {

                          if(weight_input_unit=='g'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 1000;
                            op_price = final_price;
                        }
                        else if(weight_input_unit == weight_output_unit){

                            var final_price = parseFloat(inputval);
                            op_price = final_price;

                        } 
                        else if(weight_input_unit=='g'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='g'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) /  28.34;
                            op_price = final_price.toFixed(2);
                        }

                        else if(weight_input_unit=='g'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) * 0.00220462;
                            op_price = final_price.toFixed(6);
                        }

                        else if(weight_input_unit=='g'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) * 0.0000010000
                            op_price = final_price.toFixed(10);
                        }

                        else if(weight_input_unit=='kg'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) * 1000;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 1000000;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 35.274;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) * 2.205;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) / 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) / 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 1000000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 0.000035274;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) / 453592;
                            op_price = final_price.toFixed(12);
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) / 1000000000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) * 28.34;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 35.274;
                            op_price = final_price.toFixed(7);
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) / 0.000035274;
                            op_price = final_price.toFixed(2);
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) / 16;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) / 35274;
                            op_price = final_price.toFixed(13);
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) / 0.00220462;
                            op_price = final_price.toFixed(2);
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 2.205;
                            op_price = final_price.toFixed(6);
                        }
                        else if(weight_input_unit=='lb'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 453592;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 16;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) * 0.00045359237;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) / 0.0000010000
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) * 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 1000000000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 35274;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) / 0.00045359237;
                            op_price = final_price.toFixed(2);
                        }
                       
                    }

                                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }

                if(measurement_type=='weight'){
                    if(weight_input_unit=='g'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 1000;
                            op_price = final_price;
                        }
                        else if(weight_input_unit == weight_output_unit){

                            var final_price = parseFloat(inputval);
                            op_price = final_price;

                        } 
                        else if(weight_input_unit=='g'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='g'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) /  28.34;
                            op_price = final_price.toFixed(2);
                        }

                        else if(weight_input_unit=='g'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) * 0.00220462;
                            op_price = final_price.toFixed(6);
                        }

                        else if(weight_input_unit=='g'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) * 0.0000010000
                            op_price = final_price.toFixed(10);
                        }

                        else if(weight_input_unit=='kg'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) * 1000;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 1000000;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 35.274;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) * 2.205;
                            op_price = final_price;
                        }
                        else if(weight_input_unit=='kg'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) / 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) / 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 1000000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 0.000035274;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) / 453592;
                            op_price = final_price.toFixed(12);
                        }

                        else if(weight_input_unit=='mg'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) / 1000000000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) * 28.34;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 35.274;
                            op_price = final_price.toFixed(7);
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) / 0.000035274;
                            op_price = final_price.toFixed(2);
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) / 16;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='oz'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) / 35274;
                            op_price = final_price.toFixed(13);
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) / 0.00220462;
                            op_price = final_price.toFixed(2);
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) / 2.205;
                            op_price = final_price.toFixed(6);
                        }
                        else if(weight_input_unit=='lb'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 453592;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 16;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='lb'  && weight_output_unit=='t'){
                            var final_price = parseFloat(inputval) * 0.00045359237;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='g'){
                            var final_price = parseFloat(inputval) / 0.0000010000
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='kg'){
                            var final_price = parseFloat(inputval) * 1000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='mg'){
                            var final_price = parseFloat(inputval) * 1000000000;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='oz'){
                            var final_price = parseFloat(inputval) * 35274;
                            op_price = final_price;
                        }

                        else if(weight_input_unit=='t'  && weight_output_unit=='lb'){
                            var final_price = parseFloat(inputval) / 0.00045359237;
                            op_price = final_price.toFixed(2);
                        }

                // attached with id
                    console.log(response);
                    jQuery('#ext_amount').html(op_price + ' '   + weight_output_unit);
                    var p_price =  parseFloat(op_price) * response;
                    p_price = p_price;
                    jQuery('#totalprice').html(pc_var_arguments.curr_string + p_price);
                    jQuery('#set_price').val(op_price * response);
                    jQuery('#set_mm').val(op_price);
                    //jQuery('.single_add_to_cart_button').removeAttr("disabled");
                    // jQuery('#RangeError').hide();
                    if(jQuery('#input_qty').val()==''){

                        jQuery('#ext_amount').html('');
                        jQuery('#totalprice').html('');
                    

                    }

                    if(jQuery('#set_price').val()=='0'){

                        jQuery('#ext_amount').html('');
                        jQuery('#totalprice').html('');
                        // jQuery('#RangeError').show().delay(3000).hide('slow');
                       // jQuery('.single_add_to_cart_button').attr("disabled", "disabled");
                    }
                } 
                // // attached with id
                //jQuery('#totalprice').html(op_price);
            }
        });  
    }

} else if(pcv_var_arguments.pcv_type == 'area') {


    //-------------------------------
    // Variable for single dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
        jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#input_qty").on('input keydown change keypress ',function (event) {
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {
        var qtyRequired = document.getElementById('input_qty').value;
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback(var_id,qtyRequired);
    }
    function final_ajax_callback(variable_id, total_value) {

          var measurement_type = jQuery('#measurement_type').val();
          var area_input_unit = jQuery('#area_input_units').val();
          var area_output_unit = jQuery('#area_output_units').val();

          inputval = total_value;

        var condition = 'variabe_simple_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_simple_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {
                var price_form = pcv_var_arguments.vcurr_pos;
                var op_price = "";
                if(price_form == 'left') {
                    

                    if(measurement_type=='area'){


                if(area_input_unit=='sq_mm' && area_output_unit=='sq_cm'){

                    var final_price = parseFloat(inputval) / 100;
                    op_price = final_price.toFixed(2);
                }

                else if(area_input_unit== area_output_unit){

                    var final_price = parseFloat(inputval);
                    op_price = final_price;
                }
                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_m'){

                    var final_price = parseFloat(inputval) / 1000000;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_km'){

                    var final_price = parseFloat(inputval) / 1000000000000;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_in'){

                    var final_price = parseFloat(inputval) / 645;
                    op_price = final_price.toFixed(5);
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_ft'){

                    var final_price = parseFloat(inputval) * 0.000010764;
                    op_price = final_price;
                }
                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_yd'){

                    var final_price = parseFloat(inputval) * 0.000001196;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_mi'){

                    var final_price = parseFloat(inputval) / 2589988110000 ;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_mm'){

                    var final_price = parseFloat(inputval) * 100 ;
                    op_price = final_price;
                }
                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_m'){

                    var final_price = parseFloat(inputval) / 10000 ;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_km'){

                     var final_price = inputval / 10000000000 ;
                     op_price = final_price; 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_in'){

                     var final_price = inputval /  6.452;
                     op_price = final_price.toFixed(3); 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_ft'){

                     var final_price = inputval * 0.001076;
                     op_price = final_price.toFixed(5); 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_yd'){

                     var final_price = inputval * 0.00012;
                     op_price = final_price.toFixed(5); 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_mi'){

                     var final_price = inputval / 25899881100;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_mm'){

                     var final_price = inputval * 1000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_cm'){

                     var final_price = inputval * 10000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_km'){

                     var final_price = inputval / 1000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_in'){

                     var final_price = inputval * 1550.0031;
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_ft'){

                     var final_price = inputval * 10.76391;
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_yd'){

                     var final_price = inputval * 1.19599;
                     op_price = final_price.toFixed(3);
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * 0.00000038610;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * 1000000000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * 10000000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * 1550003100.0062;
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) * 10763910.41671;
                     op_price = final_price.toFixed(4);
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) * 1195990.046301;
                     op_price = final_price.toFixed(4);
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * 0.386102;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * 645.16;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * 6.4516;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * 0.000645;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) *  0.00000000064516;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) / 144;
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) / 1296;
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * parseFloat(4014489599.4792);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * parseFloat(92903.04);
                     op_price = final_price;
                }
                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * parseFloat(929.0304);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * parseFloat(0.092903);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) * parseFloat(0.00000009290304);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * parseFloat(144);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) / parseFloat(9);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * parseFloat(27878399.996383);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * parseFloat(836127.36);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * parseFloat(8361.2736);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * parseFloat(0.836127);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) * parseFloat(0.00000083612736);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * parseFloat(1296);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) * parseFloat(9);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) / parseFloat(3097600);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * parseFloat(2589988110000);
                     op_price = final_price;
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * parseFloat(25899881100);
                     op_price = final_price;
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * parseFloat(2589988.11);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) * parseFloat(2.589988);
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * parseFloat(4014489599.4792);
                     op_price = final_price.toFixed(4);
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) * parseFloat(27878399.996383);
                     op_price = final_price.toFixed(4);
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) * parseFloat(3097599.999598);
                     op_price = final_price.toFixed(5);
                }

            }
                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }
                // // attached with id
                
                if (measurement_type=='area'){
                     if(area_input_unit=='sq_mm' && area_output_unit=='sq_cm'){

                    var final_price = parseFloat(inputval) / 100;
                    op_price = final_price.toFixed(2);
                }

                else if(area_input_unit== area_output_unit){

                    var final_price = parseFloat(inputval);
                    op_price = final_price;
                }
                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_m'){

                    var final_price = parseFloat(inputval) / 1000000;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_km'){

                    var final_price = parseFloat(inputval) / 1000000000000;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_in'){

                    var final_price = parseFloat(inputval) / 645;
                    op_price = final_price.toFixed(5);
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_ft'){

                    var final_price = parseFloat(inputval) * 0.000010764;
                    op_price = final_price;
                }
                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_yd'){

                    var final_price = parseFloat(inputval) * 0.000001196;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_mm' && area_output_unit=='sq_mi'){

                    var final_price = parseFloat(inputval) / 2589988110000 ;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_mm'){

                    var final_price = parseFloat(inputval) * 100 ;
                    op_price = final_price;
                }
                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_m'){

                    var final_price = parseFloat(inputval) / 10000 ;
                    op_price = final_price;
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_km'){

                     var final_price = inputval / 10000000000 ;
                     op_price = final_price; 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_in'){

                     var final_price = inputval /  6.452;
                     op_price = final_price.toFixed(3); 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_ft'){

                     var final_price = inputval * 0.001076;
                     op_price = final_price.toFixed(5); 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_yd'){

                     var final_price = inputval * 0.00012;
                     op_price = final_price.toFixed(5); 
                }

                else if(area_input_unit=='sq_cm' && area_output_unit=='sq_mi'){

                     var final_price = inputval / 25899881100;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_mm'){

                     var final_price = inputval * 1000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_cm'){

                     var final_price = inputval * 10000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_km'){

                     var final_price = inputval / 1000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_in'){

                     var final_price = inputval * 1550.0031;
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_ft'){

                     var final_price = inputval * 10.76391;
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_yd'){

                     var final_price = inputval * 1.19599;
                     op_price = final_price.toFixed(3);
                }

                else if(area_input_unit=='sq_m' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * 0.00000038610;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * 1000000000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * 10000000000;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * 1550003100.0062;
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) * 10763910.41671;
                     op_price = final_price.toFixed(4);
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) * 1195990.046301;
                     op_price = final_price.toFixed(4);
                }

                else if(area_input_unit=='sq_km' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * 0.386102;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * 645.16;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * 6.4516;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * 0.000645;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) *  0.00000000064516;
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) / 144;
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) / 1296;
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_in' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * parseFloat(4014489599.4792);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * parseFloat(92903.04);
                     op_price = final_price;
                }
                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * parseFloat(929.0304);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * parseFloat(0.092903);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) * parseFloat(0.00000009290304);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * parseFloat(144);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) / parseFloat(9);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_ft' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) * parseFloat(27878399.996383);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * parseFloat(836127.36);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * parseFloat(8361.2736);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * parseFloat(0.836127);
                     op_price = final_price.toFixed(6);
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) * parseFloat(0.00000083612736);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * parseFloat(1296);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) * parseFloat(9);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_yd' && area_output_unit=='sq_mi'){

                     var final_price = parseFloat(inputval) / parseFloat(3097600);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_mm'){

                     var final_price = parseFloat(inputval) * parseFloat(2589988110000);
                     op_price = final_price;
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_cm'){

                     var final_price = parseFloat(inputval) * parseFloat(25899881100);
                     op_price = final_price;
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_m'){

                     var final_price = parseFloat(inputval) * parseFloat(2589988.11);
                     op_price = final_price;
                }

                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_km'){

                     var final_price = parseFloat(inputval) * parseFloat(2.589988);
                     op_price = final_price.toFixed(2);
                }

                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_in'){

                     var final_price = parseFloat(inputval) * parseFloat(4014489599.4792);
                     op_price = final_price.toFixed(4);
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_ft'){

                     var final_price = parseFloat(inputval) * parseFloat(27878399.996383);
                     op_price = final_price.toFixed(4);
                }
                else if(area_input_unit=='sq_mi' && area_output_unit=='sq_yd'){

                     var final_price = parseFloat(inputval) * parseFloat(3097599.999598);
                     op_price = final_price.toFixed(5);
                }
                    // attached with id
                    jQuery('#ext_amount').html(op_price + ' '  + area_output_unit);
                    var p_price =  op_price * response
                    p_price = p_price.toFixed(4);
                    jQuery('#totalprice').html(pc_var_arguments.curr_string + p_price);
                    jQuery('#set_price').val(op_price * response);
                    jQuery('#set_mm').val(op_price);
                    // jQuery('.single_add_to_cart_button').removeAttr("disabled");
                    // jQuery('#RangeError').hide();
                    if(jQuery('#input_qty').val()==''){

                        jQuery('#ext_amount').html('');
                        jQuery('#totalprice').html('');

                    }
                     if(jQuery('#set_price').val()=='0'){

                            jQuery('#ext_amount').html('');
                            jQuery('#totalprice').html('');
                            // jQuery('#RangeError').show().delay(3000).hide('slow');
                            // jQuery('.single_add_to_cart_button').attr("disabled", "disabled");
                    }
                }
            }
        });  
    }


} else if(pcv_var_arguments.pcv_type == 'volume') {


    //-------------------------------
    // Variable for single dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
         jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            var id = jQuery('input[name="product_id"]').val();
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
                setTimeout(function(){ 
                    var max = jQuery('input[name="field_meta_max_'+id+'"]').val();
                    var min = jQuery('input[name="field_meta_min_'+id+'"]').val();
                    if(max!='') {
                        jQuery('input.qty').attr('max',max);
                    }
                    if(min!='') {
                        jQuery('input.qty').attr('min',min);
                    }
                }, 500);
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#input_qty").on('input keydown change keypress ',function (event) {
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {
        var qtyRequired = document.getElementById('input_qty').value;
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback(var_id,qtyRequired);
    }
    function final_ajax_callback(variable_id, total_value) {

        var measurement_type = jQuery('#measurement_type').val();
        var _ext_volume_input_meta = jQuery('#_ext_volume_unit_meta').val();
        var  _ext_volume_output_meta = jQuery('#_ext_volume_output_meta').val();

        inputval = total_value;

        var condition = 'variabe_simple_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_simple_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {
                var price_form = pcv_var_arguments.vcurr_pos;
                var op_price = "";
                if(price_form == 'left') {
                    
                if(measurement_type=='volume'){

                if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) / parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta == _ext_volume_output_meta) {

                    var final_price = parseFloat(inputval);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(1000000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(0.004227);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.002113);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001057);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000264);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(0.033814);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(0.061024);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000035315);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) / parseFloat(764554.85798);
                    op_price = final_price.toFixed(15);

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(4.226753);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(2.113376);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(1.056688);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(0.264172);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(33.814023);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(61.023744);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.035315);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001308);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(1000000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(4226.752838);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(2113.376419);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(1056.688209);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(264.172052);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(33814.022702);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(61023.744095);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(35.314667);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(1.307951);
                    op_price = final_price;

                }

                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(236.588236);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.236588);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000237);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) / parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) / parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(14.4375);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.008355);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000309);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(473.176473);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.473176);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000473);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) / parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(28.875);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.01671);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000619);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(946.352946);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.946353);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000946);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(32);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(57.75);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.03342);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001238);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(3785.411784);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(3.785412);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.003785);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(128);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(231);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.133681);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.004951);
                    op_price = final_price;

                }



                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(29.57353);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.029574);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(33814);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) / parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) / parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) / parseFloat(32);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(128);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(1.804688);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001044);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.0000386807163);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(16.387064);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.016387);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(61024);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(0.069264);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.034632);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.017316);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(231);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(0.554113);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000579);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) / parseFloat(46656);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(28316.846);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(28.316846);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.028317);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(119.688309);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(59.844155);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(29.922077);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(7.480519);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(957.506473);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(1727.999964);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.037037);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(764554.87);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(764.55487);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.764555);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(3231.584467);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(27);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(807.896117);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(201.974029);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(25852.675731);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(46,656.000733);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(27.000001);
                    op_price = final_price;

                }

            }
                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }
                // // attached with id
                if (measurement_type=='volume'){
                if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) / parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta == _ext_volume_output_meta) {

                    var final_price = parseFloat(inputval);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(1000000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(0.004227);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.002113);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001057);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000264);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(0.033814);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(0.061024);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000035315);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='ml' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) / parseFloat(764554.85798);
                    op_price = final_price.toFixed(15);

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(4.226753);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(2.113376);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(1.056688);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(0.264172);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(33.814023);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(61.023744);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.035315);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='l' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001308);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(1000000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(1000);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(4226.752838);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(2113.376419);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(1056.688209);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(264.172052);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(33814.022702);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(61023.744095);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(35.314667);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_m' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(1.307951);
                    op_price = final_price;

                }

                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(236.588236);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.236588);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000237);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) / parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) / parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(14.4375);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.008355);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cup' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000309);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(473.176473);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.473176);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000473);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) / parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(28.875);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.01671);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='pt' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000619);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(946.352946);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.946353);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000946);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(2);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(32);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(57.75);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.03342);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='qt' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001238);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(3785.411784);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(3.785412);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.003785);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(4);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(128);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(231);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.133681);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='gal' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.004951);
                    op_price = final_price;

                }



                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(29.57353);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.029574);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(33814);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) / parseFloat(8);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) / parseFloat(16);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) / parseFloat(32);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(128);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(1.804688);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.001044);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='fl_oz' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.0000386807163);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(16.387064);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(0.016387);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) / parseFloat(61024);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(0.069264);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.034632);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(0.017316);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) / parseFloat(231);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(0.554113);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(0.000579);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_in' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) / parseFloat(46656);
                    op_price = final_price;

                }


                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(28316.846);
                    op_price = final_price;

                }
                 else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(28.316846);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.028317);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(119.688309);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(59.844155);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(29.922077);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(7.480519);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(957.506473);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(1727.999964);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_ft' && _ext_volume_output_meta=='cu_yd') {

                    var final_price = parseFloat(inputval) * parseFloat(0.037037);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='ml') {

                    var final_price = parseFloat(inputval) * parseFloat(764554.87);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='l') {

                    var final_price = parseFloat(inputval) * parseFloat(764.55487);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cu_m') {

                    var final_price = parseFloat(inputval) * parseFloat(0.764555);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cup') {

                    var final_price = parseFloat(inputval) * parseFloat(3231.584467);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='pt') {

                    var final_price = parseFloat(inputval) * parseFloat(27);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='qt') {

                    var final_price = parseFloat(inputval) * parseFloat(807.896117);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='gal') {

                    var final_price = parseFloat(inputval) * parseFloat(201.974029);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='fl_oz') {

                    var final_price = parseFloat(inputval) * parseFloat(25852.675731);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cu_in') {

                    var final_price = parseFloat(inputval) * parseFloat(46,656.000733);
                    op_price = final_price;

                }
                else if(_ext_volume_input_meta=='cu_yd' && _ext_volume_output_meta=='cu_ft') {

                    var final_price = parseFloat(inputval) * parseFloat(27.000001);
                    op_price = final_price;

                }
                    // attached with id
                    jQuery('#ext_amount').html(op_price + ' '  + _ext_volume_output_meta);
                    var p_price =  op_price * response
                    p_price = p_price.toFixed(4);
                    jQuery('#totalprice').html(pc_var_arguments.curr_string + p_price);
                    jQuery('#set_price').val(op_price * response);
                    jQuery('#set_mm').val(op_price);
                      // jQuery('.single_add_to_cart_button').removeAttr("disabled");
                      // jQuery('#RangeError').hide();
                     if(jQuery('#input_qty').val()==''){

                        jQuery('#ext_amount').html('');
                        jQuery('#totalprice').html('');

                    }
                    
                     if(jQuery('#set_price').val()=='0'){

                            jQuery('#ext_amount').html('');
                            jQuery('#totalprice').html('');
                            // jQuery('#RangeError').show().delay(3000).hide('slow');
                            // jQuery('.single_add_to_cart_button').attr("disabled", "disabled");
                    }
                }
            }
        });  
    }


} else if(pcv_var_arguments.pcv_type == 'length') {


    //-------------------------------
    // Variable for single dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
        jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#input_qty").on('input keydown change keypress ',function (event) {
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {
        var qtyRequired = document.getElementById('input_qty').value;
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback(var_id,qtyRequired);
    }
    function final_ajax_callback(variable_id, total_value) {

        var measurement_type = jQuery('#measurement_type').val();
        var _ext_length_input_meta = jQuery('#_ext_length_unit_meta').val();
        var _ext_length_output_meta = jQuery('#_ext_length_output_meta').val();

        inputval = total_value;

        var condition = 'variabe_simple_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_simple_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {
                var price_form = pcv_var_arguments.vcurr_pos;
        
                var op_price = "";
                if(price_form == 'left') {
                    

                        if(measurement_type=='length'){

                            if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) / parseFloat(10);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta == _ext_length_output_meta){

                                var final_price = parseFloat(inputval);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) / parseFloat(1000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(1000000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(0.039370);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(304.8);
                                op_price = final_price.toFixed(8);

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(0.001094);
                                op_price = final_price.toFixed(6);

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) / parseFloat(914);
                                op_price = final_price.toFixed(6);

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(1609344);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(10);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) / parseFloat(100);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(100000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(0.39370);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(30.48);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(0.010936132983);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(160934.4);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(1000);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(100);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(1000);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) / parseFloat(0.0254);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(0.3048);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(1.0936);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) * parseFloat(0.000621371);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(1000000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(100000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(1000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) / parseFloat(39370);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) * parseFloat(3280.839895);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(1093.613298);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) * parseFloat(0.621371);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(25.4);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(2.54);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(0.0254);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(39370);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(12);
                                op_price = final_price.toFixed(3);

                            }
                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) / parseFloat(36);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(63360);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(304.8);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(30.48);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(0.3048);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) * parseFloat(0.000305);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(12);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(3);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(5280);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(914.4);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(91.44);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(0.9144);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) * parseFloat(0.000914);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(36);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) * parseFloat(3);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(1760);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(1609344);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(160934.4);
                                op_price = final_price;

                            }
                             else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(1609.344);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) * parseFloat(1.609344);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(63360);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) * parseFloat(5280);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(1760);
                                op_price = final_price;

                            }

                        }
                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }
                
                if (measurement_type=='length'){
                    if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) / parseFloat(10);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta == _ext_length_output_meta){

                                var final_price = parseFloat(inputval);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) / parseFloat(1000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(1000000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(0.039370);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(304.8);
                                op_price = final_price.toFixed(8);

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(0.001094);
                                op_price = final_price.toFixed(6);

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) / parseFloat(914);
                                op_price = final_price.toFixed(6);

                            }
                            else if(_ext_length_input_meta=='mm' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(1609344);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(10);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) / parseFloat(100);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(100000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(0.39370);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(30.48);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(0.010936132983);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='cm' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(160934.4);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(1000);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(100);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(1000);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) / parseFloat(0.0254);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(0.3048);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(1.0936);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='m' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) * parseFloat(0.000621371);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(1000000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(100000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(1000);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) / parseFloat(39370);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) * parseFloat(3280.839895);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(1093.613298);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='km' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) * parseFloat(0.621371);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(25.4);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(2.54);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(0.0254);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) / parseFloat(39370);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) / parseFloat(12);
                                op_price = final_price.toFixed(3);

                            }
                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) / parseFloat(36);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='in' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(63360);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(304.8);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(30.48);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(0.3048);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) * parseFloat(0.000305);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(12);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(3);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='ft' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(5280);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(914.4);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(91.44);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(0.9144);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) * parseFloat(0.000914);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(36);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) * parseFloat(3);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='yd' && _ext_length_output_meta=='mi'){

                                var final_price = parseFloat(inputval) / parseFloat(1760);
                                op_price = final_price;

                            }

                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='mm'){

                                var final_price = parseFloat(inputval) * parseFloat(1609344);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='cm'){

                                var final_price = parseFloat(inputval) * parseFloat(160934.4);
                                op_price = final_price;

                            }
                             else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='m'){

                                var final_price = parseFloat(inputval) * parseFloat(1609.344);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='km'){

                                var final_price = parseFloat(inputval) * parseFloat(1.609344);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='in'){

                                var final_price = parseFloat(inputval) * parseFloat(63360);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='ft'){

                                var final_price = parseFloat(inputval) * parseFloat(5280);
                                op_price = final_price;

                            }
                            else if(_ext_length_input_meta=='mi' && _ext_length_output_meta=='yd'){

                                var final_price = parseFloat(inputval) * parseFloat(1760);
                                op_price = final_price;

                            }
                    // attached with id
                    jQuery('#ext_amount').html(op_price + ' ' + _ext_length_output_meta);
                    var p_price =  op_price * response
                    p_price = p_price.toFixed(3);
                    jQuery('#totalprice').html(pc_var_arguments.curr_string + p_price);
                    jQuery('#set_price').val(op_price * response);
                    jQuery('#set_mm').val(op_price);
                    // jQuery('.single_add_to_cart_button').removeAttr("disabled");
                    // jQuery('#RangeError').hide();
                    if(jQuery('#input_qty').val()==''){

                        jQuery('#ext_amount').html('');
                        jQuery('#totalprice').html('');

                    }
                     if(jQuery('#set_price').val()=='0'){

                            jQuery('#ext_amount').html('');
                            jQuery('#totalprice').html('');
                            // jQuery('#RangeError').show().delay(3000).hide('slow');
                            // jQuery('.single_add_to_cart_button').attr("disabled", "disabled");
                    }
                  
                }
            }
        });  
    }


} else if(pcv_var_arguments.pcv_type == 'area_lw' ) {


    //-------------------------------
    // Variable for double dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
        jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#vlength_qty_area, #vwidth_qty_area").on('input keydown change keypress ',function (event) {
            
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {
        var length = document.getElementById('vlength_qty_area').value;
        var width = document.getElementById('vwidth_qty_area').value;
        var total_value = length*width;
        jQuery('#result').html(total_value);
        jQuery('#pcv_quantity_needed').val(total_value);
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback_double(var_id,total_value);
    }
    function final_ajax_callback_double(variable_id, total_value) {
        var condition = 'variabe_double_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_double_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {
                var price_form = pcv_var_arguments.vcurr_pos;
                var op_price = "";
                if(price_form == 'left') {
                    
                    op_price = accounting.formatMoney(response, { 
                        symbol: pcv_var_arguments.vcurr_string,
                        format: "%s%v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }

                // attached with id
                jQuery('#ext_amount').html(op_price);
            }
        });  
    }


} else if(pcv_var_arguments.pcv_type == 'wall' ) {

    //-------------------------------
    // Variable for double dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
         jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#vlength_qty_area, #vwidth_qty_area").on('input keydown change keypress ',function (event) {
            
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {

        if(document.getElementById('vwidth_qty_area') !== null && document.getElementById('vlength_qty_area') !==null){
        var length = document.getElementById('vlength_qty_area').value;
        var width = document.getElementById('vwidth_qty_area').value;
        var total_value = length*width;
        jQuery('#result').html(total_value);
        jQuery('#pcv_quantity_needed').val(total_value);
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback_double(var_id,total_value);
        }
    }
    function final_ajax_callback_double(variable_id, total_value) {
        var condition = 'variabe_double_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_double_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {
                var price_form = pcv_var_arguments.vcurr_pos;
                var op_price = "";
                if(price_form == 'left') {
                    
                    op_price = accounting.formatMoney(response, { 
                        symbol: pcv_var_arguments.vcurr_string,
                        format: "%s%v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }

                // attached with id
                jQuery('#ext_amount').html(op_price);
            }
        });  
    }


} else {


    //-------------------------------
    // Variable for volumen triple garden mulch dimenssion
    //-------------------------------
    jQuery(document).ready(function($) {
         jQuery('form.variations_form').on('show_variation', function(event, variation){
            var variation_id = variation.variation_id;
            if(variation_id) {
                getRequiredQty(variation_id);
                jQuery('#variable_product_table').css("display", "flex");
            }
        });
        // On unselected (or not selected) variation event
        jQuery('form.variations_form').on('hide_variation', function(event, variation){
           jQuery('#variable_product_table').css("display", "none"); 
        });
    });
    jQuery(function () {
        jQuery("#vlength_qty_vol, #vwidth_qty_vol, #vheight_qty_vol").on('input keydown change keypress ',function (event) {
            
            // if first enter period prevent and empty the textbox
            if(jQuery(this).val() == '.'){
               jQuery(this).val('');  
            }

            // only allow one period at a time
            if(jQuery(this).val().indexOf('.') !== -1 && event.which == 190)
                event.preventDefault();

            // only allow to enter numbers and period
            if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) || event.which == 8 || event.which == 9 || event.which == 37 || event.which == 39 || event.which == 46 || event.which == 190) {
            } else {
                event.preventDefault();
            }
        });
    });
    function getRequiredQty(variation_id) {
        var length = document.getElementById('vlength_qty_vol').value;
        var width = document.getElementById('vwidth_qty_vol').value;
        var height = document.getElementById('vheight_qty_vol').value;
        
        var inch_to_feet  = height / 12;
        var total_to_three = inch_to_feet * length * width ;
        var totay_cu_yad = total_to_three / 27;
        var net_cubeyard = totay_cu_yad.toFixed(3);
        jQuery('#result').html(net_cubeyard);
        jQuery('#pcv_quantity_needed').attr('value',net_cubeyard);
        if(variation_id) {
            var var_id = variation_id;
        } else {
            var var_id = jQuery('input.variation_id').val();
        }
        final_ajax_callback_triple(var_id,net_cubeyard);
    }
    function final_ajax_callback_triple(variable_id, total_value) {
        var condition = 'variabe_vol3d_products_condition';
        jQuery.ajax({
            url : pcv_var_arguments.vajax_url,
            type : 'post',
            data : {
                action : 'variable_vol3d_product_action',
                condition :condition,
                variable_id : variable_id,
                total_value : total_value,
            },
            success : function( response ) {
                var price_form = pcv_var_arguments.vcurr_pos;
                var op_price = "";
                if(price_form == 'left') {
                    
                    op_price = accounting.formatMoney(response, { 
                        symbol: pcv_var_arguments.vcurr_string,
                        format: "%s%v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                } else if(price_form == 'left_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%s %v" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v%s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99

                } else if(price_form == 'right_space') {
                    
                    op_price = accounting.formatMoney(response, {
                        symbol: pcv_var_arguments.curr_string,
                        format: "%v %s" }, 
                            pcv_var_arguments.pcv_decimal,
                            pcv_var_arguments.pcv_thou_sep,
                            pcv_var_arguments.pcv_decimal_sep
                    ); // €4.999,99
                
                }

                // attached with id
                jQuery('#ext_amount').html(op_price);
            }
        });  
    }


} //end of last else