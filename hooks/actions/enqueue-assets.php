<?php

/**
 * Enqueue theme CSS + JS on the frontend.
 */
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'theme', get_theme_file_uri( 'dist/main.css' ), [], null );
    wp_enqueue_script( 'theme', get_theme_file_uri( 'dist/main.js' ), [], null, true );
});

/**
 * Enqueue editor-only styles.
 */
add_action( 'enqueue_block_editor_assets', function () {
    wp_enqueue_style( 'theme-editor', get_theme_file_uri( 'dist/editor.css' ), [], null );
} );
