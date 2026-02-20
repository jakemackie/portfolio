<?php

function portfolio_register_taxonomies(): void {
    register_taxonomy('skill', ['project', 'experience'], [
        'labels' => [
            'name' => 'Skills',
            'singular_name' => 'Skill',
            'search_items' => 'Search Skills',
            'all_items' => 'All Skills',
            'edit_item' => 'Edit Skill',
            'update_item' => 'Update Skill',
            'add_new_item' => 'Add New Skill',
            'new_item_name' => 'New Skill Name',
            'menu_name' => 'Skills',
        ],
        'hierarchical'          => false,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'show_in_rest'          => true,
        'rewrite'               => ['slug' => 'skill'],
    ]);
}
add_action('init', 'portfolio_register_taxonomies');