<?php
/**
 * Enqueue theme assets
 *
 * @package aleister-prime
 */

namespace ALEISTER_PRIME\Inc;

use ALEISTER_PRIME\Inc\Traits\Singleton;

/**
 * Class Assets
 */
class Assets {
	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		// load class.
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
		 * Actions.
		 */
		add_action( 'get_header', array( $this, 'remove_wp_emoji' ) );
		add_action( 'get_header', array( $this, 'move_scripts_to_footer' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		/**
		 * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'upload_mimes', array( $this, 'add_file_types_to_uploads' ) ); //phpcs:ignore WordPressVIPMinimum.Hooks.RestrictedHooks.upload_mimes

		add_filter( 'script_loader_tag', array( $this, 'script_additional_attrs' ), 10, 2 );
		add_action( 'wp_print_footer_scripts', array( $this, 'lazy_load_scripts' ) );
	}

	/**
	 * Remove Emoji from the page.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function remove_wp_emoji() {

		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
	}

	/**
	 * Move render blocking JS to the footer.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function move_scripts_to_footer() {
		// Remove default jQuery registration through WordPress.
		wp_dequeue_script( 'jquery' );
		wp_dequeue_script( 'jquery-migrate' );
		wp_dequeue_script( 'wp-embed' );
		wp_deregister_script( 'jquery' );
		wp_deregister_script( 'jquery-migrate' );
		wp_deregister_script( 'wp-embed' );

		wp_enqueue_script( 'jquery', '/wp-includes/js/jquery/jquery.min.js', array(), ALEISTER_PRIME_THEME_VERSION, true );
	}

	/**
	 * Load critical CSS.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function hook_critical_css() {

		$response = wp_remote_get( ALEISTER_PRIME_BUILD_URI . '/inline.css' );   // load template output in buffer.

		if ( ! is_wp_error( $response ) ) {
			$css = wp_remote_retrieve_body( $response );
			wp_register_style( 'aleister-prime-inline-css', false, array(), true, true );
			wp_add_inline_style( 'aleister-prime-inline-css', $css );
			wp_enqueue_style( 'aleister-prime-inline-css' );
		}
	}

	/**
	 * Register and Enqueue styles.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_styles() {

		$this->hook_critical_css();

		// Register styles.
		wp_register_style( 'main-css', ALEISTER_PRIME_BUILD_URI . '/main.css', array(), filemtime( ALEISTER_PRIME_BUILD_PATH . '/main.css' ), 'all' );

		// Enqueue Styles.
		wp_enqueue_style( 'main-css' );

		// Enqueue Dashicons on Frontend.
		wp_enqueue_style( 'dashicons' );

	}

	/**
	 * Register and Enqueue Scripts.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_scripts() {
		// Register scripts.
		wp_register_script( 'main-js', ALEISTER_PRIME_BUILD_URI . '/main.js', array( 'jquery' ), filemtime( ALEISTER_PRIME_BUILD_PATH . '/main.js' ), true );

		// Enqueue Scripts.
		wp_enqueue_script( 'main-js' );

		wp_localize_script(
			'main-js',
			'siteConfig',
			array(
				'ajaxUrl'    => admin_url( 'admin-ajax.php' ),
				'ajax_nonce' => wp_create_nonce( 'loadmore_post_nonce' ),
			)
		);
	}

	/**
	 * Enqueue editor scripts and styles.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function enqueue_editor_assets() {

		// Blocks.
		wp_enqueue_script(
			'aleister-prime-blocks-js',
			ALEISTER_PRIME_BUILD_URI . '/blocks.js',
			array(),
			ALEISTER_PRIME_THEME_VERSION,
			true
		);

		// Slick.
		wp_enqueue_script(
			'aleister-prime-slick-js',
			ALEISTER_PRIME_LIBRARY_URI . '/slick.min.js',
			array( 'jquery' ),
			ALEISTER_PRIME_THEME_VERSION,
			true
		);

		wp_enqueue_style(
			'aleister-prime-slick-css',
			ALEISTER_PRIME_LIBRARY_URI . '/slick.css',
			array(),
			filemtime( ALEISTER_PRIME_LIBRARY_DIR_PATH . '/slick.css' ),
			'all'
		);

		if ( is_admin() ) {
			wp_enqueue_script(
				'aleister-prime-admin-jquery',
				ALEISTER_PRIME_BUILD_URI . '/editor.js',
				array(),
				ALEISTER_PRIME_THEME_VERSION,
				true
			);
		}

		// Editor CSS.
		if ( is_admin() ) {
			wp_enqueue_style(
				'aleister-prime-editor-css',
				ALEISTER_PRIME_BUILD_URI . '/editor.css',
				array(),
				filemtime( ALEISTER_PRIME_BUILD_PATH . '/editor.css' ),
				'all'
			);
		}

	}

	/**
	 * Action Function to add SVG support in file uploads.
	 *
	 * @param array $file_types Supported file types.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function add_file_types_to_uploads( $file_types ) {
		if ( is_user_logged_in() && current_user_can( 'administrator' ) ) {
			$new_filetypes        = array();
			$new_filetypes['svg'] = 'image/svg+xml';
			$file_types           = array_merge( $file_types, $new_filetypes );
		}

		return $file_types;
	}

	/**
	 * Lazy load script code.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function lazy_load_scripts() {
		$timeout = '5';
		?>
		<script type="text/javascript" id="flying-scripts">const loadScriptsTimer = setTimeout(loadScripts,<?php echo esc_html( $timeout ); ?>* 1000
			)
			;const userInteractionEvents = ["mouseover", "keydown", "touchstart", "touchmove", "wheel"];
			userInteractionEvents.forEach(function (event) {
				window.addEventListener(event, triggerScriptLoader, {passive: !0})
			});

			function triggerScriptLoader() {
				loadScripts();
				clearTimeout(loadScriptsTimer);
				userInteractionEvents.forEach(function (event) {
					window.removeEventListener(event, triggerScriptLoader, {passive: !0})
				})
			}

			function loadScripts() {
				document.querySelectorAll("script[data-type='lazy']").forEach(function (elem) {
					elem.setAttribute("src", elem.getAttribute("data-src"))
				})
			}</script>
		<?php
	}


	/**
	 * Identify script and do the lazy load.
	 *
	 * @param string $tag Tags string.
	 * @param string $handle Handle name.
	 *
	 * @return string
	 * @since 1.0.0
	 */
	public function script_additional_attrs( $tag, $handle ) {
		if ( 'grs-ad' === $handle ) {
			return str_replace( ' src', ' data-type="lazy" data-src', $tag );
		}

		return $tag;
	}

}
