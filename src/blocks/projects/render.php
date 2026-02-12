<?php

$display_mode = isset( $attributes['displayMode'] ) ? $attributes['displayMode'] : 'all';
$selected_ids = isset( $attributes['selectedIds'] ) && is_array( $attributes['selectedIds'] )
	? array_map( 'intval', $attributes['selectedIds'] )
	: [];

$query_args = [
	'post_type' => 'project',
	'post_status' => 'publish',
	'posts_per_page' => -1,
	'orderby' => 'date',
	'order' => 'DESC',
];

if ( $display_mode === 'selected' && ! empty( $selected_ids ) ) {
	$query_args['post__in'] = $selected_ids;
	$query_args['orderby'] = 'post__in';
}

$projects = new WP_Query( $query_args );

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'projects-block' ] );

if ( ! $projects->have_posts() ) {
	echo '<div ' . $wrapper_attributes . '>';
	echo '<div class="rounded-xl border border-dashed border-grey/60 p-8 text-sm text-neutral-500">';
	echo esc_html__( 'No projects found yet.', 'portfolio' );
	echo '</div>';
	echo '</div>';
	return;
}

ob_start();
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		<?php
		while ( $projects->have_posts() ) :
			$projects->the_post();
			$title = get_the_title();
			$excerpt = get_the_excerpt();
			$project_url = function_exists( 'get_field' )
				? get_field( 'cpt_project_url', get_the_ID() )
				: get_post_meta( get_the_ID(), 'cpt_project_url', true );
			$card_url = $project_url ? $project_url : get_permalink();
			$thumbnail = get_the_post_thumbnail( get_the_ID(), 'large', [
				'class' => 'h-full w-full object-cover',
				'alt' => $title,
			] );
			if ( ! $excerpt ) {
				$excerpt = wp_trim_words( wp_strip_all_tags( get_the_content() ), 24 );
			}
			?>
			<a class="block" href="<?php echo esc_url( $card_url ); ?>">
				<article class="overflow-hidden h-full rounded-xl border border-grey bg-black shadow-sm">
					<?php if ( $thumbnail ) : ?>
						<div class="aspect-4-3 w-full overflow-hidden bg-neutral-100">
							<?php echo $thumbnail; ?>
						</div>
					<?php endif; ?>
					<div class="p-6">
						<h3 class="text-lg font-semibold leading-tight mb-3">
							<?php echo esc_html( $title ); ?>
						</h3>
						<?php if ( $excerpt ) : ?>
							<p class="text-sm leading-relaxed">
								<?php echo esc_html( $excerpt ); ?>
							</p>
						<?php endif; ?>
					</div>
				</article>
			</a>
		<?php endwhile; ?>
	</div>
</div>
<?php
wp_reset_postdata();

echo ob_get_clean();
