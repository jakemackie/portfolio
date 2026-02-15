<?php

$template = [
    [
        "core/paragraph",
        [
            "placeholder" => "Add some text"
        ]
    ],
    [
        "core/heading",
        [
            "placeholder" => "Add a heading",
            "level" => 2
        ]
    ]
];

?>

<section <?php echo block_classes(); ?>>
    <InnerBlocks
        class="container grid grid-cols-1 lg:grid-cols-2 gap-5.5 lg:gap-72"
        allowedBlocks='<?php echo esc_attr(wp_json_encode(["core/paragraph", "core/heading"])); ?>'
        template='<?php echo esc_attr(wp_json_encode($template)); ?>'
    />
</section>
