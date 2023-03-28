jQuery(document).ready(function () {
    jQuery("<p hidden='true' style='color:#dc3737' class='pc_qty_err'> *Quantity is not in range* </p>").insertAfter(".single_add_to_cart_button");
    jQuery("#pc_quantity_needed").on('input',function (event) {

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

        // else get the value and pass it to function for calculation
        var value = jQuery(this).val();
        var ext_pc_in_stock = jQuery('#ext_pc_in_stock').val();

        // jQuery('input[name="quantity"]').val(value)
        // call the calculation function
        simple_measurement_calculation_callback(value);
        
    });
    
});


// ajax call for calculation
function simple_measurement_calculation_callback(quantity) { 

    var weight_product_id = jQuery("#pc_against_postid").val();
    var measurement_type = jQuery('#measurement_type').val();

    var minimum_price_val = jQuery('#minimum_price_val').val();


    
    var weight_input_unit = jQuery('#weight_input_units').val();
    var weight_output_unit = jQuery('#weight_output_units').val();

    var area_input_unit = jQuery('#area_input_units').val();
    var area_output_unit = jQuery('#area_output_units').val();


    var _ext_length_input_meta = jQuery('#_ext_length_unit_meta').val();
    var _ext_length_output_meta = jQuery('#_ext_length_output_meta').val();


    var _ext_volume_input_meta = jQuery('#_ext_volume_unit_meta').val();
    var  _ext_volume_output_meta = jQuery('#_ext_volume_output_meta').val();

    var inputval = jQuery('#pc_quantity_needed').val();
    var endrang = jQuery('#end_rang').val();

    var op_price = "";

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
            else if(measurement_type=='area'){


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

            else if(measurement_type=='length'){

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
                    op_price = final_price;

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

            else if(measurement_type=='volume'){

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


    quantity = op_price;
    var condition = 'weight_base_condition'; 
    jQuery.ajax({
        url:  pc_var_arguments.ajax_url, 
        type : 'post',
        // dataType: 'json',
        data : {
            action : 'weight_action_ajax',
            condition :condition,
            quantity : quantity,
            weight_product_id : weight_product_id,

        },
        success : function(response) {
            var price_form = pc_var_arguments.curr_pos;
            // if(price_form == 'left') {

                if(measurement_type=='weight'){
                    jQuery('#ext_amount').html(op_price + ' ' + weight_output_unit);
                    var p_price =  parseFloat(op_price) * response;
                    p_price = p_price;
                    jQuery('#ext_amounts').html(pc_var_arguments.curr_string + p_price);
                    jQuery('#set_price').val(op_price * response);
                    jQuery('#set_mm').val(op_price);
                    if(jQuery('#pc_quantity_needed').val()==''){

                        jQuery('#ext_amount').html('');
                        jQuery('#ext_amounts').html('');
                    

                    }

                    if(jQuery('#set_price').val()=='0'){

                        jQuery('#ext_amount').html('');
                        jQuery('#ext_amounts').html('');
        
                    }
                
               
            } else if (measurement_type=='area'){
                // attached with id
                jQuery('#ext_amount').html(op_price + ' ' + area_output_unit);
                var p_price =  op_price * response
                p_price = p_price.toFixed(4);
                jQuery('#ext_amounts').html(pc_var_arguments.curr_string + p_price);
                jQuery('#set_price').val(op_price * response);
                jQuery('#set_mm').val(op_price);
                
                if(jQuery('#pc_quantity_needed').val()==''){

                    jQuery('#ext_amount').html('');
                    jQuery('#ext_amounts').html('');

                }
                 if(jQuery('#set_price').val()=='0'){

                        jQuery('#ext_amount').html('');
                        jQuery('#ext_amounts').html('');
                        
                    }
            }
            else if (measurement_type=='length'){
                // attached with id
                jQuery('#ext_amount').html(op_price + ' ' + _ext_length_output_meta);
                var p_price =  op_price * response
                p_price = p_price.toFixed(4);
                jQuery('#ext_amounts').html(pc_var_arguments.curr_string + p_price);
                jQuery('#set_price').val(op_price * response);
                jQuery('#set_mm').val(op_price);
                
                if(jQuery('#pc_quantity_needed').val()==''){

                    jQuery('#ext_amount').html('');
                    jQuery('#ext_amounts').html('');

                }
                 if(jQuery('#set_price').val()=='0'){

                        jQuery('#ext_amount').html('');
                        jQuery('#ext_amounts').html('');
                        
                    }
              
            }
            else if (measurement_type=='volume'){
                // attached with id
                jQuery('#ext_amount').html(op_price + ' ' + _ext_volume_output_meta);
                var p_price =  op_price * response
                p_price = p_price.toFixed(4);
                jQuery('#ext_amounts').html(pc_var_arguments.curr_string + p_price);
                jQuery('#set_price').val(op_price * response);
                jQuery('#set_mm').val(op_price);
                
                 if(jQuery('#pc_quantity_needed').val()==''){

                    jQuery('#ext_amount').html('');
                    jQuery('#ext_amounts').html('');

                }
                
                 if(jQuery('#set_price').val()=='0'){

                        jQuery('#ext_amount').html('');
                        jQuery('#ext_amounts').html('');
                       
                }
            }
              

             
            
            // } else
             if(price_form == 'left_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%s %v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v%s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v %s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            }            
        }
    }); 
};


// ---------------------------------------
// --------------- - - - Area box by tiles  checkpoint
// ---------------------------------------
jQuery(function () {
    var product_id = jQuery("#pc_against_postid").val();
    var returncheck = false;
    jQuery.ajax({
        url:  pc_var_arguments.ajax_url, 
        type : 'post',
        data : {
            action : 'get_box_tiles_check',
            product_id
        },
        success : function(response) {
            if(response == 'boxtiles'){
                jQuery(".qty").attr('disabled','true');
                //haseeb changed
                pcmin=jQuery('#pc_product_type_table').attr("pcmin");
                pcmax=jQuery('#pc_product_type_table').attr("pcmax");
                jQuery(".qty").attr("min",pcmin);
                jQuery(".qty").attr("max",pcmax);

                jQuery("#length_qty, #width_qty").on('input keydown change keypress keyup',function (event) {
                    if (jQuery('#length_qty').val()=="" && jQuery('#width_qty').val()=="" ){
                        // jQuery(".qty").removeAttr('disabled');
                        jQuery('.pc_qty_err').attr("hidden","true");
                        jQuery('.single_add_to_cart_button').removeAttr("disabled");    
                    } else {
                        jQuery(".qty").attr('disabled','true');
                    }
                    // disabled the input if its boxtype product
        

                    //haseeb edit
                    jQuery(".single_add_to_cart_button").prop('disabled',true);

                    // getting the area with length and width
                    var area_length = document.getElementById('length_qty').value;    
                    var area_width = document.getElementById('width_qty').value;
              
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

                    // total required area
                    var box_required_are = area_length * area_width;

                       //unit
                    var price_unit=jQuery('#_per_unit').val();
                    //lenght and width meta
                    var length_meta=jQuery('#length_meta').val();
                    var width_meta=jQuery('#width_meta').val();
                    //////////////////////////////////////////

                    if(length_meta == "m" && width_meta == "m" && price_unit == "sq_ft"){
                        box_required_are = box_required_are * 10.7639
                    }
                    if(length_meta == "ft" && width_meta == "ft" && price_unit == "sq_m"){
                        box_required_are = box_required_are / 10.7639 * 0.09290304
                    }

                    // total box area
                    var total_area = document.getElementById('_ext_box_area').value;
                    // calcualting the number of box required
                    if( box_required_are < total_area ) {
                        box_required_are = total_area;
                    } else if (box_required_are > total_area) {
                        var reminder = box_required_are/total_area;
                        rminde = reminder.toString().split(".")[0]; 
                        var once = total_area * rminde;

                        box_required_are = +once + +total_area;
                        box_required_are = box_required_are.toFixed(2);
                        
                    }
                    // get the totla box numbers
                    var qtytoi = Math.round(box_required_are/total_area);
                    jQuery(".qty").add(qtytoi);
                    jQuery(".qty").val(qtytoi);
                    jQuery('#result').html(box_required_are);
                    jQuery('#pc_quantity_needed').attr('value',qtytoi);
                    get_item_quantity_box(qtytoi);

                });
            }
        }
    });
});

function get_item_quantity_box(quantity) {
    console.log(quantity);
    var product_id = jQuery("#pc_against_postid").val();
    var ajaxurl = "<?php echo admin_url( 'admin-ajax.php'); ?>";
    var condition = 'adv_boxtiles_product_condition';
    jQuery.ajax({
        url : pc_var_arguments.ajax_url,
        type : 'post',
        data : {
            action : 'boxtiles_action_ajax',
            condition :condition,
            quantity : quantity,
            product_id : product_id,
        },
        success : function( response ) {
            // console.log(response);

            if (response=='true'){
                // jQuery('.single_add_to_cart_button').addHTML("<h3> Quantity is not in limit </h3>");
               jQuery('.pc_qty_err').removeAttr("hidden");  
                jQuery('.single_add_to_cart_button').attr("disabled",true);
                jQuery('.single_add_to_cart_button').unbind('click');
                return;
            } else {
                jQuery('.pc_qty_err').attr("hidden","true");
                jQuery('.single_add_to_cart_button').removeAttr("disabled");
            }
            var price_form = pc_var_arguments.curr_pos;
            var op_price = "";
            if(price_form == 'left') {
                
                op_price = accounting.formatMoney(response, { 
                    symbol: pc_var_arguments.curr_string,
                    format: "%s%v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            } else if(price_form == 'left_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%s %v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v%s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v %s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            }

            // // attached with id
            jQuery('#ext_amount').html(response);
        }
    });  
    
}



// ---------------------------------------
// --------------- - - - Area length*width,,,
// ---------------------------------------
jQuery(function () {
    jQuery("#length_qty_area, #width_qty_area").on('input keydown change keypress',function (event) {
        

        // getting the area with length and width
        var area_length = document.getElementById('length_qty_area').value;    
        var area_width = document.getElementById('width_qty_area').value;

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

        var total_area = area_length * area_width;
        jQuery('#result').html(total_area);
        jQuery('#pc_quantity_needed').attr('value',total_area);
        var quantity = jQuery("#pc_quantity_needed").val();
        get_item_quantity(quantity);

    });
});

function get_item_quantity(quantity) {
    var product_id = jQuery("#pc_against_postid").val();
    var ajaxurl = "<?php echo admin_url( 'admin-ajax.php'); ?>";
    var condition = 'area_lw_product_condition';
    jQuery.ajax({
        url : pc_var_arguments.ajax_url,
        type : 'post',
        data : {
            action : 'arealw_action_ajax',
            condition :condition,
            quantity : quantity,
            product_id : product_id,
        },
        success : function( response ) {
            var price_form = pc_var_arguments.curr_pos;
            var op_price = "";
            if(price_form == 'left') {
                
                op_price = accounting.formatMoney(response, { 
                    symbol: pc_var_arguments.curr_string,
                    format: "%s%v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            } else if(price_form == 'left_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%s %v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v%s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v %s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            }
            // attached with id
            jQuery('#ext_amount').html(op_price);
        }
    });  
    
}


// ---------------------------------------
// --------------- - - - Room Walls length*width,,,
// ---------------------------------------
jQuery(function () {
    jQuery("#length_qty_wall, #width_qty_wall").on('input keydown change keypress',function (event) {
        
        // getting the area with length and width
        var wall_length = document.getElementById('length_qty_wall').value;    
        var wall_width = document.getElementById('width_qty_wall').value;

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

        var total_area = wall_length * wall_width;
        jQuery('#result').html(total_area);
        jQuery('#pc_quantity_needed').attr('value',total_area);
        var quantity = jQuery("#pc_quantity_needed").val();
        // console.log("a:"+total_area)
        //haseeb changed wall
        jQuery('#set_mm').val(total_area);
        get_item_quantity(quantity);



    });
});

function get_item_quantity(quantity) {
    var product_id = jQuery("#pc_against_postid").val();
    var ajaxurl = "<?php echo admin_url( 'admin-ajax.php'); ?>";
    var condition = 'roomwall_product_condition';
    jQuery.ajax({
        url : pc_var_arguments.ajax_url,
        type : 'post',
        data : {
            action : 'roomwall_action_ajax',
            condition :condition,
            quantity : quantity,
            product_id : product_id,
        },
        success : function( response ) {
            var price_form = pc_var_arguments.curr_pos;
            var op_price = "";
            if(price_form == 'left') {
                
                op_price = accounting.formatMoney(response, { 
                    symbol: pc_var_arguments.curr_string,
                    format: "%s%v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            } else if(price_form == 'left_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%s %v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v%s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v %s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            }
            // attached with id
            jQuery('#ext_amount').html(op_price);
        }
    });  
    
}


// ---------------------------------------
// --------------- - - - volume advanced mulch product,,,
// ---------------------------------------
jQuery(function () {
    jQuery("#length_qty_vol, #width_qty_vol, #height_qty_vol").on('input keydown change keypress',function (event) {

        // getting the area with length and width
        var length_voladv = document.getElementById('length_qty_vol').value;    
        var width_voladv = document.getElementById('width_qty_vol').value;
        var height_voladv = document.getElementById('height_qty_vol').value;

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


        var inch_to_feet  = height_voladv / 12;

        var total_to_three = inch_to_feet * width_voladv * length_voladv ;
        var totay_cu_yad = total_to_three / 27;
        var net_cubeyard = totay_cu_yad.toFixed(3);
        jQuery('#result').html(net_cubeyard);
        jQuery('#pc_quantity_needed').attr('value',net_cubeyard);
        var quantity = jQuery("#pc_quantity_needed").val();
        get_item_quantity(quantity);

    });
});

function get_item_quantity(quantity) {
    var product_id = jQuery("#pc_against_postid").val();
    var ajaxurl = "<?php echo admin_url( 'admin-ajax.php'); ?>";
    var condition = 'volumed_product_condition';
    jQuery.ajax({
        url : pc_var_arguments.ajax_url,
        type : 'post',
        data : {
            action : 'volumed_action_ajax',
            condition :condition,
            quantity : quantity,
            product_id : product_id,
        },
        success : function( response ) {
            var price_form = pc_var_arguments.curr_pos;
            var op_price = "";
            if(price_form == 'left') {
                
                op_price = accounting.formatMoney(response, { 
                    symbol: pc_var_arguments.curr_string,
                    format: "%s%v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            } else if(price_form == 'left_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%s %v" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v%s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99

            } else if(price_form == 'right_space') {
                
                op_price = accounting.formatMoney(response, {
                    symbol: pc_var_arguments.curr_string,
                    format: "%v %s" }, 
                        pc_var_arguments.pc_decimal,
                        pc_var_arguments.pc_thou_sep,
                        pc_var_arguments.pc_decimal_sep
                ); // €4.999,99
            
            }
            // attached with id
            jQuery('#ext_amount').html(op_price);
        }
    });  
    
}
