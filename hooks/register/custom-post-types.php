<?php

function portfolio_register_post_types(): void {
    register_post_type( 'project', [
        'labels' => [
            'name' => 'Projects',
            'singular_name' => 'Project',
            'add_new_item' => 'Add Project'
        ],
        'public' => true,
        'has_archive' => true,
        'rewrite' => [ 'slug' => 'projects' ],
        'supports' => [ 'title', 'excerpt', 'thumbnail', 'editor' ],
        'show_in_rest' => true,
    ] );
}
