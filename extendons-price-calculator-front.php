<?php  
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}// Exit if accessed directly

// FRONT END PRICE CALCULATOR CLASS
class EXTENDONS_PRICE_CALCULATOR_FRONT extends EXTENDONS_PRICE_CALCULATOR_MAIN {
	
	// constructor front class
	public function __construct() {

		add_action( 'wp', array($this,'front_scripts_sytles_enqueue' ));

		add_action( 'woocommerce_single_product_summary', array($this,'pc_calling_single_template' ));

		add_action( 'pc_before_add_to_cart_button', array($this,'pc_calculator_fields_before_add_to_cart' ));

		add_filter( 'woocommerce_product_tabs', array($this,'price_calculater_new_tab' ), 98);

		add_filter( 'pc_showing_price_after_title', array($this,'pc_displaty_product_price' ));

		add_filter( 'woocommerce_add_cart_item', array($this,'add_cart_item' ), 20, 1);

		add_filter( 'woocommerce_add_cart_item_data', array($this,'addProductToCart' ), 10, 2 );

		add_filter( 'woocommerce_get_cart_item_from_session', array($this, 'get_cart_item_from_session' ), 10, 2);   

		add_filter( 'woocommerce_get_item_data', array($this,'getting_car_item_data' ), 10, 2);

		add_filter( 'woocommerce_cart_item_price', array($this,'filter_woocommerce_cart_item_price' ), 10, 3 );

		add_action( 'pc_show_short_description', array($this,'pc_showing_product_stock' ), 10);

		add_action( 'pc_showing_min_price', array($this, 'pc_showing_min_price_callback' )); 

		//add_filter( 'woocommerce_get_price_html', array($this, 'pc_change_product_price_display_shop') );

		add_filter( 'woocommerce_add_to_cart_validation', array($this, 'pc_add_to_cart_quantity_validation'), 10, 5 );

		//	add_filter( 'woocommerce_loop_add_to_cart_link', array($this,'pc_shop_page_add_tocart_text' ));

		add_action( 'woocommerce_shop_loop_item_title', array($this, 'pc_show_sale_percentage_loop'), 25 );

		add_action( 'woocommerce_add_order_item_meta', array($this, 'pc_add_order_item_meta') , 10, 2 );

		add_filter( 'woocommerce_cart_item_quantity', array( $this, 'pc_woocommerce_cart_item_quantity' ), 10, 2 );

		add_action( 'pc_show_desc', array( $this, 'pc_show_desc' ), 10, 2 );


	}


	/**
	 * Showing stock quantity in frontend
	 *
	*/

	public function  pc_show_desc(){
		global $product;
		if ( $product->get_short_description() ) {
			echo '<div class="product-short-description">' . apply_filters( 'woocommerce_short_description', $product->get_short_description() ) . '</div>';
		}
	}
	
	public function pc_showing_product_stock() {

		global $product;

		if ( $product->get_stock_quantity() ) {

			if ( number_format( $product->get_stock_quantity() , 0 , '' , '' ) < 3 ) {

				printf (
					esc_html__('extendons-price-calculator' ),
					'<p class="stock in-stock">' . esc_html__( number_format($product->get_stock_quantity() , 0 , '' , '') . ' left in stock', '' ) . '</p>'
				);

			} else {

				printf (
					esc_html__('extendons-price-calculator' ),
					'<p class="stock in-stock">' . esc_html__( number_format($product->get_stock_quantity() , 0 , '' , '') . ' left in stock', '' ) . '</p>'
				);
			}
		}
	}

