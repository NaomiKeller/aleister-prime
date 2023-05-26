<?php
/**
 * Theme Theme Options.
 *
 * @package aleister-prime
 */

namespace ALEISTER_PRIME\Inc;

use ALEISTER_PRIME\Inc\Traits\Singleton;

/**
 * Class Theme Options.
 */
class Theme_Option {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	protected function setup_hooks() {

		/**
		 * Actions
		 */
		add_action( 'admin_menu', array( $this, 'add_option_menu' ) );
		add_action( 'admin_init', array( $this, 'option_settings_init' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'theme_option_assets' ) );

	}

	/**
	 * Added option Menu.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function add_option_menu() {
		add_menu_page( 'Theme Options', 'Theme Options', 'manage_options', 'aleister-prime', array( $this, 'option_form' ), '', 50 );
	}

	/**
	 * Generate Option form.
	 * Added enctype="multipart/form-data" to allow media upload.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function option_form() {
		?>
		<div class="wrap">
			<div class="aleister-prime-theme-options">
				<div class="aleister-prime-theme-options-header">
					<h1>Aleister Prime Theme Options</h1>
					<?php
					$get_tab    = filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
					$active_tab = isset( $get_tab ) ? $get_tab : 'general_options';
					?>
					<h2 class="nav-tab-wrapper">
						<a href="?page=aleister-prime&tab=general_options" class="nav-tab <?php echo esc_attr( 'general_options' === $active_tab ? 'nav-tab-active' : '' ); ?>"><?php echo esc_html__( 'General Settings', 'aleister-prime' ); ?></a>
					</h2>
					<span><?php settings_errors(); ?></span>
				</div>
				<form action='options.php' enctype="multipart/form-data" method='post'> 
					<?php
					settings_fields( 'aleister-prime-setting' );
					do_settings_sections( 'aleister-prime' );
					submit_button();
					?>
				</form>
			</div>
		</div>
		<?php
	}

	/**
	 * Add Setting fields.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function option_settings_init() {
		register_setting( 'aleister-prime-setting', 'aleister_prime_settings' );
		add_settings_section( 'aleister-prime-section', __( 'General Settings', 'aleister-prime' ), '__return_empty_string', 'aleister-prime' );
		add_settings_field(
			'aleister_prime_logo',
			__( 'Site Logo:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'  => 'file',
				'name'  => 'aleister_prime_settings[aleister_prime_img]',
				'value' => 'aleister_prime_img',
			)
		);
		add_settings_field(
			'aleister_prime_favicon',
			__( 'Site Favicon:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'  => 'file',
				'name'  => 'aleister_prime_settings[aleister_prime_favicon]',
				'value' => 'aleister_prime_favicon',
			)
		);
		add_settings_field(
			'aleister_prime_logo_color',
			__( 'Header Accent Color:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'    => 'color-picker',
				'name'    => 'aleister_prime_settings[aleister_prime_logo_color]',
				'value'   => 'aleister_prime_logo_color',
				'default' => '#E06565',
			)
		);
		add_settings_field(
			'aleister_prime_header_footer_color',
			__( 'Header & Footer Background Color:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'    => 'color-picker',
				'name'    => 'aleister_prime_settings[aleister_prime_header_footer_color]',
				'value'   => 'aleister_prime_header_footer_color',
				'default' => '#121212',
			)
		);
		add_settings_field(
			'aleister_prime_tagline',
			__( 'Site Tagline:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'  => 'text',
				'name'  => 'aleister_prime_settings[aleister_prime_tagline]',
				'value' => 'aleister_prime_tagline',
			)
		);
		add_settings_field(
			'aleister_prime_google_analytic',
			__( 'Google Analytics:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'  => 'textarea',
				'name'  => 'aleister_prime_settings[aleister_prime_google_analytic]',
				'value' => 'aleister_prime_google_analytic',
			)
		);
		add_settings_field(
			'aleister_prime_css_code',
			__( 'Additional CSS:', 'aleister-prime' ),
			array( $this, 'add_field' ),
			'aleister-prime',
			'aleister-prime-section',
			array(
				'type'  => 'textarea',
				'name'  => 'aleister_prime_settings[aleister_prime_css_code]',
				'value' => 'aleister_prime_css_code',
			)
		);
	}

	/**
	 * Generate Fields.
	 *
	 * @param  array $args Field argument.
	 * @return void
	 * @since 1.0.0
	 */
	public function add_field( array $args ) {
		$options = get_option( 'aleister_prime_settings' );
		switch ( $args['type'] ) {
			case 'text':
				$this->text_callback( $args, $options );
				break;
			case 'textarea':
				$this->textarea_callback( $args, $options );
				break;
			case 'file':
				$this->file_callback( $args, $options );
				break;
			case 'checkbox':
				$this->checkbox_callback( $args, $options );
				break;
			case 'multicheck':
				$this->multiselect_callback( $args, $options );
				break;
			case 'color-picker':
				$this->color_picker_callback( $args, $options );
				break;
			case 'select':
				$this->selectbox_callback( $args, $options );
				break;
			case 'radio':
				$this->radio_button_callback( $args, $options );
				break;
			case 'number':
				$this->number_callback( $args, $options );
				break;
		}
	}

