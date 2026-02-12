<?php

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
