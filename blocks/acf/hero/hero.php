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
$link_repeater = get_field("block_hero_links_repeater");
$subtext = get_field("block_hero_subtext");

?>

<section <?php echo block_classes(['class' => 'opacity-0 animate-[hero-fade_0.8s_ease-out_forwards]']); ?>>
    <div class="container mx-auto">
        <div class="grid-design">
            <div class="col-span-full lg:col-span-7">
                <InnerBlocks
                    class="w-full"
                    allowedBlocks="<?php echo esc_attr(wp_json_encode($allowed_blocks)); ?>"
                    template="<?php echo esc_attr(wp_json_encode($template)); ?>"
                />
            </div>
        </div>

        <div class="grid-design">

            <div class="col-span-full lg:col-span-7">
                <?php if ($front_image_id): ?>
                    <figure class="m-0! relative w-full lg:w-3/4">

                        <div class="relative aspect-4/3 grayscale-100 hover:grayscale-0 shadow-lg shadow-black/40 transition duration-500 ease-in-out overflow-hidden group">
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
                                            "class" => "absolute inset-0 scale-200 !size-full object-cover pointer-events-none",
                                            "loading" => "eager",
                                            "aria-hidden" => "true"
                                        ]
                                    );
                                }
                            ?>
                        </div>

                        <?php if ($image_caption): ?>
                            <figcaption class="mt-2 opacity-60 w-full text-sm italic">
                                <?php echo esc_html($image_caption); ?>
                            </figcaption>
                        <?php endif; ?>

                    </figure>
                <?php endif; ?>
            </div>


            <?php if (!empty($link_repeater) && is_array($link_repeater)): ?>

                <?php
                    $links = array_filter(
                        array_column($link_repeater, 'block_hero_link'),
                        'is_array'
                    );
                ?>

                <div class="col-span-full lg:col-span-5 h-full flex flex-col gap-8 lg:text-right">
                    <ul class="flex flex-col list-none!">

                        <?php foreach ($links as $link): ?>
                            <?php
                                $url   = $link['url']   ?? '';
                                $title = $link['title'] ?? '';
                            ?>

                            <?php if ($url && $title): ?>
                                <li>
                                    <a 
                                        href="<?php echo esc_url($url); ?>"
                                        class="block hover:bg-gray-100 border-b border-b-gray-200 px-4 py-6 transition-colors duration-150 ease-in-out text-lg"
                                    >
                                        <?php echo esc_html($title); ?>
                                    </a>
                                </li>
                            <?php endif; ?>

                        <?php endforeach; ?>
                    </ul>

                    <?php if ($subtext): ?>
                        <div class="mt-auto text-base">
                            <?php echo esc_html($subtext); ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
