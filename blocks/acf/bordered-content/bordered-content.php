<?php

$template = [
    [
        "core/paragraph",
        [
            "placeholder" => "Est elit commodo mollit amet et culpa. Elit pariatur occaecat commodo quis qui anim. Exercitation aliqua culpa ut magna ullamco reprehenderit nisi. Tempor et ex sunt sint ipsum aliqua irure exercitation cupidatat sit.",
            "style" => [
                "spacing" => [
                    "margin" => [
                        "top" => "0",
                        "bottom" => "0"
                    ]
                ]
            ]
        ]
    ],
    [
        "core/heading",
        [
            "textAlign" => "right",
            "placeholder" => "Add your quote heading",
            "style" => [
                "spacing" => [
                    "margin" => [
                        "top" => "0",
                        "bottom" => "0"
                    ]
                ]
            ],
            "level" => 2
        ]
    ]
];

$background_image_id = get_field("block_bordered_content_background_image_id");

?>

<section <?php echo block_classes(['class' => 'm-4 lg:container lg:mx-auto rounded-2xl']); ?>>
    <InnerBlocks
        class="px-16"
        allowedBlocks='<?php echo esc_attr(wp_json_encode(["core/paragraph", "core/heading"])); ?>'
        template='<?php echo esc_attr(wp_json_encode($template)); ?>'
    />
</section>
