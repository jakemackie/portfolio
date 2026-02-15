<?php

require_once get_template_directory() . '/hooks/actions/index.php';

function block_classes(array $args = []): string {
    if (is_admin()) {
        return '';
    }

    return get_block_wrapper_attributes($args);
}
