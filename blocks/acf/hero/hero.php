<?php

$image_id = get_field("block_hero_background_image");

?>

<section <?php echo get_block_wrapper_attributes(['class' => is_admin() ? 'static' : 'relative']); ?>>
    <div class="container mx-auto grid-design">
        <InnerBlocks
            class="z-10 col-span-5"
        />
    </div>

    <?php
        if ($image_id) {
            echo wp_get_attachment_image(
                attachment_id: $image_id,
                size: "full",
                attr: ["class" => "opacity-15 absolute inset-0 !size-full object-cover pointer-events-none"]
            );
        }
    ?>
</section>
