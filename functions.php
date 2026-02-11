<?php

/**
 * Enqueue theme CSS + JS on the frontend.
 */
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'theme', get_theme_file_uri( 'dist/style.css' ), [], null );
    wp_enqueue_script( 'theme', get_theme_file_uri( 'dist/main.js' ), [], null, true );
});

/**
 * Enqueue theme CSS in the block editor (inside the iframe).
 */
add_action( 'after_setup_theme', function () {
    add_theme_support( 'editor-styles' );
    add_editor_style( 'dist/style.css' );
});

/**
 * Register all custom blocks found in build/blocks/.
 */
add_action( 'init', function () {
    $blocks_dir = get_template_directory() . '/build/blocks';

    if ( ! is_dir( $blocks_dir ) ) return;

    foreach ( glob( $blocks_dir . '/*/block.json' ) as $block_json ) {
        register_block_type( dirname( $block_json ) );
    }
});
