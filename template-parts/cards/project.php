<?php

$args = wp_parse_args($args ?? [], ["post_id" => null]);
$post_id = $args["post_id"] ?: get_the_ID();

if (!$post_id) {
    return;
}

$external_link = get_field("cpt_project_url", $post_id);
$cover_image_id = get_post_thumbnail_id($post_id);
$title = get_the_title($post_id);
$excerpt = get_the_excerpt($post_id);

?>

<a
    href="<?php echo esc_url($external_link); ?>"
    target="_blank"
    rel="noopener noreferrer"
    class="col-span-full md:col-span-2 lg:col-span-4 relative aspect-16/21 shrink-0 flex flex-col p-5 rounded-2xl overflow-hidden group"
>
    <?php
        if ($cover_image_id) {
            echo(wp_get_attachment_image(
                attachment_id: $cover_image_id,
                size: "medium",
                attr: ["class" => "opacity-70 absolute inset-0 w-full !h-full object-cover"]
            ));
        }
    ?>

    <div class="z-10 mt-auto p-4 backdrop-blur-xl border border-white/30 rounded-2xl">
        <?php if (!empty($title)): ?>
            <div class="flex flex-wrap gap-3">
                <h3 class="font-medium group-hover:underline">
                    <?php echo($title); ?>
                </h3>
            </div>
        <?php endif; ?>

        <?php if (!empty($excerpt)): ?>
            <p>
                <?php echo($excerpt); ?>
            </p>
        <?php endif; ?>
    </div>
</a>