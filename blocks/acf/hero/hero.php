<?php

$allowed_blocks = ["core/heading", "core/paragraph", "core/buttons", "core/button"];
$template = [
    "core/heading", [
        "placeaholder" => "Add a heading",
        "level" => 1
    ],
    "core/paragraph", [
        "placeholder" => "Add some text"
    ],
    [
        "core/buttons", [],
        "core/button", [
            "placeholder" => "Add a call to action"
        ]
    ]
];

$image_id = get_field("block_hero_background_image");

?>

<section <?php echo get_block_wrapper_attributes(['class' => is_admin() ? 'static' : 'relative opacity-0 animate-[hero-fade_0.8s_ease-out_forwards]']); ?>>
    <div class="container mx-auto grid-design">
        <InnerBlocks
            class="z-10 col-span-full lg:col-start-4 lg:col-end-10 text-balance"
            allowedBlocks="<?php echo esc_attr(wp_json_encode($allowed_blocks)); ?>"
            template="<?php echo esc_attr(wp_json_encode($template)); ?>"
        />
    </div>

    <?php
        if ($image_id) {
            echo wp_get_attachment_image(
                attachment_id: $image_id,
                size: "full",
                attr: ["class" => "opacity-50 absolute inset-0 !size-full object-cover pointer-events-none"]
            );
        }
    ?>

    <div class="absolute inset-0 bg-linear-to-b from-white via-white/50 to-white/0 z-0 pointer-events-none"></div>
</section>
