<?php

$project_post_ids = get_field("block_projects_post_ids");

if (empty($project_post_ids)) {
    return;
}

?>

<section <?php echo get_block_wrapper_attributes(); ?>>
    <div class="container mx-auto grid-design">
        <?php
            if (is_array($project_post_ids) && count($project_post_ids) > 0) {
                foreach ($project_post_ids as $project_post_id) {
                    get_template_part(
                        slug: "template-parts/cards/project",
                        args: ["post_id" => $project_post_id]
                    );
                }
            }
        ?>
    </div>
</section>