	/**
	 * Generate textbox.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function text_callback( $args, $options ) {
		?>
		<input type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>" />
		<?php
	}

	/**
	 * Generate textarea.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function textarea_callback( $args, $options ) {
		?>
		<textarea type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" rows="8" cols="40"><?php echo isset( $options[ $args['value'] ] ) ? esc_html( $options[ $args['value'] ] ) : ''; ?></textarea>
		<?php
	}

	/**
	 * Generate image.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function file_callback( $args, $options ) {
		?>
		<div class="flex">
			<img class="aleister_prime_img" 
				name="<?php echo esc_attr( $args['name'] ); ?>" 
				src="<?php echo ! empty( $options[ $args['value'] ] ) ? esc_url( $options[ $args['value'] ] ) : esc_url( ALEISTER_PRIME_THEME_URL . '/assets/src/images/theme-options-placeholder.png' ); ?>"
				<?php
				if ( ! empty( $options[ $args['value'] ] ) ) {
					echo 'width="250px" height="150px"';
				}
				?>
			/>
			<input class="aleister_prime_img_url" 
				type="hidden" 
				name="<?php echo esc_attr( $args['name'] ); ?>" 
				size="60" 
				value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>"
			>
			<a href="#" class="aleister_prime_img_upload"><button>Upload</button></a>
			<?php if ( ! empty( $options[ $args['value'] ] ) ) : ?>
				<a href="#" class="aleister_prime_img_remove"><button>Remove</button></a>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Generate Checkbox.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function checkbox_callback( $args, $options ) {
		?>
		<input id="<?php echo esc_attr( $args['id'] ); ?>" type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="true" <?php checked( 'true', isset( $options[ $args['value'] ] ) ? $options[ $args['value'] ] : '' ); ?>>
		<label for="<?php echo esc_attr( $args['id'] ); ?>"><?php echo esc_html( $args['task'] ); ?></label>
		<?php
	}

	/**
	 * Generate Multi Select.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function multiselect_callback( $args, $options ) {
		$multi_select_options = $args['options'];
		?>
		<select multiple id="<?php echo esc_attr( $args['id'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>[]">
			<?php
			foreach ( $multi_select_options as $key => $value ) :
				?>
				<option value="<?php echo esc_attr( $key ); ?>" 
						<?php
						if ( isset( $options[ $args['value'] ] ) ) {
							echo in_array( "$key", $options[ $args['value'] ], true ) ? 'selected' : ''; }
						?>
				>
					<?php echo esc_html( $value ); ?>
				</option>
				<?php
				endforeach;
			?>
		</select>
		<br />
		<span id="help-notice">hold command on MAC and control on Windows to select multiple options</span>
		<?php
	}

	/**
	 * Generate Color Picker.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function color_picker_callback( $args, $options ) {
		?>
		<input type="text" class="color-picker" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo $options[ $args['value'] ] ? esc_attr( $options[ $args['value'] ] ) : esc_attr( $args['default'] ); ?>" />
		<?php
	}

	/**
	 * Generate Select Box.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function selectbox_callback( $args, $options ) {
		$select_options = $args['options'];
		?>
		<select name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>">
			<?php
			foreach ( $select_options as $key => $value ) :
				?>
				<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $options[ $args['value'] ], $key ); ?>><?php echo esc_html( $value ); ?></option>
				<?php
				endforeach;
			?>
		</select>
		<?php
	}

	/**
	 * Generate Radio Button.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function radio_button_callback( $args, $options ) {
		$radio_options = $args['options'];
		foreach ( $radio_options as $key => $value ) :
			?>
			<input id="val<?php echo esc_attr( $key ); ?>" type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo esc_attr( $key ); ?>" <?php checked( $options[ $args['value'] ], $key ); ?>>
			<label for="val<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></label><br>
			<?php
		endforeach;
	}

	/**
	 * Generate Number Textbox.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function number_callback( $args, $options ) {
		?>
		<input type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>">
		<?php
	}

	/**
	 * Enqueue option js/css file.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function theme_option_assets() {

		// Register styles.
		wp_register_style( 'theme-option-css', ALEISTER_PRIME_BUILD_URI . '/themeoption.css', array(), filemtime( ALEISTER_PRIME_BUILD_PATH . '/themeoption.css' ), 'all' );

		// Enqueue Styles.
		wp_enqueue_style( 'theme-option-css' );

		wp_enqueue_style( 'wp-color-picker' );

		if ( ! did_action( 'wp_enqueue_media' ) ) {
			wp_enqueue_media();
		}

		wp_register_script( 'theme-option-js', ALEISTER_PRIME_BUILD_URI . '/themeoption.js', array( 'jquery', 'wp-color-picker' ), filemtime( ALEISTER_PRIME_BUILD_PATH . '/themeoption.js' ), true );
		wp_enqueue_script( 'theme-option-js' );
	}

}
