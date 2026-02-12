<?php

/**
 * Register all custom blocks found in blocks/gutenberg and blocks/acf.
 */
add_action( 'init', function () {
    $blocks_dir = get_template_directory() . '/blocks';

    if ( ! is_dir( $blocks_dir ) ) return;

    $block_json_files = array_merge(
        glob( $blocks_dir . '/gutenberg/*/block.json' ) ?: [],
        glob( $blocks_dir . '/acf/*/block.json' ) ?: []
    );

    foreach ( $block_json_files as $block_json ) {
        register_block_type( dirname( $block_json ) );
    }
});
