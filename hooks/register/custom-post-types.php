<?php

function portfolio_register_post_types(): void {
    register_post_type('project', [
        'labels' => [
            'name' => 'Projects',
            'singular_name' => 'Project',
            'add_new_item' => 'Add Project'
        ],
        'public' => true,
        'menu_icon' => 'dashicons-portfolio',
        'has_archive' => true,
        'rewrite' => ['slug' => 'projects'],
        'supports' => ['title', 'excerpt', 'thumbnail', 'editor'],
        'show_in_rest' => true,
    ]);

    register_post_type('experience', [
        'labels' => [
            'name' => 'Experience',
            'singular_name' => 'Experience',
            'add_new_item' => 'Add Experience'
        ],
        'public' => true,
        'menu_icon' => 'dashicons-index-card',
        'has_archive' => true,
        'rewrite' => ['slug' => 'experience'],
        'supports' => ['title'],
        'show_in_rest' => true,
    ]);
}