	/**
	 * Adding product to cart
	 *
	*/
	public function add_cart_item( $cart_items ) {


		$prduct_id = $cart_items['product_id'];

		$_product = wc_get_product( $prduct_id );
		$measurement_type = get_post_meta($prduct_id, '_pc_measurement_type', true);

		if ('price_calculator' == $_product->get_type()) {

			// -----------------------------------------------------//
			// --------------If its boxtiles product----------------//
			// -----------------------------------------------------//
			if (isset($cart_items['pc_product_type']) && 'pc_boxtiles_product' == $cart_items['pc_product_type']) {

				// getting the product information if its box tile  
				$box_area = get_post_meta($prduct_id, '_ext_boxtiles_totalarea_covered', true);
				$per_sqft = get_post_meta($prduct_id, '_ext_boxtiles_persqft', true);
				// calculating the box price
				$totalBoxPrice = $box_area * $per_sqft;

				// returning the price
				$cart_items['data']->set_price($totalBoxPrice * $cart_items['pc_quantity_needed']); 

				return $cart_items;
			}

			if ('weight' == $measurement_type ||'area' == $measurement_type ||'length' == $measurement_type ||'volume' == $measurement_type) {
				$product_quantity_required = $cart_items['get_price'];
			} else {

				$product_quantity_required = $cart_items['pc_quantity_needed'];
			}
			$product_quantity_required=floatval($product_quantity_required);


			$ranges_table = get_post_meta($prduct_id, '_pc_product_price_ranges', true);
			$minimum_price = get_post_meta($prduct_id, '_pc_minimum_price', true);
			$minimum_price=floatval($minimum_price);

			$flag = 0;

			if ('weight' == $measurement_type ||'area' == $measurement_type ||'length' == $measurement_type ||'volume' == $measurement_type) {

				if ($ranges_table) {

					foreach ($ranges_table as $ranges) {

						if ($product_quantity_required >= $ranges['start_rang'] && $product_quantity_required <= $ranges['end_rang'] ) { 

							if ('' != $ranges['sale_price_per_unit']) {

								$pc_price = $product_quantity_required;

								$flag = 1;

							} else {

								$pc_price = $product_quantity_required;

								$flag = 1;
							}
						}
					}
				}

			} else {

				if ($ranges_table) {

					foreach ($ranges_table as $ranges) {

						if ($product_quantity_required >= $ranges['start_rang'] && $product_quantity_required <= $ranges['end_rang'] ) { 

							if ('' != $ranges['sale_price_per_unit']) {

								$pc_price = $product_quantity_required * floatval($ranges['sale_price_per_unit']);

								$flag = 1;

							} else {

								$pc_price = $product_quantity_required * floatval($ranges['price_per_unit']);

								$flag = 1;
							}
						}
					}
				}
			}
			if (1 == $flag) {

				$cart_items['data']->set_price($pc_price);
				
			} 
			else {
				
				if ('weight' == $measurement_type ||'area' == $measurement_type ||'length' == $measurement_type ||'volume' == $measurement_type || 'area_lw' == $measurement_type) {
					if(isset($minimum_price) && !empty($minimum_price)){
						$cart_items['data']->set_price($product_quantity_required *$minimum_price); 
					}
					else{

						$cart_items['data']->set_price($product_quantity_required); 
					}


				} 
				else {

					if(isset($minimum_price) && !empty($minimum_price)){
						$cart_items['data']->set_price($product_quantity_required * $minimum_price); 

					}
					else{

						$cart_items['data']->set_price($product_quantity_required ); 

					}
				}


			}

			return $cart_items;
		}

		return $cart_items;
	}
	/**
	 * Sending request variables to cart
	 *
	*/
	public function addProductToCart( $cart_item_data, $product_id ) {

		$_product = wc_get_product( $product_id );


		if ( $_product->is_type( 'variable' ) ) {

			$mearurement_type = get_post_meta($product_id, '_pc_measurement_type', true);

			if (isset($mearurement_type) && '' != $mearurement_type || isset($_REQUEST['pcv_quantity_needed']) || isset($_REQUEST['pcv_product_type'])) {

				// simple products
				$cart_item_data[ 'pcv_product_type' ] = filter_var($_REQUEST['pcv_product_type']);
				$cart_item_data[ 'pcv_quantity_needed' ] = filter_var($_REQUEST['pcv_quantity_needed']);
				if (isset($_REQUEST['get_price'])) {
					$cart_item_data['get_price'] = filter_var($_REQUEST['get_price']);
				}

				// area length into width
				if (isset($_REQUEST['vlength_qty_area']) &&'' != $_REQUEST['vlength_qty_area']) { 
					$cart_item_data[ 'vlength_measurement' ] = filter_var($_REQUEST['vlength_qty_area']);
				}
				if (isset($_REQUEST['vwidth_qty_area']) &&'' != $_REQUEST['vwidth_qty_area']) {
					$cart_item_data[ 'vwidth_measurement' ] = filter_var($_REQUEST['vwidth_qty_area']);
				}

				// for volume advanced
				if (isset($_REQUEST['vlength_qty_vol']) &&'' != $_REQUEST['vlength_qty_vol']) {
					$cart_item_data[ 'vvlength_measurement' ] = filter_var($_REQUEST['vlength_qty_vol']);
				}
				if (isset($_REQUEST['vwidth_qty_vol']) &&'' != $_REQUEST['vwidth_qty_vol']) {
					$cart_item_data[ 'vvwidth_measurement' ] = filter_var($_REQUEST['vwidth_qty_vol']);
				}
				if (isset($_REQUEST['vheight_qty_vol']) &&'' != $_REQUEST['vheight_qty_vol']) {
					$cart_item_data[ 'vvheight_measurement' ] = filter_var($_REQUEST['vheight_qty_vol']);
				}

				return $cart_item_data;
			}

		} else {

			if ('price_calculator' == $_product->get_type() && isset($_REQUEST['get_price']) || isset($_REQUEST['pc_quantity_needed']) || isset($_REQUEST['pc_product_type'])) {

				$get_price = '';
				$pc_quantity_needed = '';
				if(isset($_REQUEST['get_price'])) {
					$get_price = $_REQUEST['get_price'];
				}

				if(isset($_REQUEST['pc_quantity_needed'])) {
					$pc_quantity_needed = $_REQUEST['pc_quantity_needed'];
				}

				$cart_item_data[ 'pc_product_type' ] = filter_var($_REQUEST['pc_product_type']);
				$cart_item_data[ 'pc_quantity_needed' ] = $pc_quantity_needed;
				$cart_item_data['get_price'] = $get_price;

				// for area length into width
				if (isset($_REQUEST['length_qty_area']) && '' != $_REQUEST['length_qty_area']) {
					$cart_item_data[ 'length_measurement' ] = filter_var($_REQUEST['length_qty_area']);
				}
				if (isset($_REQUEST['width_qty_area']) && '' != $_REQUEST['width_qty_area']) {
					$cart_item_data[ 'width_measurement' ] = filter_var($_REQUEST['width_qty_area']);
				}

				// for roomwalls
				if (isset($_REQUEST['length_qty_wall']) && '' != $_REQUEST['length_qty_wall']) {
					$cart_item_data[ 'wlength_measurement' ] = filter_var($_REQUEST['length_qty_wall']);
				}
				if (isset($_REQUEST['width_qty_wall']) && '' != $_REQUEST['width_qty_wall']) {
					$cart_item_data[ 'wwidth_measurement' ] = filter_var($_REQUEST['width_qty_wall']);
				}

				// for volume advanced
				if (isset($_REQUEST['length_qty_vol']) && '' != $_REQUEST['length_qty_vol'] ) {
					$cart_item_data[ 'vlength_measurement' ] = filter_var($_REQUEST['length_qty_vol']);
				}
				if (isset($_REQUEST['width_qty_vol']) && '' != $_REQUEST['width_qty_vol']) {
					$cart_item_data[ 'vwidth_measurement' ] = filter_var($_REQUEST['width_qty_vol']);
				}
				if (isset($_REQUEST['height_qty_vol']) &&'' != $_REQUEST['height_qty_vol']) {
					$cart_item_data[ 'vheight_measurement' ] = filter_var($_REQUEST['height_qty_vol']);
				}

				$cart_item_data['unique_key'] = md5( microtime() . rand() );

				return $cart_item_data;
			}

		}


		return $cart_item_data;
	}
	
	/**
	 * Displaying and holding the product in session
	 *
	*/
	public function get_cart_item_from_session( $cart_items, $values) {
		
		$cart_items = $this->add_cart_item($cart_items);

		return $cart_items;
	}

