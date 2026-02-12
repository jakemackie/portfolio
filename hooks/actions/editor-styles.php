<?php

/**
 * Enqueue theme CSS in the block editor (inside the iframe).
 */
add_action( 'after_setup_theme', function () {
    add_theme_support( 'editor-styles' );
    add_editor_style( 'dist/style.css' );
});
