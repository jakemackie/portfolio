<?php get_header(); ?>

<main id="main" class="site-main">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php the_content(); ?>
            <div class="flex justify-end bg-blue-500 min-h-screen">
                test
            </div>

        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
