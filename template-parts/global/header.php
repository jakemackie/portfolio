<header>
    <section class="container mx-auto grid-design">
        <div class="relative col-span-full flex justify-between py-6">
            <div class="hidden lg:block">
                <h3 class="text-2xl">Jake Mackie</h3>
            </div>

            <ul class="<?php echo(is_admin_bar_showing() ? 'top-11' : 'top-3'); ?> 
                fixed left-1/2 -translate-x-1/2 z-50
                flex bg-gray-100/50 backdrop-blur-2xl *:hover:bg-gray-200/70 
                rounded-full border border-gray-300/50 overflow-hidden 
                *:transition-colors *:duration-300 *:ease-in-out
                lg:left-auto lg:right-[max(1rem,calc((100vw-1280px)/2))]
                lg:translate-x-0
            ">
                <li>
                    <a 
                        href="#"
                        class="flex items-center py-4 pl-6 pr-4"
                    >
                        <span class="mr-4 block shrink-0 size-2 bg-blue-400 ring-2 ring-blue-200 rounded-full pointer-events-none"></span>
                        Work
                    </a>
                </li>

                <li>
                    <a 
                        href="#"
                        class="flex items-center p-4"
                    >
                        About
                    </a>
                </li>

                <li>
                    <a 
                        href="#"
                        class="flex items-center py-4 pl-4 pr-6"
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </div>
    </section>
</header>