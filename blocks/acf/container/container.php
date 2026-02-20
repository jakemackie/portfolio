<?php

$template = [
    [
        "core/heading",
        [
            "placeholder" => "Add your heading",
            "level" => 2
        ]
    ],
    [
        "core/paragraph",
        [
            "placeholder" => "Est elit commodo mollit amet et culpa. Elit pariatur occaecat commodo quis qui anim. Exercitation aliqua culpa ut magna ullamco reprehenderit nisi. Tempor et ex sunt sint ipsum aliqua irure exercitation cupidatat sit.",
        ]
    ]
];

?>

<section <?php echo block_classes(); ?>>
    <InnerBlocks
        class="container"
        allowedBlocks='<?php echo esc_attr(wp_json_encode(get_allowed_blocks())); ?>'
        template='<?php echo esc_attr(wp_json_encode($template)); ?>'
    />
</section>
