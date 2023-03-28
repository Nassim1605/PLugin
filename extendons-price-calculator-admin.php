<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}// Exit if accessed directly

// ADMIN END PRICE CALCULATOR CLASS
class EXTENDONS_PRICE_CALCULATOR_ADMIN extends EXTENDONS_PRICE_CALCULATOR_MAIN {
	
	// constructor admin class
	public function __construct() {

		add_action( 'plugins_loaded', array($this,'pc_register_product_type'));
		
		add_filter( 'product_type_selector', array( $this,'pc_add_product_type_selector' ));
		
		add_filter( 'woocommerce_product_data_tabs', array( $this,'pc_add_tabs' ));
		
		add_action( 'woocommerce_product_data_panels', array( $this,'pc_tabs_content' ));
		
		add_action( 'admin_footer', array($this,'pc_select_tabs_show' ));

		// saving post meta for simple, measurement and variable only
		add_action( 'woocommerce_process_product_meta_price_calculator', array( $this,'save_measurement_option_field' ));
		add_action( 'woocommerce_process_product_meta_variable', array( $this, 'save_measurement_option_field' ));
		add_action( 'woocommerce_process_product_meta', array( $this, 'save_measurement_option_field' ));

		add_filter( 'admin_enqueue_scripts', array( $this, 'pc_enqueue_admin_scripts_styles' ) );
	}

	/**
	 * Register price calculator product type
	 *
	*/
	public function pc_register_product_type() {
		require_once( PC_PCALCULATOR_INVOICES_DIR . '/Include/pc-product-type.php' );	
	}

	/**
	 * Register price calculator tab
	 *
	*/
	public function pc_add_product_type_selector( $types ) {
		$types[ 'price_calculator' ] = __( 'Extendons Measurement', 'extendons-price-calculator');
		return $types;
	}

	/**
	 * Setting up price calculator tab
	 *
	*/
	public function pc_add_tabs( $tabs ) {
		
		$tabs['price_calculatortabs'] = array(
			'label'		=> __( 'Extendons Measurement', 'extendons-price-calculator' ),
			'target'	=> 'price_calculator_option',
			'class'		=> array( 'show_if_price_calculator', 'show_if_variable' ),
		);

		$tabs['price_calculatorminmax'] = array(
			'label'     => __( 'Min/Max Quantity & Value', 'extendons-price-calculator' ),
			'target'    => 'price_calculator_min_max',
			'class'     => array( 'show_if_price_calculator', 'show_if_variable' ),
		);

		return $tabs;
	}

