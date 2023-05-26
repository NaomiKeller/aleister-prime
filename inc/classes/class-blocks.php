<?php
/**
 * Dynamic Blocks.
 *
 * @package aleister-prime
 */

namespace ALEISTER_PRIME\Inc;

use ALEISTER_PRIME\Inc\Traits\Singleton;

/**
 * Class Blocks
 */
class Blocks {
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
		 * Load blocks classes.
		 */
		add_action( 'block_categories_all', array( $this, 'aleister_prime_custom_block_category' ) );
	}

	/**
	 * Register Custom Block Category
	 *
	 * @param string $categories return categories array.
	 *
	 * @return string
	 * @since 1.0.0
	 */
	public function aleister_prime_custom_block_category( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'aleister-prime',
					'title' => __( 'Aleister Prime', 'aleister-prime' ),
					'icon'  => 'welcome-add-page aleister-dashicons',
				),
			),
			$categories
		);
	}
}
