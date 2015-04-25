<?php get_header(); ?>

	<div class="main-wrapper">

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<div>
			<?php the_title(); ?>

			<?php the_content(); ?>
		</div>

	<?php endwhile; else : ?>
		<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>

	</div><!--/main-wrapper-->


<?php get_footer(); ?>