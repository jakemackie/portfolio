<?php

/**
 * Enqueue theme CSS + JS on the frontend.
 */
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'theme', get_theme_file_uri( 'dist/style.css' ), [], null );
    wp_enqueue_script( 'theme', get_theme_file_uri( 'dist/main.js' ), [], null, true );
});
