<?php get_header(); ?>

<main id="main" class="site-main">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header>
                <h1><?php the_title(); ?></h1>
                <time datetime="<?php echo get_the_date( 'c' ); ?>">
                    <?php echo get_the_date(); ?>
                </time>
            </header>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>

    <?php
    the_post_navigation( [
        'prev_text' => '&larr; %title',
        'next_text' => '%title &rarr;',
    ] );
    ?>
</main>

<?php get_footer(); ?>
