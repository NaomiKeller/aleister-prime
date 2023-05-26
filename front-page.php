<?php
/**
 * Template Name: Homepage
 *
 * @package aleister-prime
 */

get_header();
?>

	<main id="primary" class="site-main aleister-prime-homepage">
		<!-- Content from Editor -->
		<div class="entry-content">
		<?php
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'aleister-prime' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			)
		);

		?>
		</div>
	</main>

<?php
get_footer();
