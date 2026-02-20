<?php

$args = wp_parse_args($args ?? [], ["post_id" => null]);
$post_id = $args["post_id"] ?: get_the_ID();

if (!$post_id) {
    return;
}

$badge_text = get_field("cpt_experience_badge_text", $post_id);
$title = get_the_title($post_id);
$company_name = get_field("cpt_experience_company_name", $post_id);
$location = get_field("cpt_experience_location", $post_id);
$start_year = get_field("cpt_experience_start_year", $post_id);
$is_current_year = get_field("cpt_experience_is_current", $post_id);
$end_year = get_field("cpt_experience_end_year", $post_id);
$description = get_field("cpt_experience_description", $post_id);
$achievements = get_field("cpt_experience_achievements", $post_id);
$skills = get_field("cpt_experience_skills", $post_id);

?>

<article class="col-span-full lg:col-span-6 flex flex-col gap-5 p-8 bg-white">
    
    <?php if ($badge_text): ?>
        <span 
            role="status"
            class="text-xs font-semibold opacity-50"
        >
            <?php echo esc_html($badge_text); ?>
        </span>
    <?php endif; ?>

    <div class="flex flex-col gap-4">
        <h4 class="text-2xl font-bold text-neutral-900 leading-tight">
            <?php echo esc_html($title); ?>
        </h4>
        
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-700 text-sm">
            <span class="flex items-center gap-1.5">
                <?php echo get_icon('briefcase'); ?>
                <span class="font-medium"><?php echo esc_html($company_name); ?></span>
            </span>

            <?php if ($location): ?>
                <span class="flex items-center gap-1.5">
                    <?php echo get_icon('map-pin'); ?>
                    <?php echo esc_html($location); ?>
                </span>
            <?php endif; ?>

            <span class="flex items-center gap-1.5">
                <?php echo get_icon('calendar'); ?>
                <time datetime="<?php echo $start_year; ?>"><?php echo $start_year; ?></time> 
                – 
                <?php if ($is_current_year): ?>
                    <span>Present</span>
                <?php else: ?>
                    <time datetime="<?php echo $end_year; ?>"><?php echo $end_year; ?></time>
                <?php endif; ?>
            </span>
        </div>
    </div>

    <?php if ($description): ?>
        <p class="text-neutral-600 leading-relaxed max-w-3xl">
            <?php echo esc_html($description); ?>
        </p>
    <?php endif; ?>

    <?php if ($achievements): ?>
        <div class="space-y-3">
            <h5 class="text-sm font-bold tracking-wider text-neutral-900">Key Achievements:</h5>
            <ul class="list-none p-0 m-0 space-y-2">
                <?php foreach ($achievements as $row): ?>
                    <li class="flex items-center gap-2 text-neutral-600 leading-snug">
                        <span class="mt-0.5 size-1.5 rounded-full bg-neutral-400 shrink-0"></span>
                        <?php echo esc_html($row['cpt_experience_achievement_bullet']); ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <?php if ($skills && is_array($skills)): ?>
        <ul class="flex flex-wrap gap-2 mt-auto" aria-label="Skills and Technologies">
            <?php foreach($skills as $skill_id): ?>
                <li>
                    <span 
                        class="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 rounded-sm text-xs font-medium border border-neutral-200"
                    >
                        <?php echo esc_html(get_term_field('name', $skill_id, 'skill')); ?>
                    </span>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</article>