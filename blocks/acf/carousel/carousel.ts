import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

document.querySelectorAll<HTMLElement>('.js-carousel').forEach((el) => {
    const paginationEl = el.querySelector<HTMLElement>('.swiper-pagination')

    new Swiper(el, {
        modules: [Pagination, Autoplay],

        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 2500,
            pauseOnMouseEnter: true,
        },

        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },

        pagination: {
            el: paginationEl ?? undefined,
            clickable: true,
        },
    })
})
