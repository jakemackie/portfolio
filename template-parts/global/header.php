<header class="relative z-10 isolate">
    <section class="container mx-auto grid-design">
        <div class="relative col-span-full flex justify-between py-6">

            <div class="hidden lg:block">
                <h3 class="text-2xl">Jake Mackie</h3>
            </div>

            <ul class="<?php echo(is_admin_bar_showing() ? 'top-11' : 'top-3'); ?> 
                fixed left-1/2 -translate-x-1/2
                flex rounded-full overflow-hidden
                border border-black/10
                bg-neutral-900/30 backdrop-blur-xl
                shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                *:transition-all *:duration-300 *:ease-out
                *:hover:bg-white/10                
                lg:left-auto lg:right-[max(1rem,calc((100vw-1280px)/2))]
                lg:translate-x-0
            ">
                <li>
                    <a href="#" class="flex items-center py-4 pl-6 pr-4 text-white mix-blend-difference">
                        <span class="mr-4 block shrink-0 size-2 bg-blue-500 ring-2 ring-blue-200 rounded-full pointer-events-none"></span>
                        Work
                    </a>
                </li>

                <li>
                    <a href="#" class="flex items-center p-4 text-white mix-blend-difference">
                        About
                    </a>
                </li>

                <li>
                    <a href="#" class="flex items-center py-4 pl-4 pr-6 text-white mix-blend-difference">
                        Contact
                    </a>
                </li>

            </ul>
        </div>
    </section>
</header>
