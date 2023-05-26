<?php
/**
 * Theme Functions.
 *
 * @package aleister-prime
 */

if ( ! defined( 'ALEISTER_PRIME_THEME_VERSION' ) ) {
	define( 'ALEISTER_PRIME_THEME_VERSION', '1.0' );
}

if ( ! defined( 'ALEISTER_PRIME_THEME_PATH' ) ) {
	define( 'ALEISTER_PRIME_THEME_PATH', __DIR__ );
}

if ( ! defined( 'ALEISTER_PRIME_THEME_URL' ) ) {
	define( 'ALEISTER_PRIME_THEME_URL', get_template_directory_uri() );
}

if ( ! defined( 'ALEISTER_PRIME_BUILD_URI' ) ) {
	define( 'ALEISTER_PRIME_BUILD_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/build' );
}

if ( ! defined( 'ALEISTER_PRIME_BUILD_PATH' ) ) {
	define( 'ALEISTER_PRIME_BUILD_PATH', untrailingslashit( get_template_directory() ) . '/assets/build' );
}

if ( ! defined( 'ALEISTER_PRIME_SRC_BLOCK_DIR_PATH' ) ) {
	define( 'ALEISTER_PRIME_SRC_BLOCK_DIR_PATH', get_template_directory() . '/assets/build/js/blocks' );
}

if ( ! defined( 'ALEISTER_PRIME_LIBRARY_URI' ) ) {
	define( 'ALEISTER_PRIME_LIBRARY_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/library' );
}

if ( ! defined( 'ALEISTER_PRIME_LIBRARY_DIR_PATH' ) ) {
	define( 'ALEISTER_PRIME_LIBRARY_DIR_PATH', untrailingslashit( get_template_directory() ) . '/assets/library' );
}

/**
 * Load up the class autoloader.
 */
require_once ALEISTER_PRIME_THEME_PATH . '/inc/helpers/autoloader.php';

/**
 * Theme Init
 *
 * Sets up the theme.
 *
 * @return void
 * @since 1.0.0
 */
function aleister_prime_get_theme_instance() {
	\ALEISTER_PRIME\Inc\Aleister_Prime::get_instance();
}

aleister_prime_get_theme_instance();
