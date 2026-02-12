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

/**
 * Register ACF field groups stored alongside ACF blocks.
 */
add_action( 'acf/init', function () {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    $fields_files = glob( get_template_directory() . '/blocks/acf/*/fields.json' ) ?: [];

    foreach ( $fields_files as $fields_file ) {
        $contents = file_get_contents( $fields_file );
        if ( ! $contents ) {
            continue;
        }

        $group = json_decode( $contents, true );
        if ( ! is_array( $group ) ) {
            continue;
        }

        acf_add_local_field_group( $group );
    }
} );
