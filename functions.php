<?php

require_once get_template_directory() . '/hooks/actions/index.php';

function block_classes(array $args = []) {

    // In the block editor
    if (is_admin()) {
        return isset($args['class'])
            ? 'class="' . esc_attr($args['class']) . '"'
            : '';
    }

    // On frontend
    return get_block_wrapper_attributes($args);
}

function get_icon(string $name) {
    $path = get_template_directory() . "/src/assets/icons/hero-icons/{$name}.svg";
    if (file_exists($path)) {
        return file_get_contents($path);
    }
    return '';
}

function get_allowed_blocks() {
    return [
        // Core
        "core/paragraph", 
        "core/heading",

        // Custom
        "acf/experience"
    ];
}