<?php

require_once get_template_directory() . '/hooks/actions/index.php';

function block_classes(array $args = []): string {
    if (is_admin()) {
        return '';
    }

    return get_block_wrapper_attributes($args);
}

function get_icon(string $name) {
    $path = get_template_directory() . "/src/assets/icons/hero-icons/{$name}.svg";
    if (file_exists($path)) {
        return file_get_contents($path);
    }
    return '';
}