	/**
	 * Callback tab for product data type
	 *
	*/
	public function pc_tabs_content() { 
		global $post; ?>

		<!-- general tab in which we have all the things -->
		<div id='price_calculator_option' class='bootstrap-iso panel woocommerce_options_panel extmeasurement_table'>
			<div class="row">
				<div class="container" style="width: 100%;">
					
					<ul class="nav nav-tabs">
						<li class="active">
							<a data-toggle="tab" href="#pc_admin_setting">
								<i class="fa fa-cogs fa-2x" aria-hidden="true"></i>
								<?php esc_html_e('Extendons Measurement Settings', 'extendons-price-calculator'); ?> 

							</a>
						</li>
						<li>
							<a data-toggle="tab" href="#pc_admin_ptable">
								<i class="fa fa-table fa-2x" aria-hidden="true"></i>
								<?php 
									esc_html_e('Extendons Pricing Table', 'extendons-price-calculator'); 
								?>

							</a>
						</li>
					</ul>
					<!-- ended or pc measurement -->

					<div class="tab-content">
						<div id="pc_admin_setting" class="tab-pane fade in active">
							<?php 

								woocommerce_wp_select( array(
									'id' => '_select_measurement',
									'label' => __('Mesurements', 'extendons-price-calculator'),
									'desc_tip'		=> 'true',
									'description'	=> __( 'Select the product measurement to calculate quantity by or define pricing within', 'extendons-price-calculator' ),
									'options' => array( 
										'none'        => __('None', 'extendons-price-calculator'),
										'weight' => __('Weight', 'extendons-price-calculator'),
										'area' => __('Area', 'extendons-price-calculator'),
										'length' => __('Length', 'extendons-price-calculator'),
										'volume' => __('Volume', 'extendons-price-calculator'),
										'boxtiles' => __('Box Tiles', 'extendons-price-calculator'),
										'area_lw' => __('Area (LxW)', 'extendons-price-calculator'),
										'wall' => __('Room Walls', 'extendons-price-calculator'),
										'volumeadv' => __('Volume (LxWxH)', 'extendons-price-calculator')
									),
									'value' => get_post_meta($post->ID, '_pc_measurement_type', true)
								)); 
							?>

							<!-- weight measurement section -->
							<div id="weight_measurement" class="weight box" >
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/weight-fields.php'); 
								?>
							</div>
							<!--Area measurement section-->				    
							<div id="area_measurement" class="area box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/area-fields.php'); 
								?>
							</div>
							<!--Area measurement section-->				    
							<div id="length_measurement" class="length box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/length-fields.php'); 
								?>
							</div>
							<!--Volume measurement section-->				    
							<div id="volume_measurement" class="volume box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/volume-fields.php'); 
								?>
							</div>
							<!-- Area by box titles -->
							<div id="boxtiles_measurement" class="boxtiles box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/area-box-fields.php'); 
								?>
							</div>
							<!-- Area length width -->
							<div id="area_lw_measurement" class="area_lw box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/area-fieldlw.php'); 
								?>
							</div>
							<!-- Wall length width -->
							<div id="wall_measurement" class="wall box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/wall.php'); 
								?>
							</div>
							<!-- Wall length width -->
							<div id="volumeadv_measurement" class="volumeadv box">
								<?php 
									require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/measurement/volumeadv.php'); 
								?>
							</div>

						</div>
						<!-- selection measurement admin -->
 
						<div id="pc_admin_ptable" class="tab-pane fade">
							<div class="row">
								<div class="container" style="width:100%">
									<?php require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/pricingtable/pricing-table.php' ); ?>
								</div>
							</div>
						</div>
						<!-- setting data for measurement tabs -->
					 </div>
					 <!-- tab content ended -->
				</div>
				<!-- main container -->
			</div>
			<!-- row ended -->
		</div>
		<!-- end of first parent tab -->

		<!-- min max and minimum value tab -->
		<div id='price_calculator_min_max' class='bootstrap-iso panel woocommerce_options_panel extmeasurement_table'>
			<div class="row">
				<div class="container" style="width: 100%;">
					<?php 
						require_once(PC_PCALCULATOR_INVOICES_DIR . 'templates/min-max-values.php' ); 
					?>
				</div>
			</div>
		</div>
		<!-- end of first parent tab -->

		<?php 
	}

	/**
	 * Showing other data tabs if price calcualtor price is on
	 *
	 
	*/
	public function pc_select_tabs_show() {

		if ('product' != get_post_type()) {
			return;
		}
		?>

		<script type='text/javascript'>
			jQuery( document ).ready( function() {
				jQuery('.inventory_options').addClass('show_if_price_calculator').show();
				jQuery('#inventory_product_data ._manage_stock_field').addClass('show_if_price_calculator').show();
				jQuery('#inventory_product_data ._sold_individually_field').parent().addClass('show_if_price_calculator').show();
				jQuery('#inventory_product_data ._sold_individually_field').addClass('show_if_price_calculator').show();
				jQuery('.price_calculatorminmax_options').addClass('hide_if_variable').hide();
				jQuery('.price_calculatorminmax_options').addClass('show_if_price_calculator').show();
			});
		</script>

		<?php 
	}

