<?php

add_filter( 'acf/settings/save_json', function ( $path ) {
    return get_template_directory() . '/acf';
} );

add_filter( 'acf/settings/load_json', function ( $paths ) {
    $paths[] = get_template_directory() . '/acf/custom-post-types';
    return $paths;
} );
