<?php

$image_ids = get_field('block_carousel_images');

if (empty($image_ids)) {
    return;
}

?>

<section <?php echo block_classes(); ?>>

    <?php if (is_admin()): ?>

        <!-- Admin Preview -->
        <div class="container flex gap-6 overflow-x-auto pb-4 rounded-2xl overflow-hidden">
            <?php foreach ($image_ids as $image_id) : ?>
                <div class="shrink-0 w-1/3 aspect-3/2 rounded-2xl overflow-hidden">
                    <?php
                    echo wp_get_attachment_image(
                        attachment_id: $image_id,
                        size: 'medium',
                        attr: [
                            'class' => 'size-full object-cover',
                            'loading' => 'lazy'
                        ]
                    );
                    ?>
                </div>
            <?php endforeach; ?>
        </div>

    <?php else: ?>

        <!-- Frontend Swiper -->
        <div class="container">
            <div class="swiper js-carousel rounded-2xl overflow-hidden">
                <div class="swiper-wrapper">
                    <?php foreach ($image_ids as $image_id) : ?>
                        <div class="relative swiper-slide aspect-3/2 rounded-2xl overflow-hidden">
                            <?php
                            echo wp_get_attachment_image(
                                attachment_id: $image_id,
                                size: 'large',
                                attr: [
                                    'class' => 'size-full object-cover',
                                    'loading' => 'lazy'
                                ]
                            );
                            ?>

                            <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/50 size-full"></div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="swiper-pagination"></div>
            </div>
        </div>
    <?php endif; ?>
</section>
