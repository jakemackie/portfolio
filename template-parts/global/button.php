<?php
$args = wp_parse_args($args ?? [], [
    'text'  => null,
    'url'   => null,
    'class' => 'btn-primary'
]);

if (!$args['text'] || !$args['url']) {
    return;
}

$url   = esc_url($args['url']);
$text  = esc_html($args['text']);
$class = esc_attr($args['class']);
?>

<a href="<?php echo $url; ?>" class="<?php echo $class; ?>">
    <?php echo $text; ?>
</a>