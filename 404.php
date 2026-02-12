<?php get_header(); ?>

<main id="main" class="site-main">
    <div class="grid place-items-center">
        <h1><?php esc_html_e( 'Page not found', 'portfolio' ); ?></h1>

        <a
            href="<?php echo esc_url( home_url( '/' ) ); ?>"
            class="underline"
        >
            <?php esc_html_e( 'Back to home', 'portfolio' ); ?>
        </a>
    </div>
</main>

<?php get_footer(); ?>
