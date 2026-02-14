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

$front_image_id = get_field("block_hero_front_image");
$hover_image_id = get_field("block_hero_hover_image");
$image_caption = get_field("block_hero_image_caption");

?>

<section <?php echo get_block_wrapper_attributes(['class' => 'opacity-0 animate-[hero-fade_0.8s_ease-out_forwards]']); ?>>
    <div class="container mx-auto grid-design">
        <div class="col-span-full lg:col-span-7">
            <InnerBlocks
                class="w-full"
                allowedBlocks="<?php echo esc_attr(wp_json_encode($allowed_blocks)); ?>"
                template="<?php echo esc_attr(wp_json_encode($template)); ?>"
            />
    
            <?php if ($front_image_id): ?>
                <div class="relative w-full lg:w-3/4 aspect-4/3 grayscale-100 hover:grayscale-0 shadow-lg shadow-black/40 transition duration-500 ease-in-out group">
                    <?php
                        echo wp_get_attachment_image(
                            attachment_id: $front_image_id,
                            size: "full",
                            attr: [
                                "class" => "relative z-10 !size-full object-cover pointer-events-none group-hover:opacity-0 transition duration-500 ease-in-out",
                                "loading" => "eager",
                                "aria-hidden" => "true"
                            ]
                        );

                        if ($hover_image_id) {
                            echo wp_get_attachment_image(
                                attachment_id: $hover_image_id,
                                size: "full",
                                attr: [
                                    "class" => "absolute inset-0 !size-full object-cover pointer-events-none",
                                    "loading" => "eager",
                                    "aria-hidden" => "true"
                                ]
                            );
                        }
                    ?>

                    <?php if ($image_caption): ?>
                        <figcaption class="absolute -bottom-8 opacity-60 w-full text-sm italic">
                            <?php echo esc_html($image_caption); ?>
                        </figcaption>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
