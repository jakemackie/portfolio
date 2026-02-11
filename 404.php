<?php get_header(); ?>

<main id="main" class="site-main">
    <h1><?php esc_html_e( 'Page not found', 'portfolio' ); ?></h1>
    <p><?php esc_html_e( 'The page you are looking for does not exist.', 'portfolio' ); ?></p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
        <?php esc_html_e( 'Back to home', 'portfolio' ); ?>
    </a>
</main>

<?php get_footer(); ?>