	/**
	 * Getting cart item data for price calculator
	 *
	*/
	public function getting_car_item_data( $cart_data, $carti = null ) {


		$custom_items = array();
		
		if ( !empty( $cart_data ) ) {

			$custom_items = $cart_data;
		}
		
		// weight base measurement
		if ( isset( $carti['pc_product_type']) && 'pc_weight_product' == $carti['pc_product_type'] ) { 
			// getting weight unit
			$asked_unit = get_post_meta($carti['product_id'], '_ext_weight_unit_meta', true);
			// adding weight unit meta
			$custom_items[] = array(
				'name' => __('Required Weight in ' . $asked_unit, 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);
		}
		// area base measurement
		if ( isset( $carti['pc_product_type']) && 'pc_area_product' == $carti['pc_product_type'] ) { 
			// getting area unit
			$asked_unit = get_post_meta($carti['product_id'], '_ext_area_unit_meta', true);
			// adding area unit meta
			$custom_items[] = array( 
				'name' => __('Required Area in ' . $asked_unit, 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);
		}
		// length base measurement
		if ( isset( $carti['pc_product_type']) && 'pc_length_product' == $carti['pc_product_type'] ) { 
			// getting length unit
			$asked_unit = get_post_meta($carti['product_id'], '_ext_length_unit_meta', true);
			// adding length unit meta
			$custom_items[] = array( 
				'name' => __('Required Length in ' . $asked_unit, 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);
		}
		// volume base measurement
		if ( isset( $carti['pc_product_type']) && 'pc_volume_product' == $carti['pc_product_type'] ) { 
			// getting volume unit
			$asked_unit = get_post_meta($carti['product_id'], '_ext_volume_unit_meta', true);
			// adding volume unit meta
			$custom_items[] = array( 
				'name' => __('Required Volume in ' . $asked_unit, 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);
		}
		// boxtiles measurment
		if ( isset( $carti['pc_product_type']) && 'pc_boxtiles_product' == $carti['pc_product_type']  ) { 
			// getting weight unit
			$asked_unit = get_post_meta($carti['product_id'], '_ext_boxtiles_unit_meta', true);
			// adding weight unit meta
			$custom_items[] = array(
				'name' => __('Total Box', 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed']
			);
		}
		// area length/width measurment
		if ( isset( $carti['pc_product_type']) && 'pc_area_lw_product' == $carti['pc_product_type'] ) { 
			// getting weight unit   _ext_area_lw_unit_meta
			$asked_unit = get_post_meta($carti['product_id'], '_ext_area_lw_unit_meta', true);
			$area_length = get_post_meta($carti['product_id'], '_ext_area_lw_length_unit_meta', true);
			$area_width = get_post_meta($carti['product_id'], '_ext_area_lw_width_unit_meta', true);
			
			// Area Length Required
			$custom_items[] = array(
				'name' => __('Area Length', 'extendons-price-calculator' ),
				'value' => $carti['length_measurement'] . ' ' . $area_length
			);
			// Area Width Required
			$custom_items[] = array(
				'name' => __('Area Width', 'extendons-price-calculator' ),
				'value' => $carti['width_measurement'] . ' ' . $area_width
			);

			// Total area of boxtiles
			$custom_items[] = array(
				'name' => __('Total Area', 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);

		}
		// room walls measurment
		if ( isset( $carti['pc_product_type']) && 'pc_wall_product' == $carti['pc_product_type']  ) { 
			// getting weight unit   _ext_area_lw_unit_meta
			$asked_unit = get_post_meta($carti['product_id'], '_ext_wall_unit_meta', true);
			$warea_length = get_post_meta($carti['product_id'], '_ext_wall_length_unit_meta', true);
			$warea_width = get_post_meta($carti['product_id'], '_ext_wall_width_unit_meta', true);
			
			// Area Length Required
			$custom_items[] = array(
				'name' => __('Area Length', 'extendons-price-calculator' ),
				'value' => $carti['wlength_measurement'] . ' ' . $warea_length
			);
			// Area Width Required
			$custom_items[] = array(
				'name' => __('Area Width', 'extendons-price-calculator' ),
				'value' => $carti['wwidth_measurement'] . ' ' . $warea_width
			);

			// Total area of boxtiles
			$custom_items[] = array(
				'name' => __('Total Area', 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);

		}
		// volume advanced measurment
		if ( isset( $carti['pc_product_type']) && 'pc_volumeadv_product' == $carti['pc_product_type'] ) { 
			// getting weight unit   _ext_area_lw_unit_meta
			$asked_unit = get_post_meta($carti['product_id'], '_ext_volumeadv_unit_meta', true);
			$varea_length = get_post_meta($carti['product_id'], '_ext_volumeadv_length_unit_meta', true);
			$varea_width = get_post_meta($carti['product_id'], '_ext_volumeadv_width_unit_meta', true);
			$varea_height = get_post_meta($carti['product_id'], '_ext_volumeadv_height_unit_meta', true);
			
			// Area Length Required
			$custom_items[] = array(
				'name' => __('Volume Length', 'extendons-price-calculator' ),
				'value' => $carti['vlength_measurement'] . ' ' . $varea_length
			);
			// Area Width Required
			$custom_items[] = array(
				'name' => __('Volume Width', 'extendons-price-calculator' ),
				'value' => $carti['vwidth_measurement'] . ' ' . $varea_width
			);
			// Area height Required
			$custom_items[] = array(
				'name' => __('Volume height', 'extendons-price-calculator' ),
				'value' => $carti['vheight_measurement'] . ' ' . $varea_height
			);

			// Total area of boxtiles
			$custom_items[] = array(
				'name' => __('Total Area', 'extendons-price-calculator' ),
				'value' => $carti['pc_quantity_needed'] . ' ' . $asked_unit
			);

		}

		return $custom_items;
	}


	/**
	 * Setting price in price calculator in cart
	 *
	*/
	public function filter_woocommerce_cart_item_price( $sale_item_price, $cart_item, $cart_item_key ) {

		$product_id = $cart_item['product_id'];

		$_product = wc_get_product( $product_id );

		$ranges_table = get_post_meta($product_id, '_pc_product_price_ranges', true);
		$minimum_price = get_post_meta($product_id, '_pc_minimum_price', true);
		$minimum_price=floatval($minimum_price);


		if ($_product->get_type() == 'price_calculator') {

			// -----------------------------------------------------//
			// --------------If its boxtiles product----------------//
			// -----------------------------------------------------//
			if (isset($cart_item['pc_product_type']) &&'pc_boxtiles_product' ==  $cart_item['pc_product_type']) {

				// getting the product information if its box tile  
				$box_area = get_post_meta($product_id, '_ext_boxtiles_totalarea_covered', true);
				$per_sqft = get_post_meta($product_id, '_ext_boxtiles_persqft', true);
				$sale_item_price = wc_price($box_area * $per_sqft);

				return $sale_item_price;
			}

			// rest of all product goes as it is
			$weight_needed = $cart_item['pc_quantity_needed'];

			$flag = 0;

			$measurement_type = get_post_meta($product_id, '_pc_measurement_type', true);

			if ('weight' == $measurement_type ||'area' == $measurement_type ||'length' == $measurement_type ||'volume' == $measurement_type || 'area_lw' == $measurement_type) {

				if ($ranges_table) {
					foreach ($ranges_table as $ranges) {
						if ($weight_needed >= $ranges['start_rang'] && $weight_needed <= $ranges['end_rang'] ) { 

							if ('' != $ranges['sale_price_per_unit']) {

								$sale_item_price = $ranges['sale_price_per_unit'] ;

								$flag = 1;

							} else {

								$sale_item_price =  $ranges['price_per_unit'] ;

								$flag = 1;
							}
						}
					}
				}

			} else {

				if ($ranges_table) {
					foreach ($ranges_table as $ranges) {
						if ($weight_needed >= $ranges['start_rang'] && $weight_needed <= $ranges['end_rang'] ) { 

							if ('' != $ranges['sale_price_per_unit']) {

								if(isset($minimum_price) && !empty($minimum_price)) {


									$sale_item_price = floatval($ranges['sale_price_per_unit']) * $minimum_price ;
								}
								else{
									$sale_item_price = floatval($ranges['sale_price_per_unit']);

								}

								$flag = 1;

							} else {
								if(isset($minimum_price) && !empty($minimum_price)){


									$sale_item_price =  floatval($ranges['price_per_unit']) * $minimum_price ;
								}
								else{
									$sale_item_price =  floatval($ranges['price_per_unit']);

								}

								$flag = 1;
							}
						}
					}
				}

			}

			
			if (1 == $flag ) {

				$sale_item_price;

			} else {

				$sale_item_price = $minimum_price;

			}
		return  get_woocommerce_currency_symbol()." ".$sale_item_price;

	}
		return $sale_item_price;

	}

	/**
	 * Adding tab for pc product ranges
	 *
	*/
	public function price_calculater_new_tab( $tabs ) {
		
		global $post, $product;

		if ( $product->is_type( 'price_calculator' )) {

			$measurement_type = get_post_meta($product->get_id(), '_pc_measurement_type', true);

			if (isset($measurement_type) && 'boxtiles' == $measurement_type) {

				return $tabs;

			} else {

				$tabs['product_question'] = array(
					'title'     => __( 'Pricing Table', 'extendons-price-calculator' ),
					'priority'  => 50,  
					'callback'  => array($this,'pc_ragnes_tab_callback')
				);
			}


		}

		return $tabs;  
	}

	/**
	 * Displaying data in single tab ranges
	 *
	*/
	public function pc_ragnes_tab_callback() { 

		global $post;
		// pricing table ranges
		$price_ranges = get_post_meta($post->ID, '_pc_product_price_ranges', true);
		// get measurement type
		$measurement_type = get_post_meta($post->ID, '_pc_measurement_type', true);
		// get measurment unit
		$measurement_unit = get_post_meta($post->ID, '_ext_' . $measurement_type . '_unit_meta', true); ?>

		<div id="pc_ranges_table" class="bootstrap-iso">
			<h2>
				<?php echo esc_html__('Product Pricing Table', 'extendons-price-calculator'); ?>        
			</h2>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>
							<?php echo esc_html__('Pricing Range', 'extendons-price-calculator'); ?>        
						</th>
						<th>
							<?php echo esc_html__('Regular Price', 'extendons-price-calculator'); ?>
						</th>
						<th>
							<?php echo esc_html__('Sale Price', 'extendons-price-calculator'); ?>
						</th>
					</tr>
				</thead>
				<tbody>
					<?php 
					if ($price_ranges) {
						foreach ($price_ranges as $key => $range) { 
							?>
							<tr>
								<td>
									<span class="pc-from-torange">
										<?php esc_html__('From', ''); ?>        
									</span>
									<?php echo filter_var($range['start_rang']) . '-' . filter_var($measurement_unit); ?>
									<span class="pc-from-torange">
										<?php esc_html__('To', ''); ?>        
									</span>
									<?php echo filter_var($range['end_rang']) . '-' . filter_var($measurement_unit); ?>        
								</td>
								<td>
									<?php if (!empty($range['sale_price_per_unit'])) { ?>
										<del><?php echo filter_var(wc_price($range['price_per_unit'])); ?></del> 
									<?php } else { ?>
										<?php echo filter_var(wc_price($range['price_per_unit'])); ?>
									<?php } ?>
								</td>
								<td>
									<?php echo filter_var(wc_price($range['sale_price_per_unit'])); ?>
								</td>
							</tr>
							<?php 
						}
					} 
					?>
				</tbody>
			</table>
		</div>

		<?php 
	} 

	/**
	 * Displaying the measurement table for each measurement
	 *
	*/
	public function pc_calculator_fields_before_add_to_cart() {

		global $post, $product;
		
		// pricing table ranges
		$price_ranges = get_post_meta($post->ID, '_pc_product_price_ranges', true);
		// get measurement type
		$measurement_type = get_post_meta($post->ID, '_pc_measurement_type', true);
		// get measurment unit
		$measurement_unit = get_post_meta($post->ID, '_ext_' . $measurement_type . '_unit_meta', true);

		/*---------------------------------------------*/
		/*-------- Getting product information --------*/
		/*---------------------------------------------*/
		$price_meta = get_post_meta($post->ID, '_ext_' . $measurement_type . '_price_meta', true);
		$label_meta = get_post_meta($post->ID, '_ext_' . $measurement_type . '_label_meta', true);
		$field_meta = get_post_meta($post->ID, '_ext_' . $measurement_type . '_field_meta', true);

			// box by tile lables info
		$length_meta = get_post_meta($post->ID, '_ext_' . $measurement_type . '_length_label_meta', true);
		$width_meta = get_post_meta($post->ID, '_ext_' . $measurement_type . '_width_label_meta', true);
		$height_meta = get_post_meta($post->ID, '_ext_' . $measurement_type . '_height_label_meta', true);

		$box_area = get_post_meta($post->ID, '_ext_boxtiles_totalarea_covered', true);
		$unites = get_post_meta($post->ID, '_ext_boxtiles_unit_meta', true);
		$per_sqft = get_post_meta($post->ID, '_ext_boxtiles_persqft', true);
		$length_unit_meta = get_post_meta($post->ID, '_ext_boxtiles_length_unit_meta', true);
		$width_unit_meta = get_post_meta($post->ID, '_ext_boxtiles_width_unit_meta', true);
		//haseeb changed
		$min_qty= get_post_meta($post->ID, '_pc_minimum_quantity', true);
		$max_qty= get_post_meta($post->ID, '_pc_maximum_quantity', true);

		/*---------------------------------------------*/
		/*-------- Getting product information --------*/
		/*---------------------------------------------*/

		if ('price_calculator' == $product->get_type() &&'yes' == $price_meta) {

			switch ($measurement_type) {

				case 'weight':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/weight.php');
				break;

				case 'area':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/area.php');
				break;

				case 'length':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/length.php');
				break;

				case 'volume':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/volume.php');
				break;

				case 'boxtiles':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/boxtiles.php');
				break;

				case 'area_lw':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/area-lw.php');
				break;

				case 'wall':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/wall.php');
				break;

				case 'volumeadv':
				require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/singletemplates/volumeadv.php');
				break;

				default:
				echo 'Please Fill all data to display your Price Calculator Product';
				break;

			} } } 

	/**
	 * Showing price in single product page
	 *
	*/
	public function pc_displaty_product_price( $price ) {
		
		global $product;

		$price_ranges = get_post_meta($product->get_id(), '_pc_product_price_ranges', true);
		$measurement_type = get_post_meta($product->get_id(), '_pc_measurement_type', true);
		$pricing_label = get_post_meta($product->get_id(), '_ext_' . $measurement_type . '_label_meta', true);

		if (isset($measurement_type) &&'boxtiles' == $measurement_type ) {

			$persqft = get_post_meta($product->get_id(), '_ext_boxtiles_persqft', true);
			$total_area_cov = get_post_meta($product->get_id(), '_ext_boxtiles_totalarea_covered', true);

			$total_box_price = $persqft * $total_area_cov;

			$price = '<p class="price">
			<ins>' . filter_var(wc_price($total_box_price)) . ' ' . filter_var($pricing_label) . '</ins>
			</p>';
			echo filter_var($price);				

		} else {

			if (!empty($price_ranges)) {

				$i = 0;
				$length = count($price_ranges);
				// echo($linkength);
				$first_val = '';
				$last_val = '';
				// print_r($price_ranges[0]);
				if (!$price_ranges[0]['sale_price_per_unit']) {
					foreach ($price_ranges as $key => $value) {

						if (0 == $i) {
							if (!empty($value['price_per_unit'])) {
								$first_val = $value['price_per_unit'];
							} else {
								$first_val = $value['sale_price_per_unit'];
							}
						} else if ($i == $length - 1) {
							if (empty($value['price_per_unit'])) {
								$last_val = $value['price_per_unit'];
							} else {
								$last_val = $value['sale_price_per_unit'];
							}
						}

						$i++;

						$array[$key] = explode(' , ', trim($value['sale_price_per_unit'], ' , ')); 
						$array1[$key] = explode(' , ', trim($value['price_per_unit'], ', ')); 
					}  

					$string = array_merge($array, $array1); 
					$string = json_encode($string);
					$string =str_replace(array('[[' , ']]') , '' , $string);
					$string = str_ireplace('"', '', $string);
					$string = str_replace( array('[',']') , ''  , $string);
					$res = explode(',', trim($string, ','));
					$res = array_filter($res);
					$min = min($res);
					$price =   '<p class="price">
					<ins>' . filter_var(wc_price($min)) . ' ' . filter_var($pricing_label) . '
					</p>'; 
					echo filter_var($price);		
				} else {
					foreach ($price_ranges as $key => $value) {
						
						$array[$key] = explode(',', trim($value['sale_price_per_unit'], ',')); 
						$array1[$key] = explode(',', trim($value['price_per_unit'], ',')); 
						if (0 == $i) {
							if (!empty($value['price_per_unit'])) {
								$first_val = $array;

							} else {
								$first_val = $array;
							}
						} if ($i == $length - 1) {
							if (!empty($value['price_per_unit'])) {
								$last_val = $array1;


							} else {
								$last_val = $array1;
							}
						}
						$i++;

						
					}
					
					$string = array_merge($array, $array1); 
					$string = json_encode($string);
					$string =str_replace(array('[[' , ']]') , '' , $string);
					$string = str_ireplace('"' , '' , $string);
					$string = str_replace( array('[' , ']') , '' , $string);
					$res = explode(',', trim($string, ','));
					$res = array_filter($res);
					$max = max($res);
					$min = min($res);
					$price =   '<p class="price">
					<ins>' . filter_var(wc_price($min)) . ' - ' . filter_var(wc_price($max)) . '   ' . filter_var($pricing_label) . '</ins>
					</p>';
					echo filter_var($price);        
				}
			}
		}
	}
	
	/**
	 * Displaying minimum price in single template
	 *
	*/
	public function pc_showing_min_price_callback() { 

		global $product;

		$min_price = get_post_meta($product->get_id(), '_pc_minimum_price', true);

		if ( $product->is_type( 'price_calculator' )) {

			if (!empty($min_price)) { 
				?>

				<div class="pc_min_price">
					<?php esc_html__('Minimum price ' . wc_price($min_price), ''); ?>  
				</div>

				<?php 
			} 
		}	 
	}

	/**
	 * Setting single page tempalte for pc
	 *
	*/
	public function pc_calling_single_template() {

		global $product;

		if ('price_calculator' == $product->get_type()) {

			wc_get_template('single-product/add-to-cart/pc-calculator-product.php', array(), '', PC_PCALCULATOR_TEMPLATE_PATH . '/' );
		}
	}

	/**
	 * Displaying price on archive page
	 *
	*/
	public function pc_change_product_price_display_shop( $price ) {

		global $product;
		$price = '';
		$_product = wc_get_product( $product->get_id() );

		if ('price_calculator' == $product->get_type()) {

			if (is_shop()) {

				// if product type is box tiles
				$measurement_type = get_post_meta($product->get_id(), '_pc_measurement_type', true);
				
				if (isset($measurement_type) && 'boxtiles' == $measurement_type ) {
					
					$box_area = get_post_meta($product->get_id(), '_ext_boxtiles_totalarea_covered', true);
					$per_sqft = get_post_meta($product->get_id(), '_ext_boxtiles_persqft', true);
					$pricing_label = get_post_meta($product->get_id(), '_ext_' . $measurement_type . '_field_meta', true);

					$price = wc_price($box_area * $per_sqft) . ' ' . $pricing_label;

					return $price;

				} else {

					$price_ranges = get_post_meta($product->get_id(), '_pc_product_price_ranges', true);

					if (!empty($price_ranges)) {

						$i = 0;
						
						$length = count($price_ranges);

						
						$first_val = '';
						$last_val = '';

						foreach ($price_ranges as $key => $value) {

							if (0 == $i) {
								if (!empty($value['price_per_unit'] && !empty($value['sale_price_per_unit']))) {

									$first_val = $value['price_per_unit'];
									$last_val = $value['sale_price_per_unit'];
								} else {

									if (empty($value['price_per_unit'])) {
										$first_val = $value['price_per_unit'];

									} else {
										$first_val = $value['sale_price_per_unit'];
									}	
								}
								
							} else if ($i == $length - 1) {
								if (!empty($value['price_per_unit'] && !empty($value['sale_price_per_unit']))) {

									$first_val = $value['price_per_unit'];
									$last_val = $value['sale_price_per_unit'];
								} else {

									if (empty($value['price_per_unit'])) {
										$last_val = $value['price_per_unit'];
									} else {
										$last_val = $value['sale_price_per_unit'];
									}

								}
								
							}

							$i++;
						}

						$price .= wc_price($first_val) . ' - ' . wc_price($last_val);
						return $price;

					} else {

						$price = wc_price(get_post_meta($product->get_id(), '_pc_minimum_price', true));

						return $price;

					}

				}
				
			}
		}

		return $price;
	}

	/**
	 * Enqueue the front style scripts and styles
	 *
	*/
	public function front_scripts_sytles_enqueue() {

		$currency = get_woocommerce_currency();

		wp_enqueue_script('jquery');    

		wp_enqueue_style('pc_frontend-css', plugins_url( 'Styles/frontend.css', __FILE__ ), false , '1.0');
		wp_enqueue_script( 'pc-frontend-js', plugins_url( 'Scripts/front-end.js', __FILE__ ), false , '1.0');

		wp_localize_script( 'pc-frontend-js', 'pc_var_arguments', array(
			'woopb_nonce' => wp_create_nonce('woopb_nonce'),
			'ajax_url' => admin_url('admin-ajax.php'),
			'curr_pos' => get_option('woocommerce_currency_pos'),
			'curr_string' => get_woocommerce_currency_symbol($currency),
			'pc_decimal' => wc_get_price_decimals(),
			'pc_thou_sep' => wc_get_price_thousand_separator(),
			'pc_decimal_sep' => wc_get_price_decimal_separator()
		)
	);

	} 

	/**
	 * Validation for min and max values
	 *
	*/
	public function pc_add_to_cart_quantity_validation( $passed, $product_id, $quantity) { 

		$_product = wc_get_product( $product_id );
		$checkkkk = get_post_meta($_product->get_id(), '_pc_measurement_type', true);

		if ('length' == $checkkkk) {
			if ('price_calculator' == $_product->get_type() && isset($_REQUEST['pc_quantity_needed']) ) {
				$entered_qty = sanitize_text_field($_REQUEST['pc_quantity_needed']);

				$ext_total_qty = $quantity * $entered_qty ;

				$productStock = $_product->get_stock_quantity();
				if (!empty($productStock)) {

					if ($ext_total_qty > $productStock) {

						wc_add_notice( __( 'Stock not available please enter quantity not more than ' . $productStock , 'extendons-price-calculator' ), 'error' );
						
						$passed = false;

						return $passed;
					}

				}

				$checkkkk_qty = 0;
				foreach (WC()->cart->get_cart() as $values) {
					if ($values['data']->get_id() == $product_id) {
						$here = $values['pc_quantity_needed'] * $values['quantity'];
						$checkkkk_qty = $checkkkk_qty + $here;
					}
				}
				
				$ext_total_qty = ( $quantity * $entered_qty ) + $checkkkk_qty;
				$productStock = $_product->get_stock_quantity();
				if (!empty($productStock)) {

					if ($ext_total_qty > $productStock) {

						wc_add_notice( __( 'You cannot add ' . ( $quantity * $entered_qty ) . ' more items to cart, we have ' . $productStock . ' in stock and you already have ' . $checkkkk_qty . ' in Cart' , 'extendons-price-calculator' ), 'error' );
						
						$passed = false;

						return $passed;
					}

				}

			}
		}
		//quantity

		if ('price_calculator' == $_product->get_type() && isset($_REQUEST['get_mm']) || 'simple' == $_product->get_type() || 'variable' == $_product->get_type()) {

			$min_value = get_post_meta($product_id, '_pc_minimum_quantity', true);
			$max_value = get_post_meta($product_id, '_pc_maximum_quantity', true);
			
			if(empty($min_value)){
				$min_value=0;
			}
			if(empty($max_value)){
				$max_value=INF;
			}
			if (!empty($min_value) && !empty($max_value)) {
				
				
				//if ( isset($_REQUEST['get_mm']) && ($_REQUEST['get_mm'] < $min_value || $_REQUEST['get_mm'] > $max_value) ) {
				if ( isset($_REQUEST['get_mm']) && ($quantity < $min_value || $quantity > $max_value) ) {

					wc_add_notice( __( 'Allowed quatity must be between ' . $min_value . ' and ' . $max_value, 'extendons-price-calculator' ), 'error' );

					$passed = false;

					return $passed; 
				}

			} else if (isset($min_value) && !empty($min_value) || isset($_REQUEST['get_mm'])) {

				if ($quantity < $min_value) {

					wc_add_notice( __( 'You should buy minimum ' . $min_value . ' quantity!', 'extendons-price-calculator' ), 'error' );

					$passed = false;

					return $passed;            
				}

			} else if (isset($max_value) && !empty($max_value) || isset($_REQUEST['get_mm'])) {

				if ($quantity > $max_value) {

					wc_add_notice( __( 'Maximum quantity should not be greater then ' . $max_value, 'extendons-price-calculator' ), 'error' );

					$passed = false;

					return $passed;
				}

			} else {


				wc_add_notice( __( 'Price Calculator Product Successfully added in your cart', 'extendons-price-calculator' ), 'success' );
				
				$passed = true;

				return $passed; 
			}

			return $passed;
		}

		if (isset($_REQUEST['variation_id']) &&'' != $_REQUEST['variation_id']) {
			$variation_id = filter_var($_REQUEST['variation_id']);
		}
		$variation_obj = '';
		if (!empty($variation_id)) {
			$variation_obj = new WC_Product_variation($variation_id);
		    $productStock = $variation_obj->get_stock_quantity();
		}

		if (!empty($productStock)) {

			if ($quantity > $productStock) {

				wc_add_notice( __( 'Stock not available please enter quantity less then ' . $productStock , 'extendons-price-calculator' ), 'error' );
				
				$passed = false;

				return $passed;
			}

		}


		if ('variable' == $_product->get_type()) {

			$min_value = get_post_meta($variation_id, '_pcv_minimum_value', true);
			$max_value = get_post_meta($variation_id, '_pcv_maximum_value', true);
			
			if (!empty($min_value) && !empty($max_value)) {

				if ($quantity < $min_value || $quantity > $max_value) {

					wc_add_notice( __( 'Allowed quatity must be between ' . $min_value . ' and ' . $max_value , 'extendons-price-calculator' ) , 'error' );

					$passed = false;

					return $passed; 
				}

			} else if (isset($min_value) && !empty($min_value)) {

				if ($quantity < $min_value) {

					wc_add_notice( __( 'You should buy minimum ' . $min_value . ' quantity!', 'extendons-price-calculator' ), 'error' );

					$passed = false;

					return $passed;            
				}

			} else if (isset($max_value) && !empty($max_value)) {

				if ($quantity > $max_value) {

					wc_add_notice( __( 'Maximum quantity should not be greater then ' . $max_value , 'extendons-price-calculator' ), 'error' );

					$passed = false;

					return $passed;
				}

			} else {

				wc_update_product_stock( $product, $product_stock - $reduce );
				wc_add_notice( __( 'Price Calculator Product Successfully added in your cart', 'extendons-price-calculator' ), 'success' );
				
				$passed = true;

				return $passed; 
			}

			return $passed;
		}


		
		return $passed;
	}


	/**
	 * Display self add to cart button on woocommerce shop page
	 *
	*/
	public function pc_shop_page_add_tocart_text( $link ) {
		
		global $product;

		$product_id = $product->get_id();


		$_product = wc_get_product( $product_id );

		if ('price_calculator' == $_product->get_type()) {

			$link ='<a href="' . get_permalink() . '"class="button add_to_cart_button pc_calculator_producty">' . esc_html__( 'Calculate & Buy', 'extendons-price-calculator' ) . '</a>';

			return $link;

		} else {

			return $link;
		}
	}

	/**
	 * Showing sale badge if its in sale
	 *
	*/
	public function pc_show_sale_percentage_loop() {

		global $product;

		$prduct_id = $product->get_id();

		$_product = wc_get_product( $prduct_id );

		if ('price_calculator' == $_product->get_type()) {

			$measurement_type = get_post_meta($product->get_id(), '_pc_measurement_type', true);

			if (isset($measurement_type) && 'boxtiles' == $measurement_type) {
				
				$box_area = get_post_meta($prduct_id, '_ext_boxtiles_totalarea_covered', true);
				$per_sqft = get_post_meta($prduct_id, '_ext_boxtiles_persqft', true);

				$sale_item_price = wc_price($box_area * $per_sqft);

				return $sale_item_price;

			} else {

				$price_ranges = get_post_meta($prduct_id, '_pc_product_price_ranges', true);

				$something = 0;
				if ($price_ranges) {
					foreach ($price_ranges as $key => $value) {

						if (!empty($value['sale_price_per_unit'])) {
							$something = 1;
						} else {
							$something = 0;
						}

					} 
				}
				if (1 == $something ) {

					echo'<span class="onsale"> ' . esc_html__( 'Sale!', 'extendons-price-calculator' ) . '</span>'; 

				}
			}
		}
	}


	/**
	 * Showing stock quantity in frontend
	 *
	*/
	public function pc_add_order_item_meta( $item_id, $cart_item ) {


		if (isset($cart_item['pc_quantity_needed'])) {

			$required_weight = $cart_item['pc_quantity_needed'];
			// for weight
			if (isset($cart_item['pc_product_type']) && 'pc_weight_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_weight_unit_meta', true);
				wc_add_order_item_meta($item_id, __( 'Required Weight ' . $unites, 'extendons-price-calculator' ), $required_weight . $unites);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
			// for area
			if (isset($cart_item['pc_product_type']) &&'pc_area_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_area_unit_meta', true);
				wc_add_order_item_meta($item_id, __( 'Required Area ' . $unites, 'extendons-price-calculator' ), $required_weight);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
			// for length
			if (isset($cart_item['pc_product_type']) && 'pc_length_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_length_unit_meta', true);
				wc_add_order_item_meta($item_id, __( 'Required Length ' . $unites, 'extendons-price-calculator' ), $required_weight);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
			// for volume
			if (isset($cart_item['pc_product_type']) && 'pc_volume_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_volume_unit_meta', true);
				wc_add_order_item_meta($item_id, __( 'Required Volume ' . $unites, 'extendons-price-calculator' ), $required_weight);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
			// for boxtiles
			if (isset($cart_item['pc_product_type']) && 'pc_boxtiles_product' ==  $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_boxtiles_unit_meta', true);
				wc_add_order_item_meta($item_id, __( 'Required Box', 'extendons-price-calculator' ), $required_weight);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
			// for area lw
			if (isset($cart_item['pc_product_type']) && '' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_area_lw_unit_meta', true);
				$area_length = get_post_meta($cart_item['product_id'], '_ext_area_lw_length_unit_meta', true);
				$area_width = get_post_meta($cart_item['product_id'], '_ext_area_lw_width_unit_meta', true);

				wc_add_order_item_meta($item_id, __( 'Total Required Area ' . $unites, 'extendons-price-calculator' ), $required_weight);
				wc_add_order_item_meta($item_id, __( 'Required Length ' . $area_length, 'extendons-price-calculator' ), $cart_item['length_measurement']);
				wc_add_order_item_meta($item_id, __( 'Required Width ' . $area_width, 'extendons-price-calculator' ), $cart_item['width_measurement']);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}


			if (isset($cart_item['pc_product_type']) && 'pc_area_lw_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_area_lw_unit_meta', true);
				$area_length = get_post_meta($cart_item['product_id'], '_ext_area_lw_length_unit_meta', true);
				$area_width = get_post_meta($cart_item['product_id'], '_ext_area_lw_width_unit_meta', true);
				wc_add_order_item_meta($item_id, __( 'Total Required Area ' . $unites, 'extendons-price-calculator' ), $required_weight);
				wc_add_order_item_meta($item_id, __( 'Required Length ' . $area_length, 'extendons-price-calculator' ), $cart_item['length_measurement']);
				wc_add_order_item_meta($item_id, __( 'Required Width ' . $area_width, 'extendons-price-calculator' ), $cart_item['width_measurement']);
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}

			

			// for roomwalls
			if (isset($cart_item['pc_product_type']) && 'pc_wall_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_wall_unit_meta', true);
				$warea_length = get_post_meta($cart_item['product_id'], '_ext_wall_length_unit_meta', true);
				$warea_width = get_post_meta($cart_item['product_id'], '_ext_wall_width_unit_meta', true);

				wc_add_order_item_meta($item_id, __( 'Total Required Area ' . $unites, 'extendons-price-calculator' ), $required_weight);
				wc_add_order_item_meta($item_id, __( 'Required Length ' . $warea_length, 'extendons-price-calculator' ), $cart_item['wlength_measurement']);
				wc_add_order_item_meta($item_id, __( 'Required Width ' . $warea_width, 'extendons-price-calculator' ), $cart_item['wwidth_measurement']);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
			// for volume advanced
			if (isset($cart_item['pc_product_type']) && 'pc_volumeadv_product' == $cart_item['pc_product_type']) {

				$unites = get_post_meta($cart_item['product_id'], '_ext_volumeadv_unit_meta', true);
				$varea_length = get_post_meta($cart_item['product_id'], '_ext_volumeadv_length_unit_meta', true);
				$varea_width = get_post_meta($cart_item['product_id'], '_ext_volumeadv_width_unit_meta', true);
				$varea_height = get_post_meta($cart_item['product_id'], '_ext_volumeadv_height_unit_meta', true);

				wc_add_order_item_meta($item_id, __( 'Total Required Area ' . $unites, 'extendons-price-calculator' ), $required_weight);
				wc_add_order_item_meta($item_id, __( 'Required Length ' . $varea_length, 'extendons-price-calculator' ), $cart_item['vlength_measurement']);
				wc_add_order_item_meta($item_id, __( 'Required Width ' . $varea_width, 'extendons-price-calculator' ), $cart_item['vwidth_measurement']);
				wc_add_order_item_meta($item_id, __( 'Required Height ' . $varea_height, 'extendons-price-calculator' ), $cart_item['vheight_measurement']);
				// reduct stock quantity
				$product_stock = get_post_meta($cart_item['product_id'], '_stock', true);
				if($product_stock !='' && !empty($product_stock)) {
					$actual_stock_now = $product_stock - $required_weight+1;
					update_post_meta($cart_item['product_id'], '_stock', $actual_stock_now);
				}
			}
		}
	}

	/**
	 * If its boxtiles remove cart quantity input
	 *
	*/
	public function pc_woocommerce_cart_item_quantity( $quantity, $cart_item_key ) {

		if ( isset( WC()->cart->cart_contents[$cart_item_key][ 'pc_product_type' ] ) && 'pc_boxtiles_product' == WC()->cart->cart_contents[$cart_item_key]['pc_product_type']) {
			return WC()->cart->cart_contents[$cart_item_key][ 'pc_quantity_needed' ] . __( ' Box', 'extendons-price-calculator' );
		}

		return $quantity;
	}


	// FRONT CLASS PRICE CALCULATOR
} 
new EXTENDONS_PRICE_CALCULATOR_FRONT();

