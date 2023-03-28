<?php 
/*
Plugin Name: Extendons Woocommerce Measurement Price Calculator
Plugin URI: http://extendons.com
Description: For the purpose of calculating price based on customer measurements.
Author: Extendons
Version: 2.1.2
Developed By: Extendons
Author URI: http://extendons.com/
Support: http://support@extendons.com
textdomain: extendons-price-calculator
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}// Exit if accessed directly
	

if ( !in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {

	function pc_ifwoocommerce_not_active() {

		deactivate_plugins(__FILE__);

		$error_message = __('<div class="error notice"><p>This plugin requires <a href="http://wordpress.org/extend/plugins/woocommerce/">WooCommerce</a> plugin to be installed and active!</p></div>', 'extendons-price-calculator');

		wp_die(filter_var($error_message));
	}

	add_action( 'admin_notice', 'pc_ifwoocommerce_not_active' );
}

// MAIN CLASS PRICE CALCULATOR
class EXTENDONS_PRICE_CALCULATOR_MAIN {
	
	// constructor main class
	public function __construct() {

		$this->module_constant();
		
		// deleting save ragnes
		add_action( 'wp_ajax_pc_deleting_saved_field', array($this,'pc_save_delete_price_row' ));
		add_action( 'wp_ajax_nopriv_pc_deleting_saved_field', array($this,'pc_save_delete_price_row' ));

		// reset product to normal
		add_action( 'wp_ajax_resetProductNormalCallback', array($this,'productResetCallback' ));
		add_action( 'wp_ajax_nopriv_resetProductNormalCallback', array($this,'productResetCallback' ));
		
		// including the classes
		require_once( PC_PCALCULATOR_INVOICES_DIR . 'extendons-price-calculator-admin.php');
		require_once( PC_PCALCULATOR_INVOICES_DIR . 'Include/extendons-price-calculator-variable.php');
		require_once( PC_PCALCULATOR_INVOICES_DIR . 'Include/extendons-price-calculator-variable-callback.php');
		// variable product support
		require_once( PC_PCALCULATOR_INVOICES_DIR . 'extendons-price-calculator-front.php');
		
		add_action('wp_loaded', array( $this, 'main_scripts_sytles_enqueue'));
		
		add_filter( 'woocommerce_is_purchasable', array($this, 'is_product_purchasable_measurement'), 10, 2 );

		// all single, simple products populated from this ajax call
		add_action( 'wp_ajax_weight_action_ajax', array($this,'weight_ajax_function' ));
		add_action( 'wp_ajax_nopriv_weight_action_ajax', array($this,'weight_ajax_function' ));

		// box by tile product type
		add_action( 'wp_ajax_boxtiles_action_ajax', array($this,'boxtiles_ajax_function' ));
		add_action( 'wp_ajax_nopriv_boxtiles_action_ajax', array($this,'boxtiles_ajax_function' ));

		// area length into width
		add_action( 'wp_ajax_arealw_action_ajax', array($this,'area_lw_ajax_function' ));
		add_action( 'wp_ajax_nopriv_arealw_action_ajax', array($this,'area_lw_ajax_function' ));

		// room walls
		add_action( 'wp_ajax_roomwall_action_ajax', array($this,'roomwalls_ajax_function' ));
		add_action( 'wp_ajax_nopriv_roomwall_action_ajax', array($this,'roomwalls_ajax_function' ));

		// room walls
		add_action( 'wp_ajax_volumed_action_ajax', array($this,'volumeadv_ajax_function' ));
		add_action( 'wp_ajax_nopriv_volumed_action_ajax', array($this,'volumeadv_ajax_function' ));

		//box check
		add_action( 'wp_ajax_get_box_tiles_check', array($this,'get_box_tiles_check' ));
		add_action( 'wp_ajax_nopriv_get_box_tiles_check', array($this,'get_box_tiles_check' ));
		
	} //the equalizer 2018, 

	/**
	 * Ajax callback for single and simple products
	 *
	*/

	public function get_box_tiles_check(){
		$product_id = (isset($_REQUEST['product_id'])) ? filter_var($_REQUEST['product_id']) : "";
		$checkkkk = get_post_meta($product_id, '_pc_measurement_type', true);
		echo filter_var($checkkkk);
		wp_die();
	}
	

	public function weight_ajax_function() {
		
		global $wpdb;
		
		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}

		if (isset($_POST['condition']) || 'weight_base_condition' == $_POST['condition'] || isset($_POST['quantity']) || isset($_POST['weight_product_id'])) {
				
				$quantiti_weight = filter_var($_POST['quantity']);
					// var_dump($quantiti_weight);
				$product_id = filter_var($_POST['weight_product_id']);

				$ranges_table = get_post_meta($product_id, '_pc_product_price_ranges', true);
				$minimum_price = get_post_meta($product_id, '_pc_minimum_price', true);

				$flag = 0;
				
				foreach ($ranges_table as $ranges) {

					if ($quantiti_weight >= $ranges['start_rang'] && $quantiti_weight <= $ranges['end_rang'] ) { 

						if (''== $ranges['sale_price_per_unit'] && '' ==  $ranges['price_per_unit']) {

							$pc_price = $minimum_price;

							$flag = 1;

						} else {

							if ('' != $ranges['sale_price_per_unit'] ) {

								$pc_price = $ranges['sale_price_per_unit'];

								$flag = 1;

							} else {

								$pc_price = $ranges['price_per_unit'];

								$flag = 1;
							}

						}	
					} 
				}

			if (1 == $flag) {

				echo filter_var($pc_price);
				die();
				
			} else {
				
				$pc_price = $minimum_price;
				echo filter_var($pc_price);
				die();
			} 
		
		}
		 wp_die();
		
	}

	/**
	 * Ajax callback for boxtiles
	 *
	*/
	public function boxtiles_ajax_function() {

		global $wpdb;

		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}
			
		if (isset($_POST['condition']) && 'adv_boxtiles_product_condition' == $_POST['condition'] || isset($_POST['quantity']) || isset($_POST['product_id'])) {
				
				$quantiti_weight = filter_var($_POST['quantity']);
				
				$product_id = filter_var($_POST['product_id']);

				$per_sq_ft  = get_post_meta($product_id, '_ext_boxtiles_persqft', true);

				$area_covered = get_post_meta($product_id, '_ext_boxtiles_totalarea_covered', true);

				$total = $per_sq_ft * $area_covered;

				$total_box_price =  $total * $quantiti_weight;

				$min_qty= get_post_meta( $product_id, '_pc_minimum_quantity', true);
				$max_qty= get_post_meta( $product_id, '_pc_maximum_quantity' , true);

				if(empty($min_qty)){
					$min_qty=0;
				}
				if(empty($max_qty)){
					$max_qty=INF;
				}
				
				$qty_exceed='false';

				if ($quantiti_weight < $min_qty || $quantiti_weight > $max_qty ) {
					
					$qty_exceed='true';

					echo $qty_exceed;

					wp_die();
				}

			   echo number_format( ( float ) $total_box_price, 2, '.', '');


		} wp_die();
	}

	/**
	 * Ajax callback for area length * width
	 *
	*/
	public function area_lw_ajax_function() {
		
		global $wpdb;
			
		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}
			
		if (isset($_POST['condition']) &&'area_lw_product_condition' ==  $_POST['condition'] || isset($_POST['quantity']) || isset($_POST['product_id'])) {
				
				$quantiti_weight = filter_var($_POST['quantity']);
				
				$product_id = filter_var($_POST['product_id']);

				$ranges_table = get_post_meta($product_id, '_pc_product_price_ranges', true);
				$minimum_price = get_post_meta($product_id, '_pc_minimum_price', true);

				$flag = 0;
				
			foreach ($ranges_table as $ranges) {
 
				if ($quantiti_weight >= $ranges['start_rang'] && $quantiti_weight <= $ranges['end_rang'] ) { 
	  
					if ('' != $ranges['sale_price_per_unit'] ) {
					   
						$pc_price = $quantiti_weight * $ranges['sale_price_per_unit'];
					   
						$flag = 1;

					} else {
					   
						$pc_price = $quantiti_weight * $ranges['price_per_unit'];
					   
						$flag = 1;
					}
				}
			}

			if (1 == $flag) {
				   
				   echo filter_var($pc_price);
				
			} else {
				
					$pc_price = $quantiti_weight * $minimum_price;
					echo filter_var($pc_price);
				
			}

		} wp_die();
		
	}

	/**
	 * Ajax callback for room walls
	 *
	*/
	public function roomwalls_ajax_function() {
		
		global $wpdb;

		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}
			
		if (isset($_POST['condition']) &&'roomwall_product_condition' == $_POST['condition'] || isset($_POST['quantity']) || isset($_POST['product_id'])) {
				
				$quantiti_weight = filter_var($_POST['quantity']);
				
				$product_id = filter_var($_POST['product_id']);

				$ranges_table = get_post_meta($product_id, '_pc_product_price_ranges', true);
				$minimum_price = get_post_meta($product_id, '_pc_minimum_price', true);

				$flag = 0;
				
			foreach ($ranges_table as $ranges) {
 
				if ($quantiti_weight >= $ranges['start_rang'] && $quantiti_weight <= $ranges['end_rang'] ) { 
	  
					if ('' != $ranges['sale_price_per_unit'] ) {
					   
						$pc_price = $quantiti_weight * $ranges['sale_price_per_unit'];
					   
						$flag = 1;

					} else {
					   
						$pc_price = $quantiti_weight * $ranges['price_per_unit'];
					   
						$flag = 1;
					}
				}
			}

			if (1 == $flag) {
				   
				   echo filter_var($pc_price);
				
			} else {
				
				   $pc_price = $quantiti_weight * $minimum_price;
				   echo filter_var($pc_price);
				
			}

		} wp_die();
		
	}


	/**
	 * Ajax callback for volume advanced
	 *
	*/
	public function volumeadv_ajax_function() {
		
		global $wpdb;

		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}
			
		if (isset($_POST['condition']) &&'volumed_product_condition' == $_POST['condition'] || isset($_POST['quantity']) || isset($_POST['product_id'])) {
				
				$quantiti_weight = filter_var($_POST['quantity']);
				
				$product_id = filter_var($_POST['product_id']);

				$ranges_table = get_post_meta($product_id, '_pc_product_price_ranges', true);
				$minimum_price = get_post_meta($product_id, '_pc_minimum_price', true);

				$flag = 0;
				
			foreach ($ranges_table as $ranges) {
	 
				if ($quantiti_weight >= $ranges['start_rang'] && $quantiti_weight <= $ranges['end_rang'] ) { 
	  
					if ('' != $ranges['sale_price_per_unit']) {
					   
						$pc_price = $quantiti_weight * $ranges['sale_price_per_unit'];
					   
						$flag = 1;

					} else {
					   
						$pc_price = $quantiti_weight * $ranges['price_per_unit'];
					   
						$flag = 1;
					}
				}
			}

			if (1 == $flag) {
				   
				   echo filter_var($pc_price);
				
			} else {	
					$pc_price = $quantiti_weight * $minimum_price;
					echo filter_var($pc_price);
				
			}

		} wp_die();
		
	}


	/**
	 * Allowing the price calcualtor product to purchasable
	 *
	*/
	public function is_product_purchasable_measurement( $purchasable, $product ) {
	
		if ( $product->get_type() == 'price_calculator') {
	
			$purchasable = true;
		}
	
		return $purchasable;
	}

	/**
	 * Remove the save price ranges
	 *
	*/
	public function pc_save_delete_price_row() {

		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}

		if (isset($_POST['condition']) && 'pc_delete_saved_row' == $_POST['condition'] || isset($_POST['p_id']) || isset($_POST['id'])) {

			$row_delete_id = filter_var($_POST['id']);
			$array_key = $row_delete_id[5];
			echo  filter_var($array_key);
			$saved_ranges = get_post_meta(filter_var($_POST['p_id']), '_pc_product_price_ranges', true);
			unset($saved_ranges[$array_key]);
			$reindex = array_values($saved_ranges);
			update_post_meta( filter_var($_POST['p_id']), '_pc_product_price_ranges', $reindex);
		}
		
		wp_die();
	}

	public function productResetCallback() {

		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}

		if (isset($_POST['condition']) &&'resetProductNormal' == $_POST['condition'] || isset($_POST['productID']) || isset($_POST['producType'])) {

			global $wpdb;

			$product_id = filter_var($_POST['productID']);
			$product_type = filter_var($_POST['producType']);

			if (isset($product_type) &&'weight' == $product_type  ||'area' == $product_type  ||'length' == $product_type  ||'volume' == $product_type  ) {

				// deleting the post meta
				delete_post_meta($product_id, '_ext_' . $product_type . '_price_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_label_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . 't_field_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_unit_meta');
				delete_post_meta($product_id, '_pc_minimum_quantity');
				delete_post_meta($product_id, '_pc_maximum_quantity');
				delete_post_meta($product_id, '_pc_minimum_price');
				delete_post_meta($product_id, '_pc_product_price_ranges');
				delete_post_meta($product_id, '_pc_measurement_type');
				// set product to normal
				wp_set_object_terms( $product_id, null, 'product_type' );

			} else if (isset($product_type) && 'area_lw' == $product_type  || 'wall' == $product_type ) {

				// deleting the post meta
				delete_post_meta($product_id, '_ext_' . $product_type . '_price_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_label_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . 't_field_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_unit_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_length_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_length_unit');
				delete_post_meta($product_id, '_ext_' . $product_type . '_width_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_width_unit');
				delete_post_meta($product_id, '_pc_minimum_quantity');
				delete_post_meta($product_id, '_pc_maximum_quantity');
				delete_post_meta($product_id, '_pc_minimum_price');
				delete_post_meta($product_id, '_pc_product_price_ranges');
				delete_post_meta($product_id, '_pc_measurement_type');
				// set product to normal
				wp_set_object_terms( $product_id, null, 'product_type' );

			} else if (isset($product_type) && 'boxtiles' == $product_type ) {

				// deleting the post meta
				delete_post_meta($product_id, '_ext_' . $product_type . '_price_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_label_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . 't_field_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_unit_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_length_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_length_unit');
				delete_post_meta($product_id, '_ext_' . $product_type . '_width_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_width_unit');
				delete_post_meta($product_id, '_ext_' . $product_type . ' _persqft');
				delete_post_meta($product_id, '_ext_' . $product_type . '_totalarea_covered');
				delete_post_meta($product_id, '_pc_minimum_quantity');
				delete_post_meta($product_id, '_pc_maximum_quantity');
				delete_post_meta($product_id, '_pc_minimum_price');
				delete_post_meta($product_id, '_pc_product_price_ranges');
				delete_post_meta($product_id, '_pc_measurement_type');
				// set product to normal
				wp_set_object_terms( $product_id, null, 'product_type' );

			} else if (isset($product_type) &&'volumeadv' == $product_type) {

				// deleting the post meta
				delete_post_meta($product_id, '_ext_' . $product_type . '_price_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_label_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . 't_field_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_unit_meta');
				delete_post_meta($product_id, '_ext_' . $product_type . '_length_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_length_unit');
				delete_post_meta($product_id, '_ext_' . $product_type . '_width_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_width_unit');
				delete_post_meta($product_id, '_ext_' . $product_type . '_height_label');
				delete_post_meta($product_id, '_ext_' . $product_type . '_height_unit');
				delete_post_meta($product_id, '_pc_minimum_quantity');
				delete_post_meta($product_id, '_pc_maximum_quantity');
				delete_post_meta($product_id, '_pc_minimum_price');
				delete_post_meta($product_id, '_pc_product_price_ranges');
				delete_post_meta($product_id, '_pc_measurement_type');
				// set product to normal
				wp_set_object_terms( $product_id, null, 'product_type' );
			}

		} wp_die();
	}

	/**
	 * Module constant for price calculator
	 *
	*/
	public function module_constant() {

		if ( !defined( 'PC_PCALCULATOR_INVOICES_URL' ) ) {
			define( 'PC_PCALCULATOR_INVOICES_URL', plugin_dir_url( __FILE__ ) );
		}

		if ( !defined( 'PC_PCALCULATOR_INVOICES_BASENAME' ) ) {
			define( 'PC_PCALCULATOR_INVOICES_BASENAME', plugin_basename( __FILE__ ) );
		}

		if ( ! defined( 'PC_PCALCULATOR_INVOICES_DIR' ) ) {
			define( 'PC_PCALCULATOR_INVOICES_DIR', plugin_dir_path( __FILE__ ) );
		}
		if ( !defined( 'PC_PCALCULATOR_TEMPLATE_PATH' ) ) {
			define( 'PC_PCALCULATOR_TEMPLATE_PATH', PC_PCALCULATOR_INVOICES_DIR . 'templates' );
		}
	}

	/**
	 * Enqueue the styles for plugin
	 *
	*/
	public function main_scripts_sytles_enqueue() { 

		wp_enqueue_script('jquery');	
		
		wp_enqueue_script('pc_accounting-js', plugins_url( 'Scripts/accounting.min.js', __FILE__ ), false  , '1.0');
		
		wp_enqueue_style('pc_backend-css', plugins_url( '/Styles/backend.css', __FILE__ ), false  , '1.0');
		
		wp_enqueue_style( 'pc-bootstrap-admin-css', plugins_url( '/Styles/bootstrap-iso.css', __FILE__ ), false  , '1.0');
		
		wp_enqueue_script('pc-bootstrap-js', plugins_url( 'Scripts/bootstrap.min.js', __FILE__ ), false  , '1.0');

		wp_enqueue_style('pc-font-awesome-css', plugins_url( '/Styles/font-awesome.min.css', __FILE__ ), false , '1.0');
		
		if ( function_exists('load_plugin_textdomain') ) {
			load_plugin_textdomain( 'extendons-price-calculator', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}

	} 	

} new EXTENDONS_PRICE_CALCULATOR_MAIN();