	/**
	 * Saving product data for single product
	 *
	*/
	public function save_measurement_option_field( $post_id ) {

		if (!empty($_REQUEST['ext_mix_nonce_field'])) {

			$retrieved_nonce = sanitize_text_field($_REQUEST['ext_mix_nonce_field']);
		} else {
			$retrieved_nonce = 0;
		}
		
		if (wp_verify_nonce($retrieved_nonce, 'ext_mix_nonce_action')) {

			wp_die('Failed security check');
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// add measurement type
		if ( isset( $_POST['_select_measurement'] ) ) {
			update_post_meta( $post_id, '_pc_measurement_type' , sanitize_text_field( $_POST['_select_measurement'] ) );
		}
		

		/*---------------------------------------------*/
		/*-------- PRICE CALCULATOR WEIGHT ------------*/
		/*---------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_weight_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_weight_price_meta', $saleunit_display );
		}
		if ( isset( $_POST['_ext_weight_label']) && !empty($_POST['_ext_weight_label'])) {
			update_post_meta( $post_id, '_ext_weight_label_meta' , sanitize_text_field( $_POST['_ext_weight_label'] ) );
		}
		

		if ( isset( $_POST['_ext_weight_field']) && !empty($_POST['_ext_weight_field'])) {
			update_post_meta( $post_id, '_ext_weight_field_meta' , sanitize_text_field( $_POST['_ext_weight_field'] ) );
		}
		

		if ( isset( $_POST['_ext_weight_unit']) && !empty($_POST['_ext_weight_unit'])) {
			update_post_meta( $post_id, '_ext_weight_unit_meta' , sanitize_text_field( $_POST['_ext_weight_unit'] ) );
		}
		

		if ( isset( $_POST['_ext_weight_output']) && !empty($_POST['_ext_weight_output'])) {
			update_post_meta( $post_id, '_ext_weight_output_meta' , sanitize_text_field( $_POST['_ext_weight_output'] ) );
		}
		
		/*---------------------------------------------*/
		/*-------- PRICE CALCULATOR AREA --------------*/
		/*---------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_area_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_area_price_meta' , $saleunit_display );
		}
		if ( isset( $_POST['_ext_area_label']) && !empty($_POST['_ext_area_label'])) {
			update_post_meta( $post_id, '_ext_area_label_meta' , sanitize_text_field( $_POST['_ext_area_label'] ) );
		}
		

		if ( isset( $_POST['_ext_area_field']) && !empty($_POST['_ext_area_field'])) {
			update_post_meta( $post_id, '_ext_area_field_meta' , sanitize_text_field( $_POST['_ext_area_field'] ) );
		}
		

		if ( isset( $_POST['_ext_area_unit']) && !empty($_POST['_ext_area_unit'])) {
			update_post_meta( $post_id, '_ext_area_unit_meta' , sanitize_text_field( $_POST['_ext_area_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_area_output']) && !empty($_POST['_ext_area_output'])) {
			update_post_meta( $post_id, '_ext_area_output_meta' , sanitize_text_field( $_POST['_ext_area_output'] ) );
		}
		
		/*----------------------------------------------*/
		/*-------- PRICE CALCULATOR LENGTH -------------*/
		/*----------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_length_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_length_price_meta' , $saleunit_display );
		}
		if ( isset( $_POST['_ext_length_label']) && !empty($_POST['_ext_length_label'])) {
			update_post_meta( $post_id, '_ext_length_label_meta' , sanitize_text_field( $_POST['_ext_length_label'] ) );
		}
		

		if ( isset( $_POST['_ext_length_field']) && !empty($_POST['_ext_length_field'])) {
			update_post_meta( $post_id, '_ext_length_field_meta' , sanitize_text_field( $_POST['_ext_length_field'] ) );
		}
		

		if ( isset( $_POST['_ext_length_unit']) && !empty($_POST['_ext_length_unit'])) {
			update_post_meta( $post_id, '_ext_length_unit_meta' , sanitize_text_field( $_POST['_ext_length_unit'] ) );
		}
		

		if ( isset( $_POST['_ext_length_output_unit']) && !empty($_POST['_ext_length_output_unit'])) {
			update_post_meta( $post_id, '_ext_length_output_meta', sanitize_text_field( $_POST['_ext_length_output_unit'] ) );
		}
		
		/*----------------------------------------------*/
		/*-------- PRICE CALCULATOR VOLUME -------------*/
		/*----------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_volume_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_volume_price_meta' , $saleunit_display );
		}
		if ( isset( $_POST['_ext_volume_label']) && !empty($_POST['_ext_volume_label'])) {
			update_post_meta( $post_id, '_ext_volume_label_meta' , sanitize_text_field( $_POST['_ext_volume_label'] ) );
		}
		

		if ( isset( $_POST['_ext_volume_field']) && !empty($_POST['_ext_volume_field'])) {
			update_post_meta( $post_id, '_ext_volume_field_meta' , sanitize_text_field( $_POST['_ext_volume_field'] ) );
		}
		

		if ( isset( $_POST['_ext_volume_unit']) && !empty($_POST['_ext_volume_unit'])) {
			update_post_meta( $post_id, '_ext_volume_unit_meta' , sanitize_text_field( $_POST['_ext_volume_unit'] ) );
		}
	
		if ( isset( $_POST['_ext_volume_Output_unit']) && !empty($_POST['_ext_volume_Output_unit'])) {
			update_post_meta( $post_id, '_ext_volume_output_meta' , sanitize_text_field( $_POST['_ext_volume_Output_unit'] ) );
		}
		/*----------------------------------------------*/
		/*-------- PRICE CALCULATOR BOXTILES -------------*/
		/*----------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_boxtiles_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_boxtiles_price_meta' , $saleunit_display );
		}
		if ( isset( $_POST['_ext_boxtiles_label']) && !empty($_POST['_ext_boxtiles_label'])) {
			update_post_meta( $post_id, '_ext_boxtiles_label_meta' , sanitize_text_field( $_POST['_ext_boxtiles_label'] ) );
		}
	

		if ( isset( $_POST['_ext_boxtiles_field']) && !empty($_POST['_ext_boxtiles_field'])) {
			update_post_meta( $post_id, '_ext_boxtiles_field_meta' , sanitize_text_field( $_POST['_ext_boxtiles_field'] ) );
		}
		

		if ( isset( $_POST['_ext_boxtiles_unit']) && !empty($_POST['_ext_boxtiles_unit'])) {
			update_post_meta( $post_id, '_ext_boxtiles_unit_meta' , sanitize_text_field( $_POST['_ext_boxtiles_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_length_label']) && !empty($_POST['_ext_boxtiles_length_label'])) {
			update_post_meta( $post_id, '_ext_boxtiles_length_label_meta' , sanitize_text_field( $_POST['_ext_boxtiles_length_label'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_length_unit']) && !empty($_POST['_ext_boxtiles_length_unit'])) {
			update_post_meta( $post_id, '_ext_boxtiles_length_unit_meta' , sanitize_text_field( $_POST['_ext_boxtiles_length_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_length_label']) && !empty($_POST['_ext_boxtiles_length_label'])) {
			update_post_meta( $post_id, '_ext_boxtiles_length_label_meta' , sanitize_text_field( $_POST['_ext_boxtiles_length_label'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_width_label']) && !empty($_POST['_ext_boxtiles_width_label'])) {
			update_post_meta( $post_id, '_ext_boxtiles_width_label_meta' , sanitize_text_field( $_POST['_ext_boxtiles_width_label'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_width_unit']) && !empty($_POST['_ext_boxtiles_width_unit'])) {
			update_post_meta( $post_id, '_ext_boxtiles_width_unit_meta' , sanitize_text_field( $_POST['_ext_boxtiles_width_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_persqft']) && !empty($_POST['_ext_boxtiles_persqft'])) {
			update_post_meta( $post_id, '_ext_boxtiles_persqft' , sanitize_text_field( $_POST['_ext_boxtiles_persqft'] ) );
		}
		
		if ( isset( $_POST['_ext_boxtiles_totalarea_covered']) && !empty($_POST['_ext_boxtiles_totalarea_covered'])) {
			update_post_meta( $post_id, '_ext_boxtiles_totalarea_covered' , sanitize_text_field( $_POST['_ext_boxtiles_totalarea_covered'] ) );
		}
		
		/*----------------------------------------------*/
		/*-------- PRICE CALCULATOR AREA LENGTH/WIDTH -------------*/
		/*----------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_area_lw_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_area_lw_price_meta' , $saleunit_display );
		}
		if ( isset( $_POST['_ext_area_lw_field']) && !empty($_POST['_ext_area_lw_field'])) {
			update_post_meta( $post_id, '_ext_area_lw_field_meta' , sanitize_text_field( $_POST['_ext_area_lw_field'] ) );
		}
		if ( isset( $_POST['_ext_area_lw_label']) && !empty($_POST['_ext_area_lw_label'])) {
			update_post_meta( $post_id, '_ext_area_lw_label_meta' , sanitize_text_field( $_POST['_ext_area_lw_label'] ) );
		}
		
		if ( isset( $_POST['_ext_area_lw_unit']) && !empty($_POST['_ext_area_lw_unit'])) {
			update_post_meta( $post_id, '_ext_area_lw_unit_meta' , sanitize_text_field( $_POST['_ext_area_lw_unit'] ) );
		}
		if ( isset( $_POST['_ext_area_lw_length_label']) && !empty($_POST['_ext_area_lw_length_label'])) {
			update_post_meta( $post_id, '_ext_area_lw_length_label_meta' , sanitize_text_field( $_POST['_ext_area_lw_length_label'] ) );
		}
		if ( isset( $_POST['_ext_area_lw_length_unit']) && !empty($_POST['_ext_area_lw_length_unit'])) {
			update_post_meta( $post_id, '_ext_area_lw_length_unit_meta' , sanitize_text_field( $_POST['_ext_area_lw_length_unit'] ) );
		}
	
		if ( isset( $_POST['_ext_area_lw_width_label']) && !empty($_POST['_ext_area_lw_width_label'])) {
			update_post_meta( $post_id, '_ext_area_lw_width_label_meta' , sanitize_text_field( $_POST['_ext_area_lw_width_label'] ) );
		}
		
		if ( isset( $_POST['_ext_area_lw_width_unit']) && !empty($_POST['_ext_area_lw_width_unit'])) {
			update_post_meta( $post_id, '_ext_area_lw_width_unit_meta' , sanitize_text_field( $_POST['_ext_area_lw_width_unit'] ) );
		}
		
		/*----------------------------------------------*/
		/*-------- PRICE CALCULATOR ROOM WALLS -------------*/
		/*----------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_wall_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_wall_price_meta' , $saleunit_display );
		}
		if ( isset( $_POST['_ext_wall_field']) && !empty($_POST['_ext_wall_field'])) {
			update_post_meta( $post_id, '_ext_wall_field_meta' , sanitize_text_field( $_POST['_ext_wall_field'] ) );
		}
		
		if ( isset( $_POST['_ext_wall_label']) && !empty($_POST['_ext_wall_label'])) {
			update_post_meta( $post_id, '_ext_wall_label_meta' , sanitize_text_field( $_POST['_ext_wall_label'] ) );
		}
		
		if ( isset( $_POST['_ext_wall_unit']) && !empty($_POST['_ext_wall_unit'])) {
			update_post_meta( $post_id, '_ext_wall_unit_meta' , sanitize_text_field( $_POST['_ext_wall_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_wall_length_label']) && !empty($_POST['_ext_wall_length_label'])) {
			update_post_meta( $post_id, '_ext_wall_length_label_meta' , sanitize_text_field( $_POST['_ext_wall_length_label'] ) );
		}
		if ( isset( $_POST['_ext_wall_length_unit']) && !empty($_POST['_ext_wall_length_unit'])) {
			update_post_meta( $post_id, '_ext_wall_length_unit_meta' , sanitize_text_field( $_POST['_ext_wall_length_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_wall_width_label']) && !empty($_POST['_ext_wall_width_label'])) {
			update_post_meta( $post_id, '_ext_wall_width_label_meta' , sanitize_text_field( $_POST['_ext_wall_width_label'] ) );
		}
		
		if ( isset( $_POST['_ext_wall_width_unit']) && !empty($_POST['_ext_wall_width_unit'])) {
			update_post_meta( $post_id, '_ext_wall_width_unit_meta' , sanitize_text_field( $_POST['_ext_wall_width_unit'] ) );
		}
		
		/*----------------------------------------------*/
		/*-------- PRICE CALCULATOR VOLUME MULCH -------------*/
		/*----------------------------------------------*/
		$saleunit_display = isset( $_POST['_ext_volumeadv_price'] ) ? 'yes' : 'no';
		if (isset($saleunit_display) && !empty($saleunit_display)) {
			update_post_meta( $post_id, '_ext_volumeadv_price_meta', $saleunit_display );
		}
		if ( isset( $_POST['_ext_volumeadv_label']) && !empty($_POST['_ext_volumeadv_label'])) {
			update_post_meta( $post_id, '_ext_volumeadv_label_meta' , sanitize_text_field( $_POST['_ext_volumeadv_label'] ) );
		}
		if ( isset( $_POST['_ext_volumeadv_field']) && !empty($_POST['_ext_volumeadv_field'])) {
			update_post_meta( $post_id, '_ext_volumeadv_field_meta' , sanitize_text_field( $_POST['_ext_volumeadv_field'] ) );
		}
		
		if ( isset( $_POST['_ext_volumeadv_unit']) && !empty($_POST['_ext_volumeadv_unit'])) {
			update_post_meta( $post_id, '_ext_volumeadv_unit_meta' , sanitize_text_field( $_POST['_ext_volumeadv_unit'] ) );
		}
	
		if ( isset( $_POST['_ext_volumeadv_length_label']) && !empty($_POST['_ext_volumeadv_length_label'])) {
			update_post_meta( $post_id, '_ext_volumeadv_length_label_meta' , sanitize_text_field( $_POST['_ext_volumeadv_length_label'] ) );
		}
		
		if ( isset( $_POST['_ext_volumeadv_length_unit']) && !empty($_POST['_ext_volumeadv_length_unit'])) {
			update_post_meta( $post_id, '_ext_volumeadv_length_unit_meta' , sanitize_text_field( $_POST['_ext_volumeadv_length_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_volumeadv_width_label']) && !empty($_POST['_ext_volumeadv_width_label'])) {
			update_post_meta( $post_id, '_ext_volumeadv_width_label_meta' , sanitize_text_field( $_POST['_ext_volumeadv_width_label'] ) );
		}
		
		if ( isset( $_POST['_ext_volumeadv_width_unit']) && !empty($_POST['_ext_volumeadv_width_unit'])) {
			update_post_meta( $post_id, '_ext_volumeadv_width_unit_meta' , sanitize_text_field( $_POST['_ext_volumeadv_width_unit'] ) );
		}
		
		if ( isset( $_POST['_ext_volumeadv_height_label']) && !empty($_POST['_ext_volumeadv_height_label'])) {
			update_post_meta( $post_id, '_ext_volumeadv_height_label_meta' , sanitize_text_field( $_POST['_ext_volumeadv_height_label'] ) );
		}
		
		if ( isset( $_POST['_ext_volumeadv_height_unit']) && !empty($_POST['_ext_volumeadv_height_unit'])) {
			update_post_meta( $post_id, '_ext_volumeadv_height_unit_meta' , sanitize_text_field( $_POST['_ext_volumeadv_height_unit'] ) );
		}
		
		/*---------------------------------------------*/
		/*-------- minimum maximum and minimum value fields product --------*/
		/*---------------------------------------------*/
		// if ( isset( $_POST['_pc_minimum_price']) && !empty($_POST['_pc_minimum_price'])) {
		if ( isset( $_POST['_pc_minimum_price'])) {
			update_post_meta( $post_id, '_pc_minimum_price' , sanitize_text_field( $_POST['_pc_minimum_price'] ) );
		}
	

		if ( isset( $_POST['_pc_minimum_quantity'])) {
			update_post_meta( $post_id, '_pc_minimum_quantity' , sanitize_text_field( $_POST['_pc_minimum_quantity'] ) );
		}
		
		
		if ( isset( $_POST['_pc_maximum_quantity'])) {
			update_post_meta( $post_id, '_pc_maximum_quantity' , sanitize_text_field( $_POST['_pc_maximum_quantity'] ) );
		}
	
		// price ragnes saving function
		if (isset($_POST['price_table'])) {

			$mo_new_data = $_POST['price_table'];

			$reindex = array_values($mo_new_data);

			update_post_meta( $post_id, '_pc_product_price_ranges', $reindex);
			
		}	
	}

	/**
	 * Enqueue the admin style scripts and styles
	 *
	*/
	public function pc_enqueue_admin_scripts_styles() {

		wp_enqueue_script('pc-backend-js', plugins_url( 'Scripts/back-end.js', __FILE__ ), false  , '1.0');
	
	}


} new EXTENDONS_PRICE_CALCULATOR_ADMIN();
