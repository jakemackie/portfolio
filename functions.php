<?php

function theme_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();

    $dev_server = 'http://localhost:5173';
    $is_dev = false;

    $response = @file_get_contents($dev_server . '/@vite/client', false, stream_context_create([
        'http' => ['timeout' => 1]
    ]));

    if ($response !== false) {
        $is_dev = true;
    }

    if ($is_dev) {
        add_action('wp_head', function () use ($dev_server) {
            echo '<script type="module" src="' . esc_url($dev_server . '/@vite/client') . '"></script>' . "\n";
            echo '<script type="module" src="' . esc_url($dev_server . '/src/main.ts') . '"></script>' . "\n";
        });
    } else {
        $manifest_path = $theme_dir . '/dist/.vite/manifest.json';

        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            $entry = $manifest['src/main.ts'];

            wp_enqueue_script(
                'theme-js',
                $theme_uri . '/dist/' . $entry['file'],
                [],
                null,
                true
            );

            if (!empty($entry['css'])) {
                foreach ($entry['css'] as $css) {
                    wp_enqueue_style(
                        'theme-css',
                        $theme_uri . '/dist/' . $css,
                        [],
                        null
                    );
                }
            }
        }
    }
}

add_action('wp_enqueue_scripts', 'theme_assets');
