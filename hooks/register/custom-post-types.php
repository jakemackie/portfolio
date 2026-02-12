<?php

function portfolio_register_post_types(): void {
    register_post_type( 'project', [
        'labels' => [
            'name' => 'Projects',
            'singular_name' => 'Project',
        ],
        'public' => true,
        'has_archive' => true,
        'rewrite' => [ 'slug' => 'projects' ],
        'supports' => [ 'title', 'editor', 'thumbnail' ],
        'show_in_rest' => true,
    ] );
}
