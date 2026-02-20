<?php

$experience_post_ids = get_field("block_experience_post_ids");

if (empty($experience_post_ids) || !is_array($experience_post_ids)) {
    return;
}

?>

<section <?php echo block_classes(['class' => 'grid-design']); ?>>
    <?php 
        foreach ($experience_post_ids as $experience_post_id) {
            get_template_part(
                slug: "template-parts/cards/experience", 
                args: ["post_id" => $experience_post_id]
            );
        }
    ?>
</section>
