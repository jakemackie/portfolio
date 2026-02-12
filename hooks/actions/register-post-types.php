<?php

require_once get_template_directory() . '/hooks/register/index.php';

/**
 * Register custom post types.
 */
add_action( 'init', 'portfolio_register_post_types' );
