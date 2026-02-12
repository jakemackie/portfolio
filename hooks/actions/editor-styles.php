<?php

/**
 * Enqueue theme CSS in the block editor (inside the iframe).
 */
add_action( 'after_setup_theme', function () {
    add_theme_support( 'editor-styles' );
    add_editor_style( 'dist/style.css' );

    // Enable featured images for custom post types.
    add_theme_support( 'post-thumbnails', [ 'project' ] );
});

// Remove comments menu from admin
add_action( 'admin_menu', function() {
    remove_menu_page( 'edit-comments.php' );
});
