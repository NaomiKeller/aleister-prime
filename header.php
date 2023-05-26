<?php
/**
 * The header for our theme
 *
 * @package aleister-prime
 */

$theme_options     = get_option( 'aleister_prime_settings' );
$theme_logo        = ( isset( $theme_options['aleister_prime_img'] ) && ! empty( $theme_options['aleister_prime_img'] ) ? $theme_options['aleister_prime_img'] : null );
$favicon           = ( isset( $theme_options['aleister_prime_favicon'] ) && ! empty( $theme_options['aleister_prime_favicon'] ) ? $theme_options['aleister_prime_favicon'] : null );
$header_accent     = ( isset( $theme_options['aleister_prime_logo_color'] ) && ! empty( $theme_options['aleister_prime_logo_color'] ) ? $theme_options['aleister_prime_logo_color'] : '#E06565' );
$header_background = ( isset( $theme_options['aleister_prime_header_footer_color'] ) && ! empty( $theme_options['aleister_prime_header_footer_color'] ) ? $theme_options['aleister_prime_header_footer_color'] : '#121212' );
$google_analytics  = ( isset( $theme_options['aleister_prime_google_analytic'] ) && ! empty( $theme_options['aleister_prime_google_analytic'] ) ? $theme_options['aleister_prime_google_analytic'] : null );

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php
	if ( $favicon ) {
		?>
		<link rel="icon" href="<?php echo esc_url( $favicon ); ?>">
		<meta name="msapplication-TileImage" content="<?php echo esc_url( $favicon ); ?>">
		<?php
	}
	?>

	<?php
	if ( $google_analytics ) {
		echo $google_analytics; //phpcs:disable
	}
	?>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'aleister-prime' ); ?></a>

	<header id="masthead" class="site-header" style="background-color: <?php echo esc_attr( $header_background ); ?>">
		<div class="site-branding container">
			<?php if ( $theme_logo ) : ?>
				<img src="<?php echo esc_url( $theme_logo ); ?>" alt="site-logo">
			<?php else : ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<span>Aleister</span>
					<span class="header-color" style="color: <?php echo esc_attr( $header_accent ); ?>">Strange</span>
				</a>
			<?php endif; ?>
		</div><!-- .site-branding -->
	</header><!-- #masthead -->
