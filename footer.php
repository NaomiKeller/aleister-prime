<?php
/**
 * The template for displaying the footer
 *
 * @package aleister-prime
 */

$theme_options     = get_option( 'aleister_prime_settings' );
$footer_background = ( isset( $theme_options['aleister_prime_header_footer_color'] ) && ! empty( $theme_options['aleister_prime_header_footer_color'] ) ? $theme_options['aleister_prime_header_footer_color'] : '#121212' );

?>
	<footer id="colophon" class="site-footer" style="background-color: <?php echo esc_attr( $footer_background ); ?>">
		<div class="flex container">
			<div class="col">Powered by <a href="https://wordpress.org/">WordPress</a></div>
			<div class="col">Theme by <a href="https://naomimoon.carrd.co/">Naomi Moon</a></div>

			<div class="back-to-top">
				<span class="dashicons dashicons-arrow-up-alt2" href="#">Back to Top</span>
			</div>
		</div>
	</footer>
</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>
